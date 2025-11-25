import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Check if a root element exists (Dev/Demo mode)
let rootElement = document.getElementById('root');
let isWidgetMode = false;

// If no root element is found, create a dedicated widget container (Install Mode)
// This allows the script to be dropped into any website (e.g. WordPress) and work immediately.
if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = 'liquid-ai-widget-container';
  // Ensure the container sits above other content but doesn't block clicks by default
  rootElement.style.position = 'absolute';
  rootElement.style.top = '0';
  rootElement.style.left = '0';
  rootElement.style.width = '100%';
  rootElement.style.height = '0'; // Let children determine height
  rootElement.style.overflow = 'visible';
  rootElement.style.zIndex = '99999';
  document.body.appendChild(rootElement);
  isWidgetMode = true;
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App isWidget={isWidgetMode} />
  </React.StrictMode>
);