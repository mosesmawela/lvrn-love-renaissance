import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Minimize2, Trash2, ArrowRight, Zap, AlertTriangle, Sparkles, RotateCw } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { FOUNDERS, ARTISTS, MILESTONES, PHILOSOPHY, STATS } from '../constants';
import { useExperience } from './ExperienceProvider';

const BOOKING_INFO = `
Booking Contacts:
- Ciza: cizariobookings@gmail.com
- Al Xapo: aobstudios@gmail.com
- General: info@lvrn.com
`;

const CONTEXT_DATA = `
DATA:
FOUNDERS: ${JSON.stringify(FOUNDERS)}
ARTISTS: ${JSON.stringify(ARTISTS)}
`;

const SYSTEM_INSTRUCTION = `
You are the LVRN INTELLIGENT SYSTEM INTERFACE. 
Your role is to guide users through the Love Renaissance digital experience with brevity and precision.

RESPONSE FORMAT:
You MUST respond in strict JSON format.
{
  "text": "Your brief, cinematic response here.",
  "actions": [
    { "label": "Button Label", "type": "navigate", "value": "page_id" },
    { "label": "Button Label", "type": "link", "value": "https://url..." }
  ]
}

RULES:
1. RESPONSE STYLE: Sci-fi, minimalist, system-like. Avoid slang. Be efficient.
2. INTENT DETECTION:
   - If user asks about an artist -> Provide "navigate" action to "artists" or "booking".
   - If user asks about booking -> Provide "navigate" action to "booking" (this opens the hub).
   - If user asks to listen -> Provide "navigate" action to "radio".
   - If user asks about history/story -> Provide "navigate" action to "story".
   - If user asks about contact/socials -> Provide "navigate" action to "connect".
3. PAGE ID MAPPING:
   - Home -> 'home'
   - Artists/Roster -> 'artists'
   - Radio/Music -> 'radio'
   - Story/About -> 'story'
   - Connect/Socials -> 'connect'
   - Playroom -> 'playroom'

${BOOKING_INFO}
${CONTEXT_DATA}
`;

interface ActionButton {
  label: string;
  type: 'navigate' | 'link' | 'action';
  value: string;
}

interface Message {
  role: 'user' | 'model';
  content: {
    text: string;
    actions?: ActionButton[];
  };
  isError?: boolean;
}

// Genius: Quick Prompt Contexts
const PROMPT_CONTEXTS: Record<string, string[]> = {
  'home': ["What is LVRN?", "Who are the founders?", "Latest releases?"],
  'artists': ["Who is 6LACK?", "Show me Summer Walker stats.", "How do I book?"],
  'booking': ["What are the booking rates?", "Contact info?", "Festival availability?"],
  'radio': ["Play trending music.", "Artist top tracks?", "Open Spotify."],
  'story': ["History of LVRN?", "Philosophy?", "Studio location?"],
  'connect': ["Instagram?", "YouTube channel?", "Contact email?"],
  'default': ["Show me the roster.", "Play some music.", "Book an artist."]
};

