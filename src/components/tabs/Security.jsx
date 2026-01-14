import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { securityLogs } from '../../data/mockData';
import { 
  ShieldAlert, ShieldCheck, Key, Eye, GlobeLock, 
  Lock, Zap, Server, Shield, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

const Security = ({ theme, btnClass, accentColor }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [threatLevel, setThreatLevel] = useState(98);

  // --- THÉMATISATION DYNAMIQUE ---
  const themeStyles = {
    indigo: { card: "bg-white", text: "text-slate-800", sub: "text-slate-500", border: "border-slate-100", tableHead: "bg-slate-50/50" },
    midnight: { card: "bg-slate-900", text: "text-white", sub: "text-slate-400", border: "border-slate-800", tableHead: "bg-black/20" },
    cyber: { card: "bg-zinc-900", text: "text-[#00ff9f]", sub: "text-[#00ff9f]/60", border: "border-[#00ff9f]/20", tableHead: "bg-[#00ff9f]/5" },
    forest: { card: "bg-[#f8faf8]", text: "text-[#1a2e1a]", sub: "text-[#1a2e1a]/50", border: "border-emerald-100", tableHead: "bg-emerald-50/50" },
    sunset: { card: "bg-white", text: "text-[#4a2c2a]", sub: "text-[#4a2c2a]/60", border: "border-orange-100", tableHead: "bg-orange-50/30" }
  };

  const s = themeStyles[theme];

  // Logic pour Recharts/Gauge (Conversion Tailwind color en Hex)
  const accentHex = {
    indigo: "#6366f1", midnight: "#3b82f6", cyber: "#00ff9f", forest: "#10b981", sunset: "#f59e0b"
  };

  const startScan = () => {
    setIsScanning(true);
    toast.info("Initialisation du SOC...", {
      description: "Scan heuristique des paquets sur Node-Cotonou-01",
      className: `bg-${accentColor} text-white border-none rounded-2xl`
    });
    
    setTimeout(() => {
      setIsScanning(false);
      toast.success("Scan terminé", {
        description: "Périmètre sécurisé. Aucun rootkit détecté.",
      });
    }, 4000);
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-20 px-2 sm:px-0">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-3xl font-black ${s.text} tracking-tighter uppercase italic`}>Nexus Shield</h2>
          <p className={`${s.sub} font-black text-[10px] uppercase tracking-[0.3em]`}>Monitoring Cyber-Défense Actif</p>
        </div>
        <button 
          onClick={startScan}
          disabled={isScanning}
          className={`${btnClass} w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-${accentColor} text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-${accentColor}/20 transition-all`}
        >
          <RefreshCw size={20} className={isScanning ? 'animate-spin' : ''} />
          {isScanning ? 'Analyse en cours...' : 'Scanner le Réseau'}
        </button>
      </div>

      {/* --- GRID PRINCIPALE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Gauge de Protection */}
        <div className={`lg:col-span-2 ${theme === 'midnight' || theme === 'cyber' ? 'bg-black/40' : 'bg-slate-900'} p-8 md:p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border ${s.border}`}>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle cx="88" cy="88" r="75" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                <motion.circle 
                  cx="88" cy="88" r="75" stroke={accentHex[theme]} strokeWidth="12" fill="transparent" 
                  strokeDasharray="471"
                  initial={{ strokeDashoffset: 471 }}
                  animate={{ strokeDashoffset: 471 - (471 * threatLevel) / 100 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black tracking-tighter">{threatLevel}%</span>
                <span className={`text-[10px] uppercase font-black text-${accentColor} tracking-[0.2em]`}>Secure</span>
              </div>
            </div>

            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-${accentColor}`}>
                <ShieldCheck size={18} className="animate-pulse" />
                <span className="font-black text-[10px] uppercase tracking-widest">Protocoles Intègres</span>
              </div>
              <h3 className="text-3xl font-black tracking-tighter leading-none">Protection Heuristique</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
                Pare-feu adaptatif actif sur <strong>Node-CTN-01</strong>. Analyse des flux TLS 1.3 en temps réel.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {['WAF: Active', 'IPS: Active', 'DDoS: Shield'].map((label, idx) => (
                  <span key={idx} className={`px-3 py-1 bg-white/5 text-[9px] font-black uppercase tracking-tighter rounded-lg border border-white/10 text-slate-300`}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <GlobeLock className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 opacity-10 group-hover:scale-110 transition-transform duration-700" />
        </div>

        {/* Widgets Authentification */}
        <div className="space-y-6">
          {[
            { label: "Double Auth (2FA)", icon: Key, status: "Sécurisé", active: true },
            { label: "Chiffrement AES", icon: Lock, status: "En attente", active: false }
          ].map((item, i) => (
            <div key={i} className={`${s.card} p-8 rounded-[2.5rem] border ${s.border} shadow-sm group hover:scale-105 transition-all`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`${btnClass} p-4 ${item.active ? `bg-${accentColor}/10 text-${accentColor}` : 'bg-slate-50 text-slate-400'}`}>
                  <item.icon size={28}/>
                </div>
                <div className={`flex h-7 w-14 ${item.active ? `bg-${accentColor}/20` : 'bg-slate-200'} rounded-full p-1 cursor-pointer relative`}>
                  <motion.div 
                    animate={{ x: item.active ? 28 : 0 }}
                    className={`h-5 w-5 ${item.active ? `bg-${accentColor}` : 'bg-slate-500'} rounded-full shadow-md`}
                  />
                </div>
              </div>
              <h4 className={`font-black ${s.text} uppercase tracking-tighter`}>{item.label}</h4>
              <p className={`text-[10px] font-black uppercase mt-1 tracking-widest ${item.active ? 'text-emerald-500' : 'text-slate-400'}`}>
                {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- JOURNAUX D'ACCÈS (LOGS) --- */}
      <div className={`${s.card} rounded-[3rem] border ${s.border} shadow-sm overflow-hidden`}>
        <div className={`p-6 md:p-8 border-b ${s.border} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${s.tableHead}`}>
          <div className="flex items-center gap-4">
            <Server className={`text-${accentColor}`} size={24} />
            <h3 className={`font-black ${s.text} uppercase tracking-tighter italic`}>Logs d'accès récents</h3>
          </div>
          <button className={`${btnClass} text-[9px] font-black text-white bg-slate-900 px-6 py-2.5 uppercase tracking-widest hover:bg-${accentColor}`}>
            Exporter .JSON
          </button>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden divide-y divide-slate-50">
          {securityLogs.map(log => (
            <div key={log.id} className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                  log.status === 'warning' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {log.status === 'warning' ? 'Alert' : 'Secure'}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{log.date}</span>
              </div>
              <h4 className={`font-black text-xs ${s.text} uppercase`}>{log.event}</h4>
              <p className={`text-[10px] font-mono p-3 rounded-xl ${theme === 'midnight' ? 'bg-black/40' : 'bg-slate-50'} ${s.sub}`}>{log.ip}</p>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Événement SOC</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">IP Source</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Horodatage</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {securityLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl ${log.status === 'warning' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'}`}>
                        {log.status === 'warning' ? <ShieldAlert size={18}/> : <Shield size={18}/>}
                      </div>
                      <span className={`text-sm font-black ${s.text} tracking-tight`}>{log.event}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-5 text-xs font-mono font-bold ${s.sub}`}>{log.ip}</td>
                  <td className={`px-6 py-5 text-xs font-black uppercase ${s.sub} tracking-tighter`}>{log.date}</td>
                  <td className="px-8 py-5 text-right">
                    <button className={`${btnClass} p-2.5 bg-slate-100 text-slate-400 hover:text-${accentColor}`}>
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Security;