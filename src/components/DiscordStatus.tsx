"use client";
import { useLanyard } from "@/hooks/useLanyard";
import { Loader2, Gamepad2, Code, Monitor, Clock } from "lucide-react";

export const DiscordStatus = () => {
  const { data: user, isLoading } = useLanyard();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-zinc-500 animate-pulse">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-xs font-mono">Syncing...</span>
      </div>
    );
  }

  // Pega a atividade principal (Coding ou Gaming)
  const activity = user?.activities?.find((act) => act.type === 0);

  // Se não estiver fazendo nada, mostra mensagem de "Sistema Operante"
  if (!activity) {
    return (
      <div className="flex items-center gap-3">
        <div className="p-2 bg-zinc-800/50 rounded-lg">
          <Monitor size={16} className="text-zinc-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-zinc-400">SYSTEM IDLE</span>
          <span className="text-[10px] text-zinc-600 font-mono">Aguardando tarefas...</span>
        </div>
      </div>
    );
  }

  // Se tiver atividade, mostra os detalhes ricos
  return (
    <div className="flex items-center gap-3 w-full overflow-hidden">
      {/* Ícone da Atividade */}
      <div className="relative shrink-0">
        {activity.assets?.large_image ? (
            // Tenta mostrar a imagem do jogo/VSCode se o Lanyard mandar
            // (Nota: Lanyard manda URLs complexas, simplificando com ícones por segurança visual)
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                 {activity.name === "Visual Studio Code" ? <Code size={18} className="text-blue-400" /> : <Gamepad2 size={18} className="text-purple-400" />}
            </div>
        ) : (
            <div className="p-2 bg-zinc-800 rounded-lg">
                <Gamepad2 size={18} className="text-zinc-400" />
            </div>
        )}
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-xs font-bold text-zinc-200 truncate w-full">
          {activity.name}
        </span>
        
        <div className="flex items-center gap-2">
            {activity.details && (
                <span className="text-[10px] text-zinc-400 font-mono truncate max-w-[180px]">
                {activity.details}
                </span>
            )}
            
            {activity.state && (
                <span className="text-[10px] text-zinc-500 font-mono truncate hidden sm:block">
                 | {activity.state}
                </span>
            )}
        </div>

        {/* Timestamp (Opcional: mostra há quanto tempo está jogando) */}
        {activity.timestamps && (
             <div className="flex items-center gap-1 mt-0.5 text-[9px] text-zinc-600">
                <Clock size={8} />
                <span>Active Session</span>
             </div>
        )}
      </div>
    </div>
  );
};