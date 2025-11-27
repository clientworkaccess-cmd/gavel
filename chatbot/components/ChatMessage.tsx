import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, ActionButton } from '../types';
import { BiBot } from 'react-icons/bi';
import { FiExternalLink } from 'react-icons/fi';
import { BsArrowRight } from 'react-icons/bs';

interface ChatMessageProps {
  message: Message;
  onActionClick: (value: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onActionClick }) => {
  const isUser = message.sender === 'user';
  
  // Refined styling for bubbles
  const bubbleClass = isUser
    ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm shadow-md shadow-blue-900/10'
    : 'bg-[#1e293b] text-slate-200 border border-slate-700/50 rounded-2xl rounded-tl-sm shadow-sm';

  return (
    <div className={`group flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex max-w-[85%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar - Top aligned with the message bubble (offset by mt-4 to clear the name label) */}
        {!isUser && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 flex items-center justify-center self-start mt-4 shadow-sm">
              <BiBot size={16} className="text-blue-400" />
            </div>
        )}
        
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          {/* Sender Name */}
          <span className={`text-[10px] text-slate-500 mb-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {isUser ? 'You' : 'Gavel AI'}
          </span>

          <div className={`px-4 py-3 text-sm leading-relaxed overflow-hidden ${bubbleClass}`}>
            <ReactMarkdown 
              components={{
                a: ({ node, ...props }) => <a {...props} className="underline decoration-blue-400/50 underline-offset-2 text-blue-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" />,
                p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                ul: ({ node, ...props }) => <ul {...props} className="list-disc ml-4 mb-2 space-y-1" />,
                ol: ({ node, ...props }) => <ol {...props} className="list-decimal ml-4 mb-2 space-y-1" />,
                strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-white/90" />
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>

          {/* Action Buttons (Only for Bot) */}
          {!isUser && message.buttons && message.buttons.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 ml-1">
              {message.buttons.map((btn, idx) => (
                <ActionBtn key={idx} button={btn} onClick={onActionClick} />
              ))}
            </div>
          )}
          
          {/* Timestamp - visible on hover */}
          <span className="text-[10px] text-slate-600 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

      </div>
    </div>
  );
};

// Sub-component for buttons
const ActionBtn: React.FC<{ button: ActionButton; onClick: (val: string) => void }> = ({ button, onClick }) => {
  if (button.type === 'link' && button.url) {
    return (
      <a 
        href={button.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 text-xs font-medium rounded-xl border border-slate-700 transition-all hover:border-blue-500/30 hover:shadow-md"
      >
        {button.label}
        <FiExternalLink size={12} />
      </a>
    );
  }

  return (
    <button
      onClick={() => onClick(button.value || button.label)}
      className="flex items-center gap-1.5 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 border border-blue-500/20 hover:border-blue-500/40 text-xs font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-blue-900/20 active:scale-95"
    >
      {button.label}
      <BsArrowRight size={12} className="opacity-50" />
    </button>
  );
};