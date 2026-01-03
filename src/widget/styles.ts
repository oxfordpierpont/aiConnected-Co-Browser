/**
 * Widget Styles
 *
 * All styles are inlined to work within Shadow DOM isolation.
 * These styles won't affect the host site and the host site's
 * styles won't affect the widget.
 */

export const styles = `
  /* Reset and base styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(10px); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Container */
  .siteguide-container {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 512px;
    padding: 0 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #fff;
  }

  .siteguide-container.position-bottom-right {
    left: auto;
    right: 32px;
    transform: none;
  }

  .siteguide-container.position-bottom-left {
    left: 32px;
    transform: none;
  }

  /* Response bubble */
  .siteguide-bubble {
    position: relative;
    width: 100%;
    max-width: 400px;
    margin-bottom: 16px;
    animation: fadeIn 0.3s ease-out;
  }

  .siteguide-bubble.hidden {
    animation: fadeOut 0.3s ease-out forwards;
    pointer-events: none;
  }

  .siteguide-bubble-content {
    position: relative;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    max-height: 30vh;
    overflow-y: auto;
  }

  .siteguide-bubble-close {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .siteguide-bubble:hover .siteguide-bubble-close {
    opacity: 1;
  }

  .siteguide-bubble-close:hover {
    color: #fff;
  }

  .siteguide-bubble-text {
    font-size: 14px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    white-space: pre-wrap;
  }

  /* Thinking indicator */
  .siteguide-thinking {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .siteguide-thinking-text {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
  }

  .siteguide-thinking-dots {
    display: flex;
    gap: 4px;
  }

  .siteguide-thinking-dot {
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: bounce 0.6s ease-in-out infinite;
  }

  .siteguide-thinking-dot:nth-child(2) {
    animation-delay: 0.1s;
  }

  .siteguide-thinking-dot:nth-child(3) {
    animation-delay: 0.2s;
  }

  /* Audio visualizer */
  .siteguide-audio {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 8px 0;
  }

  .siteguide-audio-bars {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 32px;
  }

  .siteguide-audio-bar {
    width: 6px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 3px;
    transition: height 0.1s;
  }

  .siteguide-audio-bar.playing {
    animation: pulse 0.4s ease-in-out infinite;
  }

  .siteguide-audio-controls {
    display: flex;
    gap: 12px;
  }

  .siteguide-audio-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
  }

  .siteguide-audio-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  /* Text response with TTS button */
  .siteguide-response {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .siteguide-response-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .siteguide-tts-btn {
    padding: 6px;
    border-radius: 50%;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.2s;
  }

  .siteguide-tts-btn:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  /* Input area */
  .siteguide-input-container {
    width: 100%;
    max-width: 384px;
  }

  .siteguide-input-form {
    display: flex;
    align-items: center;
    padding: 6px;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    transition: all 0.2s;
  }

  .siteguide-input-form:hover {
    background: rgba(20, 20, 20, 0.85);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .siteguide-input-form:focus-within {
    background: rgba(20, 20, 20, 0.9);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  .siteguide-input-icon {
    padding: 0 8px 0 12px;
    color: rgba(255, 255, 255, 0.5);
  }

  .siteguide-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-size: 14px;
    padding: 8px 0;
  }

  .siteguide-input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .siteguide-input-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .siteguide-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }

  .siteguide-btn-mic {
    background: transparent;
    color: rgba(255, 255, 255, 0.4);
  }

  .siteguide-btn-mic:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  .siteguide-btn-mic.listening {
    background: rgba(239, 68, 68, 0.8);
    color: #fff;
    animation: pulse 1s ease-in-out infinite;
  }

  .siteguide-btn-send {
    background: transparent;
    color: rgba(255, 255, 255, 0.2);
  }

  .siteguide-btn-send.active {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  .siteguide-btn-send.active:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  /* Loading spinner */
  .siteguide-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Highlight effect (applied to host page elements) */
  .siteguide-highlight {
    transition: all 0.5s ease !important;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.4) !important;
    position: relative !important;
    z-index: 100 !important;
  }

  /* Scrollbar styling */
  .siteguide-bubble-content::-webkit-scrollbar {
    width: 6px;
  }

  .siteguide-bubble-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .siteguide-bubble-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  .siteguide-bubble-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .siteguide-container {
      bottom: 16px;
      padding: 0 12px;
    }

    .siteguide-container.position-bottom-right,
    .siteguide-container.position-bottom-left {
      left: 0;
      right: 0;
      transform: none;
    }

    .siteguide-bubble-content {
      padding: 16px;
    }

    .siteguide-input-container {
      max-width: 100%;
    }
  }
`;
