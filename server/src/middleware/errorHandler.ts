/**
 * Error Handler Middleware
 *
 * Centralized error handling for the API.
 */

import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
}

/**
 * Global error handler middleware
 */
export function errorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[Error]', err.message);

  // Don't expose internal errors in production
  const isProduction = process.env.NODE_ENV === 'production';

  const statusCode = err.statusCode || 500;
  const message = isProduction && statusCode === 500
    ? 'An internal error occurred'
    : err.message;

  res.status(statusCode).json({
    error: message,
    ...(err.code && { code: err.code }),
    ...(!isProduction && { stack: err.stack }),
  });
}

/**
 * Create an API error with status code
 */
export function createError(message: string, statusCode: number, code?: string): ApiError {
  const error: ApiError = new Error(message);
  error.statusCode = statusCode;
  if (code) {
    error.code = code;
  }
  return error;
}
