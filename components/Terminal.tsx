'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const dict = {
  es: {
    welcome: "Terminal iniciada v1.0.0\nEscribe 'help' para ver los comandos disponibles.",
    notFound: "Comando no encontrado: ",
    helpMsg: "Comandos disponibles:\n  help    - Muestra este mensaje\n  about   - Información sobre Pedro Pozo\n  skills  - Tecnologías y herramientas\n  contact - Medios de contacto\n  clear   - Limpia la consola",
    aboutMsg: "PEDRO POZO (DropG)\nConsultor Tecnológico y Desarrollador Full-Stack.\nEspecializado en arquitecturas escalables, diseño UI/UX de alta conversión y administración de servidores.",
    skillsMsg: "STACK TÉCNICO:\n- Frontend: React, Next.js, TailwindCSS, Framer Motion\n- Backend: Node.js, API REST, Bases de Datos\n- Infraestructura: Linux, Cloud, Docker, Redes",
    contactMsg: "CONTACTO:\n- Email: contacto.pedropozo@gmail.com\n- WhatsApp: [Oculto por privacidad] Usa el botón en la web\n- GitHub: github.com/eldropg",
    placeholder: "Escribe un comando...",
  },
  en: {
    welcome: "Terminal initialized v1.0.0\nType 'help' to see available commands.",
    notFound: "Command not found: ",
    helpMsg: "Available commands:\n  help    - Shows this message\n  about   - Information about Pedro Pozo\n  skills  - Technologies and tools\n  contact - Contact information\n  clear   - Clears the console",
    aboutMsg: "PEDRO POZO (DropG)\nTech Consultant & Full-Stack Developer.\nSpecialized in scalable architectures, high-conversion UI/UX design, and server administration.",
    skillsMsg: "TECH STACK:\n- Frontend: React, Next.js, TailwindCSS, Framer Motion\n- Backend: Node.js, REST APIs, Databases\n- Infrastructure: Linux, Cloud, Docker, Networking",
    contactMsg: "CONTACT:\n- Email: contacto.pedropozo@gmail.com\n- WhatsApp: [Hidden for privacy] Use the contact button on the web\n- GitHub: github.com/eldropg",
    placeholder: "Type a command...",
  }
};

export default function Terminal({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const t = dict[lang];

  useEffect(() => {
    if (history.length === 0) {
      setHistory([{ type: 'output', text: t.welcome }]);
    }
  }, [lang, history.length, t.welcome]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleOpenEvent = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-terminal', handleOpenEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-terminal', handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newHistory = [...history, { type: 'input' as const, text: cmd }];
    const lowerCmd = cmd.toLowerCase();

    let response = '';
    if (lowerCmd === 'help') response = t.helpMsg;
    else if (lowerCmd === 'about') response = t.aboutMsg;
    else if (lowerCmd === 'skills') response = t.skillsMsg;
    else if (lowerCmd === 'contact') response = t.contactMsg;
    else if (lowerCmd === 'clear') {
      setHistory([{ type: 'output', text: t.welcome }]);
      setInput('');
      return;
    } else {
      response = `${t.notFound}"${cmd}"`;
    }

    newHistory.push({ type: 'output', text: response });
    setHistory(newHistory);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-[90vw] md:w-[500px] h-[400px] bg-[#0A0A0A]/95 backdrop-blur-xl border border-[#1E1E1E] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden font-mono"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E1E1E] bg-[#141414]">
            <div className="flex items-center gap-2 text-[#8A8A8A]">
              <TerminalIcon size={14} />
              <span className="text-xs tracking-widest uppercase">Terminal</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#8A8A8A] hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs md:text-sm text-[#EDEDED] no-scrollbar">
            {history.map((entry, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {entry.type === 'input' ? (
                  <div className="flex items-start gap-2 text-[#a855f7]">
                    <span>➜</span>
                    <span>{entry.text}</span>
                  </div>
                ) : (
                  <div className="text-[#8A8A8A] pl-4 leading-relaxed">
                    {entry.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-[#1E1E1E] bg-[#141414] flex items-center gap-2">
            <span className="text-[#a855f7]">➜</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 bg-transparent outline-none text-white placeholder:text-[#4A4A4A] text-sm"
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}