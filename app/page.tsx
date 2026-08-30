'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Globe,
  ShoppingBag,
  Database,
  Smartphone,
  LifeBuoy,
  Code2,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Mail,
  ShoppingCart,
  BarChart3,
  QrCode,
  ExternalLink,
  Check,
  Zap,
  Layers
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Terminal from '../components/Terminal';

const dict = {
  es: {
    nav: { services: "Servicios", process: "Proceso", philosophy: "Filosofía", portfolio: "Portafolio", pricing: "Pricing", faq: "FAQ", contact: "Contacto", talk: "Hablemos" },
    hero: {
      badge: "Consultor Tecnológico & Desarrollador",
      title1: "Ingeniería técnica.",
      title2: "Impacto visual.",
      desc: "Construyo el software que tu negocio necesita. Desde el diseño UI/UX y la experiencia visual, hasta la programación y administración de tus servidores.",
      cta: "Iniciemos un proyecto",
      explore: "Explorar"
    },
    services: {
      title: "Mi Ecosistema de Trabajo.",
      desc: "Todo lo digital, bajo un mismo techo. Te acompaño desde la primera reunión hasta mucho después del lanzamiento.",
      items: [
        {
          title: "01. Sitios web y presencia online",
          description: "Desarrollo páginas web de alto rendimiento optimizadas para captación y conversión. ¿Qué hago? Diseño interfaces a medida desde cero (sin plantillas), configuro el posicionamiento SEO técnico para indexación en Google, garantizo diseño adaptado 100% a celulares (responsive) y gestiono la configuración de dominios y hosting en la nube para asegurar velocidad de carga instantánea.",
          tags: ["LANDING PAGE", "MENÚ QR", "RESPONSIVE", "DOMINIO"]
        },
        {
          title: "02. Tiendas online (E-commerce)",
          description: "Construyo tiendas virtuales robustas orientadas a la venta masiva 24/7. ¿Qué hago? Configuro catálogos de productos con variantes y control de stock en tiempo real, integro pasarelas de pago seguras (Mercado Pago, PayPal, Webpay, etc.), optimizo el embudo de conversión del carrito de compras y diseño una experiencia de usuario fluida que minimiza los rebotes y maximiza tus ventas.",
          tags: ["TIENDA ONLINE", "PAGOS", "STOCK", "CONVERSIÓN"]
        },
        {
          title: "03. CRM / ERP a medida",
          description: "Diseño sistemas de gestión internos centralizados para automatizar la operación de tu empresa. ¿Qué hago? Programo bases de datos a medida para control de inventarios, gestión de clientes, asignación de turnos, seguimiento de empleados y reportes de estadísticas visuales en tiempo real. Todo accesible de forma segura desde cualquier navegador o dispositivo.",
          tags: ["INVENTARIO", "CLIENTES", "PANELES", "AUTOMATIZACIÓN"]
        },
        {
          title: "04. Apps mobile (iOS y Android)",
          description: "Desarrollo aplicaciones móviles nativas y multiplataforma con estándares de la industria. ¿Qué hago? Diseño flujos de interfaz UI/UX centrados en el usuario, conecto la app con paneles de administración propios mediante APIs seguras, integro notificaciones push y gestiono el despliegue técnico para que tu aplicación esté lista en las tiendas oficiales.",
          tags: ["iOS", "ANDROID", "UI/UX", "API"]
        },
        {
          title: "05. Soporte y mantenimiento",
          description: "Aseguro la estabilidad, seguridad y evolución continua de tu infraestructura digital. ¿Qué hago? Realizo monitoreo activo de servidores, actualizaciones preventivas de código, respaldos automáticos de bases de datos y optimización de rendimiento mensual para garantizar que tus plataformas operen sin interrupciones y con cero caídas.",
          tags: ["SOPORTE", "MANTENIMIENTO", "SERVIDORES", "MENSUAL"]
        },
        {
          title: "06. Proyectos a medida",
          description: "Resuelvo desafíos tecnológicos complejos que no encajan en soluciones estándar. ¿Qué hago? Analizo la lógica de negocio particular de tu empresa, diseño arquitecturas de software avanzadas desde cero y programo herramientas o scripts especializados para automatizar flujos de trabajo únicos en tu sector.",
          tags: ["A MEDIDA", "PERSONALIZADO", "CONSULTORÍA", "FLEXIBLE"]
        }
      ]
    },
    process: {
      title: "Mi Proceso de Desarrollo.",
      desc: "Cuatro etapas, cero burocracia. Como tu único punto de contacto, garantizo velocidad y precisión técnica.",
      steps: [
        { num: "01", name: "Auditoría & Arquitectura", text: "Nos reunimos para entender el cuello de botella de tu negocio. Defino el stack técnico exacto y te presento un presupuesto con fecha de entrega cerrada." },
        { num: "02", name: "Diseño UI/UX", text: "No programo una sola línea sin tu aprobación. Creo las interfaces visuales para asegurar que el impacto estético esté alineado con tu marca." },
        { num: "03", name: "Desarrollo & Configuración", text: "Escribo el código limpio y escalable, y preparo los servidores o la base de datos en la nube. Desarrollo ágil con actualizaciones constantes." },
        { num: "04", name: "Despliegue & Capacitación", text: "Lanzo tu plataforma en producción. Te entrego absolutamente todos los accesos y te capacito para que tengas el control total de tu tecnología." }
      ]
    },
    philosophy: {
      tag: "Manifiesto de Desarrollo",
      title: "Cero plantillas. Ingeniería real.",
      p1: "La mayoría de las agencias te venden un tema prefabricado de 50 dólares y lo llaman 'desarrollo a medida'. Yo no hago eso.",
      p2: "Escribo código desde cero. Diseño arquitecturas escalables. Me obsesiona el rendimiento, los tiempos de carga en milisegundos y las interfaces que generan impacto visual inmediato. Tu negocio no merece software desechable.",
      pillars: [
        { title: "Artesanía Digital", desc: "Cada píxel y cada línea de código es intencional. Sin exceso de plugins que ralentizan tu web." },
        { title: "Obsesión por Velocidad", desc: "Sistemas optimizados para cargar al instante. Un segundo de retraso son ventas perdidas." },
        { title: "Infraestructura Escalable", desc: "Servidores y bases de datos preparadas para soportar desde 100 hasta millones de usuarios." }
      ]
    },
    portfolio: {
      title: "Arquitecturas Base.",
      desc: "Conceptos técnicos e infraestructuras desarrolladas por mí, listas para ser adaptadas a la lógica de tu negocio.",
      previewText: "Ver Demo en Vivo",
      items: [
        {
          name: "Aura Commerce",
          type: "E-commerce Headless",
          desc: "Arquitectura de tienda online ultrarrápida. Diseño minimalista enfocado en conversión, carrito de compras optimizado y gestión de pagos seguros.",
          tags: ["NEXT.JS", "STRIPE", "TAILWIND"],
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
          route: "/aura"
        },
        {
          name: "NOIR Bistro — Menú QR",
          type: "Plataforma Gastronómica",
          desc: "Menú digital interactivo para restaurantes. Carga instantánea, filtrado por alergias/preferencias, llamada a garzón y solicitud de cuenta.",
          tags: ["MOBILE-FIRST", "MENU QR", "GASTRONOMÍA"],
          image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop",
          route: "/menu-qr"
        },
        {
          name: "Nexus Analytics",
          type: "Dashboard & CRM",
          desc: "Interfaz de gestión empresarial. Procesamiento de datos en tiempo real, tablas complejas con filtros dinámicos y autenticación cifrada.",
          tags: ["REACT", "POSTGRESQL", "UI/UX"],
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
          route: null
        }
      ]
    },
    pricing: {
      title: "Inversión Transparente.",
      desc: "Planes claros y modulares adaptados a la escala real de tu proyecto.",
      tiers: [
        {
          name: "Landing & Web",
          desc: "Presencia digital optimizada para captar clientes.",
          price: "Desde $150 USD",
          features: ["Diseño UI/UX a medida", "Optimización SEO y velocidad", "Adaptado para celulares", "Dominio y hosting incluido", "Soporte por 15 días"]
        },
        {
          name: "E-commerce",
          desc: "Tu tienda online lista para facturar 24/7.",
          price: "Desde $600 USD",
          features: ["Gestión de productos y stock", "Pasarelas de pago integradas", "Panel de administración", "Diseño de alta conversión", "Soporte por 30 días"]
        },
        {
          name: "Sistema a Medida",
          desc: "CRMs, ERPs o Apps nativas para escalar tu operación.",
          price: "A medida",
          features: ["Arquitectura backend robusta", "Base de datos escalable en nube", "Paneles de control exclusivos", "Integraciones con APIs", "Soporte continuo y capacitación"]
        }
      ],
      cta: "Consultar plan"
    },
    faq: {
      title: "Preguntas Frecuentes.",
      desc: "Respuestas directas a las dudas técnicas más comunes.",
      items: [
        { q: "¿Cuánto tarda realmente un proyecto?", a: "Depende del alcance. Una landing page está online en 1 a 2 semanas. Un e-commerce toma 2 a 3 semanas, y un sistema a medida (CRM/App) entre 3 y 5 semanas." },
        { q: "¿De quién es el código y los servidores?", a: "100% tuya. Al finalizar, te transfiero todos los derechos, archivos fuente, accesos a servidores y dominios. Eres el dueño absoluto de tu infraestructura." },
        { q: "¿Qué pasa después de la entrega?", a: "Te doy una capacitación completa. Además, tienes 30 días de soporte técnico directo conmigo sin costo. Luego puedes contratar mi plan de administración de servidores." },
        { q: "¿Puedes trabajar sobre código que ya tengo?", a: "Sí. Audito tu infraestructura actual y te digo con honestidad si conviene optimizarla o refactorizar. Garantizo no perder ni un solo dato en la migración." }
      ]
    },
    contact: {
      title: "¿Hablamos de tecnología?",
      desc: "Cuéntame sobre el desafío de tu negocio. Diseñaré la arquitectura técnica y el entorno visual exacto para resolverlo.",
      btn: "Enviar WhatsApp",
      social: "Redes y Contacto",
      copy: "Desarrollo e Ingeniería."
    }
  },
  en: {
    nav: { services: "Services", process: "Process", philosophy: "Philosophy", portfolio: "Portfolio", pricing: "Pricing", faq: "FAQ", contact: "Contact", talk: "Let's Talk" },
    hero: {
      badge: "Tech Consultant & Full-Stack Developer",
      title1: "Technical engineering.",
      title2: "Visual impact.",
      desc: "I build the software your business needs. From UI/UX design and visual aesthetics, to coding and managing your cloud server infrastructure.",
      cta: "Start a project",
      explore: "Explore"
    },
    services: {
      title: "My Work Ecosystem.",
      desc: "Everything digital, under one roof. I guide you from the first meeting to long after the deployment.",
      items: [
        {
          title: "01. Websites & Online Presence",
          description: "I develop high-performance websites optimized for customer acquisition and conversion. What I do: Custom UI/UX design from scratch (no templates), technical SEO configuration for proper Google indexing, 100% mobile-responsive adaptation, and management of domains and cloud hosting setups to ensure instant page loading speeds.",
          tags: ["LANDING PAGE", "WEB APP", "RESPONSIVE", "DOMAIN"]
        },
        {
          title: "02. E-commerce Stores",
          description: "I build robust virtual stores engineered for 24/7 high-volume selling. What I do: Configure product catalogs with variations and real-time inventory control, integrate secure payment gateways (local and global), optimize the checkout conversion funnel, and design a frictionless user experience to minimize bounce rates and maximize revenue.",
          tags: ["E-COMMERCE", "PAYMENTS", "STOCK", "CONVERSION"]
        },
        {
          title: "03. Custom CRM / ERP",
          description: "I design centralized internal management systems to automate your company's operations. What I do: Program custom databases for inventory tracking, customer management, shift scheduling, employee tracking, and real-time visual analytics dashboards, securely accessible from any browser or device.",
          tags: ["INVENTORY", "CLIENTS", "DASHBOARDS", "AUTOMATION"]
        },
        {
          title: "04. Mobile Apps (iOS & Android)",
          description: "I develop native and cross-platform mobile applications matching industry standards. What I do: Design user-centric UI/UX navigation flows, connect the app to custom admin panels via secure APIs, integrate push notifications, and manage technical deployment so your app is ready for the official stores.",
          tags: ["iOS", "ANDROID", "UI/UX", "API"]
        },
        {
          title: "05. Support & Maintenance",
          description: "I secure stability, safety, and continuous evolution for your digital infrastructure. What I do: Perform active server monitoring, preventive code updates, automated database backups, and monthly performance tuning to guarantee your platforms run interruption-free with zero downtime.",
          tags: ["SUPPORT", "MAINTENANCE", "SERVERS", "MONTHLY"]
        },
        {
          title: "06. Bespoke Engineering",
          description: "I solve complex technological challenges that do not fit standard molds. What I do: Analyze your company's unique business logic, design advanced software architectures from scratch, and program specialized tools or scripts to automate workflows specific to your industry.",
          tags: ["CUSTOM", "BESPOKE", "CONSULTING", "FLEXIBLE"]
        }
      ]
    },
    process: {
      title: "My Development Process.",
      desc: "Four steps, zero bureaucracy. As your single point of contact, I guarantee speed and technical precision.",
      steps: [
        { num: "01", name: "Audit & Architecture", text: "We meet to understand your bottleneck. I define the exact tech stack and present a closed budget with a strict delivery date." },
        { num: "02", name: "UI/UX Design", text: "I don't write a single line of code without your approval. I create the visual interfaces to ensure the aesthetic impact aligns with your brand." },
        { num: "03", name: "Development & Setup", text: "I write clean, scalable code and prepare the servers and cloud databases. Agile development with constant progress updates." },
        { num: "04", name: "Deployment & Training", text: "I launch your platform into production. I hand over all credentials, source code, and train you to have absolute control over your tech." }
      ]
    },
    philosophy: {
      tag: "Development Manifesto",
      title: "Zero templates. Real engineering.",
      p1: "Most agencies sell you a $50 pre-made theme and call it 'custom development'. I don't do that.",
      p2: "I write code from scratch. I design scalable architectures. I obsess over performance, millisecond loading times, and interfaces that generate immediate visual impact. Your business doesn't deserve disposable software.",
      pillars: [
        { title: "Digital Craftsmanship", desc: "Every pixel and line of code is intentional. No bloated plugins that slow down your site." },
        { title: "Speed Obsession", desc: "Systems optimized to load instantly. A one-second delay means lost sales." },
        { title: "Scalable Infrastructure", desc: "Servers and databases prepared to handle from 100 to millions of concurrent users." }
      ]
    },
    portfolio: {
      title: "Base Architectures.",
      desc: "Technical concepts and infrastructures engineered by me, ready to be tailored to your business logic.",
      previewText: "Live Demo",
      items: [
        {
          name: "Aura Commerce",
          type: "Headless E-commerce",
          desc: "Lightning-fast online store architecture. Minimalist design focused on conversion, optimized shopping cart, and secure payment management.",
          tags: ["NEXT.JS", "STRIPE", "TAILWIND"],
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
          route: "/aura"
        },
        {
          name: "NOIR Bistro — QR Menu",
          type: "Gastronomy Platform",
          desc: "Interactive restaurant digital menu. Instant load, allergy filtering, waiter call, and bill request simulation.",
          tags: ["MOBILE-FIRST", "QR MENU", "GASTRONOMY"],
          image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop",
          route: "/menu-qr"
        },
        {
          name: "Nexus Analytics",
          type: "Dashboard & CRM",
          desc: "Enterprise management interface. Real-time data processing, complex tables with dynamic filters, and encrypted authentication.",
          tags: ["REACT", "POSTGRESQL", "UI/UX"],
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
          route: null
        }
      ]
    },
    pricing: {
      title: "Transparent Investment.",
      desc: "Clear, modular plans tailored to the actual scale of your project.",
      tiers: [
        {
          name: "Landing & Web",
          desc: "Digital presence optimized to capture clients.",
          price: "From $150 USD",
          features: ["Custom UI/UX design", "SEO & performance optimization", "Mobile-ready responsive", "Domain & hosting included", "15-day support included"]
        },
        {
          name: "E-commerce",
          desc: "Your online store ready to sell 24/7.",
          price: "From $600 USD",
          features: ["Product & inventory management", "Integrated payment gateways", "Admin control panel", "High-conversion UI design", "30-day support included"]
        },
        {
          name: "Custom System",
          desc: "CRMs, ERPs or Native Apps to scale your operations.",
          price: "Bespoke",
          features: ["Robust backend architecture", "Scalable cloud database", "Exclusive control panels", "Third-party API integrations", "Continuous support & training"]
        }
      ],
      cta: "Inquire plan"
    },
    faq: {
      title: "Frequently Asked Questions.",
      desc: "Direct answers to the most common technical concerns.",
      items: [
        { q: "How long does a project actually take?", a: "It depends on the scope. A corporate landing page takes 1-2 weeks. An e-commerce takes 2-3 weeks, and a custom CRM/App takes 3-5 weeks." },
        { q: "Who owns the code and servers?", a: "You do, 100%. Upon completion, I transfer all rights, source files, and server access. I don't lock you in with hidden contracts, only with results." },
        { q: "What happens after deployment?", a: "I provide comprehensive training. You also get 30 days of direct technical support for free. You can then opt into my server management plans." },
        { q: "Can you work with my existing codebase?", a: "Yes. I audit your current infrastructure and give you an honest assessment on whether to optimize or refactor. I guarantee zero data loss during migration." }
      ]
    },
    contact: {
      title: "Let's talk technology.",
      desc: "Tell me about your business bottleneck. I will design the exact technical architecture and visual environment to solve it.",
      btn: "Message on WhatsApp",
      social: "Social & Contact",
      copy: "Engineering & Development."
    }
  }
};

