/**
 * Shared Types for SiteGuide Server
 */

export interface PageContext {
  url: string;
  title: string;
  headings: string[];
  interactables: string[];
  contentSummary: string;
}

export interface ChatRequest {
  siteId: string;
  sessionId: string;
  message: string;
  pageContext: PageContext;
  mode: 'text' | 'audio';
}

export interface ChatResponse {
  text: string;
  audioData?: string;
  actions?: AIAction[];
}

export interface AIAction {
  type: 'scroll_to' | 'highlight' | 'click';
  target: string;
}

export interface Session {
  id: string;
  site_id: string;
  anonymous_id: string;
  email?: string;
  memory: Record<string, unknown>;
  pages_visited: string[];
  created_at: string;
  last_active: string;
}

export interface Lead {
  id: string;
  session_id: string;
  site_id: string;
  name?: string;
  email?: string;
  phone?: string;
  intent?: string;
  source_page: string;
  created_at: string;
}

export interface Site {
  id: string;
  name: string;
  domain: string;
  settings: SiteSettings;
  created_at: string;
}

export interface SiteSettings {
  greeting?: string;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  theme?: 'dark' | 'light' | 'auto';
  voiceEnabled?: boolean;
  primaryColor?: string;
}

export interface Interaction {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  message: string;
  actions?: AIAction[];
  created_at: string;
}

// WebSocket message types
export interface WSClientMessage {
  type: 'chat' | 'page_context' | 'heartbeat' | 'heartbeat_ack';
  sessionId: string;
  payload?: unknown;
}

export interface WSServerMessage {
  type: 'response' | 'action' | 'error' | 'heartbeat';
  payload?: {
    text?: string;
    audioData?: string;
    actions?: AIAction[];
    error?: string;
  };
}
