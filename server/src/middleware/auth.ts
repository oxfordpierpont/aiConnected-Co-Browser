/**
 * Authentication Middleware
 *
 * Validates site IDs and handles authentication.
 */

import { Request, Response, NextFunction } from 'express';
import { validateSite } from '../services/supabase.service.js';

// Cache validated sites for 5 minutes
const validatedSites = new Map<string, { valid: boolean; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Middleware to validate that the siteId exists in the database
 */
export async function validateSiteMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const siteId = req.body?.siteId || req.params?.siteId;

  if (!siteId) {
    res.status(400).json({ error: 'Site ID is required' });
    return;
  }

  // Check UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(siteId)) {
    res.status(400).json({ error: 'Invalid site ID format' });
    return;
  }

  // Check cache
  const cached = validatedSites.get(siteId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    if (cached.valid) {
      next();
      return;
    } else {
      res.status(404).json({ error: 'Site not found' });
      return;
    }
  }

  try {
    // For development, allow any UUID-formatted siteId
    // In production, you would validate against the database
    const isValid = process.env.NODE_ENV === 'development' || (await validateSite(siteId));

    // Cache result
    validatedSites.set(siteId, { valid: isValid, timestamp: Date.now() });

    if (isValid) {
      next();
    } else {
      res.status(404).json({ error: 'Site not found' });
    }
  } catch (error) {
    console.error('[Auth] Error validating site:', error);
    // In case of error, allow the request to proceed (fail open for availability)
    next();
  }
}

/**
 * Clear the site validation cache
 */
export function clearSiteCache(): void {
  validatedSites.clear();
}

/**
 * Remove a specific site from the cache
 */
export function invalidateSite(siteId: string): void {
  validatedSites.delete(siteId);
}
