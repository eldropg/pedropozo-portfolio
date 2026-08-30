'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, ArrowLeft, ArrowRight, X, Plus, Minus, Info, User, Gift, HelpCircle, Check, Eye, Sparkles, MapPin, Briefcase, ShieldCheck, FileText, Globe, Building } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const dict = {
  es: {
    back: "Volver al Portfolio",
    bag: "Bolsa",
    hero: {
      tag: "Nueva Colección 2026",
      title1: "Hardware",
      title2: "Sin Ruido."
    },
    promos: [
      "12 cuotas sin interés en todo el sitio",
      "Regístrate y obtén 15% de descuento con el código AURA15",
      "Envío global prioritario gratuito en compras sobre $200"
    ],
    sections: {
      categoriesTitle: "Compra por Categoría",
      useTitle: "Diseñado para tu Estilo de Trabajo",
      bestsellersTitle: "Lo Más Vendido",
      classicsTitle: "Los Clásicos de Aura",
      recentlyViewedTitle: "Vistos Recientemente",
      allProductsTitle: "Catálogo Completo"
    },
    categoriesGrid: [
      { key: 'audio', label: 'Audio de Alta Fidelidad', sub: 'Audífonos & Monitores In-Ear', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop' },
      { key: 'mechanical', label: 'Periféricos & Mecánica', sub: 'Teclados Custom & Keycaps', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop' },
      { key: 'cinema', label: 'Sistemas Cinematográficos', sub: 'Soundbars & Subwoofers', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop' }
    ],
    useStyles: [
      { name: 'Para Creadores', desc: 'Edición de video, producción & streaming.', tag: 'Estudio' },
      { name: 'Entorno Audiófilo', desc: 'Respuesta de frecuencia plana & audio hi-res.', tag: 'Hi-Fi' },
      { name: 'Setup Minimalista', desc: 'Líneas limpias, cables ocultos & chasis CNC.', tag: 'Diseño' },
      { name: 'Procesamiento Pesado', desc: 'Rendimiento térmico & durabilidad extrema.', tag: 'Pro' }
    ],
    productParams: {
      fig: "Fig",
      price: "Precio",
      add: "Añadir a la bolsa"
    },
    cart: {
      title: "Tu Bolsa",
      empty: "La bolsa está vacía",
      remove: "Remover",
      subtotal: "Subtotal",
      taxes: "Impuestos y envío calculados en el pago",
      checkout: "Finalizar Compra",
      secure: "Transacción Cifrada 256-bit"
    },
    auth: {
      title: "Tu Cuenta",
      desc: "Accede a tus pedidos, giftcards y centro de ayuda.",
      email: "Correo Electrónico",
      password: "Contraseña",
      loginBtn: "Iniciar Sesión",
      registerText: "¿No tienes cuenta?",
      registerLink: "Regístrate aquí",
      loginText: "¿Ya tienes cuenta?",
      loginLink: "Inicia sesión",
      registerBtn: "Crear Cuenta"
    },
    giftcardModal: {
      title: "Giftcards & Saldos",
      desc: "Compra una tarjeta de regalo digital o canjea tu código AURA",
      buyTab: "Comprar Giftcard",
      redeemTab: "Canjear Código",
      amount: "Monto de la Giftcard",
      recipient: "Correo del Destinatario",
      codePlaceholder: "Ej: AURA-2026-X981",
      buyBtn: "Comprar Giftcard",
      redeemBtn: "Canjear Ahora",
      successMsg: "¡Código canjeado con éxito! Se han añadido $100 USD a tu cuenta."
    },
    helpModal: {
      title: "Centro de Ayuda",
      desc: "Asistencia técnica, estado de envíos y consultas frecuentes.",
      trackTitle: "Rastrear Pedido",
      trackPlaceholder: "Número de seguimiento (ej. #AURA-8831)",
      trackBtn: "Rastrear",
      trackResult: "Pedido #AURA-8831: En tránsito hacia tu dirección. Entrega estimada: 24-48 hrs.",
      faqTitle: "Preguntas Frecuentes",
      faqs: [
        { q: "¿Cómo aplico el cupón AURA15?", a: "Introduce el código AURA15 en la pantalla de pago al finalizar tu compra para obtener un 15% de descuento." },
        { q: "¿Cuáles son los métodos de pago?", a: "Aceptamos tarjetas de crédito, débito, PayPal y hasta 12 cuotas sin interés." },
        { q: "¿Tienen garantía los productos?", a: "Todos los productos AURA incluyen 2 años de garantía oficial contra defectos de fábrica." }
      ]
    },
    megaFooter: {
      resources: {
        title: "Recursos",
        links: [
          { name: "Gift Cards", action: "giftcard_buy" },
          { name: "Consulta tu Gift Card", action: "giftcard_redeem" },
          { name: "Estado de tu Pedido", action: "track" },
          { name: "Encuentra una Tienda", action: "info_stores" },
          { name: "Ventas Corporativas & Mayorista", action: "info_b2b" }
        ]
      },
      help: {
        title: "Ayuda",
        links: [
          { name: "Centro de Ayuda", action: "help" },
          { name: "Bases Legales", action: "info_legal" },
          { name: "Guía de Especificaciones", action: "info_specs" },
          { name: "Garantía & Devoluciones", action: "info_warranty" },
          { name: "T&C Promociones", action: "info_terms" },
          { name: "AURA Members Club", action: "register" }
        ]
      },
      about: {
        title: "Acerca de Aura",
        links: [
          { name: "Sobre Nosotros", action: "info_about" },
          { name: "Noticias & Lanzamientos", action: "info_news" },
          { name: "Empleos & Carreras", action: "info_careers" },
          { name: "Inversionistas", action: "info_investors" },
          { name: "Sostenibilidad & Impacto", action: "info_sustainability" }
        ]
      },
      specials: {
        title: "Especiales & Eventos",
        links: [
          { name: "Live Shopping", action: "info_live" },
          { name: "Cyber Aura", action: "info_cyber" },
          { name: "Black Friday Aura", action: "info_blackfriday" },
          { name: "Aura Member Days", action: "register" },
          { name: "Lanzamientos Exclusivos", action: "info_drops" }
        ]
      },
      newsletterTitle: "Únete al Club Aura",
      newsletterDesc: "Acceso anticipado a lanzamientos limitados y descuentos exclusivos.",
      email: "Tu correo electrónico",
      subscribe: "Suscribirse",
      copy: "Diseñado y Desarrollado por Pedro Pozo © 2026"
    },
    products: [
      { 
        id: 1, 
        type: 'audio',
        name: 'Aura Studio Pro', 
        category: 'Audio Serie 01',
        bestseller: true,
        classic: true,
        desc: 'Auriculares circumaurales con cancelación activa de ruido híbrida y audio espacial. Chasis de aluminio aeroespacial y almohadillas de espuma viscoelástica.', 
        price: 349, 
        color: 'Obsidian Black',
        specs: ['Drivers: 40mm Beryllium', 'Batería: 40 horas', 'Bluetooth 5.3', 'Peso: 285g'],
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-zinc-800 to-black'
      },
      { 
        id: 2, 
        type: 'mechanical',
        name: 'Aura Phantom', 
        category: 'Mecánica Serie 02',
        bestseller: true,
        classic: false,
        desc: 'Teclado mecánico custom de perfil bajo. Switches magnéticos lineales ajustables desde 0.1mm hasta 4.0mm. Estructura gasket mount.', 
        price: 219, 
        color: 'Ghost White',
        specs: ['Layout: 75%', 'Polling Rate: 8000Hz', 'Keycaps: PBT Double-shot', 'Cuerpo: CNC Aluminio'],
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-gray-200/10 to-black'
      },
      { 
        id: 3, 
        type: 'cinema',
        name: 'Aura Soundbar', 
        category: 'Cine Serie 03',
        bestseller: false,
        classic: true,
        desc: 'Sistema de audio estéreo con audio espacial Dolby Atmos y sub-woofer integrado. Calibración acústica adaptativa al entorno de la habitación.', 
        price: 499, 
        color: 'Carbon Grey',
        specs: ['Potencia: 400W RMS', 'Canales: 5.1.2', 'Conexión: HDMI eARC', 'Wifi 6 & AirPlay 2'],
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-neutral-800 to-black'
      },
      { 
        id: 4, 
        type: 'audio',
        name: 'Aura Ear One', 
        category: 'Audio Serie 04',
        bestseller: true,
        classic: false,
        desc: 'Monitores intraurales de referencia con drivers armadura balanceada doble. Cancelación de ruido pasiva de -26dB y cable bañado en plata.', 
        price: 189, 
        color: 'Clear Titan',
        specs: ['Aislamiento: -26dB', 'Frecuencia: 10Hz - 40kHz', 'Cable: MMCX Detachable', 'Estuche: MagSafe Aluminium'],
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-slate-800 to-black'
      },
      { 
        id: 5, 
        type: 'accessories',
        name: 'Aura Command Desk', 
        category: 'Estudio Serie 05',
        bestseller: false,
        classic: true,
        desc: 'Pad de escritorio modular en fieltro lana merino con base magnética de carga MagSafe de 15W integrada y organizador de cables CNC.', 
        price: 129, 
        color: 'Space Dark',
        specs: ['Material: Fieltro Lana 100%', 'Carga: 15W Qi Fast Charge', 'Medidas: 900 x 400 mm', 'Base: Antideslizante'],
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-zinc-900 to-black'
      },
      { 
        id: 6, 
        type: 'mechanical',
        name: 'Aura Artisan Titan', 
        category: 'Mecánica Serie 06',
        bestseller: false,
        classic: false,
        desc: 'Set de keycaps mecanizadas en titanio de grado médico con acabado anodizado negro mate. Compatibilidad universal Cherry MX.', 
        price: 89, 
        color: 'Matte Titan',
        specs: ['Material: Titanio Grado 5', 'Perfil: OEM / Cherry', 'Proceso: CNC Micro-Finish', 'Piezas: Esc / Enter Set'],
        image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-stone-800 to-black'
      },
      { 
        id: 7, 
        type: 'cinema',
        name: 'Aura Sub Pro', 
        category: 'Cine Serie 07',
        bestseller: true,
        classic: false,
        desc: 'Subwoofer inalámbrico de frecuencias ultra-bajas con doble radiador pasivo y caja de resonancia sintonizada en aluminio.', 
        price: 399, 
        color: 'Deep Black',
        specs: ['Potencia: 300W RMS', 'Frecuencia: 20Hz - 120Hz', 'Conectividad: Zero-Latency Wireless', 'Peso: 12.4 kg'],
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-neutral-900 to-black'
      },
      { 
        id: 8, 
        type: 'audio',
        name: 'Aura Stream Mic', 
        category: 'Studio Serie 08',
        bestseller: false,
        classic: true,
        desc: 'Micrófono de condensador dinámico para transmisión y podcasting con DSP integrado, filtro pop interno y salida dual USB-C / XLR.', 
        price: 279, 
        color: 'Anodized Charcoal',
        specs: ['Cápsula: Dinámica Cardroide', 'Muestra: 24-bit / 96kHz', 'Conexión: USB-C & XLR', 'DSP: Filtro de Ruido HW'],
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-zinc-800 to-black'
      }
    ]
  },
  en: {
    back: "Back to Portfolio",
    bag: "Bag",
    hero: {
      tag: "New Collection 2026",
      title1: "Hardware",
      title2: "Zero Noise."
    },
    promos: [
      "12 interest-free installments sitewide",
      "Sign up and get 15% off with code AURA15",
      "Free priority global shipping on orders over $200"
    ],
    sections: {
      categoriesTitle: "Shop by Category",
      useTitle: "Engineered for Your Workflow",
      bestsellersTitle: "Best Sellers",
      classicsTitle: "Aura Classics",
      recentlyViewedTitle: "Recently Viewed",
      allProductsTitle: "Full Catalog"
    },
    categoriesGrid: [
      { key: 'audio', label: 'High-Fidelity Audio', sub: 'Headphones & In-Ear Monitors', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop' },
      { key: 'mechanical', label: 'Peripherals & Custom', sub: 'Mechanical Keyboards & Keycaps', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop' },
      { key: 'cinema', label: 'Cinema Systems', sub: 'Soundbars & Subwoofers', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop' }
    ],
    useStyles: [
      { name: 'For Content Creators', desc: 'Video editing, audio mixing & streaming.', tag: 'Studio' },
      { name: 'Audiophile Grade', desc: 'Flat frequency response & hi-res audio.', tag: 'Hi-Fi' },
      { name: 'Minimalist Desk setup', desc: 'Clean lines, hidden cables & CNC aluminum.', tag: 'Design' },
      { name: 'Heavy Duty Engineering', desc: 'Thermal performance & high durability.', tag: 'Pro' }
    ],
    productParams: {
      fig: "Fig",
      price: "Price",
      add: "Add to bag"
    },
    cart: {
      title: "Your Bag",
      empty: "Your bag is empty",
      remove: "Remove",
      subtotal: "Subtotal",
      taxes: "Taxes and shipping calculated at checkout",
      checkout: "Checkout",
      secure: "256-bit Encrypted Transaction"
    },
    auth: {
      title: "Your Account",
      desc: "Access your orders, giftcards, and help center.",
      email: "Email Address",
      password: "Password",
      loginBtn: "Sign In",
      registerText: "Don't have an account?",
      registerLink: "Register here",
      loginText: "Already have an account?",
      loginLink: "Sign in",
      registerBtn: "Create Account"
    },
    giftcardModal: {
      title: "Giftcards & Balance",
      desc: "Purchase a digital giftcard or redeem your AURA code.",
      buyTab: "Purchase",
      redeemTab: "Redeem Code",
      amount: "Giftcard Amount",
      recipient: "Recipient Email",
      codePlaceholder: "Ex: AURA-2026-X981",
      buyBtn: "Purchase Giftcard",
      redeemBtn: "Redeem Now",
      successMsg: "Code successfully redeemed! $100 USD added to your account."
    },
    helpModal: {
      title: "Help Center",
      desc: "Technical support, order status, and FAQs.",
      trackTitle: "Track Order",
      trackPlaceholder: "Tracking number (ex: #AURA-8831)",
      trackBtn: "Track",
      trackResult: "Order #AURA-8831: In transit to your address. Estimated delivery: 24-48 hrs.",
      faqTitle: "Frequently Asked Questions",
      faqs: [
        { q: "How do I apply the AURA15 coupon?", a: "Enter the code AURA15 at checkout to receive a 15% discount." },
        { q: "What payment methods are supported?", a: "We accept credit cards, debit cards, PayPal, and up to 12 interest-free installments." },
        { q: "Do products come with a warranty?", a: "All AURA products include a 2-year official warranty against manufacturing defects." }
      ]
    },
    megaFooter: {
      resources: {
        title: "Resources",
        links: [
          { name: "Gift Cards", action: "giftcard_buy" },
          { name: "Check Gift Card Balance", action: "giftcard_redeem" },
          { name: "Order Status", action: "track" },
          { name: "Find a Store", action: "info_stores" },
          { name: "Corporate & B2B Sales", action: "info_b2b" }
        ]
      },
      help: {
        title: "Help",
        links: [
          { name: "Help Center", action: "help" },
          { name: "Legal Terms", action: "info_legal" },
          { name: "Specification Guide", action: "info_specs" },
          { name: "Warranty & Returns", action: "info_warranty" },
          { name: "Promo Terms & Conditions", action: "info_terms" },
          { name: "AURA Members Club", action: "register" }
        ]
      },
      about: {
        title: "About Aura",
        links: [
          { name: "About Us", action: "info_about" },
          { name: "News & Releases", action: "info_news" },
          { name: "Careers & Jobs", action: "info_careers" },
          { name: "Investors", action: "info_investors" },
          { name: "Sustainability & Impact", action: "info_sustainability" }
        ]
      },
      specials: {
        title: "Specials & Events",
        links: [
          { name: "Live Shopping", action: "info_live" },
          { name: "Cyber Aura", action: "info_cyber" },
          { name: "Black Friday Aura", action: "info_blackfriday" },
          { name: "Aura Member Days", action: "register" },
          { name: "Exclusive Drops", action: "info_drops" }
        ]
      },
      newsletterTitle: "Join the Aura Club",
      newsletterDesc: "Early access to limited drops and exclusive member perks.",
      email: "Your email address",
      subscribe: "Subscribe",
      copy: "Designed and Developed by Pedro Pozo © 2026"
    },
    products: [
      { 
        id: 1, 
        type: 'audio',
        name: 'Aura Studio Pro', 
        category: 'Audio Series 01',
        bestseller: true,
        classic: true,
        desc: 'Over-ear headphones with hybrid active noise cancellation and spatial audio. Aerospace aluminum chassis and memory foam ear cushions.', 
        price: 349, 
        color: 'Obsidian Black',
        specs: ['Drivers: 40mm Beryllium', 'Battery: 40 hours', 'Bluetooth 5.3', 'Weight: 285g'],
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-zinc-800 to-black'
      },
      { 
        id: 2, 
        type: 'mechanical',
        name: 'Aura Phantom', 
        category: 'Mechanical Series 02',
        bestseller: true,
        classic: false,
        desc: 'Low-profile custom mechanical keyboard. Linear magnetic switches adjustable from 0.1mm to 4.0mm. Gasket mount structure.', 
        price: 219, 
        color: 'Ghost White',
        specs: ['Layout: 75%', 'Polling Rate: 8000Hz', 'Keycaps: PBT Double-shot', 'Body: CNC Aluminum'],
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-gray-200/10 to-black'
      },
      { 
        id: 3, 
        type: 'cinema',
        name: 'Aura Soundbar', 
        category: 'Cinema Series 03',
        bestseller: false,
        classic: true,
        desc: 'Stereo sound system with Dolby Atmos spatial audio and built-in sub-woofer. Adaptive room acoustic calibration.', 
        price: 499, 
        color: 'Carbon Grey',
        specs: ['Power: 400W RMS', 'Channels: 5.1.2', 'Connection: HDMI eARC', 'Wifi 6 & AirPlay 2'],
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-neutral-800 to-black'
      },
      { 
        id: 4, 
        type: 'audio',
        name: 'Aura Ear One', 
        category: 'Audio Series 04',
        bestseller: true,
        classic: false,
        desc: 'In-ear reference monitors with dual balanced armature drivers. -26dB passive noise isolation and silver-plated cable.', 
        price: 189, 
        color: 'Clear Titan',
        specs: ['Isolation: -26dB', 'Frequency: 10Hz - 40kHz', 'Cable: MMCX Detachable', 'Case: MagSafe Aluminium'],
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-slate-800 to-black'
      },
      { 
        id: 5, 
        type: 'accessories',
        name: 'Aura Command Desk', 
        category: 'Studio Series 05',
        bestseller: false,
        classic: true,
        desc: 'Modular merino wool felt desk pad with built-in 15W MagSafe magnetic wireless charging base and CNC cable channel.', 
        price: 129, 
        color: 'Space Dark',
        specs: ['Material: 100% Merino Wool', 'Charging: 15W Qi Fast Charge', 'Dimensions: 900 x 400 mm', 'Base: Non-slip Rubber'],
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-zinc-900 to-black'
      },
      { 
        id: 6, 
        type: 'mechanical',
        name: 'Aura Artisan Titan', 
        category: 'Mechanical Series 06',
        bestseller: false,
        classic: false,
        desc: 'Medical-grade titanium CNC keycap set with matte black anodized finish. Universal Cherry MX stem compatibility.', 
        price: 89, 
        color: 'Matte Titan',
        specs: ['Material: Grade 5 Titanium', 'Profile: OEM / Cherry', 'Process: CNC Micro-Finish', 'Pieces: Esc / Enter Set'],
        image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-stone-800 to-black'
      },
      { 
        id: 7, 
        type: 'cinema',
        name: 'Aura Sub Pro', 
        category: 'Cinema Series 07',
        bestseller: true,
        classic: false,
        desc: 'Ultra-low frequency wireless subwoofer with dual passive radiators and tuned aluminum acoustic enclosure.', 
        price: 399, 
        color: 'Deep Black',
        specs: ['Power: 300W RMS', 'Frequency: 20Hz - 120Hz', 'Connection: Zero-Latency Wireless', 'Weight: 12.4 kg'],
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-neutral-900 to-black'
      },
      { 
        id: 8, 
        type: 'audio',
        name: 'Aura Stream Mic', 
        category: 'Studio Series 08',
        bestseller: false,
        classic: true,
        desc: 'Dynamic studio condenser microphone for broadcasting and podcasting with integrated DSP, internal pop filter, and dual USB-C / XLR outputs.', 
        price: 279, 
        color: 'Anodized Charcoal',
        specs: ['Capsule: Dynamic Cardioid', 'Sample Rate: 24-bit / 96kHz', 'Connection: USB-C & XLR', 'DSP: Hardware Noise Gate'],
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
        glow: 'from-zinc-800 to-black'
      }
    ]
  }
};

const categoryList = [
  { key: 'all', es: 'Lo Nuevo', en: 'New In' },
  { key: 'bestsellers', es: 'Lo Más Vendido', en: 'Best Sellers' },
  { key: 'classics', es: 'Clásicos Aura', en: 'Aura Classics' },
  { key: 'audio', es: 'Audio', en: 'Audio' },
  { key: 'mechanical', es: 'Mecánica', en: 'Mechanical' },
  { key: 'cinema', es: 'Cine', en: 'Cinema' },
  { key: 'accessories', es: 'Estudio & Accesorios', en: 'Studio & Accessories' },
  { key: 'giftcards', es: 'Giftcards', en: 'Giftcards' },
  { key: 'help', es: 'Centro de Ayuda', en: 'Help Center' }
];

const infoContentMap: Record<string, { title: string; subtitle: string; content: string }> = {
  info_stores: {
    title: "Tiendas Oficiales AURA",
    subtitle: "Ubicaciones & Flagship Stores",
    content: "Visita nuestras tiendas emblemáticas en Santiago, Tokio y Berlín. Experimenta la acústica sin ruido en nuestras salas insonorizadas con atención técnica personalizada."
  },
  info_b2b: {
    title: "Ventas Corporativas & B2B",
    subtitle: "Equipamiento para Empresas y Estudios",
    content: "Ofrecemos licencias corporativas, facturación directa y descuentos por volumen para estudios de grabación, firmas de arquitectura y salas de reuniones executive."
  },
  info_legal: {
    title: "Bases Legales & Normativas",
    subtitle: "Marco Regulatorio Internacional",
    content: "Todos nuestros productos cumplen con normativas de ciberseguridad, certificación ISO 9001 de calidad acústica y directiva CE de gestión de residuos electrónicos."
  },
  info_specs: {
    title: "Guía de Especificaciones Técnicas",
    subtitle: "Ingeniería de Materiales",
    content: "Consultas detalladas sobre impedancias, tasas de respuesta magnética y tolerancias de mecanizado CNC de aluminio aeroespacial Grado 6061."
  },
  info_warranty: {
    title: "Garantía & Devoluciones",
    subtitle: "Cobertura Premium de 2 Años",
    content: "Devoluciones sin costo durante los primeros 30 días. Sustitución inmediata de unidades por fallas de fabricación sin trámites burocráticos."
  },
  info_terms: {
    title: "Términos & Condiciones Promocionales",
    subtitle: "Códigos AURA15 & Member Days",
    content: "Los códigos de descuento aplican sobre el subtotal de la compra. No acumulables con otras ofertas activas o lanzamientos de edición limitada."
  },
  info_about: {
    title: "Sobre AURA Hardware",
    subtitle: "Filosofía del Diseño Sin Ruido",
    content: "Fundada por Pedro Pozo en 2026, AURA busca eliminar las distracciones estéticas e ingeniería sobrecargada para crear herramientas de rendimiento puro."
  },
  info_news: {
    title: "Noticias & Lanzamientos",
    subtitle: "Prensa & Comunicados de Ingeniería",
    content: "Mantente al día con los reportes de desarrollo de sonido espacial, actualizaciones de firmware y colaboraciones arquitectónicas exclusivas."
  },
  info_careers: {
    title: "Empleos & Carreras en AURA",
    subtitle: "Únete a Nuestro Equipo",
    content: "Buscamos ingenieros de firmware, diseñadores industriales de precisión y desarrolladores Full-Stack. Escribe a careers@aura-hardware.com."
  },
  info_investors: {
    title: "Relaciones con Inversionistas",
    subtitle: "Reportes Financieros & Crecimiento",
    content: "Informes trimestrales de desempeño operativo, métricas ESG y expansión de centros de distribución en América Latina y Europa."
  },
  info_sustainability: {
    title: "Sostenibilidad & Impacto Cero",
    subtitle: "Compromiso Ambiental",
    content: "Empaques 100% reciclables sin plásticos de un solo uso, aluminio reciclado en un 80% y programa de reciclaje de hardware antiguo."
  },
  info_live: {
    title: "AURA Live Shopping",
    subtitle: "Demostraciones de Audio en Vivo",
    content: "Sintoniza nuestros streamings semanales con ingenieros de mezcla analizando las curvas de frecuencia en tiempo real."
  },
  info_cyber: {
    title: "Cyber AURA & Eventos",
    subtitle: "Lanzamientos de Temporada",
    content: "Fechas exclusivas con inventario asignado para eventos internacionales de ecommerce con envíos garantizados en 24 horas."
  },
  info_blackfriday: {
    title: "Black Friday AURA",
    subtitle: "Acceso Anticipado para Miembros",
    content: "Los miembros registrados obtienen 48 horas de prioridad de compra antes de la apertura pública de stock de fin de año."
  },
  info_drops: {
    title: "Lanzamientos Exclusivos (Drops)",
    subtitle: "Ediciones Limitadas Numéricas",
    content: "Piezas de ingeniería producidas en lotes limitados de 500 unidades con certificado de autenticidad grabado en láser."
  }
};

export default function AuraCommerce() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = dict[lang];

  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([1, 2, 4]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isGiftcardOpen, setIsGiftcardOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [infoModalKey, setInfoModalKey] = useState<string | null>(null);

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [giftcardMode, setGiftcardMode] = useState<'buy' | 'redeem'>('buy');
  const [giftcardAmount, setGiftcardAmount] = useState<number>(100);
  const [giftcardCode, setGiftcardCode] = useState<string>('');
  const [redeemSuccess, setRedeemSuccess] = useState<boolean>(false);

  const [trackCode, setTrackCode] = useState<string>('');
  const [trackSearched, setTrackSearched] = useState<boolean>(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isCartOpen || isAuthOpen || isGiftcardOpen || isHelpOpen || infoModalKey || loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isCartOpen, isAuthOpen, isGiftcardOpen, isHelpOpen, infoModalKey, loading]);

  useEffect(() => {
    const promoInterval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % t.promos.length);
    }, 4000);
    return () => clearInterval(promoInterval);
  }, [t.promos.length]);

  const handleFooterAction = (actionKey: string) => {
    if (actionKey === 'giftcard_buy') {
      setGiftcardMode('buy');
      setIsGiftcardOpen(true);
    } else if (actionKey === 'giftcard_redeem') {
      setGiftcardMode('redeem');
      setIsGiftcardOpen(true);
    } else if (actionKey === 'track') {
      setTrackCode('#AURA-8831');
      setTrackSearched(true);
      setIsHelpOpen(true);
    } else if (actionKey === 'help') {
      setIsHelpOpen(true);
    } else if (actionKey === 'register') {
      setAuthMode('register');
      setIsAuthOpen(true);
    } else if (infoContentMap[actionKey]) {
      setInfoModalKey(actionKey);
    }
  };

  const addToCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id, quantity: 1 }];
    });

    if (!recentlyViewed.includes(id)) {
      setRecentlyViewed(prev => [id, ...prev]);
    }
    setIsCartOpen(true);
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

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const filteredProducts = t.products.filter(product => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'bestsellers') return product.bestseller;
    if (activeCategory === 'classics') return product.classic;
    return product.type === activeCategory;
  });

  const cartItems = cart.map(item => ({
    product: t.products.find(p => p.id === item.id)!,
    quantity: item.quantity
  })).filter(item => item.product !== undefined);

  const recentlyViewedProducts = recentlyViewed.map(id => t.products.find(p => p.id === id)!).filter(p => p !== undefined);

  const total = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#030303] text-[#EDEDED] font-sans selection:bg-[#EDEDED] selection:text-black relative" ref={containerRef}>
      
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="preloader"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center"
          >
            <motion.div 
              animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 0.95] }}
              transition={{ duration: 1.8, times: [0, 0.3, 0.7, 1] }}
              className="text-4xl md:text-6xl font-serif italic text-white"
            >
              Aura
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.04]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="fixed top-6 left-6 z-50 flex flex-col md:flex-row items-start md:items-center gap-4">
        <Link href="/" className="group flex items-center gap-3 px-5 py-3 bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#1E1E1E] rounded-full text-xs font-mono tracking-widest text-[#8A8A8A] hover:text-white transition-all duration-300">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t.back}
        </Link>
        
        <div className="flex items-center p-1 bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#1E1E1E] rounded-full shadow-sm relative w-[96px] h-[34px]">
          <button 
            onClick={() => setLang('es')} 
            className={`w-1/2 relative z-10 text-center text-[10px] font-bold tracking-widest transition-colors duration-300 ${lang === 'es' ? 'text-white' : 'text-[#8A8A8A] hover:text-white'}`}
          >
            ES
          </button>
          <button 
            onClick={() => setLang('en')} 
            className={`w-1/2 relative z-10 text-center text-[10px] font-bold tracking-widest transition-colors duration-300 ${lang === 'en' ? 'text-white' : 'text-[#8A8A8A] hover:text-white'}`}
          >
            EN
          </button>
          <motion.div 
            className="absolute top-1 bottom-1 w-[42px] bg-[#a855f7] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.4)] z-0"
            initial={false}
            animate={{ left: lang === 'es' ? '4px' : '46px' }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </div>
      </div>

      <header className="fixed top-0 w-full z-40 mix-blend-difference py-6 px-8 md:px-16 flex justify-between items-center pointer-events-none">
        <div className="text-4xl md:text-5xl font-serif italic tracking-tighter text-white font-bold mx-auto pointer-events-auto">
          Aura
        </div>
        <div className="absolute right-8 md:right-16 flex items-center gap-4 pointer-events-auto">
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:text-[#8A8A8A] transition-colors"
          >
            <User size={16} />
          </button>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 text-sm font-medium hover:text-[#8A8A8A] transition-colors"
          >
            <span className="hidden md:inline font-mono text-xs uppercase tracking-widest">{t.bag} [{totalItems}]</span>
            <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center relative">
              <ShoppingBag size={16} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse" />
              )}
            </div>
          </button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="h-[80vh] w-full flex flex-col justify-center items-center px-6 relative overflow-hidden">
          <motion.div style={{ y }} className="text-center z-10 w-full max-w-7xl mt-20">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] leading-[0.8] tracking-tighter font-bold uppercase"
            >
              {t.hero.title1}
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] leading-[0.8] tracking-tighter font-serif italic text-[#4A4A4A]"
            >
              {t.hero.title2}
            </motion.h1>
          </motion.div>
        </section>

        <div className="w-full border-t border-[#1E1E1E] bg-[#030303] py-6 px-6 md:px-16 overflow-x-auto no-scrollbar">
          <div className="flex gap-8 md:justify-center min-w-max">
            {categoryList.map((cat) => {
              const label = lang === 'es' ? cat.es : cat.en;
              const isActive = activeCategory === cat.key && cat.key !== 'giftcards' && cat.key !== 'help';
              return (
                <button 
                  key={cat.key} 
                  onClick={() => {
                    if (cat.key === 'giftcards') {
                      setIsGiftcardOpen(true);
                    } else if (cat.key === 'help') {
                      setIsHelpOpen(true);
                    } else {
                      setActiveCategory(cat.key);
                      const section = document.getElementById('products-section');
                      if (section) section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors relative py-1 ${
                    isActive ? 'text-white font-bold' : 'text-[#8A8A8A] hover:text-[#EDEDED]'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeCategoryIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#a855f7]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full border-y border-[#1E1E1E] bg-[#EDEDED] py-3 overflow-hidden flex justify-center items-center h-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={promoIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-[10px] md:text-xs font-mono tracking-widest text-[#0A0A0A] uppercase text-center font-bold absolute"
            >
              {t.promos[promoIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        <section className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto border-b border-[#1E1E1E]">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-12 flex items-center gap-4">
            <Sparkles size={24} className="text-[#a855f7]" />
            {t.sections.categoriesTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.categoriesGrid.map((cat, cIdx) => (
              <div 
                key={cIdx}
                onClick={() => {
                  setActiveCategory(cat.key);
                  const section = document.getElementById('products-section');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative h-[350px] rounded-3xl border border-[#1E1E1E] overflow-hidden cursor-pointer flex flex-col justify-end p-8"
              >
                <img 
                  src={cat.image} 
                  alt={cat.label} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="relative z-10">
                  <span className="text-[10px] font-mono tracking-widest text-[#a855f7] uppercase mb-2 block">{cat.sub}</span>
                  <h4 className="text-2xl font-bold text-white mb-2">{cat.label}</h4>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8A8A8A] group-hover:text-white transition-colors">
                    <span>Explorar colección</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto border-b border-[#1E1E1E]">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-12">{t.sections.useTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.useStyles.map((style, sIdx) => (
              <div key={sIdx} className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#1E1E1E] hover:border-[#a855f7]/50 transition-colors">
                <span className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-[#a855f7] bg-[#a855f7]/10 rounded-full border border-[#a855f7]/20 inline-block mb-4">
                  {style.tag}
                </span>
                <h4 className="text-xl font-bold text-white mb-2">{style.name}</h4>
                <p className="text-sm text-[#8A8A8A] leading-relaxed">{style.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="products-section" className="px-6 md:px-16 py-32 max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-[#a855f7] uppercase mb-2 block">Catálogo</span>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
              {activeCategory === 'all' && t.sections.allProductsTitle}
              {activeCategory === 'bestsellers' && t.sections.bestsellersTitle}
              {activeCategory === 'classics' && t.sections.classicsTitle}
              {activeCategory === 'audio' && 'Audio Hi-Fi'}
              {activeCategory === 'mechanical' && 'Teclados & Mecánica'}
              {activeCategory === 'cinema' && 'Sistemas de Cine'}
              {activeCategory === 'accessories' && 'Estudio & Accesorios'}
            </h3>
          </div>

          <div className="space-y-32 md:space-y-48">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 relative`}>
                
                <div className="w-full md:w-1/2">
                  <div className="sticky top-32 w-full aspect-[4/5] rounded-[2rem] bg-[#0A0A0A] border border-[#1E1E1E] overflow-hidden flex items-center justify-center group relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303] opacity-80" />
                    <div className="absolute inset-0 border-[0.5px] border-white/10 m-6 rounded-[1.5rem] pointer-events-none" />
                    
                    <span className="absolute bottom-10 left-10 text-xs font-mono tracking-widest text-[#EDEDED] uppercase z-10">{t.productParams.fig} {index + 1}.</span>
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center py-10 md:py-20">
                  <span className="text-sm font-mono tracking-widest text-[#8A8A8A] uppercase mb-6 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-[#1E1E1E]" />
                    {product.category}
                  </span>
                  
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">
                    {product.name}
                  </h2>
                  
                  <p className="text-xl text-[#8A8A8A] leading-relaxed mb-12 max-w-md">
                    {product.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-16 pt-10 border-t border-[#1E1E1E]">
                    {product.specs.map((spec, sIndex) => {
                      const [label, value] = spec.split(': ');
                      return (
                        <div key={sIndex}>
                          <p className="text-[10px] font-mono text-[#666666] uppercase tracking-widest mb-1">{label}</p>
                          <p className="text-sm font-medium text-[#EDEDED]">{value || label}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-[#666666] uppercase tracking-widest mb-1">{t.productParams.price}</span>
                      <span className="text-4xl font-light tracking-tight">${product.price}</span>
                    </div>
                    
                    <button 
                      onClick={() => addToCart(product.id)}
                      className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-[#EDEDED] transition-colors flex items-center justify-center gap-3 group"
                    >
                      {t.productParams.add}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {recentlyViewedProducts.length > 0 && (
          <section className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto border-t border-[#1E1E1E]">
            <h3 className="text-xl font-mono tracking-widest uppercase text-[#8A8A8A] mb-8 flex items-center gap-3">
              <Eye size={18} className="text-[#a855f7]" />
              {t.sections.recentlyViewedTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recentlyViewedProducts.map((p) => (
                <div key={p.id} className="p-6 rounded-2xl bg-[#0A0A0A] border border-[#1E1E1E] flex items-center gap-6">
                  <div className="w-20 h-20 rounded-xl bg-[#141414] border border-[#1E1E1E] overflow-hidden shrink-0 relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{p.name}</h4>
                    <p className="text-xs font-mono text-[#8A8A8A] mb-2">${p.price}</p>
                    <button onClick={() => addToCart(p.id)} className="text-xs font-bold text-[#a855f7] hover:underline">
                      Añadir a bolsa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="py-20 px-6 md:px-16 border-t border-[#1E1E1E] relative z-10 bg-[#030303]">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
            <div>
              <h4 className="text-xs font-mono tracking-widest uppercase text-white font-bold mb-6">{t.megaFooter.resources.title}</h4>
              <ul className="space-y-4">
                {t.megaFooter.resources.links.map((link, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => handleFooterAction(link.action)}
                      className="text-xs text-[#8A8A8A] hover:text-white transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono tracking-widest uppercase text-white font-bold mb-6">{t.megaFooter.help.title}</h4>
              <ul className="space-y-4">
                {t.megaFooter.help.links.map((link, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => handleFooterAction(link.action)} 
                      className="text-xs text-[#8A8A8A] hover:text-white transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono tracking-widest uppercase text-white font-bold mb-6">{t.megaFooter.about.title}</h4>
              <ul className="space-y-4">
                {t.megaFooter.about.links.map((link, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => handleFooterAction(link.action)} 
                      className="text-xs text-[#8A8A8A] hover:text-white transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono tracking-widest uppercase text-white font-bold mb-6">{t.megaFooter.specials.title}</h4>
              <ul className="space-y-4">
                {t.megaFooter.specials.links.map((link, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => handleFooterAction(link.action)} 
                      className="text-xs text-[#8A8A8A] hover:text-white transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-[#1E1E1E] flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-4xl font-serif italic text-white">Aura</div>
            
            <div className="w-full max-w-md flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder={t.megaFooter.email} 
                className="flex-1 bg-[#0A0A0A] border border-[#1E1E1E] rounded-full px-6 py-3 text-xs outline-none focus:border-[#4A4A4A] transition-colors"
              />
              <button className="px-6 py-3 bg-[#EDEDED] text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-colors shrink-0">
                {t.megaFooter.subscribe}
              </button>
            </div>

            <p className="text-[10px] font-mono text-[#4A4A4A] tracking-widest uppercase text-center md:text-right">
              {t.megaFooter.copy}
            </p>
          </div>

        </div>
      </footer>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-full md:w-[480px] h-full bg-[#0A0A0A] border-l border-[#1E1E1E] z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-8 border-b border-[#1E1E1E]">
                <h2 className="text-sm font-mono tracking-widest uppercase">{t.cart.title} ({totalItems})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-[#8A8A8A] hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#4A4A4A]">
                    <ShoppingBag size={64} strokeWidth={1} className="mb-6" />
                    <p className="font-mono text-sm uppercase tracking-widest">{t.cart.empty}</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-6 group">
                      <div className="w-28 h-32 rounded-xl bg-[#141414] border border-[#1E1E1E] shrink-0 relative overflow-hidden">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale"
                        />
                      </div>
                      <div className="flex flex-col flex-1 py-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg leading-tight pr-4">{item.product.name}</h4>
                          <span className="font-light">${item.product.price}</span>
                        </div>
                        <span className="text-xs font-mono text-[#666666] uppercase tracking-wider">{item.product.color}</span>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-4 bg-[#141414] border border-[#1E1E1E] rounded-full px-3 py-1.5">
                            <button onClick={() => updateQuantity(item.product.id, -1)} className="hover:text-white text-[#8A8A8A] transition-colors"><Minus size={14}/></button>
                            <span className="text-sm font-mono w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, 1)} className="hover:text-white text-[#8A8A8A] transition-colors"><Plus size={14}/></button>
                          </div>
                          <button onClick={() => removeFromCart(item.product.id)} className="text-xs font-mono text-[#666666] uppercase tracking-widest hover:text-white transition-colors">
                            {t.cart.remove}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-8 border-t border-[#1E1E1E] bg-[#050505]">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-mono tracking-widest text-[#8A8A8A] uppercase">{t.cart.subtotal}</span>
                    <span className="text-4xl font-light tracking-tight">${total}</span>
                  </div>
                  <p className="text-[10px] font-mono text-[#4A4A4A] uppercase tracking-widest mb-8 text-right">{t.cart.taxes}</p>
                  
                  <button className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-[#EDEDED] transition-colors">
                    {t.cart.checkout}
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-4 text-[#4A4A4A]">
                    <Info size={12} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">{t.cart.secure}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAuthOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-[#0A0A0A] border-l border-[#1E1E1E] z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-8 border-b border-[#1E1E1E]">
                <h2 className="text-sm font-mono tracking-widest uppercase">{t.auth.title}</h2>
                <button onClick={() => setIsAuthOpen(false)} className="p-2 text-[#8A8A8A] hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 no-scrollbar flex flex-col justify-center">
                <div className="text-center mb-10">
                  <div className="w-16 h-16 rounded-full bg-[#141414] border border-[#1E1E1E] flex items-center justify-center mx-auto mb-6">
                    <User size={24} className="text-[#8A8A8A]" />
                  </div>
                  <p className="text-[#8A8A8A] text-sm leading-relaxed">{t.auth.desc}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-[#8A8A8A] mb-2 block">{t.auth.email}</label>
                    <input 
                      type="email" 
                      className="w-full bg-[#141414] border border-[#1E1E1E] rounded-xl px-4 py-4 text-sm outline-none focus:border-[#4A4A4A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-[#8A8A8A] mb-2 block">{t.auth.password}</label>
                    <input 
                      type="password" 
                      className="w-full bg-[#141414] border border-[#1E1E1E] rounded-xl px-4 py-4 text-sm outline-none focus:border-[#4A4A4A] transition-colors"
                    />
                  </div>
                </div>

                <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-[#EDEDED] transition-colors mb-6">
                  {authMode === 'login' ? t.auth.loginBtn : t.auth.registerBtn}
                </button>

                <div className="text-center">
                  <span className="text-xs text-[#8A8A8A] mr-2">
                    {authMode === 'login' ? t.auth.registerText : t.auth.loginText}
                  </span>
                  <button 
                    onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                    className="text-xs font-bold uppercase tracking-widest text-white hover:text-[#a855f7] transition-colors"
                  >
                    {authMode === 'login' ? t.auth.registerLink : t.auth.loginLink}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isGiftcardOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsGiftcardOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[500px] bg-[#0A0A0A] border border-[#1E1E1E] rounded-3xl p-8 z-50 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Gift className="text-[#a855f7]" size={24} />
                  <h3 className="text-xl font-bold">{t.giftcardModal.title}</h3>
                </div>
                <button onClick={() => setIsGiftcardOpen(false)} className="text-[#8A8A8A] hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="flex border-b border-[#1E1E1E] mb-6">
                <button 
                  onClick={() => setGiftcardMode('buy')}
                  className={`flex-1 py-3 text-xs font-mono tracking-widest uppercase text-center border-b-2 transition-colors ${giftcardMode === 'buy' ? 'border-[#a855f7] text-white font-bold' : 'border-transparent text-[#8A8A8A]'}`}
                >
                  {t.giftcardModal.buyTab}
                </button>
                <button 
                  onClick={() => setGiftcardMode('redeem')}
                  className={`flex-1 py-3 text-xs font-mono tracking-widest uppercase text-center border-b-2 transition-colors ${giftcardMode === 'redeem' ? 'border-[#a855f7] text-white font-bold' : 'border-transparent text-[#8A8A8A]'}`}
                >
                  {t.giftcardModal.redeemTab}
                </button>
              </div>

              {giftcardMode === 'buy' ? (
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-[#8A8A8A] mb-3 block">{t.giftcardModal.amount}</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[50, 100, 250, 500].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setGiftcardAmount(amt)}
                          className={`py-3 rounded-xl border text-sm font-bold font-mono transition-all ${giftcardAmount === amt ? 'bg-white text-black border-white' : 'border-[#1E1E1E] text-[#8A8A8A] hover:border-[#4A4A4A]'}`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-[#8A8A8A] mb-2 block">{t.giftcardModal.recipient}</label>
                    <input 
                      type="email" 
                      placeholder="amigo@ejemplo.com"
                      className="w-full bg-[#141414] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#a855f7] transition-colors"
                    />
                  </div>

                  <button className="w-full py-4 bg-[#a855f7] text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-purple-600 transition-colors shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                    {t.giftcardModal.buyBtn} (${giftcardAmount} USD)
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-[#8A8A8A] mb-2 block">Código de la Giftcard</label>
                    <input 
                      type="text"
                      value={giftcardCode}
                      onChange={(e) => setGiftcardCode(e.target.value)}
                      placeholder={t.giftcardModal.codePlaceholder}
                      className="w-full bg-[#141414] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm outline-none font-mono focus:border-[#a855f7] transition-colors uppercase"
                    />
                  </div>

                  {redeemSuccess && (
                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl text-xs text-purple-300 flex items-center gap-3">
                      <Check size={16} />
                      <span>{t.giftcardModal.successMsg}</span>
                    </div>
                  )}

                  <button 
                    onClick={() => {
                      if(giftcardCode.trim().length > 0) setRedeemSuccess(true);
                    }}
                    className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {t.giftcardModal.redeemBtn}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHelpOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsHelpOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[600px] max-h-[85vh] bg-[#0A0A0A] border border-[#1E1E1E] rounded-3xl p-8 z-50 shadow-2xl overflow-y-auto no-scrollbar"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <HelpCircle className="text-[#a855f7]" size={24} />
                  <h3 className="text-xl font-bold">{t.helpModal.title}</h3>
                </div>
                <button onClick={() => setIsHelpOpen(false)} className="text-[#8A8A8A] hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <p className="text-[#8A8A8A] text-sm mb-8">{t.helpModal.desc}</p>

              <div className="bg-[#141414] border border-[#1E1E1E] rounded-2xl p-6 mb-8">
                <h4 className="text-xs font-mono tracking-widest uppercase text-white mb-4">{t.helpModal.trackTitle}</h4>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={trackCode}
                    onChange={(e) => setTrackCode(e.target.value)}
                    placeholder={t.helpModal.trackPlaceholder}
                    className="flex-1 bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#a855f7] transition-colors"
                  />
                  <button 
                    onClick={() => setTrackSearched(true)}
                    className="px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    {t.helpModal.trackBtn}
                  </button>
                </div>
                {trackSearched && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl text-xs text-purple-300">
                    {t.helpModal.trackResult}
                  </motion.div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-mono tracking-widest uppercase text-white mb-4">{t.helpModal.faqTitle}</h4>
                <div className="space-y-4">
                  {t.helpModal.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="border-b border-[#1E1E1E] pb-4">
                      <p className="text-sm font-bold text-white mb-2">{faq.q}</p>
                      <p className="text-xs text-[#8A8A8A] leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {infoModalKey && infoContentMap[infoModalKey] && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setInfoModalKey(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[550px] bg-[#0A0A0A] border border-[#1E1E1E] rounded-3xl p-8 z-50 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#a855f7] mb-1 block">AURA Corporate & Info</span>
                  <h3 className="text-2xl font-bold text-white">{infoContentMap[infoModalKey].title}</h3>
                </div>
                <button onClick={() => setInfoModalKey(null)} className="text-[#8A8A8A] hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <p className="text-xs font-mono text-[#8A8A8A] uppercase tracking-widest mb-6 pb-4 border-b border-[#1E1E1E]">
                {infoContentMap[infoModalKey].subtitle}
              </p>

              <p className="text-sm text-[#EDEDED] leading-relaxed mb-8">
                {infoContentMap[infoModalKey].content}
              </p>

              <button 
                onClick={() => setInfoModalKey(null)}
                className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gray-200 transition-colors"
              >
                Entendido
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}