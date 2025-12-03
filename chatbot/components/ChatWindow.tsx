import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { Message, ActionButton, WebhookResponse } from '../types';
import { getOrCreateSessionId } from '../utils/session';
import { sendMessageToWebhook } from '../services/chatService';
import { BiSend } from 'react-icons/bi';
import { MdOutlineChat, MdOutlineDeleteForever } from 'react-icons/md';
import { IoChevronDown } from 'react-icons/io5';


interface ChatWindowProps {
  onClose: () => void;
}

type Language = 'en' | 'es';


// Configuration for each language
let CONFIG: { en: {}, es: {} }

const LANGUAGE_SELECTION_MSG: Message = {
  id: 'lang-select',
  text: "Please select your preferred language.\n\nPor favor, seleccione su idioma preferido.",
  sender: 'bot',
  timestamp: new Date(),
  buttons: [
    { label: "English", value: "LANG_EN", type: 'action' },
    { label: "Español", value: "LANG_ES", type: 'action' }
  ]
};

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language | null>(null);
  const sessionId = useRef(getOrCreateSessionId()).current;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let role = window.location.pathname.slice(1)

  if (role === "candidate") {
    CONFIG = {
      en: {
        webhookUrl: import.meta.env.VITE_WEBHOOK_URL_ENG || '',
        welcomeText: "Welcome to Gavel! I’m your AI assistant here to make hiring or finding a job simple. Are you a company looking to hire or a candidate searching for opportunities?",
        welcomeButtons: [
          { label: "Find a job", value: "I am a candidate searching for a job", type: 'action' } as ActionButton
        ],
        placeholder: "Write a message...",
        poweredBy: "Powered by Gavel",
        connectionError: "I'm having trouble connecting to the network. Please check your connection and try again."
      },
      es: {
        webhookUrl: import.meta.env.VITE_WEBHOOK_URL_ES || '',
        welcomeText: "¡Hola! Soy tu asistente de IA de Gavel. Estoy aquí para simplificar la contratación o la búsqueda de empleo. ¿Eres una empresa que busca talento o un candidato buscando oportunidades?",
        welcomeButtons: [
          { label: "Buscar empleo", value: "Soy un candidato buscando empleo", type: 'action' } as ActionButton
        ],
        placeholder: "Escribe un mensaje...",
        poweredBy: "Tecnología Gavel",
        connectionError: "Tengo problemas para conectarme a la red. Por favor, verifica tu conexión e inténtalo de nuevo."
      }
    };
  } else {
    role = "client"
    CONFIG = {
      en: {
        webhookUrl: import.meta.env.VITE_WEBHOOK_URL_ENG || '',
        welcomeText: "Welcome to Gavel! I’m your AI assistant here to make hiring or finding a job simple. Are you a company looking to hire or a candidate searching for opportunities?",
        welcomeButtons: [
          { label: "Hire talent", value: "I am a company looking to hire talent", type: 'action' } as ActionButton
        ],
        placeholder: "Write a message...",
        poweredBy: "Powered by Gavel",
        connectionError: "I'm having trouble connecting to the network. Please check your connection and try again."
      },
      es: {
        webhookUrl: import.meta.env.VITE_WEBHOOK_URL_ES || '',
        welcomeText: "¡Hola! Soy tu asistente de IA de Gavel. Estoy aquí para simplificar la contratación o la búsqueda de empleo. ¿Eres una empresa que busca talento o un candidato buscando oportunidades?",
        welcomeButtons: [
          { label: "Contratar talento", value: "Soy una empresa buscando talento", type: 'action' } as ActionButton
        ],
        placeholder: "Escribe un mensaje...",
        poweredBy: "Tecnología Gavel",
        connectionError: "Tengo problemas para conectarme a la red. Por favor, verifica tu conexión e inténtalo de nuevo."
      }
    };
  }
  // Initialize Chat
  useEffect(() => {
    if (messages.length === 0) {
      if (language === null) {
        // Show Language Selection
        setTimeout(() => {
          setMessages([LANGUAGE_SELECTION_MSG]);
        }, 500);
      } else {
        // Show Welcome Message for selected language
        const config = CONFIG[language];
        setTimeout(() => {
          setMessages([
            {
              id: `welcome-${language}-${Date.now()}`,
              text: config.welcomeText,
              sender: 'bot',
              timestamp: new Date(),
              buttons: config.welcomeButtons
            }
          ]);
        }, 500);
      }
    }
  }, [language, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Focus input on load
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const handleLanguageSelection = (val: string) => {
    // Clear the language selection message and set language
    setMessages([]); // This triggers the useEffect again, which checks 'language' state
    if (val === 'LANG_ES') {
      setLanguage('es');
    } else {
      setLanguage('en');
    }
  };

  const handleSend = async (text: string, isPayloadValue: boolean = false) => {
    // Intercept language selection
    if (text === 'LANG_EN' || text === 'LANG_ES') {
      handleLanguageSelection(text);
      return;
    }

    if (!text.trim()) return;

    // If no language is selected (edge case), default to English
    const currentLang = language || 'en';
    const config = CONFIG[currentLang];

    // Optimistically add user message
    // If it's a button payload (like "LANG_EN"), we don't usually show it as a user bubble, 
    // but for "Hire Talent" we do. 
    // Logic: If it came from the input field, show it. If it came from a button, show the label?
    // For simplicity, we just show the text sent.

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToWebhook(text, sessionId, config.webhookUrl, role);
      processResponse(response);
    } catch (error) {
      const errorMsg: Message = {
        id: Date.now().toString() + '-err',
        text: config.connectionError,
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const processResponse = (data: WebhookResponse) => {
    let botText = data.output || data.text || data.message || "I didn't understand that.";
    if (Array.isArray(data) && data.length > 0) {
      const first = data[0];
      botText = first.output || first.text || first.message || JSON.stringify(first);
    } else if (typeof data === 'string') {
      botText = data;
    }

    const botButtons: ActionButton[] = data.buttons || [];

    const botMsg: Message = {
      id: Date.now().toString(),
      text: botText,
      sender: 'bot',
      timestamp: new Date(),
      buttons: botButtons,
    };

    setMessages((prev) => [...prev, botMsg]);
  };

  const handleClear = () => {
    setMessages([]);
    setLanguage(null); // Reset language to force selection again
  };

  const currentConfig = language ? CONFIG[language] : CONFIG.en;

  return (
    <div className="flex flex-col h-full w-full bg-[#0f172a] text-slate-100 font-inter relative">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#1e293b] border-b border-slate-700/50 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <MdOutlineChat size={20} className="text-white fill-current" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#1e293b] rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full border border-[#1e293b]"></div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-base text-white tracking-tight">Gavel AI</h3>
            <div className="flex items-center gap-1.5">
              <p className="text-xs text-blue-200/70 font-medium">Assistant</p>
              {language && (
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 uppercase">
                  {language}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleClear}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full transition-colors"
            title="Restart Chat"
          >
            <MdOutlineDeleteForever size={18} />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full transition-colors"
          >
            <IoChevronDown size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-thin bg-[#0f172a]">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-center my-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-3 py-1 bg-slate-800/50 rounded-full">
              Today
            </span>
          </div>

          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onActionClick={(val) => handleSend(val, true)}
            />
          ))}

          {isLoading && (
            <div className="flex w-full justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center mb-1">
                  <div className="w-3 h-3 bg-slate-600 rounded-full" />
                </div>
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#1e293b] border-t border-slate-700/50">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="relative flex items-end gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={currentConfig.placeholder}
            disabled={language === null} // Disable input until language is selected
            className="w-full bg-slate-900/50 text-slate-100 placeholder-slate-500 border border-slate-700/50 rounded-xl py-3.5 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all text-sm shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || language === null}
            className={`
                absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-200
                ${input.trim() && !isLoading && language !== null
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/20'
                : 'bg-transparent text-slate-600 cursor-not-allowed'
              }
            `}
          >
            <BiSend size={18} />
          </button>
        </form>
        <div className="flex justify-center mt-3">
          <a href="https://joingavel.com" target="_blank" rel="noreferrer" className="text-[10px] text-slate-500 hover:text-slate-400 transition-colors flex items-center gap-1 opacity-60 hover:opacity-100">
            <span>{currentConfig.poweredBy}</span>
          </a>
        </div>
      </div>
    </div>
  );
};