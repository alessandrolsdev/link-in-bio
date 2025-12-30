"use client";
import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Minus, Maximize2 } from "lucide-react"; 
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

export const GeminiTerminal = () => {
  const [input, setInput] = useState("");
  const [minimized, setMinimized] = useState(true); 
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar mobile
  const [history, setHistory] = useState<{ role: "user" | "bot" | "system"; text: string }[]>([
    { role: "system", text: "AlessandroOS v1.0.0 LTS \nDigite 'help' para ver os comandos disponíveis." }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Detecta se é mobile no lado do cliente para evitar erro de Hydration
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px é o breakpoint 'md' do Tailwind
    };
    
    checkMobile(); // Checa na montagem
    window.addEventListener("resize", checkMobile); // Checa se redimensionar
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!minimized) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, minimized]);

  const processLocalCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    const args = command.split(" ");
    switch (args[0]) {
      case "help": return `**COMMANDS:** ls, cat [file], whoami, clear, date, matrix`;
      case "clear": setHistory([]); return null;
      case "ls": return `**DIR:** 📁 projetos/ 📁 sobre/ 📄 readme.md`;
      case "whoami": return "root@guest-user (Level: Visitor)";
      case "date": return new Date().toString();
      case "cat": 
        if (args[1] === "readme.md") return "Portfólio interativo v2.5.";
        return `File '${args[1]}' not found.`;
      case "matrix": return "Siga o coelho branco... 🐇";
      default: return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput("");
    setHistory((prev) => [...prev, { role: "user", text: userMsg }]);

    const localResponse = processLocalCommand(userMsg);
    if (localResponse !== false) {
      if (localResponse !== null) setTimeout(() => setHistory((prev) => [...prev, { role: "system", text: localResponse as string }]), 100);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ message: userMsg }) });
      const data = await res.json();
      setHistory((prev) => [...prev, { role: "bot", text: data.reply || "Erro." }]);
    } catch {
      setHistory((prev) => [...prev, { role: "bot", text: "Erro crítico." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {minimized ? (
            // --- ESTADO MINIMIZADO (Botão Flutuante) ---
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                // Mobile: Fixo no canto inferior direito, mas acima da UI do navegador
                className="fixed bottom-6 right-6 md:bottom-6 md:right-24 z-[9999] cursor-pointer group"
                onClick={() => setMinimized(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/90 border border-green-500/30 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:bg-green-900/20 transition-all backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <TerminalIcon size={16} className="text-green-500" />
                    <span className="text-xs font-mono text-green-400 font-bold hidden md:inline">TERMINAL_OS</span>
                </div>
            </motion.div>
        ) : (
            // --- ESTADO ABERTO (Janela Inteligente) ---
            <motion.div 
                // LÓGICA DE ARRASTE: Só ativa drag se NÃO for mobile
                drag={!isMobile} 
                dragMomentum={false}
                
                // ANIMAÇÃO INICIAL:
                // Mobile: Sobe de baixo (Slide Up)
                // Desktop: Surge no meio (Fade/Scale)
                initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}

                // CLASSES CSS RESPONSIVAS:
                // Mobile: fixed bottom-0 left-0 w-full rounded-t-xl (Bottom Sheet)
                // Desktop: fixed top-1/2 left-1/2 w-[600px] rounded-lg (Window)
                className={`fixed z-[9999] shadow-2xl overflow-hidden border border-zinc-800 bg-black/95 backdrop-blur-xl
                    ${isMobile 
                        ? "bottom-0 left-0 w-full h-[60vh] rounded-t-2xl border-b-0" 
                        : "top-1/2 left-1/2 max-w-2xl w-full h-auto max-h-[600px] rounded-lg"
                    }
                `}
            >
                {/* Barra de Título */}
                <div 
                    className={`flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 select-none
                        ${!isMobile && "cursor-move active:cursor-grabbing"}
                    `}
                >
                    <div className="flex gap-2 items-center">
                        {/* Botão Fechar */}
                        <div 
                            className="p-1 rounded-full hover:bg-zinc-700/50 cursor-pointer transition-colors" 
                            onClick={(e) => { e.stopPropagation(); setMinimized(true); }} 
                        >
                            {isMobile ? <X size={18} className="text-zinc-400" /> : <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500" />}
                        </div>
                        {/* Botões Decorativos (Desktop Only) */}
                        {!isMobile && (
                            <>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </>
                        )}
                    </div>
                    
                    <div className="text-xs font-mono text-zinc-500 pointer-events-none flex items-center gap-2">
                        {isMobile ? <span>Nexus Terminal Mobile</span> : <span>root@nexus-server:~</span>}
                    </div>

                    <div className="w-8" /> {/* Espaçador */}
                </div>

                {/* Área de Chat */}
                <div 
                    className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm scrollbar-thin scrollbar-thumb-zinc-800 h-[calc(100%-110px)]" 
                    onClick={() => document.getElementById('term-input')?.focus()}
                >
                    {history.map((msg, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        {msg.role === "user" ? (
                            <div className="flex gap-2 text-pink-500 break-all">
                                <span className="font-bold shrink-0">➜</span>
                                <span className="text-cyan-400 shrink-0">~</span>
                                <span className="text-zinc-100">{msg.text}</span>
                            </div>
                        ) : (
                            <div className={`pl-4 ${msg.role === "system" ? "text-green-400" : "text-zinc-300"} break-words text-sm leading-relaxed`}>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                    ))}
                    {loading && <div className="text-zinc-500 text-xs animate-pulse pl-4">processando...</div>}
                    <div ref={scrollRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="absolute bottom-0 w-full flex items-center gap-2 p-3 bg-black/50 border-t border-zinc-800/50 backdrop-blur-sm">
                    <span className="text-pink-500 font-bold">➜</span>
                    <input 
                        id="term-input" 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        className="flex-1 bg-transparent border-none outline-none text-zinc-100 font-mono text-base md:text-sm" // Texto maior no mobile
                        autoFocus={!isMobile} // Não foca auto no mobile pra não abrir teclado na cara
                        placeholder={isMobile ? "Toque para digitar..." : ""}
                        autoComplete="off"
                    />
                </form>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};