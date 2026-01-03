/**
 * SiteGuide Widget Entry Point
 *
 * This file is the entry point for the production widget bundle.
 * It self-initializes when loaded and creates an isolated container
 * using Shadow DOM to prevent CSS conflicts with host sites.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { SiteGuideWidget } from './SiteGuideWidget';
import { getConfig } from './config';
import { styles } from './styles';

// Self-executing initialization
(function initSiteGuide() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Get configuration from script tag
    const config = getConfig();

    if (!config.siteId) {
      console.error('[SiteGuide] Missing data-site-id attribute on script tag');
      return;
    }

    // Create isolated container
    const container = document.createElement('div');
    container.id = 'siteguide-root';
    container.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2147483647;
      pointer-events: none;
    `;

    // Use Shadow DOM for style isolation
    const shadow = container.attachShadow({ mode: 'open' });

    // Inject styles into shadow DOM
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    shadow.appendChild(styleSheet);

    // Create React mount point inside shadow DOM
    const mountPoint = document.createElement('div');
    mountPoint.id = 'siteguide-mount';
    mountPoint.style.pointerEvents = 'auto';
    shadow.appendChild(mountPoint);

    // Append to body
    document.body.appendChild(container);

    // Mount React app
    const root = ReactDOM.createRoot(mountPoint);
    root.render(
      <React.StrictMode>
        <SiteGuideWidget config={config} />
      </React.StrictMode>
    );

    // Expose global API for debugging
    (window as any).SiteGuide = {
      version: '1.0.0',
      config,
      destroy: () => {
        root.unmount();
        container.remove();
      },
    };

    console.log('[SiteGuide] Initialized with site ID:', config.siteId);
  }
})();
