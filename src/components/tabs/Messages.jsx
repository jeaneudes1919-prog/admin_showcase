import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatContacts, initialMessages } from '../../data/mockData';
import { Send, Paperclip, MoreVertical, Search, ChevronLeft, Phone, Video, Smile, Activity } from 'lucide-react';
import { toast } from 'sonner';

const Messages = ({ theme, btnClass, accentColor }) => {
  // --- ÉTATS ---
  const [activeId, setActiveId] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [showChatMobile, setShowChatMobile] = useState(false);
  const scrollRef = useRef(null);

  const activeContact = chatContacts.find(c => c.id === activeId);

  // --- THÉMATISATION DYNAMIQUE ---
  const themeStyles = {
    indigo: { card: "bg-white", text: "text-slate-800", sub: "text-slate-500", border: "border-slate-100", chatBg: "bg-slate-50/50", bubbleOther: "bg-white text-slate-700" },
    midnight: { card: "bg-slate-900", text: "text-white", sub: "text-slate-400", border: "border-slate-800", chatBg: "bg-black/20", bubbleOther: "bg-slate-800 text-slate-100" },
    cyber: { card: "bg-zinc-950", text: "text-[#00ff9f]", sub: "text-[#00ff9f]/60", border: "border-[#00ff9f]/20", chatBg: "bg-black/40", bubbleOther: "bg-zinc-900 text-[#00ff9f]" },
    forest: { card: "bg-[#f8faf8]", text: "text-[#1a2e1a]", sub: "text-[#1a2e1a]/50", border: "border-emerald-100", chatBg: "bg-emerald-50/30", bubbleOther: "bg-white text-emerald-900" },
    sunset: { card: "bg-white", text: "text-[#4a2c2a]", sub: "text-[#4a2c2a]/60", border: "border-orange-100", chatBg: "bg-orange-50/30", bubbleOther: "bg-white text-[#4a2c2a]" }
  };

  const s = themeStyles[theme];

  // Auto-scroll vers le bas
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeId, showChatMobile]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMessage]
    }));

    setInputValue("");
    toast.success("Paquet envoyé", { 
      description: "Message transmis au noeud distant.",
      className: `bg-${accentColor} text-white border-none rounded-2xl`
    });
  };

  return (
    <div className={`h-[calc(100vh-140px)] md:h-[calc(100vh-180px)] ${s.card} rounded-[2.5rem] md:rounded-[3rem] border ${s.border} shadow-2xl overflow-hidden flex relative transition-all duration-500`}>
      
      {/* --- SIDEBAR : LISTE CONTACTS --- */}
      <div className={`
        ${showChatMobile ? 'hidden' : 'flex'} 
        md:flex flex-col w-full md:w-80 lg:w-96 border-r ${s.border} z-10
      `}>
        <div className="p-8 space-y-6">
          <h2 className={`text-3xl font-black ${s.text} tracking-tighter uppercase italic`}>Nexus Chat</h2>
          <div className="relative group">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-${accentColor} opacity-50 group-focus-within:opacity-100 transition-opacity`} size={18} />
            <input 
              type="text" 
              placeholder="Rechercher un agent..." 
              className={`w-full pl-12 pr-4 py-4 ${theme === 'midnight' || theme === 'cyber' ? 'bg-black/40' : 'bg-slate-50'} border-none rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-${accentColor}/20 transition-all ${s.text}`} 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-2 no-scrollbar">
          {chatContacts.map(contact => (
            <motion.div 
              key={contact.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setActiveId(contact.id); setShowChatMobile(true); }}
              className={`
                p-4 flex items-center gap-4 cursor-pointer transition-all rounded-[2rem]
                ${activeId === contact.id ? `bg-${accentColor}/10 border-r-4 border-${accentColor}` : `hover:${s.chatBg}`}
              `}
            >
              <div className="relative shrink-0">
                <div className={`w-14 h-14 ${contact.color} rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-current/20 group-hover:rotate-6 transition-transform`}>
                  {contact.name.charAt(0)}
                </div>
                {contact.online && (
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 ${theme === 'midnight' ? 'border-slate-900' : 'border-white'} rounded-full`}></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`font-black truncate text-sm uppercase tracking-tighter ${activeId === contact.id ? `text-${accentColor}` : s.text}`}>
                    {contact.name}
                  </h4>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{contact.time}</span>
                </div>
                <p className={`text-[11px] truncate pr-2 font-bold ${activeId === contact.id ? s.text : s.sub}`}>{contact.lastMsg}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- ZONE DE CHAT --- */}
      <div className={`
        ${showChatMobile ? 'flex' : 'hidden'} 
        md:flex flex-1 flex-col ${s.chatBg} relative
      `}>
        
        {/* Header Chat */}
        <div className={`p-4 md:p-6 ${s.card} border-b ${s.border} flex justify-between items-center sticky top-0 z-20 shadow-sm`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowChatMobile(false)} className={`md:hidden p-2 text-${accentColor}`}><ChevronLeft size={24} /></button>
            <div className={`w-10 h-10 md:w-12 md:h-12 ${activeContact.color} rounded-2xl text-white flex items-center justify-center font-black text-lg shadow-lg shadow-current/10`}>
              {activeContact.name.charAt(0)}
            </div>
            <div>
              <h4 className={`font-black ${s.text} text-sm md:text-lg tracking-tighter leading-none`}>{activeContact.name}</h4>
              <p className={`text-[9px] md:text-[10px] font-black uppercase mt-1 tracking-widest`}>
                {activeContact.online ? <span className="text-emerald-500 animate-pulse">● Session Active</span> : <span className="text-slate-400">● Hors-ligne</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className={`${btnClass} p-2.5 bg-slate-100 text-slate-400 hidden sm:block`}><Phone size={18}/></button>
            <button className={`${btnClass} p-2.5 bg-slate-100 text-slate-400 hidden sm:block`}><Video size={18}/></button>
            <button className={`${btnClass} p-2.5 bg-slate-100 text-slate-400`}><MoreVertical size={18} /></button>
          </div>
        </div>

        {/* Messages Content */}
        <div ref={scrollRef} className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto no-scrollbar">
          <AnimatePresence initial={false}>
            {(messages[activeId] || []).map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  max-w-[85%] md:max-w-[70%] p-5 rounded-[2.2rem] text-sm font-bold shadow-sm relative group
                  ${msg.sender === 'me' 
                    ? `bg-${accentColor} text-white rounded-tr-none shadow-${accentColor}/20` 
                    : `${s.bubbleOther} rounded-tl-none border ${s.border}`}
                `}>
                  {msg.text}
                  <p className={`text-[8px] mt-2 font-black uppercase opacity-50 text-right tracking-widest`}>
                    {msg.time}
                  </p>
                  {/* Petit effet de queue de bulle premium */}
                  <div className={`absolute top-0 w-4 h-4 ${msg.sender === 'me' ? `-right-1 bg-${accentColor}` : `-left-1 ${msg.sender === 'other' && theme === 'midnight' ? 'bg-slate-800' : 'bg-white'}`} -z-10 rounded-full`}></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Bar */}
        <div className={`p-6 ${s.card} border-t ${s.border}`}>
          <form onSubmit={handleSend} className={`flex items-center gap-2 md:gap-4 ${theme === 'midnight' || theme === 'cyber' ? 'bg-black/20' : 'bg-slate-50'} p-2 rounded-[2.5rem] border ${s.border} focus-within:ring-4 focus-within:ring-${accentColor}/10 transition-all`}>
            <button type="button" className={`p-3 text-slate-400 hover:text-${accentColor} transition-colors`}><Paperclip size={20}/></button>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Écrire une commande ou un message..." 
              className={`flex-1 bg-transparent border-none outline-none text-sm font-black ${s.text} placeholder:text-slate-400 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest`} 
            />
            <button type="button" className={`hidden sm:flex p-3 text-slate-400 hover:text-${accentColor} transition-colors`}><Smile size={20}/></button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`${btnClass} p-4 bg-${accentColor} text-white shadow-xl shadow-${accentColor}/30`}
            >
              <Send size={20} />
            </motion.button>
          </form>
          <p className="text-[8px] text-center mt-3 text-slate-400 font-black uppercase tracking-[0.3em] opacity-50">Nexus Cryptography End-to-End Active</p>
        </div>
      </div>
    </div>
  );
};

export default Messages;