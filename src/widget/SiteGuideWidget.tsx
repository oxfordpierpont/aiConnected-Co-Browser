/**
 * SiteGuide Widget Component
 *
 * Main React component for the production widget.
 * Handles chat interface, voice input/output, and AI interactions.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SiteGuideConfig } from './config';
import { SiteGuideAPI, ChatResponse, AIAction } from './api';
import { SiteGuideSocket, WebSocketStatus } from './websocket';
import {
  getOrCreateSessionId,
  incrementMessageCount,
  isReturningUser,
  getTimeSinceLastVisit,
} from './session';
import { scrollToElement, clickElement } from './pageContext';

// Icons as inline SVG
const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const MicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const MicOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

const SpeakerIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
  mode: 'text' | 'audio';
  audioData?: string;
}

interface SiteGuideWidgetProps {
  config: SiteGuideConfig;
}

export const SiteGuideWidget: React.FC<SiteGuideWidgetProps> = ({ config }) => {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isMicSupported, setIsMicSupported] = useState(true);
  const [wsStatus, setWsStatus] = useState<WebSocketStatus>('disconnected');

  // Refs
  const apiRef = useRef<SiteGuideAPI | null>(null);
  const socketRef = useRef<SiteGuideSocket | null>(null);
  const sessionIdRef = useRef<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Configuration
  const IDLE_TIMEOUT_MS = 8000;

  // Initialize API and session
  useEffect(() => {
    // Create API client
    apiRef.current = new SiteGuideAPI(config);

    // Get or create session
    sessionIdRef.current = getOrCreateSessionId();

    // Initialize WebSocket
    socketRef.current = new SiteGuideSocket(config.wsUrl, config.siteId, sessionIdRef.current);

    // Listen for WebSocket actions
    const unsubAction = socketRef.current.onAction((action: AIAction) => {
      executeAction(action);
    });

    // Listen for WebSocket status
    const unsubStatus = socketRef.current.onStatus((status) => {
      setWsStatus(status);
    });

    // Connect WebSocket
    socketRef.current.connect();

    // Log page visit
    apiRef.current.logPageVisit(sessionIdRef.current, window.location.href);

    // Check for returning user
    if (isReturningUser()) {
      const timeSince = getTimeSinceLastVisit();
      if (timeSince) {
        // Show welcome back message
        setTimeout(() => {
          setMessages([
            {
              id: 'welcome-back',
              role: 'assistant',
              text: `Welcome back! It's been ${timeSince} since your last visit. How can I help you today?`,
              timestamp: Date.now(),
              mode: 'text',
            },
          ]);
          setIsBubbleVisible(true);
          resetIdleTimer();
        }, 1000);
      }
    }

    // Check microphone support
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      setIsMicSupported(false);
    }

    return () => {
      unsubAction();
      unsubStatus();
      socketRef.current?.disconnect();
      stopAudio();
    };
  }, [config]);

  // Execute AI action
  const executeAction = useCallback((action: AIAction) => {
    switch (action.type) {
      case 'scroll_to':
        scrollToElement(action.target);
        break;
      case 'click':
        clickElement(action.target);
        break;
      case 'highlight':
        scrollToElement(action.target);
        break;
    }
  }, []);

  // Reset idle timer
  const resetIdleTimer = useCallback(() => {
    setIsBubbleVisible(true);

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = setTimeout(() => {
      setIsBubbleVisible(false);
      stopAudio();
    }, IDLE_TIMEOUT_MS);
  }, []);

  // Audio playback
  const stopAudio = useCallback(() => {
    if (audioSourceRef.current) {
      try {
        audioSourceRef.current.stop();
      } catch (e) {
        // Ignore if already stopped
      }
      audioSourceRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const playAudio = useCallback(
    async (base64Data: string) => {
      try {
        stopAudio();

        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext ||
            (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }

        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        // Decode base64
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Convert to audio buffer
        const dataInt16 = new Int16Array(bytes.buffer);
        const frameCount = dataInt16.length;
        const buffer = audioContextRef.current.createBuffer(1, frameCount, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < frameCount; i++) {
          channelData[i] = dataInt16[i] / 32768.0;
        }

        // Play
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        source.onended = () => setIsPlaying(false);
        source.start(0);

        audioSourceRef.current = source;
        setIsPlaying(true);
      } catch (e) {
        console.error('[SiteGuide] Failed to play audio:', e);
        setIsPlaying(false);
      }
    },
    [stopAudio]
  );

  // Send message
  const handleSendMessage = useCallback(
    async (e?: React.FormEvent, overrideText?: string, overrideMode?: 'text' | 'audio') => {
      e?.preventDefault();

      const textToSend = overrideText || inputValue.trim();
      if (!textToSend || !apiRef.current) return;

      setInputValue('');
      resetIdleTimer();
      stopAudio();

      const mode = overrideMode || 'text';

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        text: textToSend,
        timestamp: Date.now(),
        mode,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsSending(true);
      setIsBubbleVisible(true);
      incrementMessageCount();

      try {
        const response: ChatResponse = await apiRef.current.sendMessage(
          sessionIdRef.current,
          textToSend,
          mode
        );

        // Add assistant message
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: response.text,
          timestamp: Date.now(),
          mode,
          audioData: response.audioData,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        resetIdleTimer();

        // Execute any actions from the response
        if (response.actions) {
          response.actions.forEach((action) => {
            executeAction(action);
          });
        }

        // Auto-play audio if in audio mode
        if (mode === 'audio' && response.audioData) {
          playAudio(response.audioData);
        }
      } catch (error) {
        console.error('[SiteGuide] Error sending message:', error);

        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: "Sorry, I'm having trouble connecting right now. Please try again.",
          timestamp: Date.now(),
          mode: 'text',
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsSending(false);
      }
    },
    [inputValue, resetIdleTimer, stopAudio, executeAction, playAudio]
  );

  // Voice input
  const toggleVoiceInput = useCallback(() => {
    if (!isMicSupported) return;

    // Resume audio context on user interaction
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000,
      });
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore
      }
      setIsListening(false);
      return;
    }

    stopAudio();

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let sessionTranscript = '';
    let hasSentMessage = false;

    recognition.onstart = () => {
      setIsListening(true);
      setInputValue('');
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalSegment = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalSegment += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalSegment) {
        sessionTranscript += finalSegment;
      }

      setInputValue(sessionTranscript + interimTranscript);

      if (finalSegment && !hasSentMessage) {
        hasSentMessage = true;
        handleSendMessage(undefined, sessionTranscript + interimTranscript, 'audio');
        try {
          recognition.stop();
        } catch (e) {
          // Ignore
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error('[SiteGuide] Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;

      const fullText = sessionTranscript.trim();
      if (!hasSentMessage && fullText) {
        handleSendMessage(undefined, fullText, 'audio');
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (e) {
      console.error('[SiteGuide] Failed to start recognition:', e);
      setIsListening(false);
    }
  }, [isListening, isMicSupported, stopAudio, handleSendMessage]);

  // Text-to-speech for text messages
  const handleTextToSpeech = useCallback(
    async (text: string) => {
      if (!apiRef.current) return;

      // Resume audio context
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 24000,
        });
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      setIsLoadingAudio(true);
      resetIdleTimer();

      const audioData = await apiRef.current.generateSpeech(text);

      setIsLoadingAudio(false);

      if (audioData) {
        playAudio(audioData);
      }
    },
    [playAudio, resetIdleTimer]
  );

  // Get last message
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  const shouldShowBubble = isBubbleVisible && (isSending || lastMessage);

  // Position class
  const positionClass = `position-${config.position}`;

  return (
    <div className={`siteguide-container ${positionClass}`}>
      {/* Response Bubble */}
      <div className={`siteguide-bubble ${shouldShowBubble ? '' : 'hidden'}`}>
        <button
          className="siteguide-bubble-close"
          onClick={() => {
            setIsBubbleVisible(false);
            stopAudio();
          }}
        >
          <CloseIcon />
        </button>

        <div className="siteguide-bubble-content">
          {isSending ? (
            // Thinking state
            lastMessage?.mode === 'audio' ? (
              <div className="siteguide-audio">
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                  Processing Audio
                </span>
                <div className="siteguide-audio-bars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="siteguide-audio-bar playing"
                      style={{ height: '16px', animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="siteguide-thinking">
                <span className="siteguide-thinking-text">Thinking</span>
                <div className="siteguide-thinking-dots">
                  <div className="siteguide-thinking-dot" />
                  <div className="siteguide-thinking-dot" />
                  <div className="siteguide-thinking-dot" />
                </div>
              </div>
            )
          ) : (
            <>
              {/* Audio mode visualization */}
              {lastMessage?.mode === 'audio' && (
                <div className="siteguide-audio">
                  <div className="siteguide-audio-bars">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`siteguide-audio-bar ${isPlaying ? 'playing' : ''}`}
                        style={{
                          height: isPlaying ? `${Math.random() * 20 + 12}px` : '4px',
                          opacity: isPlaying ? 1 : 0.3,
                        }}
                      />
                    ))}
                  </div>
                  <div className="siteguide-audio-controls">
                    {isPlaying ? (
                      <button className="siteguide-audio-btn" onClick={stopAudio}>
                        <PauseIcon />
                      </button>
                    ) : (
                      <button
                        className="siteguide-audio-btn"
                        onClick={() => lastMessage?.audioData && playAudio(lastMessage.audioData)}
                      >
                        <PlayIcon />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Text mode display */}
              {lastMessage?.mode === 'text' && (
                <div className="siteguide-response">
                  <div className="siteguide-bubble-text">{lastMessage?.text}</div>
                  <div className="siteguide-response-footer">
                    <button
                      className="siteguide-tts-btn"
                      onClick={() => {
                        if (isPlaying) {
                          stopAudio();
                        } else if (lastMessage) {
                          handleTextToSpeech(lastMessage.text);
                        }
                      }}
                      disabled={isLoadingAudio}
                      title="Read aloud"
                    >
                      {isLoadingAudio ? (
                        <div className="siteguide-spinner" />
                      ) : isPlaying ? (
                        <PauseIcon />
                      ) : (
                        <SpeakerIcon />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="siteguide-input-container">
        <form className="siteguide-input-form" onSubmit={handleSendMessage}>
          <div className="siteguide-input-icon">
            <SparkleIcon />
          </div>

          <input
            ref={inputRef}
            type="text"
            className="siteguide-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => {
              setIsBubbleVisible(true);
              resetIdleTimer();
            }}
            placeholder={isListening ? 'Listening...' : 'Ask AI...'}
          />

          <div className="siteguide-input-actions">
            {isMicSupported && config.voiceEnabled && (
              <button
                type="button"
                className={`siteguide-btn siteguide-btn-mic ${isListening ? 'listening' : ''}`}
                onClick={toggleVoiceInput}
              >
                {isListening ? <MicOffIcon /> : <MicIcon />}
              </button>
            )}

            <button
              type="submit"
              className={`siteguide-btn siteguide-btn-send ${inputValue.trim() ? 'active' : ''}`}
              disabled={!inputValue.trim() || isSending}
            >
              <SendIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