export const AiAssistant: React.FC = () => {
  const { hasEntered, navigateTo, showNotification, targetSection } = useExperience(); // targetSection now maps to activePage
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: {
        text: "System Online. Awaiting input.",
        actions: [
          { label: "Explore Roster", type: 'navigate', value: 'artists' },
          { label: "View History", type: 'navigate', value: 'story' }
        ]
      }
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Genius: Determine suggested prompts based on heuristic or simple scroll
  const [activePrompts, setActivePrompts] = useState(PROMPT_CONTEXTS['default']);

  const aiRef = useRef<GoogleGenAI | null>(null);

  // Initialize AI once
  useEffect(() => {
    try {
      if (process.env.API_KEY) {
        aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
      }
    } catch (e) {
      console.error("AI Init Error", e);
    }
  }, []);

  // Genius: Update prompts when opening
  useEffect(() => {
    if (isOpen) {
      // Simple rotation or random selection for variety
      const keys = Object.keys(PROMPT_CONTEXTS);
      const currentContext = targetSection || 'default';
      const prompts = PROMPT_CONTEXTS[currentContext] || PROMPT_CONTEXTS['default'];
      setActivePrompts(prompts);
    }
  }, [isOpen, targetSection]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleAction = (action: ActionButton) => {
    if (action.type === 'navigate') {
      navigateTo(action.value);
    } else if (action.type === 'link') {
      window.open(action.value, '_blank');
    }
  };

  const executePrompt = (text: string) => {
    setInput(text);
    // Small delay to visualize input before sending
    setTimeout(() => handleSend(text), 100);
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isLoading) return;

    // Safety check for API Key
    if (!aiRef.current) {
      setMessages(prev => [...prev, { role: 'user', content: { text: textToSend } }]);
      setInput('');
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'model',
          content: { text: "CRITICAL ERROR: API Key missing. System offline." },
          isError: true
        }]);
        showNotification("AI System Offline - Missing Credentials", "error");
      }, 500);
      return;
    }

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: { text: textToSend } }]);
    setIsLoading(true);

    try {
      const historyToSend = messages.filter(m => !m.isError).map(m => ({
        role: m.role,
        parts: [{ text: JSON.stringify(m.content) }]
      }));

      const contents = [...historyToSend, { role: 'user', parts: [{ text: textToSend }] }];

      const response = await aiRef.current.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json'
        }
      });

      const jsonResponse = JSON.parse(response.text || '{}');

      setMessages(prev => [...prev, {
        role: 'model',
        content: {
          text: jsonResponse.text || "Data corrupted. Retrying.",
          actions: jsonResponse.actions || []
        }
      }]);

    } catch {
      setMessages(prev => [...prev, {
        role: 'model',
        content: { text: "Connection unstable. Unable to process request." },
        isError: true
      }]);
      showNotification("AI Connection Unstable", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasEntered) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="pointer-events-auto w-[90vw] md:w-[360px] h-[550px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* System Header */}
            <div className="p-3 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${aiRef.current ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">LVRN OS v2.0</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setMessages([])} className="p-1 hover:text-white text-gray-500 transition-colors" aria-label="Clear History">
                  <Trash2 size={14} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:text-white text-gray-500 transition-colors" aria-label="Minimize">
                  <Minimize2 size={16} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3 text-sm leading-relaxed ${msg.role === 'user'
                      ? 'bg-white text-black rounded-lg rounded-tr-none font-medium'
                      : msg.isError
                        ? 'text-red-400 font-mono border-l-2 border-red-500 pl-3 bg-red-900/10'
                        : 'text-gray-200 font-mono border-l-2 border-orange-500 pl-3'
                    }`}>
                    {msg.content.text}
                  </div>

                  {msg.role === 'model' && msg.content.actions && msg.content.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.content.actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleAction(action)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/20 border border-white/10 rounded-md text-xs text-orange-300 transition-all uppercase tracking-wider font-bold"
                        >
                          {action.label} <ArrowRight size={10} />
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.isError && (
                    <button onClick={() => handleSend(messages[idx - 1]?.role === 'user' ? messages[idx - 1].content.text : undefined)} className="mt-2 text-xs text-red-400 flex items-center gap-1 hover:underline">
                      <RotateCw size={10} /> Retry
                    </button>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-orange-400 font-mono pl-3 animate-pulse">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  PROCESSING REQUEST...
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto custom-scrollbar border-t border-white/5">
              {activePrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => executePrompt(prompt)}
                  className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-gray-400 hover:text-white transition-colors flex items-center gap-1 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <Sparkles size={8} /> {prompt}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-black/40">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={aiRef.current ? "Enter command..." : "System Offline"}
                  disabled={!aiRef.current}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 font-mono placeholder:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim() || !aiRef.current}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-white transition-colors disabled:opacity-30"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`pointer-events-auto w-14 h-14 rounded-full backdrop-blur-md border flex items-center justify-center text-white shadow-lg group ${!aiRef.current ? 'bg-red-900/50 border-red-500/50' : 'bg-black/50 border-white/20'
          }`}
        aria-label="Toggle AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X size={24} /> : (
            !aiRef.current ? <AlertTriangle size={24} className="text-red-400" /> : <Zap size={24} className="group-hover:text-yellow-400 transition-colors" />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};