import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sendMessageToGemini, generateSpeechFromText } from '../services/geminiService';
import { Message } from '../types';

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Helper: Base64 decode
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper: Decode Audio Data
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const FloatingChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [areBubblesVisible, setAreBubblesVisible] = useState(false);
  
  // Audio State
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isMicSupported, setIsMicSupported] = useState(true);

  // Swipe & Drag State
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  
  // Refs
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialScrollY = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Configuration
  const IDLE_TIMEOUT_MS = 8000; 
  const SWIPE_THRESHOLD = 80; 
  const SCROLL_DISMISS_THRESHOLD = 200; 

  useEffect(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
        setIsMicSupported(false);
    }
  }, []);

  // --- Installable Interaction Engine ---
  // This effect listens for generic commands from the AI and executes them on ANY page
  useEffect(() => {
    const handleAiInteraction = (e: CustomEvent) => {
        const { action, target } = e.detail;
        console.log(`[Co-Browser] Attempting to ${action} on "${target}"`);

        // Helper to find element by text content or ID using XPath
        const findElement = (text: string): HTMLElement | null => {
            // 1. Try Exact ID
            const byId = document.getElementById(text) || document.getElementById(text.toLowerCase());
            if (byId) return byId;

            // 2. Try XPath for text content (case-insensitive approximation)
            // Note: XPath 1.0 doesn't support lower-case(), so we stick to contains() for simplicity in this demo.
            // We search headers, buttons, links, and divs.
            const xpath = `//*[self::h1 or self::h2 or self::h3 or self::a or self::button or self::span][contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${text.toLowerCase()}')]`;
            
            try {
                const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                return result.singleNodeValue as HTMLElement;
            } catch (err) {
                console.warn("[Co-Browser] XPath error", err);
                return null;
            }
        };

        const element = findElement(target);

        if (element) {
            // Visual Highlight Effect
            const originalTransition = element.style.transition;
            const originalShadow = element.style.boxShadow;
            const originalScale = element.style.transform;

            element.style.transition = 'all 0.5s ease';
            element.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.6), 0 0 15px rgba(59, 130, 246, 0.4)';
            element.style.zIndex = '100'; // Ensure visibility
            element.style.transform = 'scale(1.02)';

            if (action === 'scroll_to') {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (action === 'click') {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Slight delay to allow scroll before click
                setTimeout(() => {
                    element.click();
                    // Additional visual feedback for click
                    element.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                }, 500);
            }

            // Cleanup Highlight
            setTimeout(() => {
                element.style.transition = originalTransition;
                element.style.boxShadow = originalShadow;
                element.style.transform = originalScale;
                element.style.backgroundColor = '';
                element.style.zIndex = '';
            }, 2500);
        } else {
            console.warn(`[Co-Browser] Could not find element matching "${target}"`);
        }
    };

    window.addEventListener('ai-interaction' as any, handleAiInteraction as any);
    return () => window.removeEventListener('ai-interaction' as any, handleAiInteraction as any);
  }, []);

  // --- Audio Functions (Memoized) ---

  const stopAudio = useCallback(() => {
    if (audioSourceRef.current) {
        try {
            audioSourceRef.current.stop();
        } catch (e) { /* ignore if already stopped */ }
        audioSourceRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const playAudio = useCallback(async (base64Data: string) => {
    try {
        stopAudio(); // Stop any current playback

        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }

        if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
        }

        const bytes = decode(base64Data);
        // Note: Gemini 2.5 Flash TTS usually uses 24kHz
        const audioBuffer = await decodeAudioData(bytes, audioContextRef.current, 24000);

        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        
        source.onended = () => setIsPlaying(false);
        source.start(0);
        
        audioSourceRef.current = source;
        setIsPlaying(true);
    } catch (e) {
        console.error("Failed to play audio", e);
        setIsPlaying(false);
    }
  }, [stopAudio]);

  const resetIdleTimer = useCallback(() => {
    setAreBubblesVisible(true);
    initialScrollY.current = window.scrollY;
    
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    
    idleTimerRef.current = setTimeout(() => {
      setAreBubblesVisible(false);
      stopAudio(); // Stop audio if dismissed by idle
    }, IDLE_TIMEOUT_MS);
  }, [stopAudio]);

  const handleTextToSpeech = useCallback(async (text: string) => {
    // Resume audio context immediately on click to prevent blocking
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
    }

    setIsLoadingAudio(true);
    resetIdleTimer();
    const audioData = await generateSpeechFromText(text);
    setIsLoadingAudio(false);
    if (audioData) {
        playAudio(audioData);
    }
  }, [playAudio, resetIdleTimer]);

  // --- Messaging Logic (Memoized) ---

  const handleSendMessage = useCallback(async (e?: React.FormEvent, overrideText?: string, overrideMode?: 'text' | 'audio') => {
    e?.preventDefault();
    const textToSend = overrideText || inputValue.trim();
    
    if (!textToSend) return;
    
    // Always clear input when sending to mimic standard chat behavior
    setInputValue('');
    
    resetIdleTimer(); 
    stopAudio();

    const mode = overrideMode || 'text';

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: Date.now(),
      mode: mode 
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsSending(true);
    setAreBubblesVisible(true);

    try {
      const response = await sendMessageToGemini(textToSend, mode);
      
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: response.text,
        timestamp: Date.now(),
        mode: mode,
        audioData: response.audioData
      };
      
      setMessages(prev => [...prev, newAiMsg]);
      resetIdleTimer();

      // Auto-play if audio response
      if (mode === 'audio' && response.audioData) {
        playAudio(response.audioData);
      }
      
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  }, [inputValue, playAudio, resetIdleTimer, stopAudio]);

  // Keep a ref to the latest handleSendMessage to avoid stale closures in event listeners
  const handleSendMessageRef = useRef(handleSendMessage);
  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  }, [handleSendMessage]);


  // --- Speech Recognition (Instance per Session) ---
  
  const toggleVoiceInput = useCallback(() => {
    if (!isMicSupported) return;
    
    // Resume audio context immediately on click to ensure we can play response later
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
    }
    
    // If currently listening, stop it.
    if (isListening && recognitionRef.current) {
        try {
            recognitionRef.current.stop();
        } catch(e) { /* ignore */ }
        setIsListening(false);
        return;
    }

    stopAudio(); // Stop any audio playing

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true; 
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    let silenceTimer: ReturnType<typeof setTimeout>;
    
    // Variables to track session state inside the closure
    let sessionTranscript = '';
    let latestInterim = ''; // Track interim here to avoid stale inputValue
    let hasSentMessage = false;

    recognition.onstart = () => {
        setIsListening(true);
        setInputValue(''); 
        sessionTranscript = '';
        latestInterim = '';
        hasSentMessage = false;
    };

    recognition.onresult = (event: any) => {
        // Reset silence timer on every result
        if (silenceTimer) clearTimeout(silenceTimer);

        // Aggressive silence detection (800ms) for snappy response
        silenceTimer = setTimeout(() => {
            try { recognition.stop(); } catch(e) {}
        }, 800);

        let interimTranscript = '';
        let finalSegment = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalSegment += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        // Update the accumulated transcript
        if (finalSegment) {
            sessionTranscript += finalSegment;
        }
        
        latestInterim = interimTranscript;

        // Update UI with current view (interim or accumulated final)
        const display = sessionTranscript + interimTranscript;
        setInputValue(display);

        // If we got a final result event, send it immediately
        if (finalSegment) {
            if (!hasSentMessage) {
                 hasSentMessage = true;
                 if (silenceTimer) clearTimeout(silenceTimer);
                 handleSendMessageRef.current(undefined, display, 'audio');
                 try { recognition.stop(); } catch(e) {}
            }
        }
    };

    recognition.onerror = (event: any) => {
        if (silenceTimer) clearTimeout(silenceTimer);
        console.error("Speech Recognition Error:", event.error);
        if (event.error !== 'no-speech') {
             // Keep UI logic simple
        }
        setIsListening(false);
        recognitionRef.current = null;
    };

    recognition.onend = () => {
        if (silenceTimer) clearTimeout(silenceTimer);
        setIsListening(false);
        recognitionRef.current = null;

        const fullText = (sessionTranscript + latestInterim).trim();

        // Send if we have any captured text and haven't sent yet
        if (!hasSentMessage && fullText) {
            hasSentMessage = true;
            handleSendMessageRef.current(undefined, fullText, 'audio');
        }
    };

    recognitionRef.current = recognition;
    
    try {
        recognition.start();
    } catch (e) {
        console.error("Failed to start recognition", e);
        setIsListening(false);
    }

  }, [isListening, isMicSupported, stopAudio]); 

  // --- Cleanup Audio Context ---
  useEffect(() => {
    return () => {
        stopAudio();
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
        if (recognitionRef.current) {
            try { recognitionRef.current.abort(); } catch(e) {}
        }
    };
  }, [stopAudio]);

  // --- Scroll & Visibility ---

  useEffect(() => {
    const handleScroll = () => {
      if (document.activeElement === inputRef.current) {
        initialScrollY.current = window.scrollY; 
        return;
      }
      const scrollDist = Math.abs(window.scrollY - initialScrollY.current);

      if (scrollDist > SCROLL_DISMISS_THRESHOLD && areBubblesVisible) {
         if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
         scrollTimeoutRef.current = setTimeout(() => {
            setAreBubblesVisible(false);
            stopAudio();
         }, 1000);
      } else {
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [areBubblesVisible, stopAudio]);

  useEffect(() => {
    if (areBubblesVisible) {
      initialScrollY.current = window.scrollY;
    } else {
        setSwipeOffset(0);
        stopAudio();
    }
  }, [areBubblesVisible, stopAudio]);

  const handleInteraction = () => {
    if (areBubblesVisible || document.activeElement === inputRef.current) {
        resetIdleTimer();
    }
  };

  // --- SWIPE HANDLERS ---
  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    dragStartY.current = clientY;
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging || dragStartX.current === null || dragStartY.current === null) return;
    const deltaX = clientX - dragStartX.current;
    const deltaY = clientY - dragStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        setSwipeOffset(deltaX);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    dragStartX.current = null;
    dragStartY.current = null;
    if (Math.abs(swipeOffset) > SWIPE_THRESHOLD) {
        setAreBubblesVisible(false);
        stopAudio();
        setTimeout(() => setSwipeOffset(0), 300);
    } else {
        setSwipeOffset(0);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchEnd = () => handleDragEnd();
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX, e.clientY);
  const onMouseMove = (e: React.MouseEvent) => isDragging && handleDragMove(e.clientX, e.clientY);
  const onMouseUp = () => isDragging && handleDragEnd();
  const onMouseLeave = () => isDragging && handleDragEnd();

  // Content rendering
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  const shouldShowContent = areBubblesVisible && (isSending || lastMessage);

  return (
    <div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center w-full max-w-lg px-4 pointer-events-none"
      onMouseEnter={handleInteraction}
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Single Response Bubble */}
      <div 
        className={`
          relative flex justify-center w-full mb-4 transition-all duration-500 ease-out
          ${shouldShowContent ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}
        `}
        style={{
            transform: shouldShowContent ? `translate(${swipeOffset}px, 0)` : 'translate(0, 1rem)',
            opacity: shouldShowContent ? Math.max(0, 1 - Math.abs(swipeOffset) / (SWIPE_THRESHOLD * 1.5)) : 0,
            transition: isDragging ? 'none' : undefined
        }}
      >
         <div 
            className="relative group pointer-events-auto select-none max-w-full"
            style={{ touchAction: 'pan-y' }} 
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}
         >
             <button
                onClick={(e) => { e.stopPropagation(); setAreBubblesVisible(false); stopAudio(); }}
                onMouseDown={(e) => e.stopPropagation()}
                className="absolute -top-2 -right-2 z-30 p-1.5 rounded-full bg-black/80 text-white/60 hover:text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm cursor-pointer"
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
             </button>

             <div className={`
                relative w-auto min-w-[200px]
                bg-black/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 
                shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] text-white 
                rounded-3xl px-5 py-5 max-h-[30vh] overflow-y-auto custom-scrollbar
                ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
             `}>
                {isSending ? (
                   // Custom "Thinking" State
                   (lastMessage?.mode === 'audio') ? (
                       <div className="flex flex-col items-center justify-center gap-4 py-2 w-full min-w-[200px]">
                           <span className="text-xs font-medium text-white/50 tracking-wider uppercase">Processing Audio</span>
                           <div className="flex items-center gap-1.5 h-8">
                               {[1,2,3,4,5].map(i => (
                                   <div key={i} className="w-1.5 bg-white/50 rounded-full animate-pulse" 
                                        style={{ 
                                            height: '16px', 
                                            animationDelay: `${i * 0.1}s`,
                                            animationDuration: '0.8s' 
                                        }}>
                                   </div>
                               ))}
                           </div>
                       </div>
                   ) : (
                        <div className="flex items-center gap-3 px-1">
                            <span className="text-sm font-medium text-white/80">Thinking</span>
                            <div className="flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce delay-0"></div>
                                <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce delay-150"></div>
                                <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce delay-300"></div>
                            </div>
                        </div>
                   )
                ) : (
                    <>
                        {/* Audio Mode Visualization */}
                        {lastMessage?.mode === 'audio' && (
                           <div className="flex flex-col items-center justify-center gap-4 py-2 w-full">
                                <div className="flex items-center gap-1.5 h-8">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className={`w-1.5 bg-white rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-1 opacity-30'}`} style={{ height: isPlaying ? `${Math.random() * 20 + 12}px` : '4px', animationDuration: `${0.4 + i*0.1}s` }}></div>
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                   {isPlaying ? (
                                      <button onClick={(e) => { e.stopPropagation(); stopAudio(); }} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                                      </button>
                                   ) : (
                                      <button onClick={(e) => { e.stopPropagation(); lastMessage.audioData && playAudio(lastMessage.audioData); }} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                      </button>
                                   )}
                                </div>
                           </div>
                        )}

                        {/* Text Mode Display */}
                        {lastMessage?.mode === 'text' && (
                            <div className="flex flex-col gap-2">
                                <div className="text-sm leading-relaxed text-gray-100 whitespace-pre-wrap select-text">
                                    {lastMessage?.text}
                                </div>
                                <div className="flex justify-end pt-2 border-t border-white/5 mt-2">
                                    <button 
                                        onClick={(e) => { 
                                            e.stopPropagation(); 
                                            if (isPlaying) stopAudio();
                                            else handleTextToSpeech(lastMessage.text);
                                        }} 
                                        disabled={isLoadingAudio}
                                        className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
                                        title="Read aloud"
                                    >
                                        {isLoadingAudio ? (
                                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : isPlaying ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
             </div>
         </div>
      </div>

      {/* Input Area */}
      <div className="pointer-events-auto w-full max-w-sm">
        <form 
          onSubmit={handleSendMessage}
          className={`
            relative flex items-center p-1.5 
            bg-black/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 rounded-full 
            shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300
            hover:bg-neutral-900/80 hover:border-white/20 hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.6)]
            focus-within:bg-neutral-900/90 focus-within:border-white/30 focus-within:ring-1 focus-within:ring-white/10
          `}
        >
          {/* Sparkle Icon (Static) */}
          <div className="pl-3 pr-2 text-white/50">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/></svg>
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => { setAreBubblesVisible(true); resetIdleTimer(); }}
            placeholder={isListening ? "Listening..." : "Ask AI..."}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm py-2"
          />

          <div className="flex items-center gap-1">
             {/* Mic Button */}
             {isMicSupported && (
               <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`p-2 rounded-full transition-all duration-300 ${isListening ? 'bg-red-500/80 text-white animate-pulse' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
               >
                  {isListening ? (
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                  ) : (
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  )}
               </button>
             )}

             {/* Send Button */}
             <button
                type="submit"
                disabled={!inputValue.trim() || isSending}
                className={`
                  p-2 rounded-full transition-all duration-300
                  ${inputValue.trim() ? 'bg-white/20 text-white hover:bg-white/30' : 'text-white/20 cursor-default'}
                `}
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};