/**
 * Session Routes
 *
 * Handles session creation, retrieval, and management.
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import {
  getOrCreateSession,
  getSessionByEmail,
  linkEmailToSession,
  addPageVisit,
} from '../services/supabase.service.js';
import { validateSiteMiddleware } from '../middleware/auth.js';

export const sessionRouter = Router();

// POST /api/session - Get or create session
const sessionRequestSchema = z.object({
  siteId: z.string().uuid(),
  sessionId: z.string().uuid(),
});

sessionRouter.post('/', validateSiteMiddleware, async (req: Request, res: Response) => {
  try {
    const parseResult = sessionRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        error: 'Invalid request',
        details: parseResult.error.errors,
      });
      return;
    }

    const { siteId, sessionId } = parseResult.data;

    const session = await getOrCreateSession(siteId, sessionId);

    res.json(session);
  } catch (error) {
    console.error('[Session] Error:', error);
    res.status(500).json({
      error: 'Failed to get or create session',
    });
  }
});

// POST /api/session/resume - Resume session by email
const resumeRequestSchema = z.object({
  siteId: z.string().uuid(),
  email: z.string().email(),
});

sessionRouter.post('/resume', validateSiteMiddleware, async (req: Request, res: Response) => {
  try {
    const parseResult = resumeRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        error: 'Invalid request',
        details: parseResult.error.errors,
      });
      return;
    }

    const { siteId, email } = parseResult.data;

    const session = await getSessionByEmail(siteId, email);

    if (!session) {
      res.status(404).json({
        error: 'No session found for this email',
      });
      return;
    }

    res.json(session);
  } catch (error) {
    console.error('[Session] Resume error:', error);
    res.status(500).json({
      error: 'Failed to resume session',
    });
  }
});

// POST /api/session/link-email - Link email to current session
const linkEmailSchema = z.object({
  siteId: z.string().uuid(),
  sessionId: z.string().uuid(),
  email: z.string().email(),
});

sessionRouter.post('/link-email', validateSiteMiddleware, async (req: Request, res: Response) => {
  try {
    const parseResult = linkEmailSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        error: 'Invalid request',
        details: parseResult.error.errors,
      });
      return;
    }

    const { sessionId, email } = parseResult.data;

    await linkEmailToSession(sessionId, email);

    res.json({ success: true });
  } catch (error) {
    console.error('[Session] Link email error:', error);
    res.status(500).json({
      error: 'Failed to link email',
    });
  }
});

// POST /api/session/page-visit - Log a page visit
const pageVisitSchema = z.object({
  siteId: z.string().uuid(),
  sessionId: z.string().uuid(),
  pageUrl: z.string().url(),
});

sessionRouter.post('/page-visit', async (req: Request, res: Response) => {
  try {
    const parseResult = pageVisitSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        error: 'Invalid request',
      });
      return;
    }

    const { sessionId, pageUrl } = parseResult.data;

    // Fire and forget
    addPageVisit(sessionId, pageUrl).catch(console.error);

    res.json({ success: true });
  } catch (error) {
    // Don't fail on analytics errors
    res.json({ success: true });
  }
});
