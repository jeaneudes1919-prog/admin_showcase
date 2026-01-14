import { LayoutDashboard, Users, ShoppingBag, BarChart3, MessageSquare, Settings, ShieldCheck, Ticket, Star, Layers } from 'lucide-react';

export const menuItems = [
  { id: 'overview', label: 'Vue d’ensemble', icon: LayoutDashboard },
  { id: 'users', label: 'Utilisateurs', icon: Users },
  { id: 'products', label: 'Produits', icon: ShoppingBag },
  { id: 'analytics', label: 'Analytique', icon: BarChart3 },
  { id: 'marketing', label: 'Campagnes', icon: Ticket },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'security', label: 'Sécurité', icon: ShieldCheck },
  { id: 'settings', label: 'Paramètres', icon: Settings },
];

export const statsData = [
  { id: 1, label: 'Revenu Total', value: '4,250,000 CFA', change: '+12.5%', trend: 'up', color: 'bg-indigo-500' },
  { id: 2, label: 'Sessions', value: '18,342', change: '+18%', trend: 'up', color: 'bg-emerald-500' },
  { id: 3, label: 'Taux de Rebond', value: '24.2%', change: '-2.1%', trend: 'down', color: 'bg-amber-500' },
  { id: 4, label: 'Ventes', value: '1,204', change: '+5%', trend: 'up', color: 'bg-rose-500' },
];

export const revenueData = [
  { name: 'Lun', income: 4000, expenses: 2400 },
  { name: 'Mar', income: 3000, expenses: 1398 },
  { name: 'Mer', income: 2000, expenses: 9800 },
  { name: 'Jeu', income: 2780, expenses: 3908 },
  { name: 'Ven', income: 1890, expenses: 4800 },
  { name: 'Sam', income: 2390, expenses: 3800 },
  { name: 'Dim', income: 3490, expenses: 4300 },
];

export const categoryData = [
  { name: 'Électronique', value: 400, color: '#6366f1' },
  { name: 'Mode', value: 300, color: '#10b981' },
  { name: 'Maison', value: 300, color: '#f59e0b' },
  { name: 'Sport', value: 200, color: '#ef4444' },
];

export const performanceData = [
  { name: 'Sem 1', score: 65 },
  { name: 'Sem 2', score: 59 },
  { name: 'Sem 3', score: 80 },
  { name: 'Sem 4', score: 81 },
  { name: 'Sem 5', score: 56 },
  { name: 'Sem 6', score: 95 },
];

export const recentActivity = [
  { id: 1, user: "Awa Diop", action: "Nouvelle commande", time: "Il y a 2 min", amount: "+45,000 CFA" },
  { id: 2, user: "Marc K.", action: "Inscription validée", time: "Il y a 15 min", amount: null },
  { id: 3, user: "Sophie M.", action: "Remboursement", time: "Il y a 1h", amount: "-12,000 CFA" },
];
// Données pour le Radar Chart (Analyse des Capacités)
export const skillData = [
  { subject: 'Vitesse', A: 120, B: 110, fullMark: 150 },
  { subject: 'Fiabilité', A: 98, B: 130, fullMark: 150 },
  { subject: 'Sécurité', A: 86, B: 130, fullMark: 150 },
  { subject: 'Uptime', A: 99, B: 100, fullMark: 150 },
  { subject: 'Support', A: 85, B: 90, fullMark: 150 },
  { subject: 'UX', A: 65, B: 85, fullMark: 150 },
];

// Données pour le Composed Chart (Ventes vs Objectifs)
export const composedData = [
  { name: 'Sem 1', ventes: 590, objectif: 800, amt: 1400 },
  { name: 'Sem 2', ventes: 868, objectif: 967, amt: 1506 },
  { name: 'Sem 3', ventes: 1397, objectif: 1098, amt: 989 },
  { name: 'Sem 4', ventes: 1480, objectif: 1200, amt: 1228 },
  { name: 'Sem 5', ventes: 1520, objectif: 1108, amt: 1100 },
];

