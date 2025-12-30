"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Activity, 
  ChevronDown,
  Zap 
} from "lucide-react";

// Removemos os imports do GithubWidget e DiscordStatus daqui!
// Eles virão prontos de fora.

interface NexusControlPanelProps {
  githubSlot: React.ReactNode;  // Espaço para o Widget do GitHub
  discordSlot: React.ReactNode; // Espaço para o Widget do Discord/Foco
}

export const NexusControlPanel = ({ githubSlot, discordSlot }: NexusControlPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full mb-8">
      {/* HEADER DA BARRA (MANTIDO IGUAL) */}
      <motion.div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative z-20 w-full p-4 rounded-xl cursor-pointer border transition-all duration-300 group
          ${isExpanded 
            ? "bg-zinc-900 border-zinc-700 rounded-b-none" 
            : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/80"
          }
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8 overflow-hidden">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-green-500 font-bold uppercase tracking-widest shrink-0">
              <Activity size={14} />
              <span>NEXUS_CORE</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-zinc-700 shrink-0" />
            
            {/* Resumo visual quando fechado */}
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 truncate">
               <div className="flex items-center gap-2 hover:text-white transition-colors">
                  <Github size={14} />
                  <span>GH_LINK: <span className="text-white">CONNECTED</span></span>
               </div>
               <div className="hidden sm:flex items-center gap-2 text-zinc-500">
                  <Zap size={14} className="text-yellow-500" />
                  <span className="truncate max-w-[150px]">System Optimization...</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
             <span className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                {isExpanded ? "COLLAPSE" : "EXPAND"}
             </span>
             <div className={`p-1.5 rounded-md bg-black/50 border border-zinc-700 text-zinc-300 transition-transform duration-300 ${isExpanded ? "rotate-180 bg-red-500/10 border-red-500/50 text-red-400" : ""}`}>
                <ChevronDown size={14} />
             </div>
          </div>
        </div>
      </motion.div>

      {/* ÁREA EXPANSÍVEL: AQUI USAMOS OS SLOTS */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-black/20 border-x border-b border-zinc-800 rounded-b-xl backdrop-blur-sm"
          >
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
               
               {/* Slot da Esquerda (GitHub) */}
               <div className="flex flex-col gap-4">
                  {githubSlot}
               </div>

               {/* Slot da Direita (Discord/Status) */}
               <div className="flex flex-col gap-4">
                  {discordSlot}
               </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};