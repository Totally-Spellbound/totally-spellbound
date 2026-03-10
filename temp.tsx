import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Moon, 
  Star, 
  ChevronRight, 
  Filter, 
  Heart, 
  ArrowLeft, 
  Sparkles,
  Zap,
  Leaf,
  Ghost,
  Eye,
  Wind,
  Flame,
  Droplets,
  CloudMoon,
  Compass,
  Layers,
  Circle,
  Activity,
  Infinity,
  Sun,
  ShieldCheck,
  Timer,
  Skull,
  Crosshair,
  Hash
} from 'lucide-react';

const APP_NAME = "MIDNIGHT GROVE";

const App = () => {
  const [view, setView] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [moonPhase, setMoonPhase] = useState('Waxing Gibbous');
  
  // Category View State
  const [activeFilter, setActiveFilter] = useState({ type: 'All', value: 'All' });

  // Custom Discovery State
  const [oracleStep, setOracleStep] = useState(0);
  const [oracleSelections, setOracleSelections] = useState({ intent: null, element: null });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, activeFilter]);

  const navigate = (newView, product = null, filterType = 'All', filterValue = 'All') => {
    if (product) setSelectedProduct(product);
    if (newView === 'category') setActiveFilter({ type: filterType, value: filterValue });
    setView(newView);
    setIsMenuOpen(false);
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  // --- COMPREHENSIVE LORE & NAVIGATION DATA ---
  
  const LORE_DATABASE = {
    planets: {
      Saturn: { desc: "The Taskmaster. Saturn governs structure, discipline, and the protection of boundaries. Use this artifact to ground wandering energy and build lasting spiritual foundations.", color: "border-slate-500", icon: <Circle size={40} className="text-slate-400" /> },
      Moon: { desc: "The Luminary of Intuition. Governing the tides of emotion and the depths of the subconscious. This artifact enhances dream-work and emotional healing.", color: "border-blue-200", icon: <Moon size={40} className="text-blue-100" /> },
      Sun: { desc: "The Source of Vitality. Governing the will, the ego, and the radiant self. This artifact is a conduit for success, warmth, and masculine creative power.", color: "border-amber-400", icon: <Sun size={40} className="text-amber-300" /> },
      Uranus: { desc: "The Great Awakener. Ruler of sudden change, innovation, and liberation. Use this artifact to break old patterns and invite chaotic growth.", color: "border-cyan-400", icon: <Zap size={40} className="text-cyan-300" /> },
      Venus: { desc: "The Planet of Devotion. Governing beauty, love, and the attraction of wealth. Artifacts of Venus are crafted to harmonize the heart and invite luxury.", color: "border-pink-300", icon: <Heart size={40} className="text-pink-200" /> }
    },
    elements: {
      Earth: { desc: "The Material Plane. Governs physical manifestation, wealth, and stability. Resonates with the physical body and silent growth.", icon: <Layers size={40} /> },
      Air: { desc: "The Mental Plane. Governs communication, intellect, and the movement of ideas. Resonates with clarity and unseen whispers.", icon: <Wind size={40} /> },
      Fire: { desc: "The Will. Governs passion, destruction, and transformation. Resonates with ambition and the internal spark.", icon: <Flame size={40} /> },
      Water: { desc: "The Emotions. Governs intuition, healing, and the flow of the spirit. Resonates with empathy and the deep sea.", icon: <Droplets size={40} /> },
      Spirit: { desc: "The Quintessence. The connective tissue of the universe. Governs the divine spark and the unity of all forces.", icon: <Sparkles size={40} /> }
    },
    chakras: {
      Root: { desc: "Muladhara. base of the spine. Security, survival, and basic needs.", color: "bg-red-500", icon: <Circle />, img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800" },
      Sacral: { desc: "Svadhisthana. below the navel. Creativity, sexuality, and pleasure.", color: "bg-orange-500", icon: <Activity />, img: "https://images.unsplash.com/photo-1517036045155-236b9c9f658f?q=80&w=800" },
      "Solar Plexus": { desc: "Manipura. stomach area. Confidence and personal power.", color: "bg-yellow-500", icon: <Sun />, img: "https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=800" },
      Heart: { desc: "Anahata. center of the chest. Love, compassion, and spiritual connection.", color: "bg-green-500", icon: <ShieldCheck />, img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800" },
      Throat: { desc: "Vishuddha. the throat. Communication and truth.", color: "bg-blue-500", icon: <Wind />, img: "https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?q=80&w=800" },
      "Third Eye": { desc: "Ajna. between the brows. Intuition and imagination.", color: "bg-purple-500", icon: <Eye />, img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800" },
      Crown: { desc: "Sahasrara. top of the head. Universal spiritual connection.", color: "bg-white", icon: <Infinity />, img: "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=800" }
    }
  };

  const elementsData = [
    { name: "Earth", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800", icon: <Layers /> },
    { name: "Air", img: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=800", icon: <Wind /> },
    { name: "Fire", img: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=800", icon: <Flame /> },
    { name: "Water", img: "https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=800", icon: <Droplets /> },
    { name: "Spirit", img: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?q=80&w=800", icon: <Sparkles /> }
  ];

  const zodiacsData = [
    { name: "Aries", img: "https://images.unsplash.com/photo-1558229046-2495817e946d?q=80&w=600", icon: <Flame /> },
    { name: "Taurus", img: "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=600", icon: <Layers /> },
    { name: "Gemini", img: "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=600", icon: <Wind /> },
    { name: "Cancer", img: "https://images.unsplash.com/photo-1517036045155-236b9c9f658f?q=80&w=600", icon: <Droplets /> },
    { name: "Leo", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600", icon: <Sun /> },
    { name: "Virgo", img: "https://images.unsplash.com/photo-1506466010722-395ee2bef877?q=80&w=600", icon: <Layers /> },
    { name: "Libra", img: "https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?q=80&w=600", icon: <Wind /> },
    { name: "Scorpio", img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600", icon: <Compass /> },
    { name: "Sagittarius", img: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?q=80&w=600", icon: <Flame /> },
    { name: "Capricorn", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600", icon: <Layers /> },
    { name: "Aquarius", img: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=600", icon: <Wind /> },
    { name: "Pisces", img: "https://images.unsplash.com/photo-1434064511983-18c6dae20ed5?q=80&w=600", icon: <Droplets /> }
  ];

  const chakrasData = Object.keys(LORE_DATABASE.chakras).map(key => ({
    name: key,
    desc: LORE_DATABASE.chakras[key].desc.split('.')[0],
    img: LORE_DATABASE.chakras[key].img,
    icon: LORE_DATABASE.chakras[key].icon
  }));

  // --- SHARED COMPONENTS ---

  const Header = () => (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 px-6 lg:px-12 py-4 flex items-center justify-between ${
      scrolled ? 'bg-black/95 backdrop-blur-2xl border-b border-white/5 py-3' : 'bg-transparent py-6'
    }`}>
      <div className="flex items-center gap-8">
        <button onClick={() => setIsMenuOpen(true)} className="text-white hover:text-amber-200 transition-colors">
          <Menu size={20} strokeWidth={1} />
        </button>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none lg:pointer-events-auto">
        <h1 onClick={() => navigate('home')} className="text-xl lg:text-3xl font-serif font-light tracking-[0.4em] text-white cursor-pointer uppercase">{APP_NAME}</h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 text-[9px] tracking-widest uppercase border border-white/10 px-3 py-1.5 rounded-full text-white/60">
          <CloudMoon size={12} className="text-amber-200" />
          <span>{moonPhase}</span>
        </div>
        <div className="relative cursor-pointer text-white/80" onClick={() => navigate('category')}>
          <ShoppingBag size={20} strokeWidth={1} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-[110] flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-500">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-white/50 hover:text-white"><X size={40} strokeWidth={1} /></button>
          <div className="flex flex-col gap-6 text-center">
            {['Home', 'The Vault', 'Apothecary', 'Lore'].map((item) => (
              <button key={item} onClick={() => navigate(item === 'The Vault' ? 'category' : 'home')} className="text-4xl lg:text-7xl font-serif italic text-white/20 hover:text-white transition-all duration-500">{item}</button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  const HomeView = () => (
    <div className="bg-[#050505]">
      {/* Cinematic Hero - RESTORED TO ORIGINAL DARK FOREST */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#050505] z-10" />
        <img src="https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover scale-110 animate-pulse duration-[10000ms]" alt="Hero" />
        <div className="relative z-20 text-center px-6">
          <p className="text-amber-200/60 text-[10px] tracking-[0.6em] uppercase mb-8">Artifacts for the Soul</p>
          <h1 className="text-5xl md:text-[8rem] font-serif leading-[0.8] text-white mb-12 italic">Ethereal <br /><span className="not-italic">Eminence</span></h1>
          <button onClick={() => navigate('category')} className="px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-amber-200 transition-all duration-500">Enter The Vault</button>
        </div>
      </section>

      {/* 1. ELEMENTS SECTION */}
      <DiscoverySection 
        title="The Elements" 
        subtitle="Foundational Forces" 
        items={elementsData} 
        gridCols="lg:grid-cols-5" 
        onSelect={(val) => navigate('category', null, 'element', val)} 
      />
      
      {/* THE SHADOW MIRROR SECTION */}
      <section className="py-48 px-6 bg-black relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=2000')] bg-cover bg-center opacity-10 grayscale group-hover:scale-110 transition-transform duration-[5s]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <span className="text-amber-500 text-[10px] tracking-[1em] uppercase mb-12 block">A Reflection of Intent</span>
           <h2 className="text-5xl lg:text-8xl font-serif text-white/20 mb-12 mix-blend-difference group-hover:text-white transition-all duration-[2s]">THE MIDNIGHT MIRROR</h2>
           <p className="text-white/40 max-w-lg mx-auto leading-loose italic mb-12">"Look closer into the void, for the void is looking back. What you find is not an object, but a reflection of your own hidden power."</p>
           <button className="text-[10px] tracking-[0.5em] uppercase text-amber-200 border-b border-amber-500/30 pb-2">Gaze Into the Collection</button>
        </div>
      </section>

      {/* 2. ZODIAC SECTION */}
      <DiscoverySection 
        title="The Zodiac" 
        subtitle="Celestial Influence" 
        items={zodiacsData} 
        gridCols="lg:grid-cols-6" 
        onSelect={(val) => navigate('category', null, 'zodiac', val)} 
      />

      {/* 3. INTERACTIVE ORACLE */}
      <CelestialOracle />

      {/* 4. CHAKRA SECTION */}
      <DiscoverySection 
        title="The Chakras" 
        subtitle="Energy Alignment" 
        items={chakrasData} 
        gridCols="lg:grid-cols-7" 
        onSelect={(val) => navigate('category', null, 'chakra', val)} 
      />

      {/* NOCTURNAL SABBAT TRACKER */}
      <section className="py-32 bg-white/5 border-y border-white/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
          <div>
            <h3 className="text-[10px] tracking-[0.6em] text-amber-500 uppercase mb-8">Current Season</h3>
            <h2 className="text-6xl font-serif text-white mb-6">Equinox Ritual</h2>
            <p className="text-white/40 leading-relaxed max-w-sm mb-12">The veil is thinning. During the Equinox, all artifacts involving balance and transition gain 15% resonance.</p>
            <div className="flex gap-8">
               <div className="text-center">
                  <div className="text-3xl font-serif text-white mb-2">12</div>
                  <div className="text-[8px] tracking-widest text-white/30 uppercase">Days</div>
               </div>
               <div className="text-center">
                  <div className="text-3xl font-serif text-white mb-2">04</div>
                  <div className="text-[8px] tracking-widest text-white/30 uppercase">Hours</div>
               </div>
               <div className="text-center">
                  <div className="text-3xl font-serif text-white mb-2">18</div>
                  <div className="text-[8px] tracking-widest text-white/30 uppercase">Mins</div>
               </div>
            </div>
          </div>
          <div className="relative aspect-square border border-white/10 p-12 flex items-center justify-center">
             <div className="absolute inset-0 bg-amber-200 opacity-5 blur-3xl rounded-full animate-pulse" />
             <Skull size={200} strokeWidth={0.5} className="text-white/10" />
             <div className="absolute inset-0 flex items-center justify-center">
                <button onClick={() => navigate('category')} className="px-10 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-amber-200 transition-all">Shop Ritual Gear</button>
             </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex justify-between items-end mb-20">
             <h2 className="text-4xl lg:text-6xl font-serif text-white">New Manifestations</h2>
             <button onClick={() => navigate('category')} className="text-[9px] tracking-[0.3em] uppercase text-white/30 border-b border-white/10 pb-1">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );

  const DiscoverySection = ({ title, subtitle, items, gridCols = "lg:grid-cols-4", onSelect }) => (
    <section className="py-32 px-6 lg:px-24 bg-black border-t border-white/5">
      <div className="mb-16 text-center md:text-left">
        <span className="text-amber-500 text-[10px] tracking-[0.4em] uppercase block mb-4">{subtitle}</span>
        <h2 className="text-5xl lg:text-7xl font-serif text-white">{title}</h2>
      </div>
      <div className={`grid grid-cols-2 md:grid-cols-3 ${gridCols} gap-6`}>
        {items.map((item) => (
          <div 
            key={item.name} 
            onClick={() => onSelect ? onSelect(item.name) : navigate('category')}
            className="group relative aspect-[3/4] overflow-hidden bg-[#0d0d0d] border border-white/5 cursor-pointer"
          >
            <img src={item.img} className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt={item.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              {item.icon && <div className="mb-4 text-amber-200/40 group-hover:text-amber-200 transition-colors">{React.cloneElement(item.icon, { size: 32, strokeWidth: 0.5 })}</div>}
              <h3 className="text-xl font-serif text-white tracking-widest uppercase mb-1">{item.name}</h3>
              {item.desc && <span className="text-[9px] text-white/40 uppercase tracking-widest">{item.desc}</span>}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </div>
        ))}
      </div>
    </section>
  );

  const CelestialOracle = () => {
    const intentions = ["Spiritual Growth", "Protection", "Lucid Dreaming", "Banishment"];
    const elementsList = ["Earth", "Air", "Fire", "Water", "Spirit"];
    const resetOracle = () => { setOracleStep(0); setOracleSelections({ intent: null, element: null }); };

    return (
      <div className="relative py-48 px-6 bg-gradient-to-b from-transparent via-white/5 to-transparent overflow-hidden border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-amber-500 text-[10px] tracking-[0.6em] uppercase mb-8 block">The Oracle</span>
          {oracleStep === 0 && (
            <div className="animate-in fade-in slide-in-from-bottom duration-1000">
              <h2 className="text-4xl lg:text-6xl font-serif text-white mb-12">Identify your <span className="italic">Intention</span></h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {intentions.map(intent => (
                  <button key={intent} onClick={() => { setOracleSelections({...oracleSelections, intent}); setOracleStep(1); }} className="border border-white/10 py-8 px-4 text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                    {intent}
                  </button>
                ))}
              </div>
            </div>
          )}
          {oracleStep === 1 && (
            <div className="animate-in fade-in slide-in-from-right duration-700">
              <h2 className="text-4xl lg:text-6xl font-serif text-white mb-12">Seek your <span className="italic">Element</span></h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {elementsList.map(el => (
                  <button key={el} onClick={() => { setOracleSelections({...oracleSelections, element: el}); setOracleStep(2); }} className="border border-white/10 py-8 px-4 text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                    {el}
                  </button>
                ))}
              </div>
              <button onClick={() => setOracleStep(0)} className="mt-12 text-white/40 text-[9px] uppercase tracking-widest hover:text-white">Go Back</button>
            </div>
          )}
          {oracleStep === 2 && (
            <div className="animate-in fade-in zoom-in-95 duration-1000">
              <Sparkles className="mx-auto text-amber-200 mb-8" size={32} />
              <h2 className="text-4xl lg:text-6xl font-serif text-white mb-6">Manifesting Destiny</h2>
              <p className="text-white/40 text-sm tracking-widest uppercase mb-12">Aligning {oracleSelections.intent} with {oracleSelections.element}</p>
              <button onClick={() => navigate('category', null, 'element', oracleSelections.element)} className="px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-amber-200 transition-all">Reveal Selection</button>
              <div className="mt-8">
                <button onClick={resetOracle} className="text-white/40 text-[9px] uppercase tracking-widest hover:text-white transition-colors">Reset Reading</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CategoryView = () => {
    const filteredProducts = products.filter(p => {
      if (activeFilter.type === 'All') return true;
      if (activeFilter.type === 'element') return p.meta.element === activeFilter.value;
      if (activeFilter.type === 'zodiac') return p.meta.zodiac === activeFilter.value;
      if (activeFilter.type === 'chakra') return p.meta.chakra === activeFilter.value;
      if (activeFilter.type === 'category') return p.category === activeFilter.value;
      return true;
    });

    const NavItems = activeFilter.type === 'zodiac' ? zodiacsData : 
                     activeFilter.type === 'element' ? elementsData :
                     activeFilter.type === 'chakra' ? chakrasData : 
                     [
                       { name: 'Jewelry', icon: <Star /> },
                       { name: 'Apparel', icon: <Ghost /> },
                       { name: 'Apothecary', icon: <Flame /> },
                       { name: 'Curiosities', icon: <Skull /> }
                     ];

    return (
      <div className="pt-32 min-h-screen bg-[#050505] pb-24">
        {/* Cinematic Category Heading */}
        <div className="relative py-24 px-6 lg:px-24 border-b border-white/5 mb-16 overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=2000')] bg-cover bg-fixed grayscale" />
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="max-w-xl">
                 <span className="text-amber-500 text-[10px] tracking-[0.6em] uppercase block mb-6">Browsing The Archives</span>
                 <h1 className="text-6xl lg:text-[7rem] font-serif text-white tracking-tighter leading-none mb-6">
                   {activeFilter.value === 'All' ? 'The Vault' : activeFilter.value}
                 </h1>
                 <p className="text-white/40 italic text-sm">"Each item in this collection has been vetted for spiritual integrity and aesthetic weight."</p>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2">{filteredProducts.length} Manifestations Found</div>
                <div className="w-full h-[1px] bg-white/10" />
              </div>
           </div>
        </div>

        {/* Graphical Navigation Ribbon */}
        <div className="px-6 lg:px-24 mb-20 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex gap-10 border-b border-white/5 pb-10 min-w-max">
             {NavItems.map(item => (
               <button 
                key={item.name}
                onClick={() => setActiveFilter({ ...activeFilter, value: item.name })}
                className={`group flex flex-col items-center gap-4 transition-all ${activeFilter.value === item.name ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-100'}`}
               >
                 <div className={`w-14 h-14 rounded-full border border-white/10 flex items-center justify-center transition-all group-hover:border-amber-500 group-hover:bg-amber-200/5 ${activeFilter.value === item.name ? 'border-amber-500 bg-amber-200/5 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : ''}`}>
                   {item.icon ? React.cloneElement(item.icon, { size: 20, strokeWidth: 1 }) : <Hash size={20} strokeWidth={1}/>}
                 </div>
                 <span className={`text-[9px] tracking-[0.3em] uppercase transition-colors ${activeFilter.value === item.name ? 'text-amber-200 font-bold' : 'text-white'}`}>
                   {item.name}
                 </span>
               </button>
             ))}
             <button 
                onClick={() => setActiveFilter({ type: 'All', value: 'All' })}
                className={`group flex flex-col items-center gap-4 transition-all ${activeFilter.value === 'All' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
             >
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center"><Infinity size={20} strokeWidth={1} /></div>
                <span className="text-[9px] tracking-[0.3em] uppercase">All Items</span>
             </button>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-40 text-center border border-dashed border-white/10 text-white/20 uppercase tracking-[0.5em] text-sm">
                No manifestations detected for this selection.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ProductView = () => {
    if (!selectedProduct) return null;
    const samePlanet = products.filter(p => p.meta.planet === selectedProduct.meta.planet && p.id !== selectedProduct.id);
    const sameChakra = products.filter(p => p.meta.chakra === selectedProduct.meta.chakra && p.id !== selectedProduct.id);
    const sameElement = products.filter(p => p.meta.element === selectedProduct.meta.element && p.id !== selectedProduct.id);
    const planetLore = LORE_DATABASE.planets[selectedProduct.meta.planet];
    const elementLore = LORE_DATABASE.elements[selectedProduct.meta.element];
    const chakraLore = LORE_DATABASE.chakras[selectedProduct.meta.chakra];

    return (
      <div className="min-h-screen bg-black">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen border-b border-white/5">
          <div className="lg:col-span-7 bg-[#0a0a0a] px-6 lg:px-24 py-20 lg:sticky lg:top-0 h-auto lg:h-screen flex flex-col justify-center">
            <button onClick={() => navigate('category')} className="mb-12 flex items-center gap-3 text-white/40 hover:text-white text-[10px] tracking-widest uppercase transition-all">
              <ArrowLeft size={16} /> Return to Vault
            </button>
            <div className="aspect-[4/5] bg-white/5 border border-white/10 group overflow-hidden relative shadow-2xl">
              <img src={selectedProduct.image} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt={selectedProduct.name} />
              <div className="absolute top-6 left-6 flex flex-col gap-2 opacity-50">
                 <div className="px-3 py-1 bg-black/60 border border-white/10 text-[8px] uppercase tracking-widest text-white">{selectedProduct.meta.element}</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 px-6 lg:px-16 py-20 lg:py-32 bg-black flex flex-col">
            <div className="max-w-md mx-auto w-full">
              <span className="text-amber-500 text-[10px] tracking-[0.4em] uppercase block mb-6">{selectedProduct.meta.theme} • {selectedProduct.meta.handmade ? 'Handmade' : 'Artisan'}</span>
              <h1 className="text-5xl lg:text-6xl font-serif text-white mb-6 leading-[0.9]">{selectedProduct.name}</h1>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-3xl text-white font-light font-serif">${selectedProduct.price}.00</span>
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-400">In Stock</span>
              </div>
              <p className="text-white/40 leading-relaxed text-sm mb-12 italic">"{selectedProduct.description}"</p>
              <div className="space-y-4 mb-16">
                <button onClick={addToCart} className="group relative w-full bg-white text-black font-bold py-6 tracking-[0.4em] uppercase text-[11px] overflow-hidden">
                   <div className="absolute inset-0 bg-amber-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                   <span className="relative z-10">Add to Cauldron</span>
                </button>
                <button className="w-full border border-white/10 text-white/40 py-5 tracking-[0.3em] uppercase text-[10px] hover:text-white transition-all flex items-center justify-center gap-3">
                  <Heart size={14} /> Mark in Grimoire
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-10">
                <div>
                  <span className="block text-[8px] text-white/30 uppercase tracking-[0.3em] mb-2">Primary Planet</span>
                  <div className="text-white text-sm tracking-widest border-l border-white/20 pl-4">{selectedProduct.meta.planet}</div>
                </div>
                <div>
                  <span className="block text-[8px] text-white/30 uppercase tracking-[0.3em] mb-2">Ruling Element</span>
                  <div className="text-white text-sm tracking-widest border-l border-white/20 pl-4">{selectedProduct.meta.element}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Immersive Lore Guides */}
        {planetLore && (
          <section className="py-40 bg-gradient-to-b from-[#050505] to-black border-b border-white/5 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="order-2 lg:order-1">
                   <span className="text-amber-500 text-[10px] tracking-[0.6em] uppercase mb-10 block">Celestial Correspondence</span>
                   <div className="mb-12 flex items-center gap-6">
                      <div className={`w-24 h-24 rounded-full border ${planetLore.color} flex items-center justify-center`}>
                        {planetLore.icon}
                      </div>
                      <h2 className="text-6xl font-serif text-white">Under <span className="italic">{selectedProduct.meta.planet}</span></h2>
                   </div>
                   <p className="text-white/50 text-lg leading-loose max-w-lg mb-12">{planetLore.desc}</p>
                   <button onClick={() => navigate('category', null, 'planet', selectedProduct.meta.planet)} className="text-[10px] tracking-[0.4em] uppercase text-white/30 hover:text-white border-b border-white/10 pb-2 transition-all">Explore All {selectedProduct.meta.planet} Artifacts</button>
                </div>
                <div className="order-1 lg:order-2">
                   <div className="bg-white/5 p-10 border border-white/10 backdrop-blur-sm">
                      <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-8 border-b border-white/10 pb-4">Planetary Pairs</h3>
                      <div className="grid grid-cols-2 gap-6">
                        {samePlanet.slice(0, 2).map(p => (
                          <div key={p.id} onClick={() => navigate('product', p)} className="group cursor-pointer">
                            <div className="aspect-square bg-black overflow-hidden mb-4 border border-white/5"><img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={p.name} /></div>
                            <h4 className="text-white text-sm font-serif group-hover:text-amber-200 transition-colors">{p.name}</h4>
                            <span className="text-[9px] text-white/30 uppercase tracking-widest">${p.price}.00</span>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {chakraLore && (
          <section className="py-40 bg-black overflow-hidden border-b border-white/5">
             <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
                <div className="text-center mb-32">
                   <h2 className="text-5xl lg:text-7xl font-serif text-white tracking-tighter">Attuning the <span className="italic">{selectedProduct.meta.chakra}</span></h2>
                </div>
                <div className="flex flex-col lg:flex-row gap-20">
                   <div className="lg:w-1/3 flex flex-col items-center">
                      <div className="relative w-64 h-96 border border-white/5 flex items-center justify-center">
                        <div className="space-y-4 flex flex-col items-center">
                           {[6, 5, 4, 3, 2, 1, 0].map(i => {
                              const isActive = (i === 6 && selectedProduct.meta.chakra === 'Crown') || (i === 4 && selectedProduct.meta.chakra === 'Third Eye') || (i === 3 && selectedProduct.meta.chakra === 'Heart') || (i === 0 && selectedProduct.meta.chakra === 'Root');
                              return <div key={i} className={`w-3 h-3 rounded-full transition-all duration-1000 ${isActive ? `${chakraLore.color} shadow-[0_0_20px_white] scale-150` : 'bg-white/10'}`} />;
                           })}
                        </div>
                      </div>
                   </div>
                   <div className="lg:w-2/3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {sameChakra.slice(0, 3).map(p => <ProductCard key={p.id} product={p} index={0} />)}
                      </div>
                   </div>
                </div>
             </div>
          </section>
        )}
      </div>
    );
  };

  const ProductCard = ({ product, index }) => (
    <div className="group cursor-pointer" onClick={() => navigate('product', product)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#0d0d0d] mb-6 border border-white/5 shadow-xl">
        <img src={product.image} className="w-full h-full object-cover grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-105" alt={product.name} />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           <span className="text-[8px] bg-black/80 backdrop-blur px-2 py-1 uppercase tracking-widest border border-white/10 text-white/80">{product.meta.element}</span>
           <span className="text-[8px] bg-black/80 backdrop-blur px-2 py-1 uppercase tracking-widest border border-white/10 text-amber-200">{product.meta.intention}</span>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-white font-serif text-xl tracking-tighter mb-1 group-hover:text-amber-200 transition-colors">{product.name}</h3>
        <p className="text-white/30 text-[10px] tracking-widest uppercase">${product.price}.00</p>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12 px-6 lg:px-24">
      <div className="flex flex-col md:flex-row justify-between gap-12 text-[10px] tracking-[0.3em] uppercase text-white/20">
        <span>© 2024 Midnight Grove Artifacts</span>
        <div className="flex gap-10">
          <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
          <span className="hover:text-white cursor-pointer transition-colors">Lore</span>
          <span className="hover:text-white cursor-pointer transition-colors">Coven Portal</span>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="bg-[#050505] text-white selection:bg-amber-200 selection:text-black min-h-screen font-sans">
      <Header />
      <main className="animate-in fade-in duration-1000">
        {view === 'home' && <HomeView />}
        {view === 'category' && <CategoryView />}
        {view === 'product' && <ProductView />}
      </main>
      <Footer />
    </div>
  );
};

// --- DATA ---

const products = [
  {
    id: 1,
    name: "Obsidian Raven Amulet",
    price: 185,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600",
    description: "A hand-carved obsidian raven skull set in blackened sterling silver. This piece acts as a spiritual compass for those navigating difficult transitions.",
    meta: { crystal: "Obsidian", theme: "Spiritual", intention: "Protection", planet: "Saturn", element: "Earth", zodiac: "Capricorn", chakra: "Root", handmade: true }
  },
  {
    id: 2,
    name: "Labradorite Seer Ring",
    price: 145,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    description: "A large raw labradorite stone that flashes with the colors of the aurora borealis. Encased in a silver band.",
    meta: { crystal: "Labradorite", theme: "Celestial", intention: "Spiritual Growth", planet: "Uranus", element: "Air", zodiac: "Aquarius", chakra: "Third Eye", handmade: true }
  },
  {
    id: 3,
    name: "Mandrake Dream Syrup",
    price: 64,
    category: "Apothecary",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600",
    description: "Ethically harvested roots prepared over three lunar cycles. Designed to thin the veil between sleep and consciousness.",
    meta: { crystal: "Amethyst (Infused)", theme: "Nocturnal", intention: "Lucid Dreaming", planet: "Moon", element: "Water", zodiac: "Pisces", chakra: "Crown", handmade: false }
  },
  {
    id: 4,
    name: "Solar Citrine Blade",
    price: 320,
    category: "Curiosities",
    image: "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80&w=600",
    description: "A ritual athame featuring a handle embedded with fire-polished citrine. Built for rituals involving personal power.",
    meta: { crystal: "Citrine", theme: "Ritualistic", intention: "Manifestation", planet: "Sun", element: "Fire", zodiac: "Leo", chakra: "Solar Plexus", handmade: true }
  },
  {
    id: 5,
    name: "Velvet Mourning Veil",
    price: 240,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1515434126000-961d90ff09db?q=80&w=600",
    description: "Heavy antique-style velvet veil with intricate lace trimmings. Designed for deep mourning rituals or protecting one's aura in crowded spaces.",
    meta: { crystal: "Jet (Infused)", theme: "Nocturnal", intention: "Banishment", planet: "Saturn", element: "Air", zodiac: "Scorpio", chakra: "Root", handmade: true }
  },
  {
    id: 6,
    name: "Silver Thistle Choker",
    price: 210,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=600",
    description: "Sharp, defensive thistle thorns cast in solid silver. A symbolic boundary-setter for the wearer's emotional health.",
    meta: { crystal: "Diamond (Infused)", theme: "Victorian", intention: "Protection", planet: "Mars", element: "Fire", zodiac: "Aries", chakra: "Heart", handmade: true }
  },
  {
    id: 7,
    name: "Iron Root Candelabra",
    price: 450,
    category: "Curiosities",
    image: "https://images.unsplash.com/photo-1514483127413-f72f273478c3?q=80&w=600",
    description: "A heavy, three-branch candelabra forged in the shape of ancient oak roots. Used to illuminate the darker corners of a spell-room.",
    meta: { crystal: "Hematite", theme: "Spiritual", intention: "Protection", planet: "Saturn", element: "Earth", zodiac: "Capricorn", chakra: "Root", handmade: true }
  }
];

export default App;