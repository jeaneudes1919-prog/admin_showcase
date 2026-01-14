import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { campaignsData as initialData } from '../../data/mockData';
import { 
  Target, Rocket, CheckCircle2, X, TrendingUp, 
  Users, DollarSign, BarChart3, Calendar, MousePointer2, Play, Pause, FileDown
} from 'lucide-react';
import { toast } from 'sonner';

const Campaigns = ({ theme, btnClass, accentColor }) => {
  // --- ÉTATS ---
  const [campaigns, setCampaigns] = useState(initialData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingCampaign, setViewingCampaign] = useState(null);

  // --- THÉMATISATION DYNAMIQUE ---
  const themeStyles = {
    indigo: { card: "bg-white", text: "text-slate-800", sub: "text-slate-500", border: "border-slate-100", track: "bg-slate-50" },
    midnight: { card: "bg-slate-900", text: "text-white", sub: "text-slate-400", border: "border-slate-800", track: "bg-black/20" },
    cyber: { card: "bg-zinc-900", text: "text-[#00ff9f]", sub: "text-[#00ff9f]/60", border: "border-[#00ff9f]/20", track: "bg-black/40" },
    forest: { card: "bg-[#f8faf8]", text: "text-[#1a2e1a]", sub: "text-emerald-900/50", border: "border-emerald-100", track: "bg-emerald-50/50" },
    sunset: { card: "bg-white", text: "text-[#4a2c2a]", sub: "text-[#4a2c2a]/60", border: "border-orange-100", track: "bg-orange-50/30" }
  };

  const s = themeStyles[theme];

  // --- ACTIONS FONCTIONNELLES (CONSERVÉES) ---
  const toggleCampaignStatus = (id) => {
    setCampaigns(prev => prev.map(camp => {
      if (camp.id === id) {
        const isCurrentlyActive = camp.status === 'Active';
        const newStatus = isCurrentlyActive ? 'En pause' : 'Active';
        if (isCurrentlyActive) {
          toast.warning(`Campagne mise en pause`, { description: `"${camp.name}" ne diffuse plus d'annonces.` });
        } else {
          toast.success(`Campagne relancée`, { description: `"${camp.name}" est de nouveau active.` });
        }
        if (viewingCampaign && viewingCampaign.id === id) {
          setViewingCampaign({ ...camp, status: newStatus });
        }
        return { ...camp, status: newStatus };
      }
      return camp;
    }));
  };

  const handleDownloadPDF = (name) => {
    toast.promise(new Promise((res) => setTimeout(res, 2000)), {
      loading: `Génération du rapport PDF pour ${name}...`,
      success: () => `Rapport "${name}.pdf" téléchargé !`,
      error: 'Erreur lors de la génération.',
    });
  };

  const handleAddCampaign = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const newCamp = {
      id: Date.now(),
      name: name,
      budget: `${Number(formData.get('budget')).toLocaleString()} CFA`,
      spent: "0 CFA",
      roi: "---",
      status: "Active",
      reach: "0",
    };
    setCampaigns([newCamp, ...campaigns]);
    setIsAddModalOpen(false);
    toast.success("Campagne créée !");
  };

  const getProgress = (spent, budget) => {
    const s = parseInt(spent.replace(/[^0-9]/g, '')) || 0;
    const b = parseInt(budget.replace(/[^0-9]/g, '')) || 1;
    return Math.min(100, (s / b) * 100);
  };

  return (
    <div className="space-y-6 md:space-y-10 pb-24 px-2 sm:px-0">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="text-center md:text-left">
          <h2 className={`text-3xl md:text-4xl font-black ${s.text} tracking-tighter uppercase italic`}>Marketing</h2>
          <p className={`${s.sub} font-black text-[10px] uppercase tracking-[0.3em]`}>Gestion des budgets publicitaires</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className={`${btnClass} w-full md:w-auto flex items-center justify-center gap-3 bg-${accentColor} text-white px-8 py-4 font-black uppercase text-xs tracking-widest shadow-xl shadow-${accentColor}/20`}
        >
          <Rocket size={20} />
          <span>Lancer une campagne</span>
        </button>
      </div>

      {/* --- GRID DES CAMPAGNES --- */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {campaigns.map((camp) => (
            <motion.div
              layout
              key={camp.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`${s.card} p-6 md:p-8 rounded-[2.5rem] border ${s.border} shadow-sm hover:shadow-2xl transition-all relative overflow-hidden group`}
            >
              {/* Badge & Action Rapide */}
              <div className="absolute top-6 right-6 flex items-center gap-3">
                <button 
                  onClick={() => toggleCampaignStatus(camp.id)}
                  className={`${btnClass} p-2 transition-colors ${camp.status === 'Active' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}
                >
                  {camp.status === 'Active' ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${camp.status === 'Active' ? `bg-${accentColor} animate-pulse` : 'bg-slate-300'}`}></span>
                  <span className={`text-[9px] font-black uppercase ${s.sub} tracking-widest`}>{camp.status}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className={`${btnClass} p-4 ${camp.status === 'Active' ? `bg-${accentColor}/10 text-${accentColor}` : 'bg-slate-100 text-slate-400'}`}>
                  <Target size={24} />
                </div>
                <h3 className={`text-lg md:text-xl font-black leading-tight ${camp.status === 'Active' ? s.text : s.sub}`}>{camp.name}</h3>
              </div>

              <div className="space-y-6">
                <div className={`h-2.5 w-full ${s.track} rounded-full overflow-hidden border ${s.border}`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgress(camp.spent, camp.budget)}%` }}
                    className={`h-full rounded-full ${camp.status === 'Active' ? `bg-${accentColor}` : 'bg-slate-300'}`}
                  />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <p className={`text-xl font-black ${s.text}`}>{camp.budget}</p>
                  <button 
                    onClick={() => setViewingCampaign(camp)}
                    className={`${btnClass} px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-${accentColor}`}
                  >
                    Rapport
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- MODALE : RAPPORT DÉTAILLÉ --- */}
      <AnimatePresence>
        {viewingCampaign && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-lg">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className={`${s.card} w-full max-w-2xl rounded-t-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-${accentColor}/20`}
            >
              <div className={`p-6 md:p-8 bg-slate-900 text-white flex justify-between items-center`}>
                <div className="flex items-center gap-4">
                  <BarChart3 size={24} className={`text-${accentColor}`}/>
                  <h3 className="text-lg md:text-xl font-black truncate uppercase italic tracking-tighter">{viewingCampaign.name}</h3>
                </div>
                <button onClick={() => setViewingCampaign(null)} className="p-2 bg-white/10 rounded-xl"><X size={20}/></button>
              </div>

              <div className="p-6 md:p-10 space-y-8">
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {[
                    { label: "Reach", val: viewingCampaign.reach, icon: Users },
                    { label: "ROI", val: viewingCampaign.roi, icon: TrendingUp },
                    { label: "Status", val: viewingCampaign.status, icon: Rocket },
                  ].map((stat, i) => (
                    <div key={i} className={`${s.track} p-4 rounded-2xl text-center border ${s.border}`}>
                      <p className={`text-sm md:text-lg font-black ${s.text}`}>{stat.val}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => handleDownloadPDF(viewingCampaign.name)}
                    className={`${btnClass} flex-1 py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2`}
                  >
                    <FileDown size={18} /> Télécharger PDF
                  </button>
                  
                  <button 
                    onClick={() => toggleCampaignStatus(viewingCampaign.id)}
                    className={`${btnClass} flex-1 py-4 font-black text-[10px] uppercase tracking-widest transition-all ${
                      viewingCampaign.status === 'Active' 
                      ? 'bg-rose-50 text-rose-600' 
                      : `bg-${accentColor}/10 text-${accentColor}`
                    }`}
                  >
                    {viewingCampaign.status === 'Active' ? "Mettre en pause" : "Relancer la campagne"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODALE D'AJOUT --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
              className={`${s.card} w-full max-w-lg rounded-t-[2rem] sm:rounded-[2rem] p-8 shadow-2xl border ${s.border}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-black ${s.text} uppercase tracking-tighter italic`}>Lancer une campagne</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
              </div>
              <form onSubmit={handleAddCampaign} className="space-y-4">
                <input name="name" type="text" placeholder="Nom de la campagne" className={`w-full p-4 ${s.track} rounded-xl outline-none border-none font-bold ${s.text}`} required />
                <input name="budget" type="number" placeholder="Budget (CFA)" className={`w-full p-4 ${s.track} rounded-xl outline-none border-none font-bold ${s.text}`} required />
                <button type="submit" className={`${btnClass} w-full py-5 bg-${accentColor} text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-${accentColor}/30`}>
                  Confirmer le budget
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Campaigns;