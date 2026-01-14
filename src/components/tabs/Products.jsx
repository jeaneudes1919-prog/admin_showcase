import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productsData as initialData } from '../../data/mockData';
import { Search, Plus, ShoppingCart, Star, X, Package, Tag, DollarSign, Box, Filter } from 'lucide-react';
import { toast } from 'sonner';

const Products = ({ theme, btnClass, accentColor }) => {
  // --- ÉTATS ---
  const [products, setProducts] = useState(initialData);
  const [filter, setFilter] = useState("Tous");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // --- THÉMATISATION DYNAMIQUE ---
  const themeStyles = {
    indigo: { card: "bg-white", text: "text-slate-800", sub: "text-slate-500", border: "border-slate-100", input: "bg-slate-50" },
    midnight: { card: "bg-slate-900", text: "text-white", sub: "text-slate-400", border: "border-slate-800", input: "bg-black/40" },
    cyber: { card: "bg-zinc-900", text: "text-[#00ff9f]", sub: "text-[#00ff9f]/60", border: "border-[#00ff9f]/20", input: "bg-black/60" },
    forest: { card: "bg-[#f8faf8]", text: "text-[#1a2e1a]", sub: "text-[#1a2e1a]/50", border: "border-emerald-100", input: "bg-emerald-50/50" },
    sunset: { card: "bg-white", text: "text-[#4a2c2a]", sub: "text-[#4a2c2a]/60", border: "border-orange-100", input: "bg-orange-50/30" }
  };

  const s = themeStyles[theme];
  const categories = ["Tous", "Hardware", "Software", "Storage", "Accessoires"];
  
  const filteredProducts = products.filter(p => {
    const matchesCategory = filter === "Tous" || p.category === filter;
    return matchesCategory && p.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      id: Date.now(),
      name: formData.get('name'),
      category: formData.get('category'),
      price: `${formData.get('price')} CFA`,
      stock: parseInt(formData.get('stock')),
      sales: 0, rating: 5.0, status: "En Stock", icon: Package
    };
    setProducts([newProduct, ...products]);
    setIsAddModalOpen(false);
    toast.success("Référence ajoutée au stock");
  };

  return (
    <div className="space-y-8 pb-20 px-2 sm:px-0">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className={`text-3xl font-black ${s.text} tracking-tighter uppercase italic`}>Inventaire</h2>
          <p className={`${s.sub} font-bold text-xs uppercase tracking-[0.2em]`}>Gestion des licences et hardware</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className={`${btnClass} w-full sm:w-auto flex items-center justify-center gap-3 bg-${accentColor} text-white px-8 py-4 font-black uppercase text-xs tracking-widest shadow-xl shadow-${accentColor}/20`}
        >
          <Plus size={22} strokeWidth={3} /> Nouveau Produit
        </button>
      </div>

      {/* --- RECHERCHE & FILTRES --- */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className={`relative flex-1 group ${s.card} p-2 rounded-[2rem] border ${s.border} shadow-sm`}>
          <Search className={`absolute left-6 top-1/2 -translate-y-1/2 text-${accentColor} opacity-50`} size={20} />
          <input 
            type="text"
            placeholder="Rechercher une référence technique..."
            className={`w-full pl-16 pr-4 py-4 bg-transparent border-none outline-none font-bold ${s.text} text-sm`}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={`${s.card} flex flex-wrap items-center gap-2 p-2 rounded-[2rem] border ${s.border} shadow-sm overflow-x-auto no-scrollbar`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`${btnClass} px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === cat ? `bg-${accentColor} text-white shadow-lg` : `${s.sub} hover:bg-slate-100`
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- GRILLE DE PRODUITS --- */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, idx) => (
            <motion.div
              layout key={product.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className={`${s.card} group rounded-[2.5rem] p-6 border ${s.border} shadow-sm hover:shadow-2xl transition-all relative flex flex-col h-full`}
            >
              <div className={`absolute top-5 right-5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                product.status === 'En Stock' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
              }`}>
                {product.status}
              </div>

              <div className={`w-16 h-16 ${theme === 'midnight' ? 'bg-black/20' : 'bg-slate-50'} rounded-2xl flex items-center justify-center text-${accentColor} mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
                <product.icon size={32} />
              </div>

              <div className="space-y-1 mb-6 flex-grow">
                <p className={`text-[9px] font-black text-${accentColor} uppercase tracking-[0.2em]`}>{product.category}</p>
                <h3 className={`text-lg font-black ${s.text} leading-tight line-clamp-2`}>{product.name}</h3>
                <div className="flex items-center gap-1 text-amber-400 pt-2">
                  <Star size={14} fill="currentColor" />
                  <span className={`text-xs font-black ${s.text}`}>{product.rating}</span>
                </div>
              </div>

              <div className="mt-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Prix HT</p>
                    <p className={`text-xl font-black ${s.text}`}>{product.price}</p>
                  </div>
                  <button className={`${btnClass} p-4 bg-slate-900 text-white hover:bg-${accentColor} transition-colors shadow-lg`}>
                    <ShoppingCart size={20} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className={`flex justify-between text-[9px] font-black ${s.sub} uppercase tracking-widest`}>
                    <span>Stock: {product.stock} units</span>
                    <span>{Math.min(100, (product.stock / 50) * 100)}%</span>
                  </div>
                  <div className={`h-1.5 w-full ${theme === 'midnight' ? 'bg-white/5' : 'bg-slate-100'} rounded-full overflow-hidden`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                      className={`h-full ${product.stock > 10 ? `bg-${accentColor}` : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- MODALE D'AJOUT --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className={`${s.card} w-full max-w-xl rounded-[3rem] p-10 shadow-2xl relative border-4 border-${accentColor}/20`}>
              <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-400"><X size={20} /></button>
              <div className="mb-8 text-center sm:text-left">
                <h3 className={`text-2xl font-black ${s.text} uppercase tracking-tighter italic`}>Nouvelle Référence</h3>
                <p className={`${s.sub} text-sm font-medium`}>Enregistrement d'équipement dans le noeud central</p>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-4">Désignation</label>
                    <input name="name" type="text" className={`w-full p-5 ${s.input} rounded-2xl outline-none focus:ring-2 focus:ring-${accentColor} font-bold ${s.text} border-none`} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-4">Catégorie</label>
                    <select name="category" className={`w-full p-5 ${s.input} rounded-2xl outline-none font-bold ${s.text} border-none appearance-none`}>
                      {categories.filter(c => c !== "Tous").map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-4">Prix (CFA)</label>
                    <input name="price" type="number" className={`w-full p-5 ${s.input} rounded-2xl outline-none font-bold ${s.text} border-none`} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-4">Stock Initial</label>
                    <input name="stock" type="number" className={`w-full p-5 ${s.input} rounded-2xl outline-none font-bold ${s.text} border-none`} required />
                  </div>
                </div>
                <button type="submit" className={`${btnClass} w-full py-5 bg-${accentColor} text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-${accentColor}/30 active:scale-95 transition-all`}>
                  Confirmer l'inventaire
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}; 

export default Products;