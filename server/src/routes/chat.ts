/**
 * Chat Route
 *
 * Handles AI chat messages, proxying to LLM and returning responses with actions.
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { sendMessage } from '../services/ai.service.js';
import { getOrCreateSession, logInteraction, addPageVisit } from '../services/supabase.service.js';
import { validateSiteMiddleware } from '../middleware/auth.js';
import { chatRateLimiter } from '../middleware/rateLimit.js';
import { sendActionToClient } from '../index.js';
import { ChatRequest, ChatResponse } from '../types/index.js';

export const chatRouter = Router();

// Request validation schema
const chatRequestSchema = z.object({
  siteId: z.string().uuid(),
  sessionId: z.string().uuid(),
  message: z.string().min(1).max(2000),
  pageContext: z.object({
    url: z.string(),
    title: z.string(),
    headings: z.array(z.string()),
    interactables: z.array(z.string()),
    contentSummary: z.string(),
  }),
  mode: z.enum(['text', 'audio']).default('text'),
});

// POST /api/chat
chatRouter.post(
  '/',
  chatRateLimiter,
  validateSiteMiddleware,
  async (req: Request, res: Response) => {
    try {
      // Validate request
      const parseResult = chatRequestSchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(400).json({
          error: 'Invalid request',
          details: parseResult.error.errors,
        });
        return;
      }

      const { siteId, sessionId, message, pageContext, mode } = parseResult.data as ChatRequest;

      console.log(`[Chat] Message from ${siteId}:${sessionId}: "${message.substring(0, 50)}..."`);

      // Ensure session exists
      await getOrCreateSession(siteId, sessionId);

      // Log user message
      logInteraction(sessionId, 'user', message).catch(console.error);

      // Log page visit
      addPageVisit(sessionId, pageContext.url).catch(console.error);

      // Send to AI
      const response: ChatResponse = await sendMessage(siteId, sessionId, message, pageContext);

      // Log assistant response
      logInteraction(sessionId, 'assistant', response.text, response.actions).catch(console.error);

      // Send actions via WebSocket for real-time execution
      if (response.actions && response.actions.length > 0) {
        sendActionToClient(siteId, sessionId, {
          type: 'action',
          payload: { actions: response.actions },
        });
      }

      // Generate audio if in audio mode
      if (mode === 'audio') {
        const { generateSpeech } = await import('../services/ai.service.js');
        const audioData = await generateSpeech(response.text);
        if (audioData) {
          response.audioData = audioData;
        }
      }

      res.json(response);
    } catch (error) {
      console.error('[Chat] Error:', error);
      res.status(500).json({
        text: "Sorry, I'm having trouble processing your request right now.",
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);
