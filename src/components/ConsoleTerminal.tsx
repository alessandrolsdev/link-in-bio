"use client";
import { useState, useRef, useEffect } from "react";
import { Terminal, X, Zap, ChevronRight, Activity } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

export const ConsoleTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [history, setHistory] = useState<{ role: "user" | "bot" | "system"; text: string }[]>([
    { role: "system", text: "NEXUS_KERNEL_PANIC... [OK]\nINITIALIZING NEURAL INTERFACE v3.0...\nDigite 'help' para lista de comandos." }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll e Auto-focus
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  // Atalho de Teclado (CTRL + J ou CMD + J para abrir)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "j") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      // Fecha com ESC
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const processLocalCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    if (command === "clear") { setHistory([]); return null; }
    if (command === "help") return "COMMANDS: clear, whoami, projects, contact, exit";
    if (command === "exit") { setIsOpen(false); return null; }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput("");
    setHistory((prev) => [...prev, { role: "user", text: userMsg }]);

    const localRes = processLocalCommand(userMsg);
    if (localRes !== false) {
      if (localRes) setHistory((prev) => [...prev, { role: "system", text: localRes }]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ message: userMsg }) });
      const data = await res.json();
      setHistory((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setHistory((prev) => [...prev, { role: "bot", text: "CONNECTION_ERROR" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* --- GATILHO (BOTÃO DE BARRA DE TAREFAS) --- */}
      {/* Fica fixo no rodapé, parecendo uma barra de status do sistema */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <div 
            onClick={() => setIsOpen(!isOpen)}
            className="pointer-events-auto cursor-pointer bg-zinc-900/90 border-t border-x border-zinc-800 text-zinc-400 hover:text-green-400 hover:border-green-500/50 px-6 py-2 rounded-t-xl backdrop-blur-md flex items-center gap-3 transition-all group shadow-[0_-5px_20px_rgba(0,0,0,0.5)]"
        >
            <div className={`w-2 h-2 rounded-full ${isOpen ? "bg-red-500" : "bg-green-500 animate-pulse"}`} />
            <Terminal size={14} />
            <span className="font-mono text-xs font-bold tracking-widest">
                {isOpen ? "CLOSE_TERMINAL" : "SYSTEM_CONSOLE"}
            </span>
            <span className="text-[10px] text-zinc-600 bg-zinc-800 px-1.5 rounded border border-zinc-700 hidden md:block">
                CTRL+J
            </span>
        </div>
      </motion.div>

      {/* --- O CONSOLE (OVERLAY) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-0"
            onClick={() => setIsOpen(false)} // Fecha se clicar fora
          >
            {/* JANELA CRT */}
            <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative w-full max-w-3xl h-[80vh] md:h-[600px] bg-[#0a0a0a] border border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()} // Não fecha se clicar dentro
            >
                {/* EFEITO CRT (LINHAS DE SCAN) */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20" />
                
                {/* HEADER */}
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 z-20">
                    <div className="flex items-center gap-3">
                        <Activity size={16} className="text-green-500" />
                        <span className="text-xs font-mono text-zinc-300 tracking-widest">NEXUS_AI_CORE // ROOT_ACCESS</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-red-500 transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* AREA DE CHAT */}
                <div className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-4 z-20 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                    {history.map((msg, i) => (
                        <div key={i} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                           
                            {/* Avatar / Ícone */}
                            <div className={`shrink-0 w-8 h-8 rounded flex items-center justify-center border ${
                                msg.role === "bot" ? "border-purple-500/30 bg-purple-500/10 text-purple-400" :
                                msg.role === "system" ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400" :
                                "border-zinc-700 bg-zinc-800 text-zinc-300"
                            }`}>
                                {msg.role === "bot" ? <Zap size={14} /> : msg.role === "system" ? <Terminal size={14} /> : <ChevronRight size={14} />}
                            </div>

                            {/* Mensagem */}
                            <div className={`max-w-[80%] p-3 rounded ${
                                msg.role === "user" ? "bg-zinc-800 text-zinc-200" : 
                                msg.role === "system" ? "text-yellow-500/90 font-bold" :
                                "text-zinc-300 leading-relaxed"
                            }`}>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {loading && <div className="text-green-500 text-xs animate-pulse pl-12">PROCESSING_DATA_PACKETS...</div>}
                    <div ref={scrollRef} />
                </div>

                {/* INPUT AREA */}
                <form onSubmit={handleSubmit} className="p-4 bg-black border-t border-zinc-800 z-20 flex items-center gap-3">
                    <span className="text-green-500 font-bold text-lg">›</span>
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Insira comando ou pergunta..."
                        className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-zinc-700 font-mono text-base"
                        autoComplete="off"
                    />
                    <div className="text-[10px] text-zinc-600 font-mono hidden md:block">
                        PRESS ENTER
                    </div>
                </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};