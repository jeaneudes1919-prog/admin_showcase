import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usersData as initialData } from '../../data/mockData';
import { 
  Search, UserPlus, Eye, Filter, MapPin, Trash2, X, Shield 
} from 'lucide-react';
import { toast } from 'sonner';

const Users = ({ theme, btnClass, accentColor }) => {
  // --- ÉTATS ---
  const [users, setUsers] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // --- THÉMATISATION DYNAMIQUE ---
  const themeStyles = {
    indigo: { card: "bg-white", text: "text-slate-800", sub: "text-slate-500", border: "border-slate-100", head: "bg-slate-50/50" },
    midnight: { card: "bg-slate-900", text: "text-white", sub: "text-slate-400", border: "border-slate-800", head: "bg-black/20" },
    cyber: { card: "bg-zinc-900", text: "text-[#00ff9f]", sub: "text-white/50", border: "border-[#00ff9f]/20", head: "bg-[#00ff9f]/5" },
    forest: { card: "bg-[#f8faf8]", text: "text-[#1a2e1a]", sub: "text-emerald-800/50", border: "border-emerald-100", head: "bg-emerald-50/50" },
    sunset: { card: "bg-white", text: "text-[#4a2c2a]", sub: "text-[#4a2c2a]/60", border: "border-orange-100", head: "bg-orange-50/30" }
  };

  const s = themeStyles[theme];

  // --- LOGIQUE ---
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id, name) => {
    setUsers(users.filter(u => u.id !== id));
    toast.error(`Membre révoqué`, {
      description: `${name} a été supprimé des accès Nexus.`,
    });
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-3xl font-black ${s.text} tracking-tighter uppercase italic`}>Base de Données</h2>
          <p className={`${s.sub} font-medium text-sm uppercase tracking-widest`}>Monitoring de {users.length} noeuds actifs</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className={`${btnClass} w-full sm:w-auto flex items-center justify-center gap-3 bg-${accentColor} text-white px-8 py-4 font-black text-xs uppercase tracking-widest shadow-xl shadow-${accentColor}/20`}
        >
          <UserPlus size={18} /> Nouveau Membre
        </button>
      </div>

      {/* --- RECHERCHE --- */}
      <div className={`${s.card} p-3 rounded-[2.5rem] shadow-sm border ${s.border} flex flex-col md:flex-row gap-3`}>
        <div className="relative flex-1 group">
          <Search className={`absolute left-5 top-1/2 -translate-y-1/2 text-${accentColor} opacity-50 group-focus-within:opacity-100 transition-opacity`} size={20} />
          <input 
            type="text"
            placeholder="Rechercher par identifiant ou poste..."
            className={`w-full pl-14 pr-4 py-4 ${theme === 'midnight' || theme === 'cyber' ? 'bg-black/20' : 'bg-slate-50'} border-none rounded-[1.8rem] focus:ring-2 focus:ring-${accentColor}/50 outline-none font-bold ${s.text} text-sm`}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={`${btnClass} flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest`}>
          <Filter size={18} /> Filtres
        </button>
      </div>

      {/* --- VUE MOBILE --- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        <AnimatePresence mode="popLayout">
          {filteredUsers.map((user) => (
            <motion.div 
              layout key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={`${s.card} p-6 rounded-[2.5rem] border ${s.border} shadow-sm space-y-5`}
            >
              <div className="flex items-center gap-4">
                <img src={user.avatar} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-lg" />
                <div>
                  <h4 className={`font-black ${s.text}`}>{user.name}</h4>
                  <p className={`text-[10px] font-black uppercase tracking-widest text-${accentColor}`}>{user.role}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t border-slate-50">
                <button onClick={() => setSelectedUser(user)} className={`${btnClass} flex-1 py-3 bg-${accentColor}/10 text-${accentColor} font-black text-[10px] uppercase tracking-widest`}>Détails</button>
                <button onClick={() => handleDelete(user.id, user.name)} className={`${btnClass} p-3 bg-rose-50 text-rose-500`}><Trash2 size={18} /></button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- TABLEAU PC --- */}
      <div className={`${s.card} hidden md:block rounded-[3rem] shadow-sm border ${s.border} overflow-hidden`}>
        <table className="w-full text-left">
          <thead className={s.head}>
            <tr>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Membre du Réseau</th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Poste / Node</th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Statut</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <AnimatePresence mode="popLayout">
              {filteredUsers.map((user) => (
                <motion.tr layout key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={user.avatar} className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-110 transition-transform" />
                      <div>
                        <p className={`font-black ${s.text} text-sm`}>{user.name}</p>
                        <p className={`text-[10px] ${s.sub} font-medium tracking-tight`}>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className={`text-sm font-black ${s.text} opacity-80 italic`}>{user.role}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${user.status === 'En ligne' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedUser(user)} className={`${btnClass} p-2.5 bg-slate-50 text-slate-400 hover:text-${accentColor} hover:bg-${accentColor}/10`}><Eye size={18} /></button>
                      <button onClick={() => handleDelete(user.id, user.name)} className={`${btnClass} p-2.5 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors`}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* --- MODALE DÉTAILS --- */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`${s.card} w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl border-4 border-${accentColor}/20`}>
              <div className="p-10 text-center space-y-6">
                <div className="relative inline-block group">
                  <img src={selectedUser.avatar} className="w-32 h-32 rounded-[2.5rem] mx-auto shadow-2xl ring-8 ring-slate-50 group-hover:rotate-6 transition-transform" />
                  <div className={`absolute -bottom-2 -right-2 bg-${accentColor} p-3 rounded-2xl text-white shadow-xl`}><Shield size={20} /></div>
                </div>
                <div>
                  <h3 className={`text-3xl font-black ${s.text} tracking-tighter`}>{selectedUser.name}</h3>
                  <p className={`text-${accentColor} font-black uppercase text-xs tracking-widest mt-1`}>{selectedUser.role}</p>
                </div>
                <div className={`bg-${accentColor}/5 p-6 rounded-[2rem] grid grid-cols-2 gap-4 text-left border ${s.border}`}>
                  <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Localisation</p><p className={`text-sm font-bold ${s.text}`}>{selectedUser.location}</p></div>
                  <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Membre ID</p><p className={`text-sm font-bold ${s.text}`}>#00{selectedUser.id}X</p></div>
                </div>
                <button onClick={() => setSelectedUser(null)} className={`${btnClass} w-full py-5 bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-slate-200`}>Fermer la session</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODALE AJOUT --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className={`${s.card} w-full max-w-lg rounded-[3rem] p-10 shadow-2xl border ${s.border}`}>
              <div className="flex justify-between items-center mb-8">
                <h3 className={`text-2xl font-black ${s.text} uppercase tracking-tighter italic`}>Nouvel Enregistrement</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-3 bg-slate-100 rounded-full text-slate-400 hover:rotate-90 transition-transform"><X size={20} /></button>
              </div>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); toast.success("Utilisateur déployé"); }}>
                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Identité Complète</label><input type="text" placeholder="Ex: Jean Luc Agueh" className={`w-full p-5 ${theme === 'midnight' ? 'bg-black/40' : 'bg-slate-50'} rounded-2xl border-none outline-none font-bold ${s.text}`} required /></div>
                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Affectation Réseau</label><input type="text" placeholder="Ex: SysAdmin Cotonou" className={`w-full p-5 ${theme === 'midnight' ? 'bg-black/40' : 'bg-slate-50'} rounded-2xl border-none outline-none font-bold ${s.text}`} required /></div>
                <button type="submit" className={`${btnClass} w-full py-5 bg-${accentColor} text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-${accentColor}/30`}>Initialiser le compte</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Users;