import { getDailyProductivity } from "@/lib/github";
import { Activity, Zap, Coffee, Skull, Leaf } from "lucide-react";

export const DevMood = async () => {
  const { score, level, color, message } = await getDailyProductivity();

  // Escolhe o ícone baseado no nível
  const getIcon = () => {
    if (score === 0) return <Leaf size={18} />;
    if (score <= 5) return <Coffee size={18} />;
    if (score <= 15) return <Zap size={18} />;
    if (score <= 30) return <Activity size={18} />;
    return <Skull size={18} />;
  };

  return (
    <div className="w-full p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-zinc-600 transition-colors">
      
      {/* Barra de Progresso Decorativa no Topo */}
      <div className="absolute top-0 left-0 h-1 bg-zinc-800 w-full">
        <div 
            className={`h-full ${color.replace('text-', 'bg-')} transition-all duration-1000`} 
            style={{ width: `${Math.min(score * 3, 100)}%` }} // Escala visual
        />
      </div>

      <div className="flex items-start gap-4">
        
        {/* Ícone Biométrico */}
        <div className={`p-3 rounded-lg bg-black/40 border border-white/5 ${color} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
          {getIcon()}
        </div>

        <div className="flex flex-col gap-1">
            {/* Título e Score */}
            <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold tracking-widest ${color}`}>
                    STATUS: {level}
                </span>
                <span className="text-[10px] text-zinc-600 font-mono">
                    [ACT: {score}]
                </span>
            </div>

            {/* A Mensagem Engraçada */}
            <p className="text-sm text-zinc-300 font-medium leading-tight">
                {message}
            </p>

            {/* Micro-texto decorativo */}
            <div className="mt-1 flex gap-2 text-[9px] text-zinc-600 font-mono uppercase">
                <span>HR: {score > 20 ? "120bpm" : "Normal"}</span>
                <span>Caffeine: {score > 10 ? "Critical" : "Stable"}</span>
            </div>
        </div>
      </div>
      
      {/* Scanline Effect (Opcional, charme extra) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity" />
    </div>
  );
};