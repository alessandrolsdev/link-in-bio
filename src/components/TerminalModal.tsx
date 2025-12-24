"use client";
import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Maximize2 } from "lucide-react";

export const TerminalModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(["Bem-vindo ao AlessandroOS v1.0. Digite 'help' para começar."]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
    }
  }, [history, isOpen]);

  const commands: Record<string, string> = {
    help: "Comandos disponíveis: about, skills, contact, clear, exit",
    about: "Alessandro Lima. FullStack Dev. Apaixonado por código limpo e interfaces imersivas.",
    skills: "Frontend: React, Next.js, Tailwind. Backend: Node, Python, SQL.",
    contact: "Email: seuemail@gmail.com | GitHub: @alessandrolsdev",
    clear: "CLEAR",
    exit: "EXIT"
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (cmd === "clear") {
        setHistory([]);
    } else if (cmd === "exit") {
        setIsOpen(false);
    } else if (commands[cmd]) {
        setHistory([...history, `> ${input}`, commands[cmd]]);
    } else {
        setHistory([...history, `> ${input}`, `Erro: Comando '${cmd}' não encontrado. Digite 'help'.`]);
    }
    setInput("");
  };

  return (
    <>
      {/* Botão Flutuante */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-zinc-900 border border-zinc-700 rounded-full text-neon hover:bg-neon hover:text-black transition-all shadow-lg hover:shadow-neon/50"
      >
        <TerminalIcon size={20} />
      </button>

      {/* Janela do Terminal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl bg-[#0c0c0c] border border-zinc-800 rounded-lg shadow-2xl overflow-hidden font-mono text-sm flex flex-col h-[400px]">
                {/* Barra de Título */}
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                    <span className="text-zinc-400 text-xs">root@alessandro-portfolio:~</span>
                    <div className="flex gap-2">
                        <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white"><X size={14}/></button>
                    </div>
                </div>

                {/* Corpo do Terminal */}
                <div className="flex-1 p-4 overflow-y-auto text-green-500 selection:bg-green-900 selection:text-white" onClick={() => inputRef.current?.focus()}>
                    {history.map((line, i) => (
                        <div key={i} className="mb-1 break-words">{line}</div>
                    ))}
                    <form onSubmit={handleCommand} className="flex gap-2 mt-2">
                        <span className="text-pink-500">➜</span>
                        <span className="text-cyan-400">~</span>
                        <input 
                            ref={inputRef}
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent outline-none border-none text-zinc-100"
                            autoFocus
                        />
                    </form>
                    <div ref={bottomRef} />
                </div>
            </div>
        </div>
      )}
    </>
  );
};