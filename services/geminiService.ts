import { GoogleGenAI, Chat, Modality, FunctionDeclaration, Type } from "@google/genai";
import { Message } from '../types';

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getGenAI = () => {
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

// Generic Tool: Interact with Page
const pageInteractionTool: FunctionDeclaration = {
  name: 'interactWithPage',
  description: 'Interacts with the webpage. Use this tool to navigate (scroll) to specific content or click links and buttons found on the page.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        description: 'The action to perform. Options: "scroll_to" (for headings, sections, or reading specific text), "click" (for clicking links or buttons).',
      },
      target: {
        type: Type.STRING,
        description: 'The visible text string or ID of the element to interact with (e.g., "Pricing", "Get Started", "hero"). Be precise with the text you see on page.',
      },
    },
    required: ['action', 'target'],
  },
};

// Helper: Scrape Page Structure for Context
const getPageContext = () => {
    if (typeof document === 'undefined') return '';

    const title = document.title || "Unknown Page";
    
    // Get all Headings to understand page structure
    const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
      .map(h => (h as HTMLElement).innerText.replace(/\s+/g, ' ').trim())
      .filter(t => t.length > 0)
      .join(' | ');
 
    // Get Interactive Elements (Buttons/Links) to understand actions
    const interactables = Array.from(document.querySelectorAll('button, a, input[type="submit"]'))
      .map(el => (el as HTMLElement).innerText.replace(/\s+/g, ' ').trim())
      .filter(t => t.length > 0 && t.length < 40) // Filter out huge blocks or empty text
      .slice(0, 60) // Limit to avoid context overflow
      .join(' | ');
 
    // Get Main Text Content (truncated)
    const bodyText = document.body.innerText.slice(0, 2500).replace(/\s+/g, ' ').trim();
 
    return `
    PAGE TITLE: ${title}
    SECTIONS / HEADINGS: ${headings}
    INTERACTABLE ELEMENTS (Buttons/Links): ${interactables}
    PAGE CONTENT SUMMARY:
    ${bodyText}
    `;
};

// Reset chat if needed, or maintain session
const getChatSession = () => {
  if (!chatSession) {
    const ai = getGenAI();
    
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are a helpful, intelligent co-browsing assistant. 
        You are "living" on top of a webpage and can interact with it.

        INSTRUCTIONS:
        1. Each user message will include the [CURRENT PAGE CONTEXT]. Use this to understand what the user is looking at right now.
        2. When the user asks to see something or go somewhere, use the 'interactWithPage' tool.
           - Action 'scroll_to': Use this to show the user a section (e.g., "Show me features" -> scroll_to "Features").
           - Action 'click': Use this if the user wants to trigger an action (e.g., "Sign me up" -> click "Get Started").
        3. Infer the best matching text from the context list for the 'target' parameter.
        4. Keep your verbal responses brief (under 50 words) and friendly.
        `,
        tools: [{ functionDeclarations: [pageInteractionTool] }],
      },
    });
  }
  return chatSession;
};

export const generateSpeechFromText = async (text: string): Promise<string | undefined> => {
    console.log(`[GeminiService] Generating speech for: "${text.substring(0, 20)}..."`);
    try {
        const ai = getGenAI();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: { parts: [{ text }] },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                      prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });
        
        const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return audioData;
    } catch (error) {
        console.error("[GeminiService] TTS Error:", error);
        return undefined;
    }
}

export const sendMessageToGemini = async (message: string, mode: 'text' | 'audio' = 'text'): Promise<{ text: string, audioData?: string }> => {
  try {
    const ai = getGenAI();
    const chat = getChatSession();

    // DYNAMIC CONTEXT INJECTION
    // Scrape the page right now to get the latest state
    const currentContext = getPageContext();
    
    // Wrap the user's message with the live context
    const promptWithContext = `
    [CURRENT PAGE CONTEXT]
    ${currentContext}
    
    [USER REQUEST]
    ${message}
    `;
    
    let result = await chat.sendMessage({ message: promptWithContext });
    
    // Handle Function Calls (Interaction)
    const functionCalls = result.functionCalls;
    if (functionCalls && functionCalls.length > 0) {
        console.log("[GeminiService] Model requested interactions:", functionCalls);
        
        const functionResponses = [];
        
        for (const call of functionCalls) {
            if (call.name === 'interactWithPage') {
                const { action, target } = call.args as { action: string, target: string };
                console.log(`[GeminiService] Executing interaction: ${action} -> "${target}"`);
                
                // Dispatch generic event to FloatingChat component
                if (typeof window !== 'undefined') {
                    const event = new CustomEvent('ai-interaction', { detail: { action, target } });
                    window.dispatchEvent(event);
                }

                functionResponses.push({
                    id: call.id,
                    name: call.name,
                    response: { result: `Successfully performed ${action} on element matching "${target}"` }
                });
            } else {
                functionResponses.push({
                    id: call.id,
                    name: call.name,
                    response: { result: `Error: Unknown tool ${call.name}` }
                });
            }
        }
        
        // Send function execution results back to model to get final text response
        result = await chat.sendMessage(functionResponses);
    }

    const textResponse = result.text || "I've handled that for you.";

    let audioData: string | undefined = undefined;

    // If in audio mode, convert the text response to speech.
    if (mode === 'audio') {
        audioData = await generateSpeechFromText(textResponse);
    } 

    return {
        text: textResponse,
        audioData: audioData
    };

  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return { text: "Sorry, I encountered a temporary glitch." };
  }
};