// Données pour le Scatter Chart (Densité de connexion)
export const scatterData = [
  { x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 },
];
export const usersData = [
  { id: 1, name: "Marc Kouassi", email: "m.kouassi@nexus.bj", role: "Network Architect", status: "En ligne", location: "Cotonou", joined: "12 Jan 2024", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Sophie Mensah", email: "s.mensah@nexus.bj", role: "SecOps Analyst", status: "Absent", location: "Ouidah", joined: "05 Fév 2024", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Jean-Luc Agueh", email: "jl.agueh@nexus.bj", role: "Fullstack Dev", status: "Hors-ligne", location: "Porto-Novo", joined: "20 Fév 2024", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Awa Touré", email: "a.toure@nexus.bj", role: "UI/UX Designer", status: "En ligne", location: "Abomey", joined: "01 Mar 2024", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: 5, name: "Koffi Yao", email: "k.yao@nexus.bj", role: "SysAdmin", status: "Suspendu", location: "Parakou", joined: "15 Mar 2024", avatar: "https://i.pravatar.cc/150?u=5" },
  // Génère 15 autres objets similaires pour arriver à 20...
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    name: `Utilisateur Test ${i + 6}`,
    email: `user${i + 6}@nexus.bj`,
    role: i % 2 === 0 ? "Support Technique" : "Chef de Projet",
    status: i % 3 === 0 ? "En ligne" : "Hors-ligne",
    location: "Bénin",
    joined: "Avril 2024",
    avatar: `https://i.pravatar.cc/150?u=${i + 6}`
  }))
];
import { Server, Wifi, Cpu, HardDrive, Shield } from 'lucide-react';

export const productsData = [
  { id: 1, name: "Switch Cisco Catalyst", category: "Hardware", price: "850,000 CFA", stock: 12, sales: 45, rating: 4.8, status: "En Stock", icon: Server },
  { id: 2, name: "Licence Firewall Fortinet", category: "Software", price: "250,000 CFA", stock: 0, sales: 120, rating: 4.9, status: "Rupture", icon: Shield },
  { id: 3, name: "Routeur MikroTik CCR", category: "Hardware", price: "450,000 CFA", stock: 8, sales: 32, rating: 4.7, status: "En Stock", icon: Wifi },
  { id: 4, name: "Serveur NAS 24TB", category: "Storage", price: "1,200,000 CFA", stock: 3, sales: 15, rating: 4.6, status: "Stock Faible", icon: HardDrive },
  { id: 5, name: "Module SFP+ 10Gbps", category: "Accessoires", price: "45,000 CFA", stock: 50, sales: 210, rating: 4.5, status: "En Stock", icon: Cpu },
  // Génération automatique pour atteindre les dizaines de produits
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    name: `Équipement Réseau v${i + 6}`,
    category: i % 2 === 0 ? "Hardware" : "Maintenance",
    price: `${(i + 1) * 15000} CFA`,
    stock: i * 2,
    sales: i * 5,
    rating: 4.2,
    status: i % 5 === 0 ? "Rupture" : "En Stock",
    icon: Server
  }))
];
// Données pour l'onglet Analytique
export const acquisitionData = [
  { name: 'Direct', value: 45, color: '#6366f1' },
  { name: 'Social', value: 25, color: '#10b981' },
  { name: 'Referral', value: 20, color: '#f59e0b' },
  { name: 'Organic', value: 10, color: '#ef4444' },
];

export const userRetentionData = [
  { month: 'Jan', rate: 85 }, { month: 'Fév', rate: 78 },
  { month: 'Mar', rate: 92 }, { month: 'Avr', rate: 88 },
  { month: 'Mai', rate: 95 }, { month: 'Juin', rate: 89 },
];

