export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string; // Transcript or fallback text
  timestamp: number;
  mode: 'text' | 'audio'; // How the message was generated/received
  audioData?: string; // Base64 encoded PCM data
}
