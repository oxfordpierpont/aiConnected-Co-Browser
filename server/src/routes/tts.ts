/**
 * TTS Routes
 *
 * Handles text-to-speech generation.
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { generateSpeech } from '../services/ai.service.js';
import { chatRateLimiter } from '../middleware/rateLimit.js';

export const ttsRouter = Router();

// TTS request schema
const ttsSchema = z.object({
  siteId: z.string().uuid(),
  text: z.string().min(1).max(1000),
});

// POST /api/tts - Generate speech from text
ttsRouter.post('/', chatRateLimiter, async (req: Request, res: Response) => {
  try {
    const parseResult = ttsSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        error: 'Invalid request',
        details: parseResult.error.errors,
      });
      return;
    }

    const { text } = parseResult.data;

    const audioData = await generateSpeech(text);

    if (!audioData) {
      res.status(500).json({
        error: 'Failed to generate speech',
      });
      return;
    }

    res.json({ audioData });
  } catch (error) {
    console.error('[TTS] Error:', error);
    res.status(500).json({
      error: 'Failed to generate speech',
    });
  }
});
