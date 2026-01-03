/**
 * Config Routes
 *
 * Returns site-specific configuration for the widget.
 */

import { Router, Request, Response } from 'express';
import { getSiteById } from '../services/supabase.service.js';

export const configRouter = Router();

// GET /api/config/:siteId - Get site configuration
configRouter.get('/:siteId', async (req: Request, res: Response) => {
  try {
    const { siteId } = req.params;

    if (!siteId) {
      res.status(400).json({
        error: 'Site ID is required',
      });
      return;
    }

    const site = await getSiteById(siteId);

    if (!site) {
      // Return default config for unknown sites (allows development/testing)
      res.json({
        name: 'SiteGuide',
        settings: {
          greeting: 'Hi! How can I help you today?',
          position: 'bottom-center',
          theme: 'dark',
          voiceEnabled: true,
        },
      });
      return;
    }

    res.json({
      name: site.name,
      domain: site.domain,
      settings: site.settings,
    });
  } catch (error) {
    console.error('[Config] Error:', error);
    // Return default config on error
    res.json({
      name: 'SiteGuide',
      settings: {
        greeting: 'Hi! How can I help you today?',
        position: 'bottom-center',
        theme: 'dark',
        voiceEnabled: true,
      },
    });
  }
});
