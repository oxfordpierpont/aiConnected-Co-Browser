/**
 * Leads Routes
 *
 * Handles lead capture from chat conversations.
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { captureLead } from '../services/supabase.service.js';
import { validateSiteMiddleware } from '../middleware/auth.js';

export const leadsRouter = Router();

// Lead capture schema
const leadSchema = z.object({
  siteId: z.string().uuid(),
  sessionId: z.string().uuid(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  intent: z.string().optional(),
  sourcePage: z.string(),
});

// POST /api/leads - Capture a lead
leadsRouter.post('/', validateSiteMiddleware, async (req: Request, res: Response) => {
  try {
    const parseResult = leadSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        error: 'Invalid request',
        details: parseResult.error.errors,
      });
      return;
    }

    const { siteId, sessionId, name, email, phone, intent, sourcePage } = parseResult.data;

    // Require at least one contact method
    if (!email && !phone && !name) {
      res.status(400).json({
        error: 'At least one of name, email, or phone is required',
      });
      return;
    }

    const lead = await captureLead(siteId, sessionId, {
      name,
      email,
      phone,
      intent,
      sourcePage,
    });

    console.log(`[Leads] Captured lead for site ${siteId}: ${email || phone || name}`);

    res.json({
      success: true,
      leadId: lead.id,
    });
  } catch (error) {
    console.error('[Leads] Error capturing lead:', error);
    res.status(500).json({
      error: 'Failed to capture lead',
    });
  }
});