const serviceIcons = [
  <Globe size={32} className="text-[#EDEDED]" key="1" />,
  <ShoppingBag size={32} className="text-[#EDEDED]" key="2" />,
  <Database size={32} className="text-[#EDEDED]" key="3" />,
  <Smartphone size={32} className="text-[#EDEDED]" key="4" />,
  <LifeBuoy size={32} className="text-[#EDEDED]" key="5" />,
  <Code2 size={32} className="text-[#EDEDED]" key="6" />
];

function ServiceCard({ service, icon, index, diff, isActive }: { service: any, icon: any, index: number, diff: number, isActive: boolean }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !isActive) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div
      ref={divRef}
      animate={{
        x: `calc(${diff} * (100% + 2rem))`,
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : Math.abs(diff) === 1 ? 0.3 : 0,
        zIndex: isActive ? 20 : 10
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`absolute inset-0 flex flex-col overflow-hidden rounded-3xl bg-[#0A0A0A] border border-[#1E1E1E] p-8 md:p-12 transition-colors duration-500 ${isActive ? 'hover:border-[#a855f7]/50' : ''}`}
      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity: isActive ? opacity : 0,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(168,85,247,0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#141414] border border-[#1E1E1E] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#a855f7] group-hover:border-[#a855f7] transition-all duration-500 ease-out">
            <div className="text-[#EDEDED] transition-all duration-500">
              {icon}
            </div>
          </div>
          <span className="font-mono text-xl md:text-2xl font-bold tracking-widest text-[#a855f7]/40 group-hover:text-[#a855f7] transition-colors duration-500">
            {formattedIndex}
          </span>
        </div>
        <div className="flex-grow flex flex-col justify-center mb-6 overflow-y-auto no-scrollbar pr-2">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
          <p className="text-[#8A8A8A] text-sm md:text-base leading-relaxed max-w-2xl">
            {service.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[#1E1E1E]/50">
          {service.tags.map((tag: string, tagIndex: number) => (
            <span 
              key={tagIndex} 
              className="px-3 py-1.5 text-[10px] md:text-xs font-mono tracking-widest uppercase text-purple-300/80 border border-purple-500/30 rounded-lg bg-purple-500/[0.05] shadow-[0_0_12px_rgba(168,85,247,0.12)_inset_0_1px_0_rgba(168,85,247,0.10)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FAQItem({ faq, isOpen, onClick }: { faq: any, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-[#1E1E1E]">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span className="text-lg md:text-xl font-medium tracking-tight group-hover:text-[#a855f7] transition-colors duration-300 pr-4">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`flex-shrink-0 transition-colors duration-300 ${isOpen ? 'text-[#a855f7]' : 'text-[#8A8A8A]'}`}
        >
          <Plus size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-[#8A8A8A] text-base md:text-lg leading-relaxed pr-8 md:pr-12 text-left">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PortfolioPage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = dict[lang];

  const [scrolled, setScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNext = () => setCurrentIndex((prev) => (prev === t.services.items.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? t.services.items.length - 1 : prev - 1));

  let touchStartX = 0;
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) handleNext();
    if (touchEndX - touchStartX > 50) handlePrev();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans relative selection:bg-[#a855f7] selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
      
      <header className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${scrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-[#1E1E1E] py-2' : 'bg-transparent border-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter">PEDRO POZO.</div>
          <nav className="hidden lg:flex gap-8 text-sm font-medium text-[#8A8A8A]">
            <a href="#servicios" onClick={(e) => handleSmoothScroll(e, '#servicios')} className="hover:text-white transition-colors">{t.nav.services}</a>
            <a href="#proceso" onClick={(e) => handleSmoothScroll(e, '#proceso')} className="hover:text-white transition-colors">{t.nav.process}</a>
            <a href="#filosofia" onClick={(e) => handleSmoothScroll(e, '#filosofia')} className="hover:text-white transition-colors">{t.nav.philosophy}</a>
            <a href="#portfolio" onClick={(e) => handleSmoothScroll(e, '#portfolio')} className="hover:text-white transition-colors">{t.nav.portfolio}</a>
            <a href="#pricing" onClick={(e) => handleSmoothScroll(e, '#pricing')} className="hover:text-white transition-colors">{t.nav.pricing}</a>
          </nav>
          <div className="flex items-center gap-6">
            
            <div className="flex items-center p-1 bg-[#141414] border border-[#1E1E1E] rounded-full shadow-sm relative w-[96px] h-[34px]">
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

            <a href="#contacto" onClick={(e) => handleSmoothScroll(e, '#contacto')} className="hidden md:block px-5 py-2 text-sm bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300">
              {t.nav.talk}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
          <motion.div 
            animate={{ backgroundPosition: ['0px 0px', '0px 40px'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
            style={{ 
              backgroundImage: `linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)`, 
              backgroundSize: '40px 40px', 
              maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)', 
              WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)' 
            }}
          />
          
          <motion.div 
            animate={{ x: [0, 50, -30, 0], y: [0, -50, 30, 0], scale: [1, 1.1, 0.9, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#a855f7]/20 blur-[120px] pointer-events-none" 
          />
          <motion.div 
            animate={{ x: [0, -40, 20, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-white/10 blur-[120px] pointer-events-none" 
          />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto text-center pt-20 px-4">
            <motion.div initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mb-10 flex justify-center">
              <span className="px-5 py-2 rounded-full border border-[#1E1E1E] bg-[#141414]/80 backdrop-blur-md text-[#8A8A8A] text-xs font-semibold uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                {t.hero.badge}
              </span>
            </motion.div>

            <div className="flex flex-col items-center justify-center -space-y-6 md:-space-y-10 mb-10 w-full">
              <motion.h1 
                key={`${lang}-1`}
                initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tighter leading-none z-10 flex flex-wrap justify-center w-full px-2"
              >
                {t.hero.title1.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{ hidden: { opacity: 0, y: "100%", rotateX: -90 }, visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
                    style={{ display: "inline-block", transformOrigin: "bottom", whiteSpace: "pre" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
              
              <motion.h1 
                key={`${lang}-2`}
                initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.5 } } }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-serif italic tracking-tight leading-none text-[#a855f7] z-20 flex flex-wrap justify-center w-full px-2"
              >
                {t.hero.title2.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{ hidden: { opacity: 0, filter: "blur(12px)", scale: 1.2 }, visible: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-[#8A8A8A] max-w-2xl mx-auto mb-14 leading-relaxed px-4"
            >
              {t.hero.desc}
            </motion.p>

            <motion.div initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 1, delay: 1.2 }} className="flex justify-center">
              <a href="#contacto" onClick={(e) => handleSmoothScroll(e, '#contacto')} className="group flex items-center gap-3 px-8 py-4 bg-[#EDEDED] text-[#0A0A0A] font-bold rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                {t.hero.cta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </motion.div>

          <motion.a 
            href="#servicios" onClick={(e) => handleSmoothScroll(e, '#servicios')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group z-20"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8A8A8A] group-hover:text-[#a855f7] transition-colors">{t.hero.explore}</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
              <ChevronDown size={20} className="text-[#8A8A8A] group-hover:text-[#a855f7] transition-colors" />
            </motion.div>
          </motion.a>
        </section>

        <section id="servicios" className="py-40 relative z-20 bg-[#0A0A0A] overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 mb-20 flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">{t.services.title}</h2>
              <p className="text-[#8A8A8A] text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                {t.services.desc}
              </p>
              <div className="flex gap-4 justify-center">
                <button onClick={handlePrev} className="w-14 h-14 rounded-full border border-[#1E1E1E] bg-[#141414] flex items-center justify-center hover:bg-[#1E1E1E] hover:text-[#a855f7] transition-colors z-30">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={handleNext} className="w-14 h-14 rounded-full border border-[#1E1E1E] bg-[#141414] flex items-center justify-center hover:bg-[#1E1E1E] hover:text-[#a855f7] transition-colors z-30">
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="relative w-full max-w-[100vw] h-[580px] md:h-[500px] mx-auto flex items-center justify-center">
            <div className="relative w-[90vw] md:w-[850px] h-full" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              {t.services.items.map((service, index) => {
                const total = t.services.items.length;
                let diff = index - currentIndex;
                if (diff < -Math.floor(total / 2)) diff += total;
                if (diff > Math.floor((total - 1) / 2)) diff -= total;
                const isActive = diff === 0;

                return (
                  <ServiceCard 
                    key={`${lang}-${index}`} 
                    service={service} 
                    icon={serviceIcons[index]}
                    index={index} 
                    diff={diff} 
                    isActive={isActive} 
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section id="proceso" className="py-40 border-y border-[#1E1E1E] bg-[#0A0A0A] relative z-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mb-20 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">{t.process.title}</h2>
              <p className="text-[#8A8A8A] text-lg md:text-xl leading-relaxed">{t.process.desc}</p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto relative border-l border-[#1E1E1E] ml-4 md:ml-auto">
              {t.process.steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative pl-10 md:pl-16 pb-16 last:pb-0 group"
                >
                  <div className="absolute left-[-6px] top-0 w-3 h-3 bg-[#141414] border border-[#a855f7] rounded-full group-hover:bg-[#a855f7] group-hover:scale-150 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <span className="font-mono text-4xl font-bold text-[#1E1E1E] group-hover:text-[#a855f7]/30 transition-colors duration-500 leading-none">{step.num}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{step.name}</h3>
                      <p className="text-[#8A8A8A] text-lg leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="filosofia" className="py-32 relative z-20 bg-[#050505] border-b border-[#1E1E1E] overflow-hidden">
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.05),transparent_70%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
                <span className="inline-block px-4 py-2 rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10 text-[#a855f7] text-[10px] font-mono tracking-widest uppercase mb-8">
                  {t.philosophy.tag}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1.1]">
                  {t.philosophy.title}
                </h2>
                <div className="space-y-6">
                  <p className="text-[#8A8A8A] text-lg md:text-xl leading-relaxed">
                    {t.philosophy.p1}
                  </p>
                  <p className="text-white text-lg md:text-xl leading-relaxed font-medium">
                    {t.philosophy.p2}
                  </p>
                </div>
              </motion.div>

              <div className="flex flex-col gap-6">
                {t.philosophy.pillars.map((pillar, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 30 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true, margin: "-100px" }} 
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className="p-8 rounded-3xl bg-[#0A0A0A] border border-[#1E1E1E] flex items-start gap-6 group hover:border-[#a855f7]/40 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#141414] border border-[#1E1E1E] flex items-center justify-center shrink-0 group-hover:bg-[#a855f7] group-hover:text-white transition-colors text-[#8A8A8A]">
                      {idx === 0 ? <Code2 size={20} /> : idx === 1 ? <Zap size={20} /> : <Layers size={20} />}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{pillar.title}</h4>
                      <p className="text-sm text-[#8A8A8A] leading-relaxed">{pillar.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </section>

        <section id="portfolio" className="py-40 relative z-20 bg-[#0A0A0A] border-b border-[#1E1E1E]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">{t.portfolio.title}</h2>
                <p className="text-[#8A8A8A] text-lg md:text-xl leading-relaxed">{t.portfolio.desc}</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.portfolio.items.map((item, index) => (
                <motion.div 
                  key={index}
                  onClick={() => item.route ? window.location.href = item.route : null}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`group relative h-[420px] rounded-3xl border border-[#1E1E1E] bg-[#0A0A0A] flex flex-col justify-between p-8 md:p-10 overflow-hidden hover:border-[#a855f7]/50 transition-all duration-500 ${item.route ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {item.image && (
                    <>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale group-hover:grayscale-0 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out z-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/40 z-0" />
                    </>
                  )}

                  {!item.image && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#a855f7]/5 rounded-bl-full transition-all duration-500 group-hover:bg-[#a855f7]/20 group-hover:scale-110 z-0" />
                  )}

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#141414]/90 backdrop-blur-md border border-[#1E1E1E] flex items-center justify-center group-hover:border-[#a855f7] group-hover:text-[#a855f7] transition-all duration-500 text-[#EDEDED] shadow-lg">
                          {index === 0 ? <ShoppingCart size={26} /> : index === 1 ? <QrCode size={26} /> : <BarChart3 size={26} />}
                        </div>
                        {item.route && (
                          <div className="flex items-center gap-2 text-xs font-mono text-[#a855f7] bg-[#a855f7]/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#a855f7]/20">
                            <span>Demo Live</span>
                            <ExternalLink size={14} />
                          </div>
                        )}
                      </div>

                      <div>
                        <span className="text-xs font-mono tracking-widest text-[#a855f7] uppercase mb-2 block">{item.type}</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{item.name}</h3>
                        <p className="text-[#8A8A8A] text-sm leading-relaxed max-w-md">{item.desc}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1E1E1E]/60">
                      {item.tags.map((tag: string, tagIndex: number) => (
                        <span 
                          key={tagIndex} 
                          className="px-3 py-1.5 text-[10px] md:text-xs font-mono tracking-widest uppercase text-[#8A8A8A] border border-[#1E1E1E] rounded-lg bg-[#0A0A0A]/80 backdrop-blur-md group-hover:border-[#a855f7]/30 group-hover:text-purple-300 transition-colors duration-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-40 relative z-20 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mb-20 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">{t.pricing.title}</h2>
              <p className="text-[#8A8A8A] text-lg md:text-xl leading-relaxed">{t.pricing.desc}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.pricing.tiers.map((tier, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex flex-col justify-between rounded-3xl bg-[#141414] border border-[#1E1E1E] p-8 md:p-10 hover:border-[#a855f7]/50 transition-all duration-500 group"
                >
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                      <span className="font-mono text-xs text-[#a855f7] bg-[#a855f7]/10 px-3 py-1 rounded-full border border-[#a855f7]/20">0{index + 1}</span>
                    </div>
                    <p className="text-[#8A8A8A] text-sm leading-relaxed mb-8">{tier.desc}</p>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">{tier.price}</div>
                    
                    <ul className="flex flex-col gap-4 mb-10">
                      {tier.features.map((feat, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-3 text-sm text-[#8A8A8A]">
                          <Check size={16} className="text-[#a855f7] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href="#contacto" onClick={(e) => handleSmoothScroll(e, '#contacto')} className="w-full py-4 rounded-xl border border-[#1E1E1E] bg-[#0A0A0A] text-white font-semibold text-center hover:bg-[#a855f7] hover:border-[#a855f7] transition-all duration-300">
                    {t.pricing.cta}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-32 px-6 max-w-3xl mx-auto relative z-20 border-t border-[#1E1E1E]">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">{t.faq.title}</h2>
            <p className="text-[#8A8A8A] text-lg">{t.faq.desc}</p>
          </motion.div>

          <div className="border-t border-[#1E1E1E]">
            {t.faq.items.map((faq, index) => (
              <FAQItem key={`${lang}-faq-${index}`} faq={faq} isOpen={openFaqIndex === index} onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} />
            ))}
          </div>
        </section>

        <section id="contacto" className="py-32 px-6 relative bg-[#0A0A0A] border-t border-[#1E1E1E]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.1),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex-1 text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6">{t.contact.title}</h2>
              <p className="text-[#8A8A8A] text-xl mb-10 max-w-lg mx-auto md:mx-0">{t.contact.desc}</p>
              <a href="https://wa.me/56977742447" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-[#a855f7] text-white font-bold rounded-full hover:bg-purple-500 transition-all duration-300 text-lg shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                {t.contact.btn}
                <ArrowRight size={20} />
              </a>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="flex-1 w-full bg-[#141414] border border-[#1E1E1E] rounded-3xl p-8 md:p-12">
              <h3 className="text-xl font-bold mb-8 text-white">{t.contact.social}</h3>
              <div className="flex flex-col gap-4">
                <a href="https://wa.me/56977742447" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#1E1E1E] transition-colors group">
                  <div className="w-12 h-12 bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg flex items-center justify-center group-hover:border-[#a855f7] group-hover:text-[#a855f7] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  </div>
                  <span className="font-medium text-[#EDEDED] group-hover:text-white">WhatsApp</span>
                </a>
                <a href="https://github.com/eldropg" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#1E1E1E] transition-colors group">
                  <div className="w-12 h-12 bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg flex items-center justify-center group-hover:border-[#a855f7] group-hover:text-[#a855f7] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.5-3.78c.15-.45.65-2.31-.15-4.78 0 0-1.25-.4-4 1.4a13.9 13.9 0 0 0-7 0c-2.75-1.8-4-1.4-4-1.4-.8 2.47-.3 4.33-.15 4.78A5.2 5.2 0 0 0 3 11.02c0 5.23 3 6.42 6 6.76-.9.3-1.3 1.02-1.4 2.24-.4.2-1.5.7-2.5 0-.9-.7-1.2-2-1.2-2"/></svg>
                  </div>
                  <span className="font-medium text-[#EDEDED] group-hover:text-white">GitHub (eldropg)</span>
                </a>
                <a href="mailto:contacto.pedropozo@gmail.com" className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#1E1E1E] transition-colors group">
                  <div className="w-12 h-12 bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg flex items-center justify-center group-hover:border-[#a855f7] group-hover:text-[#a855f7] transition-colors"><Mail size={20} /></div>
                  <span className="font-medium text-[#EDEDED] group-hover:text-white">Email Directo</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 bg-[#0A0A0A] border-t border-[#1E1E1E] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-xl font-bold tracking-tighter">PEDRO POZO.</div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-terminal'))}
              className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-[#8A8A8A] hover:text-[#a855f7] transition-colors bg-[#141414] px-4 py-2 rounded-lg border border-[#1E1E1E]"
            >
              <Code2 size={14} />
              <span>Terminal (Ctrl+K)</span>
            </button>
          </div>
          <div className="text-[#666666] text-sm text-center md:text-left">
            © {new Date().getFullYear()} Pedro Pozo (eldropg). {t.contact.copy}
          </div>
        </div>
      </footer>
      <Terminal lang={lang} />
    </div>
  );
}