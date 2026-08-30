'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Bell, Receipt, Check, Sparkles, Wine } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const dict = {
  es: {
    headerTag: "MENÚ QR",
    headerTitle: "Carta Digital",
    restaurantPre: "BISTRO & GASTRONOMÍA",
    restaurantName: "NOIR",
    restaurantSub: "Cocina de Autor · Terraza Mesa 12",
    categories: [
      { key: "all", label: "Todo" },
      { key: "entradas", label: "Entradas" },
      { key: "principales", label: "Platos Fuertes" },
      { key: "postres", label: "Postres" },
      { key: "vinos", label: "Coctelería & Vinos" }
    ],
    sections: {
      entradas: "E N T R A D A S  &  A P E R I T I V O S",
      principales: "P L A T O S  F U E R T E S",
      postres: "P O S T R E S  &  D U L C E S",
      vinos: "C O C T E L E R Í A  &  V I N O S"
    },
    floatingBtn: "Ver mi pedido",
    cartTitle: "Tu Selección",
    cartEmpty: "No has añadido ningún plato a tu pedido.",
    subtotal: "Subtotal",
    callWaiter: "Llamar Garzón",
    requestBill: "Pedir la Cuenta",
    addBtn: "Añadir al pedido",
    addBothBtn: "Añadir Plato + Maridaje",
    successMsg: "Garzón notificado. En breve se acercará a la Mesa 12.",
    sensoryProfile: "Perfil Sensorial",
    chefPairing: "Maridaje del Chef",
    pairingDesc: "Recomendamos acompañar este plato con:",
    menuItems: [
      {
        id: 1,
        category: "entradas",
        name: "Tiradito de Salmón & Maracuyá",
        desc: "lajas de salmón fresco, leche de tigre de maracuyá, camote crocante, canchita",
        price: 12900,
        pairingId: 11, // Emparejado con el Chardonnay
        profile: { intensity: 2, freshness: 5, sweetness: 2 }
      },
      {
        id: 2,
        category: "entradas",
        name: "Croquetas de Jamón Serrano & Trufa",
        desc: "muselina suave de bechamel, alioli de ajo negro, parmesano 24 meses",
        price: 9800,
        pairingId: null,
        profile: { intensity: 4, freshness: 1, sweetness: 1 }
      },
      {
        id: 3,
        category: "entradas",
        name: "Higos Asados & Queso de Cabra",
        desc: "mix de verdes orgánicos, higos caramelizados, nueces garrapiñadas, miel de ulmo",
        price: 10500,
        pairingId: 11,
        profile: { intensity: 3, freshness: 4, sweetness: 4 }
      },
      {
        id: 4,
        category: "principales",
        name: "Plateada al Vino Tinto & Pastel de Choclo",
        desc: "cocción lenta por 16 horas, pastel de choclo dulce gratinado, jus de carne",
        price: 17500,
        pairingId: 12, // Emparejado con el Cabernet
        profile: { intensity: 5, freshness: 1, sweetness: 3 }
      },
      {
        id: 5,
        category: "principales",
        name: "Atún Sellado en Costra de Sésamo",
        desc: "corazón a término, puré de arvejas a la menta, salteado de brotes & soya",
        price: 18900,
        pairingId: 11,
        profile: { intensity: 3, freshness: 4, sweetness: 1 }
      },
      {
        id: 6,
        category: "principales",
        name: "Canelones de Espinaca & Ricotta",
        desc: "pomodoro de tomates italianos asados, mozzarella de búfala gratinada",
        price: 13500,
        pairingId: null,
        profile: { intensity: 3, freshness: 3, sweetness: 2 }
      },
      {
        id: 7,
        category: "postres",
        name: "Tarta Tatin de Manzana & Canela",
        desc: "hojaldre crocante artesanal, manzanas caramelizadas, helado de crema americana",
        price: 6900,
        pairingId: 10, // Emparejado con el Espresso Martini
        profile: { intensity: 4, freshness: 1, sweetness: 5 }
      },
      {
        id: 8,
        category: "postres",
        name: "Crème Brûlée de Té Matcha",
        desc: "costra fina de azúcar soplada, praliné crujiente de pistachos",
        price: 6500,
        pairingId: null,
        profile: { intensity: 3, freshness: 2, sweetness: 4 }
      },
      {
        id: 10,
        category: "vinos",
        name: "Espresso Martini de la Casa",
        desc: "vodka premium, licor de café artesanal, shot de espresso recien extraído",
        price: 8500,
        pairingId: null,
        profile: { intensity: 5, freshness: 1, sweetness: 3 }
      },
      {
        id: 11,
        category: "vinos",
        name: "Chardonnay Gran Reserva (Copa)",
        desc: "Valle del Limarí, notas de piña asada, mantequilla & vainilla de roble francés",
        price: 6200,
        pairingId: null,
        profile: { intensity: 3, freshness: 4, sweetness: 2 }
      },
      {
        id: 12,
        category: "vinos",
        name: "Cabernet Sauvignon Reserva (Copa)",
        desc: "Valle del Maipo, taninos sedosos, notas a ciruela negra y pimienta",
        price: 7500,
        pairingId: null,
        profile: { intensity: 5, freshness: 2, sweetness: 1 }
      }
    ]
  },
  en: {
    headerTag: "QR MENU",
    headerTitle: "Digital Menu",
    restaurantPre: "BISTRO & GASTRONOMY",
    restaurantName: "NOIR",
    restaurantSub: "Signature Cuisine · Terrace Table 12",
    categories: [
      { key: "all", label: "All" },
      { key: "entradas", label: "Starters" },
      { key: "principales", label: "Main Courses" },
      { key: "postres", label: "Desserts" },
      { key: "vinos", label: "Cocktails & Wine" }
    ],
    sections: {
      entradas: "S T A R T E R S  &  A P P E T I Z E R S",
      principales: "M A I N  C O U R S E S",
      postres: "D E S S E R T S  &  S W E E T S",
      vinos: "C O C K T A I L S  &  W I N E"
    },
    floatingBtn: "View my order",
    cartTitle: "Your Selection",
    cartEmpty: "You haven't added any dishes to your order.",
    subtotal: "Subtotal",
    callWaiter: "Call Waiter",
    requestBill: "Request Bill",
    addBtn: "Add to order",
    addBothBtn: "Add Dish + Pairing",
    successMsg: "Waiter notified. They will be at Table 12 shortly.",
    sensoryProfile: "Sensory Profile",
    chefPairing: "Chef's Pairing",
    pairingDesc: "We recommend pairing this dish with:",
    menuItems: [
      {
        id: 1,
        category: "entradas",
        name: "Salmon & Passionfruit Tiradito",
        desc: "fresh salmon slices, passionfruit tiger milk, crispy sweet potato, toasted corn",
        price: 12900,
        pairingId: 11,
        profile: { intensity: 2, freshness: 5, sweetness: 2 }
      },
      {
        id: 2,
        category: "entradas",
        name: "Serrano Ham & Truffle Croquettes",
        desc: "smooth béchamel, black garlic aioli, 24-month aged parmesan",
        price: 9800,
        pairingId: null,
        profile: { intensity: 4, freshness: 1, sweetness: 1 }
      },
      {
        id: 3,
        category: "entradas",
        name: "Roasted Figs & Goat Cheese",
        desc: "organic greens mix, caramelized figs, candied walnuts, ulmo honey dressing",
        price: 10500,
        pairingId: 11,
        profile: { intensity: 3, freshness: 4, sweetness: 4 }
      },
      {
        id: 4,
        category: "principales",
        name: "Red Wine Braised Beef & Sweet Corn Pie",
        desc: "16-hour slow cooked beef, au gratin sweet corn pie, rich pan jus",
        price: 17500,
        pairingId: 12,
        profile: { intensity: 5, freshness: 1, sweetness: 3 }
      },
      {
        id: 5,
        category: "principales",
        name: "Sesame-Crusted Seared Tuna",
        desc: "medium-rare center, mint pea puree, sautéed sprouts & soy",
        price: 18900,
        pairingId: 11,
        profile: { intensity: 3, freshness: 4, sweetness: 1 }
      },
      {
        id: 6,
        category: "principales",
        name: "Spinach & Ricotta Cannelloni",
        desc: "roasted Italian tomato pomodoro, buffalo mozzarella au gratin",
        price: 13500,
        pairingId: null,
        profile: { intensity: 3, freshness: 3, sweetness: 2 }
      },
      {
        id: 7,
        category: "postres",
        name: "Apple & Cinnamon Tarte Tatin",
        desc: "artisanal crispy puff pastry, caramelized apples, vanilla bean ice cream",
        price: 6900,
        pairingId: 10,
        profile: { intensity: 4, freshness: 1, sweetness: 5 }
      },
      {
        id: 8,
        category: "postres",
        name: "Matcha Tea Crème Brûlée",
        desc: "thin blown sugar crust, crunchy pistachio praline",
        price: 6500,
        pairingId: null,
        profile: { intensity: 3, freshness: 2, sweetness: 4 }
      },
      {
        id: 10,
        category: "vinos",
        name: "Signature Espresso Martini",
        desc: "premium vodka, artisanal coffee liqueur, freshly pulled espresso shot",
        price: 8500,
        pairingId: null,
        profile: { intensity: 5, freshness: 1, sweetness: 3 }
      },
      {
        id: 11,
        category: "vinos",
        name: "Chardonnay Gran Reserva (Glass)",
        desc: "Limarí Valley, notes of roasted pineapple, butter & French oak vanilla",
        price: 6200,
        pairingId: null,
        profile: { intensity: 3, freshness: 4, sweetness: 2 }
      },
      {
        id: 12,
        category: "vinos",
        name: "Cabernet Sauvignon Reserva (Glass)",
        desc: "Maipo Valley, silky tannins, black plum and pepper notes",
        price: 7500,
        pairingId: null,
        profile: { intensity: 5, freshness: 2, sweetness: 1 }
      }
    ]
  }
};

