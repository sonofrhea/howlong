import { CircleX } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync scroll to bottom when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        setShowDot(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowDot(true);
    }
  }, [isOpen]);

  const handleSend = () => {
    const phone = "601116097620";
    if (!inputValue.trim()) {
      window.open(`https://api.whatsapp.com/send?phone=${phone}&text=Hello! I am interested in a demo.`, '_blank');
    } else {
      window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(inputValue)}`, '_blank');
    }
    setInputValue("");
  };

  return (
    <div className="fixed! bottom-6.25! right-7.5! z-9999! font-[Montserrat]! antialiased!">
      
      {/* Chat Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative bg-white text-[#111] flex items-center justify-center font-bold z-98 text-[17px] tracking-tight py-1.3! px-3.5! rounded-full shadow-2xl cursor-pointer border-2 border-gray-400 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 ease-out font-['Montserrat]!"
          title="Show Chat"
        >
          <div className="relative w-7.5 h-7.5 mr-4.5 shrink-0">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path fill="#eceff1" d="M20.5 3.4A12.1 12.1 0 0012 0 12 12 0 001.7 17.8L0 24l6.3-1.7c2.8 1.5 5 1.4 5.8 1.5a12 12 0 008.4-20.3z" />
              <path fill="#30a83f" d="M12 21.8c-3.1 0-5.2-1.6-5.4-1.6l-3.7 1 1-3.7-.3-.4A9.9 9.9 0 012.1 12a10 10 0 0117-7 9.9 9.9 0 01-7 16.9z" />
              <path fill="#fafafa" d="M17.5 14.3c-.3 0-1.8-.8-2-.9-.7-.2-.5 0-1.7 1.3-.1.2-.3.2-.6.1s-1.3-.5-2.4-1.5a9 9 0 01-1.7-2c-.3-.6.4-.6 1-1.7l-.1-.5-1-2.2c-.2-.6-.4-.5-.6-.5-.6 0-1 0-1.4.3-1.6 1.8-1.2 3.6.2 5.6 2.7 3.5 4.2 4.2 6.8 5 .7.3 1.4.3 1.9.2.6 0 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z" />
            </svg>
          </div>
          <span className="whitespace-nowrap leading-none font-['Montserrat]!">Contact Sales</span>
        </button>
      )}

      {/* Chat Window */}
      <div id="whatsapp-chat" className={isOpen ? 'show' : 'hide'}>
        
        {/* Header Section */}
        <div className="whatsapp-chat-header! relative! bg-[#095e54]! text-white! p-2!" style={{ fontFamily: 'Montserrat, system-ui' }}>
          <div className="whatsapp-chat-avatar relative float-left mr-2.5!" style={{ fontFamily: 'Montserrat, system-ui' }}>
            <img 
            src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" 
            alt="Customer Service" 
            className="rounded-full! w-15.5!"
            style={{ fontFamily: 'Montserrat, system-ui' }}
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4ad504] rounded-full border-2 border-[#095e54] z-1"></div>
          </div>
          <p className="leading-[1.7]! text-[14px]! font-['Montserrat]! p-2.5!" style={{ fontFamily: 'Montserrat, system-ui' }}>
            <span className="whatsapp-chat-name block! text-[16px] font-semibold leading-[1.2]! p-2.5! text-left! font-['Montserrat]!">
                Sales
                <br />
                <span className="opacity-80 font-['Montserrat]! font-normal! text-left! text-xs">Typically replies within an hour</span>
            </span>
          </p>
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-1.25 right-3.75 text-white text-[30px] cursor-pointer bg-transparent border-0 leading-none"
          >
            <CircleX />
          </button>
        </div>

        {/* Chat Container - Now with flex column layout */}
        <div className="start-chat! bg-[#e6ddd4]! flex flex-col h-100!">
          
          {/* Scrollable Messages Area */}
          <div className="whatsapp-chat-body! relative! p-[20px_20px_20px_10px] flex-1 overflow-y-auto overflow-x-hidden min-h-0">
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-0" 
                 style={{ backgroundImage: 'url("https://elfsight.com/assets/chats/patterns/whatsapp.png")' }}></div>
            
            <div className="relative z-10 p-2.5!" ref={scrollRef}>
              {/* Typing Animation Container */}
              {showDot && (
                <div className="bg-white w-[52.5px] h-8 rounded-2xl flex justify-center items-center ml-2.5 shadow-[rgba(0,0,0,0.13)_0px_1px_0.5px]">
                  <div className="flex">
                    <div className="dot ixsrax"></div>
                    <div className="dot dRvxoz"></div>
                    <div className="dot kXBtNt"></div>
                  </div>
                </div>
              )}

              {/* Message Content */}
              {!showDot && (
                <div className="whatsapp-message p-2.5! bg-white rounded-[0_8px_8px_8px] relative shadow-[rgba(0,0,0,0.13)_0px_1px_0.5px] max-w-[calc(100%-66px)] animate-msg">
                  <div className="text-[#00000073] text-[13px] font-semibold mb-1! text-left p-2.5!">Sales</div>
                  <div className="text-[14px] leading-[1.4] text-[#111] text-left">
                    Looking for a Free Demo?<br/>
                    Contact us via WhatsApp to book a demo.
                  </div>
                  <div className="text-right text-[11px] text-[#00000073] mt-1!">
                    {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Area - NOW FIXED AT BOTTOM */}
          <div className="blanter-msg! p-2.5! flex! border-t! border-[#ddd]! bg-white! items-center! font-['Montserrat]! shrink-0">
            <textarea 
              id="chat-input" 
              placeholder="Type a message" 
              maxLength={120} 
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              className="border-0 font-['Montserrat]! w-full h-10.5! outline-none resize-none p-[10px_15px] text-[14px]"
            ></textarea>
            <button 
              onClick={handleSend}
              id="send-it"
              className="w-12.5! flex items-center justify-center h-10.5! bg-[#eee] hover:bg-gray-200 transition-colors"
            >
              <svg id="send-svg" viewBox="0 0 448 448" className="fill-[#a6a6a6] h-6! width-[24px]">
                <path d="M.213 32L0 181.333 320 224 0 266.667.213 416 448 224z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`

        
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800;900&display=swap');
            
        #whatsapp-chat {
          box-sizing: border-box !important;
          position: fixed;
          width: 350px;
          border-radius: 10px;
          box-shadow: 0 1px 15px rgba(32, 33, 36, 0.28);
          bottom: 115px;
          right: 30px;
          overflow: hidden;
          z-index: 9999;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        #whatsapp-chat.hide {
          display: none;
          opacity: 0;
          transform: scale(0.8) translateY(20px);
        }

        #whatsapp-chat.show {
          display: block;
          opacity: 1;
          transform: scale(1) translateY(0);
          animation: showchat 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .animate-msg {
          animation: showmsg 0.3s ease forwards;
        }

        @keyframes showchat {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes showmsg {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* DOT ANIMATIONS */
        .dot {
          height: 5px;
          width: 5px;
          margin: 0px 2px;
          border-radius: 50%;
          display: inline-block;
          position: relative;
          animation-duration: 1.2s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          background-color: #9e9da2;
        }

        .ixsrax { animation-name: ZpjSY; }
        .dRvxoz { animation-name: hPhMsj; }
        .kXBtNt { animation-name: iUMejp; }

        @keyframes ZpjSY {
          0% { background-color: #b6b5ba; }
          15% { background-color: #111111; }
          25% { background-color: #b6b5ba; }
        }

        @keyframes hPhMsj {
          15% { background-color: #b6b5ba; }
          25% { background-color: #111111; }
          35% { background-color: #b6b5ba; }
        }

        @keyframes iUMejp {
          25% { background-color: #b6b5ba; }
          35% { background-color: #111111; }
          45% { background-color: #b6b5ba; }
        }

        @media screen and (max-width: 480px) {
          #whatsapp-chat {
            width: auto;
            left: 5%;
            right: 5%;
            bottom: 105px;
          }
        }
      `}</style>
    </div>
  );
}