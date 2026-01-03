/**
 * Widget Configuration
 *
 * Reads configuration from the script tag's data attributes
 * and environment variables.
 */

export interface SiteGuideConfig {
  siteId: string;
  apiBaseUrl: string;
  wsUrl: string;
  position: 'bottom-right' | 'bottom-left' | 'bottom-center';
  theme: 'dark' | 'light' | 'auto';
  greeting?: string;
  voiceEnabled: boolean;
}

export function getConfig(): SiteGuideConfig {
  // Find our script tag
  const scripts = document.querySelectorAll('script[data-site-id]');
  const scriptTag = Array.from(scripts).find(
    (s) => s.getAttribute('src')?.includes('siteguide')
  ) as HTMLScriptElement | undefined;

  // Read data attributes
  const siteId = scriptTag?.getAttribute('data-site-id') || '';
  const position = (scriptTag?.getAttribute('data-position') || 'bottom-center') as SiteGuideConfig['position'];
  const theme = (scriptTag?.getAttribute('data-theme') || 'dark') as SiteGuideConfig['theme'];
  const greeting = scriptTag?.getAttribute('data-greeting') || undefined;
  const voiceEnabled = scriptTag?.getAttribute('data-voice') !== 'false';

  return {
    siteId,
    apiBaseUrl: process.env.API_BASE_URL || 'https://api.siteguide.io',
    wsUrl: process.env.WS_URL || 'wss://api.siteguide.io/ws',
    position,
    theme,
    greeting,
    voiceEnabled,
  };
}