// Données pour l'onglet Campagnes
export const campaignsData = [
  { id: 1, name: "Promo Fibre Cotonou", budget: "500,000 CFA", spent: "350,000 CFA", roi: "+250%", status: "Active", reach: "45k" },
  { id: 2, name: "Sécurité Entreprise", budget: "1,200,000 CFA", spent: "1,200,000 CFA", roi: "+180%", status: "Terminée", reach: "120k" },
  { id: 3, name: "Webinaire Cloud", budget: "150,000 CFA", spent: "20,000 CFA", roi: "---", status: "Planifiée", reach: "5k" },
  { id: 4, name: "Installation VSAT Nord", budget: "800,000 CFA", spent: "400,000 CFA", roi: "+310%", status: "Active", reach: "12k" },
];
// Données Messages
export const chatContacts = [
  { id: 1, name: "Dr. Diallo", role: "Directeur Technique", lastMsg: "Le rapport réseau est prêt.", time: "10:25", unread: 2, online: true, color: "bg-amber-500" },
  { id: 2, name: "Support ComeUp", role: "Plateforme", lastMsg: "Votre service a été validé.", time: "Hier", unread: 0, online: true, color: "bg-indigo-500" },
  { id: 3, name: "Marc Kouassi", role: "Sécurité", lastMsg: "Check le log du pare-feu.", time: "Lun", unread: 0, online: false, color: "bg-emerald-500" },
  { id: 4, name: "Awa Touré", role: "Design", lastMsg: "Le mockup est fini !", time: "Mar", unread: 1, online: true, color: "bg-rose-500" },
  { id: 5, name: "Jean-Luc Agueh", role: "Dev", lastMsg: "On merge la branche ?", time: "Mer", unread: 0, online: false, color: "bg-sky-500" },
  { id: 6, name: "Sophie Mensah", role: "Admin", lastMsg: "Réunion à 15h.", time: "Jeu", unread: 3, online: true, color: "bg-purple-500" },
  { id: 7, name: "Koffi Yao", role: "SysAdmin", lastMsg: "Serveur redémarré.", time: "11:15", unread: 0, online: true, color: "bg-orange-500" },
];

export const initialMessages = {
  1: [
    { id: 1, sender: 'other', text: "Bonjour ! Est-ce que les configurations du pare-feu sont terminées ?", time: "10:20" },
    { id: 2, sender: 'me', text: "Oui, tout est en ligne sur le noeud de Cotonou. Je vous envoie le log.", time: "10:22" },
  ],
  2: [
    { id: 1, sender: 'other', text: "Félicitations, votre profil est certifié.", time: "Hier" },
  ],
};

// Données Sécurité (Logs de connexion)
export const securityLogs = [
  { id: 1, event: "Connexion réussie", user: "Admin", ip: "197.234.x.x (Cotonou)", date: "14 Jan 2026 - 08:30", status: "success" },
  { id: 2, event: "Tentative Brute-force", user: "Inconnu", ip: "45.12.x.x (Russie)", date: "13 Jan 2026 - 22:15", status: "warning" },
  { id: 3, event: "Changement de MDP", user: "Marc K.", ip: "197.234.x.x", date: "12 Jan 2026 - 14:00", status: "info" },
];
// Données Temps Réel (Simulées)
export const realTimeTraffic = [
  { time: '14:00', users: 45 }, { time: '14:01', users: 52 },
  { time: '14:02', users: 48 }, { time: '14:03', users: 61 },
  { time: '14:04', users: 55 }, { time: '14:05', users: 67 },
];

export const serverPerformance = [
  { name: 'CPU', value: 42, color: '#6366f1' },
  { name: 'RAM', value: 78, color: '#a855f7' },
  { name: 'Disk', value: 15, color: '#10b981' },
];

// Données Historiques (Comparaison)
export const growthData = [
  { period: 'Sem 1', current: 4000, previous: 2400 },
  { period: 'Sem 2', current: 3000, previous: 1398 },
  { period: 'Sem 3', current: 2000, previous: 9800 },
  { period: 'Sem 4', current: 2780, previous: 3908 },
];