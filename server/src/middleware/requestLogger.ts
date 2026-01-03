/**
 * Request Logger Middleware
 *
 * Logs incoming requests for debugging and monitoring.
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Simple request logger
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  // Log when response finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    const siteId = req.body?.siteId || req.params?.siteId || '-';

    // Format: [METHOD] /path - STATUS (duration ms) [siteId]
    console.log(
      `[${req.method}] ${req.path} - ${res.statusCode} (${duration}ms) [${siteId.substring(0, 8)}]`
    );
  });

  next();
}
