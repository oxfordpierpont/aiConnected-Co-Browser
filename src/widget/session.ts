/**
 * Session Management
 *
 * Handles local session storage and cross-device session recovery.
 */

const STORAGE_KEY = 'siteguide_session';
const SESSION_DATA_KEY = 'siteguide_session_data';

export interface LocalSessionData {
  sessionId: string;
  email?: string;
  createdAt: number;
  lastActive: number;
  messagesCount: number;
}

/**
 * Get or create a session ID
 */
export function getOrCreateSessionId(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      // Update last active time
      updateSessionActivity();
      return stored;
    }

    // Create new session
    const sessionId = generateSessionId();
    localStorage.setItem(STORAGE_KEY, sessionId);

    // Initialize session data
    const sessionData: LocalSessionData = {
      sessionId,
      createdAt: Date.now(),
      lastActive: Date.now(),
      messagesCount: 0,
    };
    localStorage.setItem(SESSION_DATA_KEY, JSON.stringify(sessionData));

    return sessionId;
  } catch (e) {
    // localStorage might be disabled
    console.warn('[SiteGuide] localStorage not available, using memory session');
    return generateSessionId();
  }
}

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  // Use crypto.randomUUID if available, otherwise fallback
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Update session activity timestamp
 */
export function updateSessionActivity(): void {
  try {
    const dataStr = localStorage.getItem(SESSION_DATA_KEY);
    if (dataStr) {
      const data: LocalSessionData = JSON.parse(dataStr);
      data.lastActive = Date.now();
      localStorage.setItem(SESSION_DATA_KEY, JSON.stringify(data));
    }
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Increment message count
 */
export function incrementMessageCount(): void {
  try {
    const dataStr = localStorage.getItem(SESSION_DATA_KEY);
    if (dataStr) {
      const data: LocalSessionData = JSON.parse(dataStr);
      data.messagesCount++;
      data.lastActive = Date.now();
      localStorage.setItem(SESSION_DATA_KEY, JSON.stringify(data));
    }
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Get local session data
 */
export function getLocalSessionData(): LocalSessionData | null {
  try {
    const dataStr = localStorage.getItem(SESSION_DATA_KEY);
    if (dataStr) {
      return JSON.parse(dataStr);
    }
  } catch (e) {
    // Ignore errors
  }
  return null;
}

/**
 * Store email in session
 */
export function setSessionEmail(email: string): void {
  try {
    const dataStr = localStorage.getItem(SESSION_DATA_KEY);
    if (dataStr) {
      const data: LocalSessionData = JSON.parse(dataStr);
      data.email = email;
      localStorage.setItem(SESSION_DATA_KEY, JSON.stringify(data));
    }
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Clear session (for testing or logout)
 */
export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SESSION_DATA_KEY);
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Check if this is a returning user
 */
export function isReturningUser(): boolean {
  try {
    const dataStr = localStorage.getItem(SESSION_DATA_KEY);
    if (dataStr) {
      const data: LocalSessionData = JSON.parse(dataStr);
      // Consider returning if they've sent at least one message
      return data.messagesCount > 0;
    }
  } catch (e) {
    // Ignore errors
  }
  return false;
}

/**
 * Get time since last visit in a human-readable format
 */
export function getTimeSinceLastVisit(): string | null {
  try {
    const dataStr = localStorage.getItem(SESSION_DATA_KEY);
    if (dataStr) {
      const data: LocalSessionData = JSON.parse(dataStr);
      const diff = Date.now() - data.lastActive;

      // Less than 1 hour - not a significant return
      if (diff < 3600000) return null;

      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        return days === 1 ? '1 day' : `${days} days`;
      }
      return hours === 1 ? '1 hour' : `${hours} hours`;
    }
  } catch (e) {
    // Ignore errors
  }
  return null;
}
