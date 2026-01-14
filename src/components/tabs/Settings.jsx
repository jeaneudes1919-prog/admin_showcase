import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Bell, Palette, Monitor, ChevronRight, ChevronLeft, 
  Check, Camera, Shield, Mail, Smartphone, Globe, 
  Lock, Cpu, Key, LogOut, Eye, Save, Database, Zap, 
  Fingerprint, Smartphone as Phone, Laptop, ShieldCheck, RefreshCw,
  Github, Twitter, Server, HardDrive, Trash2,
  AlertTriangle, Layers, Wifi, Terminal, ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

const Settings = ({ currentTheme, setCurrentTheme, btnStyle, setBtnStyle, btnClass, accentColor }) => {
  const [activeSubTab, setActiveSubTab] = useState('main');

  // --- 1. DÉFINITION DES DONNÉES GLOBALES (Fix pour la ReferenceError) ---
  const settingsItems = [
    { id: 'profile', title: "Mon Profil", desc: "Identité, Avatar et Bio", icon: User, color: "bg-blue-500" },
    { id: 'appearance', title: "Apparence", desc: "Thèmes OS et Styles Boutons", icon: Palette, color: "bg-indigo-500" },
    { id: 'security', title: "Sécurité", desc: "MFA, Sessions et Password", icon: Shield, color: "bg-emerald-500" },
    { id: 'notif', title: "Notifications", desc: "Alertes Système et Emails", icon: Bell, color: "bg-rose-500" },
    { id: 'system', title: "Système", desc: "API, Logs et Ressources", icon: Monitor, color: "bg-slate-700" },
  ];

  const themes = [
    { id: 'indigo', name: 'Nexus Blue', color: 'bg-indigo-600' },
    { id: 'midnight', name: 'Deep Space', color: 'bg-slate-950' },
    { id: 'cyber', name: 'Cyberpunk', color: 'bg-[#00ff9f]' },
    { id: 'forest', name: 'Forest Mint', color: 'bg-emerald-700' },
    { id: 'sunset', name: 'Warm Sunset', color: 'bg-orange-500' },
  ];

  const buttonConfigs = [
    { id: 'bento', name: 'Bento Grid', desc: 'Moderne & Arrondi' },
    { id: 'glass', name: 'Glassmorphism', desc: 'Effet Translucide' },
    { id: 'sharp', name: 'Architect', desc: 'Lignes Strictes' },
    { id: 'retro', name: 'Neo-Retro', desc: 'Shadows Portées' },
    { id: 'soft', name: 'Luxury Cloud', desc: 'Rayon Maximal' },
  ];

  // --- 2. THÉMATISATION ---
  const themeStyles = {
    indigo: { card: "bg-white", text: "text-slate-800", sub: "text-slate-500", border: "border-slate-100", input: "bg-slate-50" },
    midnight: { card: "bg-slate-900", text: "text-white", sub: "text-slate-400", border: "border-slate-800", input: "bg-black/40" },
    cyber: { card: "bg-zinc-950", text: "text-[#00ff9f]", sub: "text-[#00ff9f]/60", border: "border-[#00ff9f]/20", input: "bg-black/60" },
    forest: { card: "bg-[#f8faf8]", text: "text-[#1a2e1a]", sub: "text-[#1a2e1a]/50", border: "border-emerald-100", input: "bg-emerald-50/50" },
    sunset: { card: "bg-white", text: "text-[#4a2c2a]", sub: "text-[#4a2c2a]/60", border: "border-orange-100", input: "bg-orange-50/30" }
  };

  const s = themeStyles[currentTheme];

  const slideAnim = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3 }
  };

  // --- 3. MODULES DE CONTENU ---

  const ProfileView = () => (
    <motion.div {...slideAnim} className="space-y-8">
      <button onClick={() => setActiveSubTab('main')} className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${s.sub}`}><ChevronLeft size={16} /> Retour</button>
      <div className={`${s.card} p-6 md:p-10 rounded-[3rem] border ${s.border} shadow-sm space-y-10`}>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group cursor-pointer">
              <div className="w-44 h-44 bg-slate-100 rounded-[3.5rem] flex items-center justify-center overflow-hidden border-8 border-white shadow-2xl transition-transform group-hover:scale-105">
                <User size={80} className="text-slate-300" />
              </div>
              <button className={`absolute bottom-2 right-2 p-4 bg-${accentColor} text-white rounded-2xl shadow-xl border-4 border-white`}><Camera size={20} /></button>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-4">Pseudo Admin</label>
              <input type="text" defaultValue="Nexus_Master" className={`w-full p-4 ${s.input} rounded-2xl outline-none font-bold ${s.text} focus:ring-2 focus:ring-${accentColor}`} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-4">Email Principal</label>
              <input type="email" defaultValue="admin@nexus-os.bj" className={`w-full p-4 ${s.input} rounded-2xl outline-none font-bold ${s.text} focus:ring-2 focus:ring-${accentColor}`} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-4">Bio Professionnelle</label>
              <textarea rows="3" className={`w-full p-4 ${s.input} rounded-2xl outline-none font-bold ${s.text} resize-none focus:ring-2 focus:ring-${accentColor}`} defaultValue="Étudiant en 3ème année Administration Réseau & Développeur Fullstack." />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
           <div className={`p-4 rounded-2xl ${s.input} flex items-center gap-4`}><Github size={20} className={s.sub}/><span className="font-bold text-sm">@NexusAdmin</span></div>
           <div className={`p-4 rounded-2xl ${s.input} flex items-center gap-4`}><ExternalLink size={20} className={s.sub}/><span className="font-bold text-sm">nexus-os.bj</span></div>
           <button onClick={() => toast.success("Profil mis à jour")} className={`${btnClass} py-4 bg-slate-900 text-white font-black uppercase text-[10px]`}>Enregistrer</button>
        </div>
      </div>
    </motion.div>
  );

  const AppearanceView = () => (
    <motion.div {...slideAnim} className="space-y-10">
      <button onClick={() => setActiveSubTab('main')} className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${s.sub}`}><ChevronLeft size={16} /> Retour</button>
      <div className={`${s.card} p-8 md:p-12 rounded-[3.5rem] border ${s.border} shadow-sm space-y-12`}>
        <section className="space-y-6">
          <h4 className={`text-xs font-black uppercase tracking-[0.3em] ${s.text}`}>Thème Global</h4>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {themes.map((t) => (
              <div key={t.id} onClick={() => { setCurrentTheme(t.id); toast.success(`Thème ${t.name} activé`); }}
                className={`p-4 rounded-[2.5rem] border-4 cursor-pointer transition-all ${currentTheme === t.id ? `border-${accentColor}` : 'border-transparent bg-slate-50'}`}>
                <div className={`w-full aspect-square ${t.color} rounded-[1.8rem] flex items-center justify-center text-white shadow-lg`}>
                  {currentTheme === t.id && <Check size={24} strokeWidth={4} />}
                </div>
                <p className={`text-[10px] font-black uppercase text-center mt-4 ${s.text}`}>{t.name}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-6">
          <h4 className={`text-xs font-black uppercase tracking-[0.3em] ${s.text}`}>Style des Composants</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buttonConfigs.map((b) => (
              <div key={b.id} onClick={() => { setBtnStyle(b.id); toast.info(`Style ${b.name} appliqué`); }}
                className={`p-6 rounded-[2.5rem] border-4 cursor-pointer flex items-center justify-between transition-all ${btnStyle === b.id ? `border-${accentColor}` : 'border-transparent bg-slate-50'}`}>
                <div><p className={`font-black ${s.text} text-sm`}>{b.name}</p><p className="text-[10px] text-slate-400 font-medium">{b.desc}</p></div>
                <button className={`${btnClass} px-6 py-2 bg-${accentColor} text-white text-[10px] font-black uppercase`}>Test</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );

  const SecurityView = () => (
    <motion.div {...slideAnim} className="space-y-8">
      <button onClick={() => setActiveSubTab('main')} className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${s.sub}`}><ChevronLeft size={16} /> Retour</button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-2 ${s.card} p-8 rounded-[3.5rem] border ${s.border} space-y-10`}>
          <div className="space-y-6">
            <h3 className={`text-xl font-black uppercase tracking-tighter ${s.text} flex items-center gap-2`}><Lock size={20}/> Cryptographie</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="password" placeholder="Ancien Code" className={`w-full p-5 ${s.input} rounded-2xl outline-none font-bold ${s.text}`} />
              <input type="password" placeholder="Nouveau Code" className={`w-full p-5 ${s.input} rounded-2xl outline-none font-bold ${s.text}`} />
            </div>
            <button className={`${btnClass} px-8 py-4 bg-slate-900 text-white font-black uppercase text-[10px]`}>Rotation des Clés</button>
          </div>
          <div className="pt-8 border-t border-slate-100 space-y-6">
            <h3 className={`text-xl font-black uppercase tracking-tighter ${s.text}`}>Sessions Noeuds</h3>
            {[
              { dev: "Desktop • Cotonou", loc: "IP: 197.234.xx.xx", icon: Laptop, current: true },
              { dev: "Nexus App • Mobile", loc: "IP: 156.0.xx.xx", icon: Phone, current: false },
            ].map((device, i) => (
              <div key={i} className={`flex justify-between items-center p-6 ${s.input} rounded-[2rem]`}>
                <div className="flex items-center gap-4">
                  <div className={`p-4 bg-white rounded-2xl ${s.text} shadow-sm`}><device.icon size={24} /></div>
                  <div><p className={`text-sm font-black ${s.text}`}>{device.dev}</p><p className="text-[10px] font-bold text-slate-400">{device.loc}</p></div>
                </div>
                {device.current ? <span className="text-[10px] font-black text-emerald-500 uppercase px-3 py-1 bg-emerald-50 rounded-lg tracking-widest">Actif</span> : <button className="text-[10px] font-black text-rose-500 uppercase hover:underline">Révoquer</button>}
              </div>
            ))}
          </div>
        </div>
        <div className={`bg-${accentColor} p-10 rounded-[3.5rem] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden`}>
          <div className="relative z-10 space-y-6">
            <Fingerprint size={60} className="opacity-40" />
            <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Protection MFA</h3>
            <p className="text-white/70 text-sm font-medium leading-relaxed">Doublez la sécurité de votre accès Administrateur via TOTP.</p>
          </div>
          <button className={`${btnClass} w-full py-5 bg-white text-${accentColor} font-black uppercase text-[10px] tracking-widest shadow-xl`}>Activer MFA</button>
          <ShieldCheck size={180} className="absolute -bottom-10 -right-10 text-white/10" />
        </div>
      </div>
    </motion.div>
  );

  const NotificationsView = () => (
    <motion.div {...slideAnim} className="space-y-8">
      <button onClick={() => setActiveSubTab('main')} className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${s.sub}`}><ChevronLeft size={16} /> Retour</button>
      <div className={`${s.card} p-10 rounded-[3.5rem] border ${s.border} space-y-12`}>
        <div className="max-w-xl">
          <h3 className={`text-3xl font-black ${s.text} tracking-tighter uppercase italic`}>Alertes & Push</h3>
          <p className="text-slate-500 text-sm font-medium mt-2">Gérez la diffusion des logs critiques de l'OS.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Intrusion Réseau", desc: "Alertes en cas de tentative brute-force.", icon: Shield, active: true },
            { title: "Rapports Hebdo", desc: "Synthèse des performances et revenus.", icon: Database, active: true },
            { title: "Mises à jour", desc: "Notification de déploiement de patchs.", icon: Zap, active: false },
            { title: "Freelance", desc: "Nouveaux messages sur ComeUp.", icon: Mail, active: true },
          ].map((item, i) => (
            <div key={i} className={`flex items-center justify-between p-6 ${s.input} rounded-[2.5rem] group hover:scale-[1.02] transition-transform cursor-pointer`}>
              <div className="flex items-center gap-5">
                <div className={`p-4 bg-white rounded-2xl text-${accentColor} shadow-md group-hover:rotate-6 transition-transform`}><item.icon size={24} /></div>
                <div>
                  <h4 className={`font-black ${s.text} text-sm uppercase tracking-tight`}>{item.title}</h4>
                  <p className="text-[10px] text-slate-500 font-medium">{item.desc}</p>
                </div>
              </div>
              <div className={`w-14 h-8 ${item.active ? `bg-${accentColor}` : 'bg-slate-300'} rounded-full p-1 relative transition-colors`}>
                <div className={`w-6 h-6 bg-white rounded-full absolute ${item.active ? 'right-1' : 'left-1'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const SystemView = () => (
    <motion.div {...slideAnim} className="space-y-8">
      <button onClick={() => setActiveSubTab('main')} className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${s.sub}`}><ChevronLeft size={16} /> Retour</button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`${s.card} p-10 rounded-[3rem] shadow-sm border ${s.border} space-y-10`}>
          <h4 className={`text-xl font-black ${s.text} flex items-center gap-3 uppercase italic tracking-tighter`}><Terminal className={`text-${accentColor}`} /> Accès API Core</h4>
          <div className="space-y-6">
            <div className={`p-6 ${s.input} rounded-[2rem] border ${s.border}`}>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Master Key (Root)</p>
              <div className="flex justify-between items-center font-mono text-sm">
                <span className={`truncate mr-4 ${s.text}`}>NX_ROOT_2026_AF_01_BJ</span>
                <button className={`text-${accentColor} font-black text-xs uppercase hover:underline`}>Copier</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className={`${btnClass} py-5 bg-slate-900 text-white font-black text-[10px] uppercase`}>Nouvelle Clé</button>
              <button className={`${btnClass} py-5 bg-slate-100 text-slate-600 font-black text-[10px] uppercase`}>Logs .JSON</button>
            </div>
          </div>
        </div>
        <div className={`p-10 rounded-[3rem] ${theme === 'midnight' || theme === 'cyber' ? 'bg-white/5' : 'bg-slate-900'} text-white shadow-2xl relative overflow-hidden`}>
          <h4 className="text-xl font-black mb-8 flex items-center gap-3"><Monitor className={`text-${accentColor}`} /> Diagnostic Ressources</h4>
          <div className="space-y-8 relative z-10">
            {[
              { label: "Charge CPU", val: 34, color: `bg-${accentColor}` },
              { label: "Memory Swap", val: 82, color: "bg-rose-500" },
              { label: "SSD Storage", val: 18, color: "bg-emerald-400" },
            ].map((res, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>{res.label}</span><span>{res.val}%</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${res.val}%` }} className={`h-full ${res.color}`} />
                </div>
              </div>
            ))}
          </div>
          <Cpu className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10" />
        </div>
      </div>
    </motion.div>
  );

  // ==========================================
  // --- RENDU PRINCIPAL ---
  // ==========================================

  return (
    <div className="max-w-6xl mx-auto py-6">
      <AnimatePresence mode="wait">
        
        {activeSubTab === 'main' && (
          <motion.div key="main" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h2 className={`text-4xl font-black tracking-tighter ${s.text} uppercase italic leading-none`}>Configuration</h2>
                <p className={`${s.sub} font-black text-[10px] uppercase tracking-[0.3em] mt-3`}>Gestion Globale de l'Infrastructure Nexus</p>
              </div>
              <div className={`${s.card} px-6 py-4 rounded-3xl border ${s.border} flex items-center justify-center gap-3 shadow-sm`}>
                <Wifi size={16} className="text-emerald-500" />
                <span className={`text-[10px] font-black ${s.sub} uppercase tracking-widest`}>Node-CTN:</span>
                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">Connecté</span>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {settingsItems.map((item) => (
                <div key={item.id} onClick={() => setActiveSubTab(item.id)}
                  className={`${s.card} p-8 rounded-[3rem] border ${s.border} shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer flex items-center justify-between group`}>
                  <div className="flex flex-col gap-6">
                    <div className={`p-5 ${item.color} text-white rounded-[1.8rem] shadow-xl group-hover:rotate-12 transition-transform duration-500 w-fit`}>
                      <item.icon size={32} />
                    </div>
                    <div>
                      <h4 className={`font-black ${s.text} text-xl uppercase tracking-tighter leading-none`}>{item.title}</h4>
                      <p className={`text-xs ${s.sub} font-medium mt-2`}>{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={28} className={`text-slate-200 group-hover:text-${accentColor} transition-colors`} />
                </div>
              ))}
            </div>

            <div className="bg-rose-50 p-10 rounded-[3.5rem] border-2 border-dashed border-rose-200 flex flex-col md:flex-row justify-between items-center gap-8 mt-10">
              <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
                <div className="p-5 bg-rose-600 text-white rounded-[1.8rem] shadow-xl"><LogOut size={28}/></div>
                <div><h4 className="font-black text-rose-900 uppercase tracking-tighter text-xl">Détruire la Session</h4><p className="text-sm text-rose-700 font-medium italic">Supprime tous les tokens locaux et révoque les accès noeuds.</p></div>
              </div>
              <button onClick={() => toast.error("Déconnexion sécurisée")} className={`${btnClass} px-12 py-5 bg-rose-600 text-white font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-rose-200`}>Quitter l'OS</button>
            </div>
          </motion.div>
        )}

        {/* --- ROUTAGE DES VUES --- */}
        {activeSubTab === 'profile' && <ProfileView key="profile" />}
        {activeSubTab === 'appearance' && <AppearanceView key="appearance" />}
        {activeSubTab === 'security' && <SecurityView key="security" />}
        {activeSubTab === 'notif' && <NotificationsView key="notif" />}
        {activeSubTab === 'system' && <SystemView key="system" />}

      </AnimatePresence>
    </div>
  );
};

export default Settings;