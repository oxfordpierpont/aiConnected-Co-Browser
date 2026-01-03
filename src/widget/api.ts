/**
 * SiteGuide API Client
 *
 * Handles all communication with the backend API server.
 * Replaces direct Gemini API calls with proxied requests.
 */

import { SiteGuideConfig } from './config';
import { getPageContext } from './pageContext';

export interface ChatRequest {
  siteId: string;
  sessionId: string;
  message: string;
  pageContext: PageContext;
  mode: 'text' | 'audio';
}

export interface ChatResponse {
  text: string;
  audioData?: string;
  actions?: AIAction[];
}

export interface AIAction {
  type: 'scroll_to' | 'highlight' | 'click';
  target: string;
}

export interface PageContext {
  url: string;
  title: string;
  headings: string[];
  interactables: string[];
  contentSummary: string;
}

export interface Session {
  id: string;
  siteId: string;
  email?: string;
  memory: Record<string, unknown>;
  pagesVisited: string[];
  createdAt: string;
  lastActive: string;
}

export interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  intent?: string;
  sourcePage: string;
}

export class SiteGuideAPI {
  private baseUrl: string;
  private siteId: string;

  constructor(config: SiteGuideConfig) {
    this.baseUrl = config.apiBaseUrl;
    this.siteId = config.siteId;
  }

  /**
   * Send a chat message to the AI
   */
  async sendMessage(
    sessionId: string,
    message: string,
    mode: 'text' | 'audio' = 'text'
  ): Promise<ChatResponse> {
    const pageContext = getPageContext();

    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteId: this.siteId,
        sessionId,
        message,
        pageContext,
        mode,
      } as ChatRequest),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `API error: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Get or create a session
   */
  async getSession(sessionId: string): Promise<Session> {
    const response = await fetch(`${this.baseUrl}/api/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteId: this.siteId,
        sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get session: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Resume a session by email (cross-device)
   */
  async resumeByEmail(email: string): Promise<Session | null> {
    const response = await fetch(`${this.baseUrl}/api/session/resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteId: this.siteId,
        email,
      }),
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to resume session: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Link an email to the current session
   */
  async linkEmail(sessionId: string, email: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/session/link-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteId: this.siteId,
        sessionId,
        email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to link email: ${response.status}`);
    }
  }

  /**
   * Capture lead data
   */
  async captureLead(sessionId: string, leadData: LeadData): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteId: this.siteId,
        sessionId,
        ...leadData,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to capture lead: ${response.status}`);
    }
  }

  /**
   * Get site-specific configuration
   */
  async getSiteConfig(): Promise<Record<string, unknown>> {
    const response = await fetch(`${this.baseUrl}/api/config/${this.siteId}`);

    if (!response.ok) {
      throw new Error(`Failed to get site config: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Generate text-to-speech audio
   */
  async generateSpeech(text: string): Promise<string | null> {
    const response = await fetch(`${this.baseUrl}/api/tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteId: this.siteId,
        text,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.audioData || null;
  }

  /**
   * Log a page visit
   */
  async logPageVisit(sessionId: string, pageUrl: string): Promise<void> {
    // Fire and forget - don't block on this
    fetch(`${this.baseUrl}/api/session/page-visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteId: this.siteId,
        sessionId,
        pageUrl,
      }),
    }).catch(() => {
      // Silently ignore errors for analytics
    });
  }
}
