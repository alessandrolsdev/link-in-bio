"use client";
import { useLanyard } from "@/hooks/useLanyard";
import { Loader2, Gamepad2, Code } from "lucide-react";

/**
 * Widget de Status do Discord.
 * Utiliza a API Lanyard para buscar o status em tempo real do usuário no Discord.
 * Exibe estado (Online, Offline, DND) e atividade atual (Jogando, Codando).
 *
 * @returns {JSX.Element} O widget de status do Discord.
 */
export const DiscordStatus = () => {
  const { data: user, isLoading } = useLanyard();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-white/5 backdrop-blur-md mt-4 animate-pulse">
        <Loader2 className="w-3 h-3 text-zinc-500 animate-spin" />
        <span className="text-xs text-zinc-500 font-mono">Loading Status...</span>
      </div>
    );
  }

  // Mapeamento de cores baseado no status do Discord
  const statusColor = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-zinc-500",
  }[user?.discord_status as "online" | "idle" | "dnd" | "offline" || "offline"];

  // Identifica a atividade principal (Activity Type 0 = Playing/App)
  const activity = user?.activities?.find((act: any) => act.type === 0);

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md mt-4 shadow-lg hover:border-neon/30 transition-colors cursor-help group relative">

      {/* Indicador Visual de Status (Ping Animation) */}
      <div className="relative flex h-3 w-3">
        {user?.discord_status !== "offline" && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusColor}`} />
        )}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${statusColor}`} />
      </div>

      <div className="flex flex-col">
        {/* Status Textual */}
        <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider leading-none">
          {user?.discord_status === "dnd" ? "Do Not Disturb" : user?.discord_status}
        </span>

        {/* Atividade Atual */}
        {activity ? (
          <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1 mt-1 truncate max-w-[150px]">
            {activity.name === "Visual Studio Code" ? <Code size={10} /> : <Gamepad2 size={10} />}
            {activity.name}
          </span>
        ) : (
          <span className="text-[10px] text-zinc-500 font-mono mt-0.5">
            {user?.discord_status === "offline" ? "Sleeping..." : "No Activity"}
          </span>
        )}
      </div>

      {/* Tooltip com Username */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border border-white/10 rounded text-[9px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        User: alessandro#0000
      </div>
    </div>
  );
};