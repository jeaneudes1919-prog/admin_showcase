import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  acquisitionData, userRetentionData, realTimeTraffic, 
  serverPerformance, growthData 
} from '../../data/mockData';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, AreaChart, Area, BarChart, Bar, Legend
} from 'recharts';
import { TrendingUp, Activity, Server, Globe, Zap, ArrowUpRight, Clock } from 'lucide-react';

const Analytics = ({ theme, btnClass, accentColor }) => {
  const [viewMode, setViewMode] = useState('realtime');

  // --- MAPPING DES COULEURS POUR RECHARTS (HEXADÉCIMAL) ---
  const chartColors = {
    indigo: "#6366f1", midnight: "#3b82f6", cyber: "#00ff9f", forest: "#10b981", sunset: "#f59e0b"
  };

  const activeChartColor = chartColors[theme];

  // --- THÉMATISATION DYNAMIQUE ---
  const themeStyles = {
    indigo: { card: "bg-white", text: "text-slate-800", sub: "text-slate-500", border: "border-slate-100", chartGrid: "#f1f5f9" },
    midnight: { card: "bg-slate-900", text: "text-white", sub: "text-slate-400", border: "border-slate-800", chartGrid: "#1e293b" },
    cyber: { card: "bg-zinc-900", text: "text-[#00ff9f]", sub: "text-[#00ff9f]/60", border: "border-[#00ff9f]/20", chartGrid: "#27272a" },
    forest: { card: "bg-[#f8faf8]", text: "text-[#1a2e1a]", sub: "text-[#1a2e1a]/50", border: "border-emerald-100", chartGrid: "#ecfdf5" },
    sunset: { card: "bg-white", text: "text-[#4a2c2a]", sub: "text-[#4a2c2a]/60", border: "border-orange-100", chartGrid: "#fff7ed" }
  };

  const s = themeStyles[theme];

  return (
    <div className="space-y-8 pb-10 px-2 sm:px-0">
      {/* --- HEADER AVEC SWITCH --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className={`text-3xl font-black ${s.text} tracking-tighter uppercase italic`}>Data Center</h2>
          <p className={`${s.sub} font-bold text-xs uppercase tracking-[0.2em]`}>
            {viewMode === 'realtime' ? 'Flux en direct (Noeuds)' : 'Analyse de croissance'}
          </p>
        </div>
        
        <div className={`${s.card} p-1.5 rounded-2xl border ${s.border} shadow-sm flex w-full md:w-auto`}>
          <button 
            onClick={() => setViewMode('realtime')}
            className={`${btnClass} flex-1 md:flex-none px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
              viewMode === 'realtime' ? `bg-${accentColor} text-white shadow-lg` : `${s.sub} hover:bg-slate-50`
            }`}
          >
            Temps Réel
          </button>
          <button 
            onClick={() => setViewMode('history')}
            className={`${btnClass} flex-1 md:flex-none px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
              viewMode === 'history' ? `bg-${accentColor} text-white shadow-lg` : `${s.sub} hover:bg-slate-50`
            }`}
          >
            Historique
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'realtime' ? (
          <motion.div 
            key="realtime" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Traffic Pulse */}
              <div className={`${s.card} lg:col-span-2 p-8 rounded-[2.5rem] border ${s.border} shadow-sm relative overflow-hidden`}>
                <div className="flex justify-between items-center mb-8">
                  <h3 className={`font-black uppercase tracking-tighter ${s.text} flex items-center gap-3`}>
                    <span className={`w-3 h-3 bg-${accentColor} rounded-full animate-ping`}></span>
                    Utilisateurs Actifs
                  </h3>
                  <span className={`text-3xl font-black text-${accentColor} tracking-tighter`}>1,204</span>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={realTimeTraffic}>
                      <defs>
                        <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={activeChartColor} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={activeChartColor} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={s.chartGrid} />
                      <XAxis dataKey="time" hide />
                      <Tooltip contentStyle={{borderRadius: '20px', border: 'none', background: theme === 'midnight' ? '#0f172a' : '#fff'}} />
                      <Area type="stepAfter" dataKey="users" stroke={activeChartColor} strokeWidth={4} fill="url(#colorPulse)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Server Load Gauges */}
              <div className={`p-8 rounded-[2.5rem] ${theme === 'midnight' || theme === 'cyber' ? 'bg-black/40' : 'bg-slate-900'} text-white shadow-2xl relative overflow-hidden`}>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                  <Server size={18} className={`text-${accentColor}`} /> Load Balancer
                </h3>
                <div className="space-y-8 relative z-10">
                  {serverPerformance.map(item => (
                    <div key={item.name} className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>{item.name} Unit</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className={`h-2 w-full ${theme === 'midnight' ? 'bg-white/5' : 'bg-slate-800'} rounded-full overflow-hidden`}>
                        <motion.div 
                          initial={{ width: 0 }} animate={{ width: `${item.value}%` }} 
                          className={`h-full bg-${accentColor} shadow-[0_0_15px_rgba(0,0,0,0.2)]`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`mt-10 p-4 bg-white/5 rounded-2xl border border-white/10`}>
                  <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Zap size={14} fill="currentColor" /> Latence Optimale : 12ms
                  </p>
                </div>
                <Activity className="absolute -bottom-10 -right-10 w-48 h-48 opacity-5 text-white" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="history" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Croissance Mensuelle */}
              <div className={`${s.card} lg:col-span-2 p-8 rounded-[2.5rem] border ${s.border} shadow-sm`}>
                <h3 className={`text-sm font-black uppercase tracking-widest ${s.text} mb-8`}>
                  <TrendingUp size={18} className={`inline mr-2 text-${accentColor}`} /> Tendance de Croissance
                </h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={s.chartGrid} />
                      <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                      <YAxis hide />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '20px', border: 'none'}} />
                      <Bar dataKey="current" name="Actuel" fill={activeChartColor} radius={[8, 8, 0, 0]} />
                      <Bar dataKey="previous" name="Précédent" fill={theme === 'midnight' ? '#1e293b' : '#e2e8f0'} radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className={`${s.card} p-8 rounded-[2.5rem] border ${s.border} shadow-sm flex flex-col`}>
                <div className="mb-8">
                  <h3 className={`text-sm font-black uppercase tracking-widest ${s.text} flex items-center gap-3`}>
                    <Globe size={18} className={`text-${accentColor}`} /> Top Zones
                  </h3>
                </div>
                <div className="space-y-6 flex-1">
                  {[
                    { country: "Bénin", val: "65%", color: `bg-${accentColor}` },
                    { country: "Nigeria", val: "20%", color: "bg-slate-400" },
                    { country: "Togo", val: "10%", color: "bg-slate-300" }
                  ].map(region => (
                    <div key={region.country}>
                      <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                        <span className={s.text}>{region.country}</span>
                        <span className={`text-${accentColor}`}>{region.val}</span>
                      </div>
                      <div className={`h-1.5 w-full ${theme === 'midnight' ? 'bg-white/5' : 'bg-slate-50'} rounded-full`}>
                        <div className={`h-full rounded-full ${region.color}`} style={{width: region.val}}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className={`${btnClass} w-full py-4 mt-8 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-lg`}>
                  Exporter le rapport .CSV
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- KPIs RÉCAPITULATIFS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Visites", val: "1.2M", up: true, perc: "12%" },
          { label: "Taux Rebond", val: "24%", up: false, perc: "2%" },
          { label: "Conversion", val: "3.2%", up: true, perc: "0.5%" },
          { label: "Temps", val: "4m 32s", up: true, perc: "18s" }
        ].map((kpi, i) => (
          <div key={i} className={`${s.card} p-6 rounded-[2rem] border ${s.border} shadow-sm group hover:scale-105 transition-transform`}>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <h4 className={`text-2xl font-black ${s.text} tracking-tighter`}>{kpi.val}</h4>
              <span className={`text-[9px] font-black px-2 py-1 rounded-lg flex items-center gap-1 ${kpi.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                <ArrowUpRight size={10} className={kpi.up ? '' : 'rotate-90'} />
                {kpi.perc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;