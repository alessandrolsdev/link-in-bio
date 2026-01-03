"use client";
import { useState, useEffect, useRef } from "react";
import { X, Minus, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Propriedades do Terminal.
 */
interface ConsoleTerminalProps {
  /** Se o terminal deve iniciar aberto ou não. (Default: false) */
  initialOpen?: boolean;
}

/**
 * Componente ConsoleTerminal.
 * Simula um terminal de linha de comando estilo "Quake" ou "VS Code".
 * Pode ser usado para exibir logs do sistema, mensagens de debug ou apenas estética.
 *
 * @param {ConsoleTerminalProps} props - Propriedades do componente.
 */
export const ConsoleTerminal = ({ initialOpen = false }: ConsoleTerminalProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [logs, setLogs] = useState<string[]>([
    "Initializing NEXUS_OS kernel...",
    "Loading modules: [GRAPHICS, AUDIO, NETWORK]...",
    "Connection established to secure server.",
    "System ready. Welcome, Admin."
  ]);

  // Função para adicionar logs falsos periodicamente para "vida"
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
        const messages = [
            "Scanning for vulnerabilities...",
            "Ping: 24ms",
            "Optimizing render queue...",
            "Garbage collection started...",
            "Network packet received [encrypted]"
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        const timestamp = new Date().toLocaleTimeString('pt-BR', {hour12: false});

        setLogs(prev => {
            const newLogs = [...prev, `[${timestamp}] ${randomMsg}`];
            if (newLogs.length > 10) return newLogs.slice(1); // Mantém apenas os últimos 10
            return newLogs;
        });
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-40 hidden lg:block">
      <AnimatePresence>
        {!isOpen && (
             <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => setIsOpen(true)}
                className="w-12 h-12 bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-green-500 hover:border-green-500 transition-all shadow-lg"
             >
                 <span className="font-mono text-xl">_&gt;</span>
             </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.9 }}
                className="w-80 bg-[#0c0c0c] border border-zinc-800 rounded-lg overflow-hidden shadow-2xl"
            >
                {/* Title Bar */}
                <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-800">
                    <span className="text-xs font-mono text-zinc-400">terminal --bash</span>
                    <div className="flex gap-2">
                        <Minus size={12} className="text-zinc-500 hover:text-white cursor-pointer" onClick={() => setIsOpen(false)}/>
                        <Square size={10} className="text-zinc-500 hover:text-white cursor-pointer"/>
                        <X size={12} className="text-zinc-500 hover:text-red-500 cursor-pointer" onClick={() => setIsOpen(false)}/>
                    </div>
                </div>

                {/* Content */}
                <div className="p-3 font-mono text-[10px] text-green-500/80 h-48 overflow-y-auto flex flex-col justify-end bg-black/50">
                    {logs.map((log, i) => (
                        <div key={i} className="truncate">
                            <span className="text-zinc-600 mr-2">$</span>
                            {log}
                        </div>
                    ))}
                    <div className="animate-pulse">_</div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};