"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal,
  Cpu, 
  Layers,
  Globe,
  Database,
  ChevronDown,
  Zap,
  Code
} from "lucide-react";

// DADOS DO STACK (Hardcoded para demonstração, idealmente viria de uma config)
const stackCategories = [
  {
    title: "FRONTEND",
    icon: <Globe size={14} className="text-blue-400" />,
    items: [
      { name: "Next.js 14", desc: "App Router & Server Actions" },
      { name: "React", desc: "Hooks & Custom Context" },
      { name: "Tailwind CSS", desc: "Utility-First Styling" },
      { name: "Framer Motion", desc: "Complex Animations" }
    ]
  },
  {
    title: "BACKEND & DATA",
    icon: <Database size={14} className="text-green-400" />,
    items: [
      { name: "Node.js", desc: "Runtime Environment" },
      { name: "PostgreSQL", desc: "Relational Database" },
      { name: "Prisma", desc: "ORM & Type Safety" },
      { name: "Redis", desc: "Caching Strategy" }
    ]
  },
  {
    title: "TOOLS & DEVOPS",
    icon: <Cpu size={14} className="text-orange-400" />,
    items: [
      { name: "Docker", desc: "Containerization" },
      { name: "Git/GitHub", desc: "Version Control" },
      { name: "Vercel", desc: "CI/CD Deployment" },
      { name: "Gemini AI", desc: "Generative AI" }
    ]
  }
];

/**
 * Componente TechStack (Expansível).
 * Exibe as tecnologias utilizadas no projeto ou conhecidas pelo desenvolvedor.
 * Organizado em categorias (Frontend, Backend, DevOps).
 * Apresenta uma interface compacta inicial que se expande ao clicar.
 *
 * @returns {JSX.Element} O componente Tech Stack.
 */
export const TechStack = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full">
      
      {/* --- BARRA DE CABEÇALHO (Compacta) --- */}
      <motion.div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative z-10 w-full p-4 rounded-xl cursor-pointer border transition-all duration-300 group
          ${isExpanded 
            ? "bg-zinc-900 border-zinc-700 rounded-b-none" 
            : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/80"
          }
        `}
      >
        <div className="flex items-center justify-between">
          
          {/* Lado Esquerdo: Título + Ícones Preview */}
          <div className="flex items-center gap-4 md:gap-8 overflow-hidden">
            
            {/* Label */}
            <div className="flex items-center gap-2 text-xs font-mono text-purple-500 font-bold uppercase tracking-widest shrink-0">
              <Layers size={14} />
              <span className="hidden sm:inline">SYSTEM_ARCHITECTURE</span>
              <span className="sm:hidden">STACKS</span>
            </div>

            {/* Divisor */}
            <div className="w-px h-4 bg-zinc-700 shrink-0" />

            {/* Preview Icons (Só mostra quando fechado para dar um gostinho) */}
            <div className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
                {stackCategories.map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5" title={cat.title}>
                        {cat.icon}
                        <span className="text-[10px] font-mono text-zinc-400 hidden md:inline">{cat.title}</span>
                    </div>
                ))}
            </div>

          </div>

          {/* Lado Direito: Seta */}
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
             <span className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                {isExpanded ? "CLOSE_SPECS" : "VIEW_SPECS"}
             </span>
             <div className={`p-1.5 rounded-md bg-black/50 border border-zinc-700 text-zinc-300 transition-transform duration-300 ${isExpanded ? "rotate-180 bg-purple-500/10 border-purple-500/50 text-purple-400" : ""}`}>
                <ChevronDown size={14} />
             </div>
          </div>
        </div>
      </motion.div>

      {/* --- CONTEÚDO EXPANSÍVEL (Grid de Cartões) --- */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-black/20 border-x border-b border-zinc-800 rounded-b-xl backdrop-blur-sm"
          >
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
               
               {stackCategories.map((category, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
                      {/* Header da Categoria */}
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-800/50">
                          {category.icon}
                          <span className="text-xs font-mono font-bold text-zinc-300">{category.title}</span>
                      </div>
                      
                      {/* Lista de Itens */}
                      <div className="space-y-2">
                          {category.items.map((item, i) => (
                              <div key={i} className="flex justify-between items-center group/item">
                                  <span className="text-xs text-zinc-400 group-hover/item:text-white transition-colors">{item.name}</span>
                                  <span className="text-[10px] text-zinc-600 font-mono">{item.desc}</span>
                              </div>
                          ))}
                      </div>
                  </div>
               ))}

               {/* Rodapé Técnico */}
               <div className="md:col-span-3 flex justify-center pt-2">
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono border px-3 py-1 rounded-full border-zinc-800 bg-black/50">
                     <Zap size={10} className="text-orange-400" />
                     <span>CORE: Clean Architecture • SOLID • TDD</span>
                  </div>
               </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};