/**
 * AI Service
 *
 * Handles communication with LLM providers (Gemini, OpenAI, etc.)
 * Includes function calling for page interactions.
 */

import { GoogleGenAI, Chat, FunctionDeclaration, Type } from '@google/genai';
import { PageContext, AIAction, ChatResponse } from '../types/index.js';

let genAI: GoogleGenAI | null = null;

// Store chat sessions per site+session combination
const chatSessions = new Map<string, Chat>();

function getGenAI(): GoogleGenAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

// Page interaction tool definition
const pageInteractionTool: FunctionDeclaration = {
  name: 'interactWithPage',
  description: 'Interacts with the webpage. Use this tool to navigate (scroll) to specific content or click links and buttons found on the page.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        description: 'The action to perform. Options: "scroll_to" (for headings, sections, or reading specific text), "click" (for clicking links or buttons), "highlight" (to emphasize content).',
      },
      target: {
        type: Type.STRING,
        description: 'The visible text string or ID of the element to interact with (e.g., "Pricing", "Get Started", "hero"). Be precise with the text you see on page.',
      },
    },
    required: ['action', 'target'],
  },
};

/**
 * Build context string from page context
 */
function buildContextString(pageContext: PageContext): string {
  return `
PAGE TITLE: ${pageContext.title}
PAGE URL: ${pageContext.url}
SECTIONS / HEADINGS: ${pageContext.headings.join(' | ')}
INTERACTABLE ELEMENTS (Buttons/Links): ${pageContext.interactables.join(' | ')}
PAGE CONTENT SUMMARY:
${pageContext.contentSummary}
  `.trim();
}

/**
 * Get or create a chat session for the given site and session
 */
function getChatSession(siteId: string, sessionId: string): Chat {
  const key = `${siteId}:${sessionId}`;

  if (!chatSessions.has(key)) {
    const ai = getGenAI();

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are SiteGuide, a helpful AI assistant that lives on websites to help visitors find what they need.

CORE BEHAVIORS:
1. You can SEE the current page through the [CURRENT PAGE CONTEXT] provided with each message.
2. When users ask to see something or go somewhere on the page, use the 'interactWithPage' tool:
   - Action 'scroll_to': Navigate to a section (e.g., "Show me pricing" -> scroll_to "Pricing")
   - Action 'click': Trigger a button or link (e.g., "Sign me up" -> click "Get Started")
   - Action 'highlight': Draw attention to content without scrolling
3. Infer the best matching text from the page context for the 'target' parameter.
4. Keep responses concise (under 50 words) and friendly.
5. If you can't find what the user is looking for, explain what you do see and offer alternatives.

PERSONALITY:
- Helpful and proactive
- Concise and clear
- Professional but friendly
- Guide users, don't just answer questions

CAPABILITIES:
- Answer questions about the page content
- Navigate users to relevant sections
- Help fill out forms by clicking buttons
- Remember context from the conversation`,
        tools: [{ functionDeclarations: [pageInteractionTool] }],
      },
    });

    chatSessions.set(key, chat);
  }

  return chatSessions.get(key)!;
}

/**
 * Send a message to the AI and get a response with optional actions
 */
export async function sendMessage(
  siteId: string,
  sessionId: string,
  message: string,
  pageContext: PageContext
): Promise<ChatResponse> {
  const chat = getChatSession(siteId, sessionId);
  const contextString = buildContextString(pageContext);

  // Build prompt with context
  const promptWithContext = `
[CURRENT PAGE CONTEXT]
${contextString}

[USER REQUEST]
${message}
  `.trim();

  // Send to AI
  let result = await chat.sendMessage({ message: promptWithContext });

  const actions: AIAction[] = [];

  // Handle function calls
  const functionCalls = result.functionCalls;
  if (functionCalls && functionCalls.length > 0) {
    console.log('[AI] Function calls requested:', functionCalls);

    const functionResponses = [];

    for (const call of functionCalls) {
      if (call.name === 'interactWithPage') {
        const args = call.args as { action: string; target: string };

        // Validate action type
        const actionType = args.action as AIAction['type'];
        if (['scroll_to', 'highlight', 'click'].includes(actionType)) {
          actions.push({
            type: actionType,
            target: args.target,
          });

          functionResponses.push({
            id: call.id,
            name: call.name,
            response: { result: `Successfully performed ${args.action} on element matching "${args.target}"` },
          });
        } else {
          functionResponses.push({
            id: call.id,
            name: call.name,
            response: { result: `Unknown action type: ${args.action}` },
          });
        }
      } else {
        functionResponses.push({
          id: call.id,
          name: call.name,
          response: { result: `Unknown tool: ${call.name}` },
        });
      }
    }

    // Send function results back to get final text response
    result = await chat.sendMessage(functionResponses);
  }

  const textResponse = result.text || "I've handled that for you.";

  return {
    text: textResponse,
    actions: actions.length > 0 ? actions : undefined,
  };
}

/**
 * Generate text-to-speech audio
 */
export async function generateSpeech(text: string): Promise<string | undefined> {
  try {
    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: { parts: [{ text }] },
      config: {
        responseModalities: ['AUDIO'],
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
    console.error('[AI] TTS Error:', error);
    return undefined;
  }
}

/**
 * Clear chat session (for testing or memory management)
 */
export function clearChatSession(siteId: string, sessionId: string): void {
  const key = `${siteId}:${sessionId}`;
  chatSessions.delete(key);
}

/**
 * Get active session count
 */
export function getActiveSessionCount(): number {
  return chatSessions.size;
}
