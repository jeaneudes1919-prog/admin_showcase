import React from 'react';
import { motion } from 'framer-motion';
import { 
  statsData, revenueData, skillData, composedData, scatterData 
} from '../../data/mockData';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ComposedChart, Bar, Line,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { ArrowUpRight, Zap, Globe, Shield, Server, Activity, TrendingUp } from 'lucide-react';

const Overview = ({ theme, btnClass, accentColor }) => {
  
  // CONFIGURATION DYNAMIQUE DES COULEURS POUR LES GRAPHIQUES
  const themePalette = {
    indigo: { primary: "#6366f1", secondary: "#818cf8", bg: "bg-white", text: "text-slate-800" },
    midnight: { primary: "#3b82f6", secondary: "#1d4ed8", bg: "bg-slate-900", text: "text-white" },
    cyber: { primary: "#00ff9f", secondary: "#00d1ff", bg: "bg-zinc-900", text: "text-[#00ff9f]" },
    forest: { primary: "#10b981", secondary: "#059669", bg: "bg-[#f8faf8]", text: "text-[#1a2e1a]" },
    sunset: { primary: "#f59e0b", secondary: "#ea580c", bg: "bg-white", text: "text-[#4a2c2a]" }
  };

  const activePalette = themePalette[theme];

  // Styles de cartes dynamiques
  const cardBase = `${activePalette.bg} border border-slate-100 shadow-sm rounded-[2.5rem] p-6 md:p-8 transition-all duration-500`;

  return (
    <div className="space-y-8 pb-12">
      
      {/* --- SECTION 1: TOP STATS (BENTO STYLE) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, i) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={stat.id} 
            className={cardBase}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-${accentColor}/10 text-${accentColor} shadow-inner`}>
                <Zap size={24} />
              </div>
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
            <h3 className={`text-3xl font-black mt-1 ${activePalette.text} tracking-tighter`}>{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* --- SECTION 2: ANALYSE DES REVENUS (GRAND FORMAT) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-2 ${cardBase}`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className={`text-xl font-black uppercase tracking-tighter ${activePalette.text}`}>Analyse des Flux</h3>
            <div className="flex gap-2">
                <div className={`w-3 h-3 rounded-full bg-${accentColor}`}></div>
                <div className="w-3 h-3 rounded-full bg-slate-100"></div>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorTheme" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={activePalette.primary} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={activePalette.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'midnight' ? '#1e293b' : '#f1f5f9'} />
                <XAxis dataKey="name" hide />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="income" stroke={activePalette.primary} strokeWidth={4} fillOpacity={1} fill="url(#colorTheme)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Objectif Mensuel Stylisé */}
        <div className={`p-8 rounded-[3rem] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden bg-${accentColor}`}>
          <div className="relative z-10">
            <h3 className="text-xl font-black uppercase tracking-widest text-white/80">Uptime Réseau</h3>
            <p className="text-4xl font-black mt-2 tracking-tighter">99.9%</p>
          </div>
          <div className="relative z-10 flex justify-center items-center py-6">
             <div className="w-32 h-32 flex items-center justify-center border-[10px] border-white/20 rounded-full">
                <Activity size={40} className="animate-pulse" />
             </div>
          </div>
          <button className={`${btnClass} w-full bg-white text-${accentColor} py-4 font-black uppercase text-xs tracking-[0.2em]`}>
            Rapport Système
          </button>
          <Globe className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 rotate-12" />
        </div>
      </div>

      {/* --- SECTION 3: ANALYSES AVANCÉES (RADAR & COMPOSED) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Radar : Capacité Réseau */}
        <div className={cardBase}>
          <h3 className={`text-sm font-black uppercase tracking-widest mb-6 ${activePalette.text}`}>Capacité Node</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke={theme === 'midnight' ? '#334155' : '#e2e8f0'} />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                <Radar name="Actuel" dataKey="A" stroke={activePalette.primary} fill={activePalette.primary} fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Composed : Ventes vs Prévisions */}
        <div className={cardBase}>
          <h3 className={`text-sm font-black uppercase tracking-widest mb-6 ${activePalette.text}`}>Prévisions Flux</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={composedData}>
                <CartesianGrid stroke={theme === 'midnight' ? '#1e293b' : '#f1f5f9'} vertical={false} />
                <XAxis dataKey="name" hide />
                <Tooltip />
                <Bar dataKey="ventes" barSize={20} fill={activePalette.primary} radius={[10, 10, 0, 0]} />
                <Line type="monotone" dataKey="objectif" stroke={activePalette.secondary} strokeWidth={3} dot={{r: 4}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scatter : Densité de Connexion */}
        <div className={cardBase}>
          <h3 className={`text-sm font-black uppercase tracking-widest mb-6 ${activePalette.text}`}>Densité Trafic</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'midnight' ? '#1e293b' : '#f1f5f9'} />
                <XAxis type="number" dataKey="x" hide />
                <YAxis type="number" dataKey="y" hide />
                <ZAxis type="number" dataKey="z" range={[60, 400]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Utilisateurs" data={scatterData} fill={activePalette.primary} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- SECTION 4: WIDGETS TECHNIQUES --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Status Serveur */}
        <div className={`p-8 rounded-[2.5rem] border ${theme === 'midnight' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-900'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20"><Server size={24}/></div>
            <h4 className="font-black uppercase tracking-tighter">Status Serveur</h4>
          </div>
          <div className="space-y-3">
            <div className={`flex justify-between items-center p-4 rounded-2xl ${theme === 'midnight' ? 'bg-white/5' : 'bg-white/60'}`}>
              <span className="text-xs font-bold">Node-Cotonou-01</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            </div>
            <div className={`flex justify-between items-center p-4 rounded-2xl ${theme === 'midnight' ? 'bg-white/5' : 'bg-white/60'}`}>
              <span className="text-xs font-bold">Cloud-Storage</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            </div>
          </div>
        </div>

        {/* Trafic Zone (Sombre) */}
        <div className={`p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`p-3 bg-${accentColor} rounded-2xl shadow-lg shadow-${accentColor}/20`}><Globe size={24}/></div>
            <h4 className="font-black uppercase tracking-tighter italic">Flux Géographique</h4>
          </div>
          <div className="space-y-6 relative z-10">
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase mb-2"><span>Bénin</span><span>88%</span></div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} className={`bg-${accentColor} h-full`} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase mb-2"><span>Nigeria</span><span>12%</span></div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-600 h-full w-[12%]"></div>
              </div>
            </div>
          </div>
          <TrendingUp className="absolute -bottom-6 -right-6 w-32 h-32 opacity-5 group-hover:rotate-12 transition-transform" />
        </div>

        {/* Sécurité */}
        <div className={`p-8 rounded-[2.5rem] border ${theme === 'midnight' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-rose-50 border-rose-100 text-rose-900'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-rose-500 text-white rounded-2xl shadow-lg shadow-rose-500/20"><Shield size={24}/></div>
            <h4 className="font-black uppercase tracking-tighter text-rose-600">Sécurité Active</h4>
          </div>
          <div className="text-center py-4">
            <span className="text-6xl font-black tracking-tighter">1.2k</span>
            <p className="text-[10px] font-black uppercase mt-2 tracking-[0.2em] opacity-60">Attaques Bloquées</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Overview;