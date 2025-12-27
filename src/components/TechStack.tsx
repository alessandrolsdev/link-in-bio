"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Database, 
  LayoutTemplate, 
  Server, 
  Workflow, 
  Zap,
  ChevronRight,
  Bot
} from "lucide-react";

// Dados das Stacks
const stackCategories = [
  {
    title: "FRONTEND ENGINEERING",
    icon: <LayoutTemplate size={18} className="text-blue-400" />,
    items: [
      { name: "Next.js 14", desc: "Framework React para SSR, SEO e rotas modernas." },
      { name: "React 18", desc: "Biblioteca de UI baseada em componentes funcionais." },
      { name: "Vue.js 3", desc: "Framework progressivo focado em alta performance." },
      { name: "Tailwind CSS", desc: "Engine de estilização utility-first para Design Systems." },
      { name: "Framer Motion", desc: "Biblioteca de animações declarativas para React." }
    ]
  },
  {
    title: "BACKEND & ARCHITECTURE",
    icon: <Server size={18} className="text-green-400" />,
    items: [
      { name: "Python (FastAPI)", desc: "APIs assíncronas de altíssima velocidade (Starlette)." },
      { name: "Node.js (Fastify)", desc: "Backend leve focado em baixo overhead e schemas." },
      { name: "Server Actions", desc: "Mutações de dados type-safe direto no Next.js." },
      { name: "REST / GraphQL", desc: "Padrões de comunicação e arquitetura de APIs." }
    ]
  },
  {
    title: "AUTOMATION & AI",
    icon: <Bot size={18} className="text-yellow-400" />,
    items: [
      { name: "OpenCV", desc: "Processamento de imagem e Visão Computacional." },
      { name: "Tesseract OCR", desc: "Engine de reconhecimento óptico de caracteres." },
      { name: "Python Scripts", desc: "Automação de tarefas (RPA) e Web Scraping." },
      { name: "Pandas", desc: "Análise, manipulação e exportação de dados complexos." }
    ]
  },
  {
    title: "INFRA & DATA CORE",
    icon: <Database size={18} className="text-purple-400" />,
    items: [
      { name: "PostgreSQL", desc: "Banco de dados relacional robusto e escalável." },
      { name: "Redis", desc: "Armazenamento em memória para Caching e Filas." },
      { name: "Docker", desc: "Containerização para ambientes consistentes." },
      { name: "CI/CD Pipeline", desc: "Integração e entrega contínua (Vercel/Github Actions)." }
    ]
  }
];

export const TechStack = () => {
  // Estado para controlar qual item está expandido (string única tipo "0-1")
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header da Seção */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
        <Cpu size={14} />
        <span>System_Modules_Interactive</span>
        <div className="h-px bg-zinc-800 flex-1 ml-2" />
        <span className="text-[10px] text-zinc-600 animate-pulse">CLICK TO EXPAND</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stackCategories.map((category, catIdx) => (
          <div 
            key={catIdx}
            className="flex flex-col p-5 bg-zinc-900/40 border border-white/5 rounded-xl transition-colors hover:border-zinc-700"
          >
            {/* Título da Categoria */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded bg-black/50 border border-white/10 text-zinc-300">
                {category.icon}
              </div>
              <h3 className="font-mono text-xs text-zinc-400 font-bold tracking-widest uppercase">
                {category.title}
              </h3>
            </div>

            {/* Lista Interativa */}
            <div className="flex flex-col gap-2">
              {category.items.map((item, itemIdx) => {
                const uniqueId = `${catIdx}-${itemIdx}`;
                const isActive = activeItem === uniqueId;

                return (
                  <motion.button
                    key={uniqueId}
                    onClick={() => toggleItem(uniqueId)}
                    className={`relative flex flex-col w-full text-left rounded-lg border transition-all duration-300 overflow-hidden ${
                      isActive 
                        ? "bg-zinc-800 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]" 
                        : "bg-black/20 border-white/5 hover:bg-zinc-800/50 hover:border-white/10"
                    }`}
                  >
                    {/* Cabeçalho do Item (Sempre visível) */}
                    <div className="flex items-center justify-between p-2.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" : "bg-zinc-700"}`} />
                        <span className={`text-xs font-mono font-bold transition-colors ${isActive ? "text-white" : "text-zinc-400"}`}>
                          {item.name}
                        </span>
                      </div>
                      <ChevronRight 
                        size={14} 
                        className={`text-zinc-600 transition-transform duration-300 ${isActive ? "rotate-90 text-purple-400" : ""}`} 
                      />
                    </div>

                    {/* Descrição (Expandível) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                          <div className="px-3 pb-3 pt-0">
                            <div className="h-px w-full bg-white/5 mb-2" />
                            <p className="text-[11px] font-mono text-zinc-400 leading-relaxed">
                              <span className="text-purple-500 mr-1">{">"}</span>
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Tecnico */}
      <div className="w-full p-3 border border-dashed border-zinc-800 rounded bg-black/20 flex flex-wrap gap-4 items-center justify-center md:justify-between text-[10px] text-zinc-500 font-mono uppercase">
         <div className="flex items-center gap-2">
            <Zap size={12} className="text-orange-400" />
            <span>Methodologies: SOLID • MVC</span>
         </div>
         <div className="flex items-center gap-2">
            <Workflow size={12} className="text-blue-400" />
            <span>DevOps: CI/CD Active</span>
         </div>
      </div>

    </div>
  );
};  