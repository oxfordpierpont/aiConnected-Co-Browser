/**
 * SiteGuide Backend Server
 *
 * Express + WebSocket server that handles:
 * - AI chat requests (proxied to Gemini/OpenAI)
 * - Session management via Supabase
 * - Real-time actions via WebSocket
 * - Lead capture
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { URL } from 'url';

import { chatRouter } from './routes/chat.js';
import { sessionRouter } from './routes/session.js';
import { leadsRouter } from './routes/leads.js';
import { configRouter } from './routes/config.js';
import { ttsRouter } from './routes/tts.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import { WSServerMessage } from './types/index.js';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

// Store active WebSocket connections: Map<"siteId:sessionId", WebSocket>
const clients = new Map<string, WebSocket>();

// Export for use in routes (to send real-time actions)
export function sendActionToClient(siteId: string, sessionId: string, message: WSServerMessage): boolean {
  const key = `${siteId}:${sessionId}`;
  const client = clients.get(key);

  if (client?.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(message));
    return true;
  }
  return false;
}

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(cors({
  origin: true, // Allow all origins (widget can be on any site)
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    wsClients: clients.size,
  });
});

// API routes
app.use('/api/chat', chatRouter);
app.use('/api/session', sessionRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/config', configRouter);
app.use('/api/tts', ttsRouter);

// Error handling
app.use(errorHandler);

// WebSocket handling
wss.on('connection', (ws, req) => {
  // Parse query parameters
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const siteId = url.searchParams.get('siteId');
  const sessionId = url.searchParams.get('sessionId');

  if (!siteId || !sessionId) {
    ws.close(4000, 'Missing siteId or sessionId');
    return;
  }

  const key = `${siteId}:${sessionId}`;
  console.log(`[WS] Client connected: ${key}`);

  // Store connection
  clients.set(key, ws);

  // Handle messages from client
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());

      switch (message.type) {
        case 'heartbeat':
          ws.send(JSON.stringify({ type: 'heartbeat' }));
          break;

        case 'heartbeat_ack':
          // Client acknowledged our heartbeat
          break;

        case 'page_context':
          // Client sent updated page context - could store for analysis
          console.log(`[WS] Page context update from ${key}:`, message.payload?.url);
          break;

        default:
          console.log(`[WS] Unknown message type: ${message.type}`);
      }
    } catch (e) {
      console.error('[WS] Failed to parse message:', e);
    }
  });

  // Handle disconnection
  ws.on('close', () => {
    console.log(`[WS] Client disconnected: ${key}`);
    clients.delete(key);
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error(`[WS] Error for ${key}:`, error);
    clients.delete(key);
  });

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'response',
    payload: { text: 'Connected to SiteGuide' },
  }));
});

// Heartbeat interval to keep connections alive
setInterval(() => {
  clients.forEach((ws, key) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'heartbeat' }));
    } else {
      clients.delete(key);
    }
  });
}, 30000);

// Start server
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`[Server] SiteGuide API running on port ${PORT}`);
  console.log(`[Server] WebSocket server ready at ws://localhost:${PORT}/ws`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM received, shutting down...');

  // Close all WebSocket connections
  clients.forEach((ws) => {
    ws.close(1001, 'Server shutting down');
  });

  server.close(() => {
    console.log('[Server] HTTP server closed');
    process.exit(0);
  });
});
