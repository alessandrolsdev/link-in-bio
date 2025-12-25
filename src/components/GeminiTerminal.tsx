"use client";
import { useState, useRef, useEffect } from "react";
import { Terminal, Send, Loader2, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const GeminiTerminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "NEXUS_AI v2.5 Online. \nPergunte sobre **projetos**, **skills** ou **hobbies**." }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setHistory((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      
      setHistory((prev) => [...prev, { role: "bot", text: data.reply || "Erro de conexão." }]);
    } catch (error) {
      setHistory((prev) => [...prev, { role: "bot", text: "Erro crítico no sistema." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 mb-20 border border-zinc-800 bg-black/90 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.05)] font-mono text-sm">
      
      {/* Barra de Título */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-zinc-400">
          <Terminal size={14} />
          <span className="text-xs tracking-wider">NEXUS_AI_CLIENT.EXE</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 hover:bg-red-500 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 hover:bg-yellow-500 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 hover:bg-green-500 transition-colors" />
        </div>
      </div>

      {/* Área de Chat */}
      <div className="h-80 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {history.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            
            {/* Ícone Avatar */}
            <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 border ${
                msg.role === "bot" 
                ? "bg-purple-500/10 border-purple-500/30 text-purple-400" 
                : "bg-zinc-800 border-zinc-700 text-zinc-400"
            }`}>
                {msg.role === "bot" ? <Bot size={16} /> : <User size={16} />}
            </div>

            {/* Balão de Mensagem (Markdown Renderizado) */}
            <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
              msg.role === "user" 
                ? "bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-tr-none" 
                : "bg-purple-900/10 text-zinc-300 border border-purple-500/20 rounded-tl-none shadow-[0_0_15px_rgba(168,85,247,0.05)]"
            }`}>
              
              {/* O MAGO DO MARKDOWN 🧙‍♂️ */}
              <ReactMarkdown
                components={{
                    // Estilizando Negrito
                    strong: ({node, ...props}) => <span className="text-purple-400 font-bold tracking-wide" {...props} />,
                    // Estilizando Listas
                    ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1 my-2 marker:text-purple-500" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,
                    // Estilizando Links
                    a: ({node, ...props}) => <a className="text-purple-400 underline decoration-purple-500/30 hover:text-purple-300 transition-colors" target="_blank" {...props} />,
                    // Estilizando Código Inline
                    code: ({node, ...props}) => <code className="bg-black/50 px-1.5 py-0.5 rounded text-xs text-green-400 font-bold border border-white/5" {...props} />,
                    // Estilizando Parágrafos (para não ficar tudo grudado)
                    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />
                }}
              >
                {msg.text}
              </ReactMarkdown>

            </div>
          </div>
        ))}
        
        {loading && (
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400">
                    <Bot size={16} />
                </div>
                <div className="flex items-center gap-1 text-purple-400 text-xs animate-pulse pt-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animation-delay-200" />
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animation-delay-400" />
                </div>
            </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-zinc-800 bg-black">
        <span className="text-purple-500 animate-pulse">➜</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite um comando..."
          className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder-zinc-700 font-mono"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="p-2 text-zinc-500 hover:text-purple-400 transition-colors disabled:opacity-30"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        </button>
      </form>
    </div>
  );
};