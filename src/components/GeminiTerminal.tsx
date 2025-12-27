"use client";
import { useState, useRef, useEffect } from "react";
import { Loader2, Terminal as TerminalIcon } from "lucide-react"; // Renomeei para evitar conflito
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

export const GeminiTerminal = () => {
  const [input, setInput] = useState("");
  // MUDANÇA 1: Começa como TRUE (Minimizado/Fechado)
  const [minimized, setMinimized] = useState(true); 
  const [history, setHistory] = useState<{ role: "user" | "bot" | "system"; text: string }[]>([
    { role: "system", text: "AlessandroOS v1.0.0 LTS \nDigite 'help' para ver os comandos disponíveis." }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Lógica de Comandos (Mantida igual)
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
            // ESTADO MINIMIZADO (Botãozinho no canto)
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="fixed bottom-6 right-24 z-[100] cursor-pointer group"
                onClick={() => setMinimized(false)}
            >
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/90 border border-green-500/30 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:bg-green-900/20 transition-all">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <TerminalIcon size={14} className="text-green-500" />
                    <span className="text-xs font-mono text-green-400 font-bold">TERMINAL_OS</span>
                </div>
            </motion.div>
        ) : (
            // ESTADO ABERTO (Janela Arrastável)
            <motion.div 
                drag 
                dragMomentum={false}
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-[100] px-4"
            >
            <div className="w-full bg-black/95 border border-zinc-800 rounded-lg overflow-hidden backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            
                {/* Barra de Título */}
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 cursor-move active:cursor-grabbing">
                    <div className="flex gap-2 group">
                        {/* BOTÃO FECHAR (Minimizar) */}
                        <div 
                            className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 cursor-pointer transition-colors" 
                            onClick={(e) => { e.stopPropagation(); setMinimized(true); }} 
                        />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-xs font-mono text-zinc-500 pointer-events-none select-none">root@nexus-server:~</div>
                    <div className="w-10" />
                </div>

                {/* Chat */}
                <div className="h-[400px] overflow-y-auto p-4 space-y-2 font-mono text-sm scrollbar-thin scrollbar-thumb-zinc-800" onClick={() => document.getElementById('term-input')?.focus()}>
                    {history.map((msg, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        {msg.role === "user" ? (
                            <div className="flex gap-2 text-pink-500"><span className="font-bold">➜</span><span className="text-cyan-400">~</span><span className="text-zinc-100">{msg.text}</span></div>
                        ) : (
                            <div className={`pl-4 ${msg.role === "system" ? "text-green-400" : "text-zinc-300"}`}><ReactMarkdown>{msg.text}</ReactMarkdown></div>
                        )}
                    </div>
                    ))}
                    {loading && <div className="text-zinc-500 text-xs animate-pulse pl-4">processando...</div>}
                    <div ref={scrollRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 bg-black/50 border-t border-zinc-800/50">
                    <span className="text-pink-500 font-bold">➜</span>
                    <input id="term-input" type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-zinc-100 font-mono" autoFocus />
                </form>
            </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};