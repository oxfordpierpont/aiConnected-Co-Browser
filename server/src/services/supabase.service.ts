/**
 * Supabase Service
 *
 * Handles all database operations for sessions, leads, and site configuration.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Session, Lead, Site, Interaction, AIAction } from '../types/index.js';

let supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!supabase) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;

    if (!url || !key) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables are required');
    }

    supabase = createClient(url, key);
  }
  return supabase;
}

// ============ SITES ============

/**
 * Get site by ID
 */
export async function getSiteById(siteId: string): Promise<Site | null> {
  const { data, error } = await getSupabase()
    .from('sites')
    .select('*')
    .eq('id', siteId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('[Supabase] Error getting site:', error);
    throw error;
  }

  return data;
}

/**
 * Get site by domain
 */
export async function getSiteByDomain(domain: string): Promise<Site | null> {
  const { data, error } = await getSupabase()
    .from('sites')
    .select('*')
    .eq('domain', domain)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('[Supabase] Error getting site by domain:', error);
    throw error;
  }

  return data;
}

/**
 * Validate site exists
 */
export async function validateSite(siteId: string): Promise<boolean> {
  const site = await getSiteById(siteId);
  return site !== null;
}

// ============ SESSIONS ============

/**
 * Get or create a session
 */
export async function getOrCreateSession(siteId: string, anonymousId: string): Promise<Session> {
  const db = getSupabase();

  // Try to find existing session
  const { data: existing } = await db
    .from('sessions')
    .select('*')
    .eq('site_id', siteId)
    .eq('anonymous_id', anonymousId)
    .single();

  if (existing) {
    // Update last_active
    await db
      .from('sessions')
      .update({ last_active: new Date().toISOString() })
      .eq('id', existing.id);

    return existing;
  }

  // Create new session
  const { data: created, error } = await db
    .from('sessions')
    .insert({
      site_id: siteId,
      anonymous_id: anonymousId,
      memory: {},
      pages_visited: [],
    })
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Error creating session:', error);
    throw error;
  }

  return created;
}

/**
 * Get session by email
 */
export async function getSessionByEmail(siteId: string, email: string): Promise<Session | null> {
  const { data, error } = await getSupabase()
    .from('sessions')
    .select('*')
    .eq('site_id', siteId)
    .eq('email', email)
    .order('last_active', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('[Supabase] Error getting session by email:', error);
    throw error;
  }

  return data;
}

/**
 * Link email to session
 */
export async function linkEmailToSession(sessionId: string, email: string): Promise<void> {
  const { error } = await getSupabase()
    .from('sessions')
    .update({ email, last_active: new Date().toISOString() })
    .eq('id', sessionId);

  if (error) {
    console.error('[Supabase] Error linking email:', error);
    throw error;
  }
}

/**
 * Update session memory
 */
export async function updateSessionMemory(
  sessionId: string,
  memory: Record<string, unknown>
): Promise<void> {
  const { error } = await getSupabase()
    .from('sessions')
    .update({ memory, last_active: new Date().toISOString() })
    .eq('id', sessionId);

  if (error) {
    console.error('[Supabase] Error updating memory:', error);
    throw error;
  }
}

/**
 * Add page visit to session
 */
export async function addPageVisit(sessionId: string, pageUrl: string): Promise<void> {
  // Get current pages_visited
  const { data: session } = await getSupabase()
    .from('sessions')
    .select('pages_visited')
    .eq('id', sessionId)
    .single();

  if (!session) return;

  const pagesVisited = session.pages_visited || [];

  // Add if not already the last page
  if (pagesVisited[pagesVisited.length - 1] !== pageUrl) {
    pagesVisited.push(pageUrl);
  }

  // Keep only last 50 pages
  const trimmed = pagesVisited.slice(-50);

  const { error } = await getSupabase()
    .from('sessions')
    .update({
      pages_visited: trimmed,
      last_active: new Date().toISOString(),
    })
    .eq('id', sessionId);

  if (error) {
    console.error('[Supabase] Error adding page visit:', error);
  }
}

// ============ INTERACTIONS ============

/**
 * Log an interaction
 */
export async function logInteraction(
  sessionId: string,
  role: 'user' | 'assistant',
  message: string,
  actions?: AIAction[]
): Promise<void> {
  const { error } = await getSupabase()
    .from('interactions')
    .insert({
      session_id: sessionId,
      role,
      message,
      actions: actions || null,
    });

  if (error) {
    console.error('[Supabase] Error logging interaction:', error);
    // Don't throw - this is non-critical
  }
}

/**
 * Get recent interactions for a session
 */
export async function getRecentInteractions(
  sessionId: string,
  limit = 20
): Promise<Interaction[]> {
  const { data, error } = await getSupabase()
    .from('interactions')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[Supabase] Error getting interactions:', error);
    return [];
  }

  return data || [];
}

// ============ LEADS ============

/**
 * Capture a lead
 */
export async function captureLead(
  siteId: string,
  sessionId: string,
  leadData: {
    name?: string;
    email?: string;
    phone?: string;
    intent?: string;
    sourcePage: string;
  }
): Promise<Lead> {
  const { data, error } = await getSupabase()
    .from('leads')
    .insert({
      site_id: siteId,
      session_id: sessionId,
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      intent: leadData.intent,
      source_page: leadData.sourcePage,
    })
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Error capturing lead:', error);
    throw error;
  }

  return data;
}

/**
 * Get leads for a site
 */
export async function getLeadsForSite(siteId: string, limit = 100): Promise<Lead[]> {
  const { data, error } = await getSupabase()
    .from('leads')
    .select('*')
    .eq('site_id', siteId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[Supabase] Error getting leads:', error);
    return [];
  }

  return data || [];
}

// ============ UTILITIES ============

/**
 * Check if Supabase is configured and connected
 */
export async function checkConnection(): Promise<boolean> {
  try {
    const { error } = await getSupabase().from('sites').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
}
