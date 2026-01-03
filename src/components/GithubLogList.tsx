"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitCommit,
  GitBranch,
  Star,
  Terminal,
  GitPullRequest,
  AlertCircle,
  ChevronDown,
  Minimize2
} from "lucide-react";
import { GithubEvent } from "@/lib/github";

// Função auxiliar de tempo
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

/**
 * Propriedades da lista de logs do GitHub.
 */
interface GithubLogListProps {
  /** Array de eventos do GitHub a serem exibidos. */
  events: GithubEvent[];
}

/**
 * Componente GithubLogList.
 * Exibe uma lista de atividades recentes do GitHub (commits, stars, PRs) estilizada como um log de sistema.
 * Possui funcionalidade de expandir/recolher para mostrar mais detalhes.
 *
 * @param {GithubLogListProps} props - Propriedades do componente.
 */
export const GithubLogList = ({ events }: GithubLogListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Se não tiver eventos, não renderiza nada
  if (!events || events.length === 0) return null;

  // Decide quantos mostrar: 1 ou 5
  const displayedEvents = isExpanded ? events.slice(0, 5) : events.slice(0, 1);

  return (
    <div className="flex flex-col gap-2 transition-all duration-300">

      {/* Header Interativo */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between text-[10px] text-green-500 font-mono tracking-widest uppercase cursor-pointer hover:text-green-400 group select-none"
      >
        <div className="flex items-center gap-2">
          <Terminal size={10} />
          <span>{isExpanded ? "FULL_SYSTEM_LOGS" : "LATEST_ACTIVITY"}</span>
          <span className="animate-pulse">_</span>
        </div>

        {/* Ícone de Expandir/Recolher */}
        <div className="opacity-60 group-hover:opacity-100 transition-opacity">
          {isExpanded ? <Minimize2 size={12} /> : <ChevronDown size={12} />}
        </div>
      </div>

      {/* Lista Animada */}
      <div className={`flex flex-col gap-2 ${isExpanded ? "bg-black/90 p-2 rounded border border-zinc-800/50" : ""}`}>
        <AnimatePresence mode="popLayout">
          {displayedEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-3 text-xs font-mono group"
            >
              {/* Timestamp */}
              <span className="text-zinc-600 shrink-0 text-[10px] pt-0.5">
                [{formatTime(event.date)}]
              </span>

              {/* Conteúdo */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 text-zinc-400 group-hover:text-green-400 transition-colors">
                  {event.type === "PushEvent" && <GitCommit size={12} />}
                  {event.type === "CreateEvent" && <GitBranch size={12} />}
                  {event.type === "WatchEvent" && <Star size={12} className="text-yellow-500" />}
                  {event.type === "PullRequestEvent" && <GitPullRequest size={12} className="text-purple-400" />}
                  {event.type === "IssuesEvent" && <AlertCircle size={12} className="text-red-400" />}

                  <span className="uppercase tracking-tight font-bold truncate">{event.repo}</span>
                </div>

                {/* Mensagem (Só mostra em modo expandido ou se for muito curta) */}
                <span className={`text-zinc-500 text-[10px] truncate max-w-[200px] ${!isExpanded && "hidden"}`}>
                  {event.message}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dica visual pequena quando recolhido */}
      {!isExpanded && (
        <div className="text-[8px] text-zinc-700 font-mono text-right hover:text-green-500 cursor-pointer" onClick={() => setIsExpanded(true)}>
          + {events.length - 1} more events...
        </div>
      )}

    </div>
  );
};