export default function MenuQRPage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = dict[lang];

  const [activeCat, setActiveCat] = useState('all');
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (isCartOpen || selectedItem) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isCartOpen, selectedItem]);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CL');
  };

  const addToCart = (ids: number[]) => {
    setCart(prev => {
      let newCart = [...prev];
      ids.forEach(id => {
        const existing = newCart.find(item => item.id === id);
        if (existing) {
          newCart = newCart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
        } else {
          newCart.push({ id, quantity: 1 });
        }
      });
      return newCart;
    });
    setSelectedItem(null);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const cartItems = cart.map(item => ({
    product: t.menuItems.find(p => p.id === item.id)!,
    quantity: item.quantity
  })).filter(item => item.product !== undefined);

  const total = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Renderizador de Puntos Sensoriales
  const renderDots = (value: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(dot => (
          <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= value ? 'bg-[#D29F80]' : 'bg-[#332C28]'}`} />
        ))}
      </div>
    );
  };

  const renderSection = (categoryKey: string, title: string) => {
    const items = t.menuItems.filter(item => item.category === categoryKey);
    if (items.length === 0) return null;
    if (activeCat !== 'all' && activeCat !== categoryKey) return null;

    return (
      <div className="mb-12" key={categoryKey}>
        <h3 className="text-[#D29F80] text-xs font-bold tracking-[0.3em] uppercase mb-6 pb-3 border-b border-dashed border-[#332C28]">
          {title}
        </h3>
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className="flex flex-col cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-1 gap-4">
                <h4 className="text-base font-bold text-[#EDEDED] group-hover:text-[#D29F80] transition-colors leading-tight">
                  {item.name}
                </h4>
                <span className="text-sm font-bold text-[#D29F80] whitespace-nowrap">
                  ${formatPrice(item.price)}
                </span>
              </div>
              <p className="text-sm text-[#A09590] leading-snug pr-8">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const pairingItem = selectedItem?.pairingId ? t.menuItems.find(i => i.id === selectedItem.pairingId) : null;

  return (
    <div className="min-h-screen bg-[#161413] text-[#EDEDED] font-sans pb-32 selection:bg-[#D29F80] selection:text-black">
      
      <div className="sticky top-0 z-40 bg-[#161413]/95 backdrop-blur-xl border-b border-[#26211E]">
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="border border-[#332C28] bg-[#201C1A] px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase text-[#A09590] rounded-md">
              {t.headerTag}
            </span>
            <span className="text-sm font-bold text-white">{t.headerTitle}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center p-1 bg-[#201C1A] border border-[#332C28] rounded-full relative w-[70px] h-[26px]">
              <button onClick={() => setLang('es')} className={`w-1/2 relative z-10 text-[9px] font-bold transition-colors ${lang === 'es' ? 'text-black' : 'text-[#A09590]'}`}>ES</button>
              <button onClick={() => setLang('en')} className={`w-1/2 relative z-10 text-[9px] font-bold transition-colors ${lang === 'en' ? 'text-black' : 'text-[#A09590]'}`}>EN</button>
              <motion.div className="absolute top-1 bottom-1 w-[30px] bg-[#D29F80] rounded-full z-0" initial={false} animate={{ left: lang === 'es' ? '4px' : '34px' }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            </div>
            <Link href="/" className="w-8 h-8 flex items-center justify-center bg-[#201C1A] rounded-full border border-[#332C28] text-[#A09590] hover:text-white transition-colors">
              <X size={16} />
            </Link>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-4 pt-2 justify-start md:justify-center max-w-2xl mx-auto">
          {t.categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCat(cat.key)}
              className={`px-5 py-2 rounded-full text-xs whitespace-nowrap transition-all border ${
                activeCat === cat.key 
                  ? 'bg-[#D29F80]/15 text-[#D29F80] border-[#D29F80]' 
                  : 'bg-transparent text-[#A09590] border-[#2B2522] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <header className="text-center py-16 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(210,159,128,0.08),transparent_60%)] pointer-events-none" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#A09590] mb-3 relative z-10">{t.restaurantPre}</p>
        <h1 className="text-6xl md:text-7xl font-serif italic text-[#D29F80] mb-4 relative z-10">{t.restaurantName}</h1>
        <p className="text-sm text-[#A09590] relative z-10">{t.restaurantSub}</p>
      </header>

      <main className="max-w-2xl mx-auto px-6">
        {renderSection('entradas', t.sections.entradas)}
        {renderSection('principales', t.sections.principales)}
        {renderSection('postres', t.sections.postres)}
        {renderSection('vinos', t.sections.vinos)}
      </main>

      <AnimatePresence>
        {totalItems > 0 && !isCartOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full px-6 max-w-sm"
          >
            <button 
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-[#D29F80] text-black px-6 py-4 rounded-full font-bold text-sm shadow-[0_10px_40px_rgba(210,159,128,0.3)] flex justify-between items-center hover:scale-[1.02] transition-transform"
            >
              <span>{t.floatingBtn} ({totalItems})</span>
              <span>${formatPrice(total)}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal del Plato - Rediseñado con Upselling y Sensorial */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedItem(null)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
            <motion.div 
              initial={{ opacity: 0, y: '100%' }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: '100%' }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-[#201C1A] border-t border-[#332C28] rounded-t-3xl z-50 p-6 md:max-w-lg md:mx-auto md:bottom-6 md:rounded-3xl md:border shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-serif text-[#D29F80] pr-8">{selectedItem.name}</h3>
                <button onClick={() => setSelectedItem(null)} className="p-2 -mr-2 text-[#A09590] hover:text-white shrink-0"><X size={20} /></button>
              </div>
              <p className="text-[#A09590] text-sm mb-6 leading-relaxed">{selectedItem.desc}</p>
              
              {/* Perfil Sensorial */}
              {selectedItem.profile && (
                <div className="mb-6 pb-6 border-b border-[#332C28]/50">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#8A8A8A] mb-3 block">{t.sensoryProfile}</span>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-[#EDEDED] uppercase">Intensidad</span>
                      {renderDots(selectedItem.profile.intensity)}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-[#EDEDED] uppercase">Frescor</span>
                      {renderDots(selectedItem.profile.freshness)}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-[#EDEDED] uppercase">Dulzor</span>
                      {renderDots(selectedItem.profile.sweetness)}
                    </div>
                  </div>
                </div>
              )}

              {/* Upselling: Maridaje Sugerido */}
              {pairingItem && (
                <div className="mb-8 p-4 rounded-2xl bg-[#D29F80]/5 border border-[#D29F80]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-20"><Wine size={48} className="text-[#D29F80]" /></div>
                  <div className="relative z-10">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-[#D29F80] mb-2 font-bold">
                      <Sparkles size={12} /> {t.chefPairing}
                    </span>
                    <p className="text-xs text-[#A09590] mb-2">{t.pairingDesc}</p>
                    <div className="flex justify-between items-center bg-[#161413] border border-[#332C28] p-3 rounded-xl">
                      <div>
                        <h4 className="text-sm font-bold text-white">{pairingItem.name}</h4>
                        <span className="text-xs text-[#D29F80] font-bold">+ ${formatPrice(pairingItem.price)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mb-6">
                <span className="text-white font-bold text-2xl">${formatPrice(selectedItem.price)}</span>
              </div>

              <div className="flex gap-3">
                {pairingItem ? (
                  <>
                    <button 
                      onClick={() => addToCart([selectedItem.id])} 
                      className="flex-1 py-4 border border-[#332C28] text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-[#332C28] transition-colors"
                    >
                      {t.addBtn}
                    </button>
                    <button 
                      onClick={() => addToCart([selectedItem.id, pairingItem.id])} 
                      className="flex-[1.5] py-4 bg-[#D29F80] text-black font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-[#e4b296] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(210,159,128,0.2)]"
                    >
                      <Sparkles size={14} /> {t.addBothBtn}
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => addToCart([selectedItem.id])} 
                    className="w-full py-4 bg-[#D29F80] text-black font-bold rounded-xl text-sm uppercase tracking-widest hover:bg-[#e4b296] transition-colors"
                  >
                    {t.addBtn}
                  </button>
                )}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-[#161413] border-l border-[#26211E] z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#26211E]">
                <h2 className="text-lg font-serif italic text-[#D29F80]">{t.cartTitle}</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-[#A09590] hover:text-white"><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#5C524C]">
                    <Receipt size={48} strokeWidth={1} className="mb-4" />
                    <p className="text-sm">{t.cartEmpty}</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="flex flex-col py-2 border-b border-[#26211E]/80 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm text-white pr-4">{item.product.name}</h4>
                        <span className="font-bold text-[#D29F80]">${formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-4 border border-[#332C28] bg-[#201C1A] rounded-full px-3 py-1">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="text-[#A09590] hover:text-white"><Minus size={14}/></button>
                          <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="text-[#A09590] hover:text-white"><Plus size={14}/></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 border-t border-[#26211E] bg-[#100E0D]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-[#A09590] uppercase tracking-widest">{t.subtotal}</span>
                  <span className="text-3xl font-bold text-white">${formatPrice(total)}</span>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => { setIsCartOpen(false); triggerNotification(t.successMsg); }}
                    className="flex-1 py-4 border border-[#D29F80] text-[#D29F80] font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[#D29F80]/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Bell size={16} />
                    {t.callWaiter}
                  </button>
                  <button 
                    onClick={() => { setIsCartOpen(false); triggerNotification(t.successMsg); }}
                    className="flex-1 py-4 bg-[#D29F80] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[#e4b296] transition-colors flex items-center justify-center gap-2"
                  >
                    <Receipt size={16} />
                    {t.requestBill}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[90vw] max-w-sm bg-[#201C1A] border border-[#D29F80] text-white px-5 py-4 rounded-2xl shadow-2xl text-xs flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-[#D29F80]/20 flex items-center justify-center text-[#D29F80] shrink-0">
              <Check size={16} />
            </div>
            <span className="leading-snug">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}