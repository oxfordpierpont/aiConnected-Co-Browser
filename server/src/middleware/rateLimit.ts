/**
 * Rate Limiting Middleware
 *
 * Prevents abuse and ensures fair usage across sites.
 */

import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for chat endpoints
 * 100 requests per minute per IP + siteId combination
 */
export const chatRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per window
  keyGenerator: (req) => {
    // Use combination of IP and siteId for rate limiting
    const siteId = req.body?.siteId || 'unknown';
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    return `${ip}:${siteId}`;
  },
  message: {
    error: 'Too many requests, please slow down.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for session endpoints
 * 200 requests per minute per IP
 */
export const sessionRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  keyGenerator: (req) => {
    return req.ip || req.socket.remoteAddress || 'unknown';
  },
  message: {
    error: 'Too many requests, please slow down.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Strict rate limiter for sensitive operations
 * 10 requests per minute per IP
 */
export const strictRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  keyGenerator: (req) => {
    return req.ip || req.socket.remoteAddress || 'unknown';
  },
  message: {
    error: 'Rate limit exceeded. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
