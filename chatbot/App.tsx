import React, { useState } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { FaGavel } from 'react-icons/fa';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* 
        Root Container:
        - Fixed to viewport.
        - z-index high to float above other content.
        - pointer-events-none to let clicks pass through to the website behind it.
      */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col justify-end items-end sm:p-6 p-4">

        {/* 
          Chat Window Wrapper:
          - pointer-events-auto so the chat itself is clickable.
          - Transform origins and transitions for a "pop out" effect.
        */}
        <div
          className={`
            origin-bottom-right transition-all duration-300 ease-out transform
            ${isChatOpen
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-90 translate-y-8 pointer-events-none absolute'
            }
          `}
        >
          {/* Only mount/render logic if we want to preserve state, we keep it mounted here but hidden */}
          <div className="w-[calc(100vw-28px)] h-[600px] max-h-[80vh] sm:w-[380px] sm:h-[650px] shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10">
            <ChatWindow onClose={() => setIsChatOpen(false)} />
          </div>
        </div>

        {/* 
          Floating Toggle Button:
          - Only visible when chat is closed.
          - pointer-events-auto to capture the click.
        */}
        <div className={`pointer-events-auto cursor-pointer flex flex-row-reverse items-center group relativ  ${isChatOpen ? 'opacity-0 scale-75 translate-y-10 pointer-events-none absolute' : 'opacity-100 scale-100 translate-y-0'}`}>
          <div className="absolute top-0 right-2 z-10">
            <span className="flex h-3 w-3 relative ">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 top-0"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          {/* BUTTON */}
          <div
            onClick={() => setIsChatOpen(!isChatOpen)}
            className='-ml-3 shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer rounded-full'>
            <button
              className=' p-5 bg-[#0B1138] hover:bg-[#070a1f] text-blue-500 rounded-full hover:ring-1 hover:ring-green-500 transition-all duration-800 '
              aria-label="Toggle Chat"
            >
              <FaGavel className='w-6 h-6 text-blue-600 group-hover:text-blue-500 transition-transform' />
            </button>
          </div>
          {/* CHAT LABEL + ONLINE BADGE */}
          <div
            className="
      flex items-center gap-2 font-medium text-sm text-gray-300 p-3 
      rounded-l-full px-6 bg-[#070a1f]
      absolute right-14 -z-10
      opacity-0 translate-x-3
      transition-all duration-800
      group-hover:opacity-100 group-hover:translate-x-0
    "
          >
            Chat
          </div>

        </div>

      </div>
    </>
  );
};

export default App;