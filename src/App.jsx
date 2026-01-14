import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Bell, Search, Command, Zap } from 'lucide-react';
import { Toaster } from 'sonner';

// Layout & Navigation
import Sidebar from './components/layout/Sidebar';

// Tab Components
import Overview from './components/tabs/Overview';
import Users from './components/tabs/Users';
import Products from './components/tabs/Products';
import Analytics from './components/tabs/Analytics';
import Campaigns from './components/tabs/Campaigns';
import Messages from './components/tabs/Messages';
import Security from './components/tabs/Security';
import Settings from './components/tabs/Settings';

function App() {
  // --- ÉTATS DE NAVIGATION ---
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- ÉTATS DE DESIGN GLOBAL (Le "Gros Poisson") ---
  const [currentTheme, setCurrentTheme] = useState('indigo'); // indigo, midnight, cyber, forest, sunset
  const [btnStyle, setBtnStyle] = useState('bento'); // bento, glass, sharp, retro, soft

  // --- MAPPING DES STYLES DE BOUTONS ---
  const buttonConfigs = {
    bento: "rounded-2xl shadow-sm hover:shadow-md active:scale-95",
    glass: "rounded-xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/30",
    sharp: "rounded-none border-2 border-current hover:bg-slate-900 hover:text-white",
    retro: "rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1",
    soft: "rounded-full shadow-xl shadow-current/10 hover:shadow-current/30"
  };

  // --- MAPPING DES THÈMES DE COULEURS ---
  const themeConfigs = {
    indigo: { bg: "bg-slate-50", text: "text-slate-900", accent: "indigo-600", sidebar: "bg-slate-900" },
    midnight: { bg: "bg-[#020617]", text: "text-slate-100", accent: "blue-500", sidebar: "bg-black" },
    cyber: { bg: "bg-[#0a0a0c]", text: "text-[#00ff9f]", accent: "[#00ff9f]", sidebar: "bg-[#121214]" },
    forest: { bg: "bg-[#f0f4f0]", text: "text-[#1a2e1a]", accent: "emerald-600", sidebar: "bg-[#1a2e1a]" },
    sunset: { bg: "bg-[#fffaf5]", text: "text-[#4a2c2a]", accent: "orange-500", sidebar: "bg-[#4a2c2a]" }
  };

  const activeStyles = themeConfigs[currentTheme];
  const activeBtnClass = buttonConfigs[btnStyle];

  // --- LOGIQUE DE RENDU ---
  const renderContent = () => {
    // Props partagées pour maintenir la cohérence du design
    const commonProps = { 
      theme: currentTheme, 
      btnClass: activeBtnClass,
      accentColor: activeStyles.accent 
    };

    switch (activeTab) {
      case 'overview':  return <Overview {...commonProps} />;
      case 'users':     return <Users {...commonProps} />;
      case 'products':  return <Products {...commonProps} />;
      case 'analytics': return <Analytics {...commonProps} />;
      case 'marketing': return <Campaigns {...commonProps} />;
      case 'messages':  return <Messages {...commonProps} />;
      case 'security':  return <Security {...commonProps} />;
      case 'settings':  
        return (
          <Settings 
            currentTheme={currentTheme} 
            setCurrentTheme={setCurrentTheme}
            btnStyle={btnStyle}
            setBtnStyle={setBtnStyle}
            {...commonProps}
          />
        );
      default:          return <Overview {...commonProps} />;
    }
  };

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-500 ${activeStyles.bg} ${activeStyles.text} overflow-hidden`}>
      
      {/* Notifications Globales */}
      <Toaster position="bottom-right" richColors expand={false} />

      {/* --- SIDEBAR --- */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        themeConfig={activeStyles}
      />

      {/* --- ZONE PRINCIPALE --- */}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-500 ${isSidebarOpen ? 'blur-sm md:blur-none' : ''} md:ml-72`}>
        
        {/* --- HEADER DYNAMIQUE --- */}
        <header className={`sticky top-0 z-20 backdrop-blur-md px-6 md:px-10 py-6 flex justify-between items-center transition-all ${activeStyles.bg}/80`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className={`md:hidden p-3 bg-white shadow-sm border border-slate-200 rounded-2xl text-slate-600 active:scale-90 transition-transform`}
            >
              <Menu size={24} />
            </button>
            
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter flex items-center gap-3">
                Nexus <span className={`text-${activeStyles.accent}`}>OS</span>
              </h1>
              <p className="hidden md:block text-[10px] font-bold opacity-50 uppercase tracking-[0.3em]">
                System Monitoring • {currentTheme} mode
              </p>
            </div>
          </div>

          {/* Actions de droite */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden lg:flex items-center bg-white/50 border border-slate-200 px-4 py-2.5 rounded-2xl w-64 group focus-within:ring-2 transition-all">
              <Search size={18} className="opacity-40" />
              <input type="text" placeholder="Recherche système..." className="bg-transparent border-none outline-none text-sm ml-3 w-full font-medium" />
            </div>

            <div className="relative">
              <button className={`p-3 rounded-2xl shadow-sm border border-slate-200 hover:scale-110 transition-all`}>
                <Bell size={20} />
              </button>
              <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>
            </div>

            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block leading-tight">
                <p className="text-xs font-black uppercase tracking-tighter">Admin_Root</p>
                <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Active_Node</p>
              </div>
              <div className={`w-10 md:w-12 h-10 md:h-12 bg-gradient-to-tr from-${activeStyles.accent} to-purple-600 rounded-2xl border-2 border-white shadow-lg flex items-center justify-center text-white font-bold`}>
                AD
              </div>
            </div>
          </div>
        </header>

        {/* --- ESPACE DE TRAVAIL --- */}
        <div className="px-6 md:px-10 pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${currentTheme}`} // Force le re-render lors du changement de thème
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}

export default App;