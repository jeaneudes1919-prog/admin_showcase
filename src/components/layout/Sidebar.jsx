import React from 'react';
import { menuItems } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, LogOut, Cpu, Zap } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen, themeConfig, btnClass }) => {
  
  // Extraire les couleurs du thème (envoyées par App.jsx)
  const { accent, sidebar, text } = themeConfig;

  // Animation pour le menu mobile
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const SidebarContent = () => (
    <div className={`h-full w-72 ${sidebar} flex flex-col border-r border-white/5 shadow-2xl transition-colors duration-500`}>
      
      {/* --- LOGO SECTION --- */}
      <div className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className={`w-12 h-12 bg-${accent} rounded-2xl flex items-center justify-center shadow-lg shadow-${accent}/20 group-hover:rotate-12 transition-all duration-500`}>
            <span className="text-white font-black text-2xl tracking-tighter">N</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-white tracking-tighter leading-none italic">NEXUS<span className={`text-${accent}`}>OS</span></span>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Core System</span>
          </div>
        </div>
        
        <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar py-4">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if(window.innerWidth < 768) setIsOpen(false);
              }}
              className={`w-full group flex items-center justify-between px-5 py-4 ${btnClass} transition-all relative overflow-hidden ${
                isActive ? 'text-white shadow-xl' : 'text-slate-500 hover:text-slate-200'
              }`}
              style={isActive ? { backgroundColor: `var(--tw-color-${accent})` } : {}}
            >
              {/* Background pour l'item actif */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-bg"
                  className={`absolute inset-0 bg-${accent} -z-0`}
                  transition={{ type: "spring", stiffness: 300, damping: 35 }}
                />
              )}

              <div className="flex items-center gap-4 z-10 relative">
                <div className={`transition-transform duration-500 ${isActive ? 'scale-110 rotate-3' : 'group-hover:scale-110'}`}>
                  <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
                </div>
                <span className={`text-[11px] font-black uppercase tracking-widest transition-all ${isActive ? 'translate-x-1' : ''}`}>
                  {item.label}
                </span>
              </div>

              {isActive && (
                 <ChevronRight size={14} className="z-10 text-white opacity-40 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* --- FOOTER / PROFIL CONNECTÉ --- */}
      <div className="p-6 border-t border-white/5">
        <div className={`flex items-center gap-3 p-4 rounded-[1.8rem] ${themeConfig.sidebar === 'bg-white' ? 'bg-slate-50 border border-slate-100' : 'bg-white/5 border border-white/5'}`}>
          <div className={`w-10 h-10 rounded-xl bg-${accent} shadow-lg shadow-${accent}/20 flex items-center justify-center text-white font-black text-xs`}>
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-white truncate uppercase tracking-tighter">Admin_Nexus</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Root_Node</p>
            </div>
          </div>
          <button className="p-2 text-slate-500 hover:text-rose-500 transition-colors hover:rotate-12">
            <LogOut size={18} />
          </button>
        </div>
        
        {/* Status System en bas de Sidebar */}
        <div className="mt-4 flex justify-between items-center px-2">
            <div className="flex gap-1">
                <div className={`w-1 h-3 rounded-full bg-${accent} opacity-50`}></div>
                <div className={`w-1 h-3 rounded-full bg-${accent} opacity-30`}></div>
                <div className={`w-1 h-3 rounded-full bg-${accent} opacity-10`}></div>
            </div>
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">Cotonou_Server</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* VERSION DESKTOP */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen z-30">
        <SidebarContent />
      </aside>

      {/* VERSION MOBILE */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
            />
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed left-0 top-0 h-screen z-50 md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;