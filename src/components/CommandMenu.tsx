"use client";
import { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Terminal, X, Zap, ChevronRight, Activity } from "lucide-react";
import ReactMarkdown from "react-markdown";

/**
 * Propriedades do CommandMenu.
 */
interface CommandMenuProps {
  /** Função para fechar o modal, se necessário. */
  onClose?: () => void;
}

/**
 * Componente Command Menu (Cmd+K).
 * Um menu modal acessível via atalho de teclado para ações rápidas.
 *
 * Implementa a interface de usuário para o "Chatbot IA" ou "Terminal de Comandos".
 * Permite que o usuário interaja com a API `/api/chat`.
 *
 * @param {CommandMenuProps} props - Propriedades do componente.
 */
export const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Histórico de mensagens para o chat (mock inicial)
  const [history, setHistory] = useState([
    { role: "system", text: "NEXUS_OS v2.0.4 initialized..." },
    { role: "bot", text: "Olá. Eu sou o **NEXUS_AI**. Você pode me perguntar sobre meus projetos, skills ou carreira." }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Hook para detectar Ctrl+K ou Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  // Foca no input quando abre
  useEffect(() => {
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setHistory(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMsg })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Erro na matrix");

        setHistory(prev => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
        setHistory(prev => [...prev, { role: "system", text: "⚠️ ERRO: Falha na conexão com o mainframe." }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl h-[500px] flex flex-col bg-[#0c0c0c] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden relative"
            >
                {/* SCANLINES DECORATIVAS */}
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