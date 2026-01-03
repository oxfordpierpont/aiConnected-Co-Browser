/**
 * WebSocket Client
 *
 * Handles real-time communication with the backend for
 * receiving AI actions (scroll, highlight, etc.) in real-time.
 */

import { AIAction } from './api';
import { scrollToElement, clickElement, highlightElement, findElementByText } from './pageContext';

export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface WebSocketMessage {
  type: 'action' | 'response' | 'error' | 'heartbeat';
  payload?: {
    text?: string;
    audioData?: string;
    actions?: AIAction[];
  };
}

export type ActionHandler = (action: AIAction) => void;
export type StatusHandler = (status: WebSocketStatus) => void;

export class SiteGuideSocket {
  private ws: WebSocket | null = null;
  private wsUrl: string;
  private siteId: string;
  private sessionId: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;
  private actionHandlers: ActionHandler[] = [];
  private statusHandlers: StatusHandler[] = [];
  private status: WebSocketStatus = 'disconnected';

  constructor(wsUrl: string, siteId: string, sessionId: string) {
    this.wsUrl = wsUrl;
    this.siteId = siteId;
    this.sessionId = sessionId;
  }

  /**
   * Connect to the WebSocket server
   */
  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    this.setStatus('connecting');

    const url = `${this.wsUrl}?siteId=${encodeURIComponent(this.siteId)}&sessionId=${encodeURIComponent(this.sessionId)}`;

    try {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('[SiteGuide] WebSocket connected');
        this.reconnectAttempts = 0;
        this.setStatus('connected');
        this.startHeartbeat();
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (e) {
          console.error('[SiteGuide] Failed to parse WebSocket message:', e);
        }
      };

      this.ws.onclose = () => {
        console.log('[SiteGuide] WebSocket disconnected');
        this.setStatus('disconnected');
        this.stopHeartbeat();
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('[SiteGuide] WebSocket error:', error);
        this.setStatus('error');
      };
    } catch (e) {
      console.error('[SiteGuide] Failed to create WebSocket:', e);
      this.setStatus('error');
      this.scheduleReconnect();
    }
  }

  /**
   * Disconnect from the WebSocket server
   */
  disconnect(): void {
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.setStatus('disconnected');
  }

  /**
   * Send a message to the server
   */
  send(message: Record<string, unknown>): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  /**
   * Register an action handler
   */
  onAction(handler: ActionHandler): () => void {
    this.actionHandlers.push(handler);
    return () => {
      this.actionHandlers = this.actionHandlers.filter((h) => h !== handler);
    };
  }

  /**
   * Register a status handler
   */
  onStatus(handler: StatusHandler): () => void {
    this.statusHandlers.push(handler);
    // Immediately call with current status
    handler(this.status);
    return () => {
      this.statusHandlers = this.statusHandlers.filter((h) => h !== handler);
    };
  }

  /**
   * Handle incoming WebSocket message
   */
  private handleMessage(message: WebSocketMessage): void {
    switch (message.type) {
      case 'action':
        if (message.payload?.actions) {
          message.payload.actions.forEach((action) => {
            this.executeAction(action);
            this.actionHandlers.forEach((handler) => handler(action));
          });
        }
        break;

      case 'heartbeat':
        // Server heartbeat - respond to keep connection alive
        this.send({ type: 'heartbeat_ack' });
        break;

      case 'error':
        console.error('[SiteGuide] Server error:', message.payload);
        break;
    }
  }

  /**
   * Execute an AI action on the page
   */
  private executeAction(action: AIAction): void {
    console.log(`[SiteGuide] Executing action: ${action.type} -> "${action.target}"`);

    switch (action.type) {
      case 'scroll_to':
        scrollToElement(action.target);
        break;

      case 'highlight':
        const element = findElementByText(action.target);
        if (element) {
          highlightElement(element);
        }
        break;

      case 'click':
        clickElement(action.target);
        break;

      default:
        console.warn(`[SiteGuide] Unknown action type: ${action.type}`);
    }
  }

  /**
   * Start heartbeat to keep connection alive
   */
  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send({ type: 'heartbeat' });
      }
    }, 30000); // Every 30 seconds
  }

  /**
   * Stop heartbeat
   */
  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  /**
   * Schedule a reconnection attempt
   */
  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('[SiteGuide] Max reconnection attempts reached');
      return;
    }

    // Exponential backoff: 1s, 2s, 4s, 8s, 16s
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectAttempts++;

    console.log(`[SiteGuide] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

    setTimeout(() => {
      if (this.status !== 'connected') {
        this.connect();
      }
    }, delay);
  }

  /**
   * Update and broadcast status
   */
  private setStatus(status: WebSocketStatus): void {
    this.status = status;
    this.statusHandlers.forEach((handler) => handler(status));
  }

  /**
   * Get current connection status
   */
  getStatus(): WebSocketStatus {
    return this.status;
  }
}
