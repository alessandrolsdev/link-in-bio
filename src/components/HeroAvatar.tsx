"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanyard } from "@/hooks/useLanyard"; 

// NOTA: Definindo como function padrão para evitar erro de import
export default function HeroAvatar() {
  const { data: user } = useLanyard();
  const status = user?.discord_status || "offline";

  // Mapeamento de Cores e Glows baseado no Status
  const statusConfig = {
    online: {
      color: "bg-green-500",
      border: "border-green-500",
      glow: "shadow-[0_0_40px_rgba(34,197,94,0.6)]",
      label: "Online",
      ring: "ring-green-500/50"
    },
    dnd: {
      color: "bg-red-500",
      border: "border-red-500",
      glow: "shadow-[0_0_40px_rgba(239,68,68,0.6)]",
      label: "Não Perturbe",
      ring: "ring-red-500/50"
    },
    idle: {
      color: "bg-yellow-500",
      border: "border-yellow-500",
      glow: "shadow-[0_0_40px_rgba(234,179,8,0.6)]",
      label: "Ausente",
      ring: "ring-yellow-500/50"
    },
    offline: {
      color: "bg-zinc-500",
      border: "border-zinc-700",
      glow: "shadow-none",
      label: "Offline",
      ring: "ring-zinc-700/50"
    },
  };

  const currentStyle = statusConfig[status as keyof typeof statusConfig] || statusConfig.offline;

  // Verifica se está programando (VS Code) ou ouvindo música
  const activity = user?.activities?.find((act) => act.type === 0); 
  const isSpotify = user?.listening_to_spotify;
  
  const statusText = isSpotify 
    ? "Ouvindo Spotify" 
    : activity 
      ? activity.name 
      : currentStyle.label;

  return (
    <div className="relative inline-block group">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`
          relative w-28 h-28 md:w-32 md:h-32 rounded-full p-1
          border-2 transition-all duration-500 ease-in-out
          ${currentStyle.border} 
          ${currentStyle.glow}
        `}
      >
        <div className="w-full h-full rounded-full overflow-hidden relative bg-zinc-900">
          <Image
            src="https://github.com/alessandrolsdev.png"
            alt="Avatar Alessandro"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
          />
        </div>
      </motion.div>

      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center w-max">
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            flex items-center gap-2 px-3 py-1 rounded-full 
            bg-black/80 backdrop-blur-md border border-zinc-800
            shadow-lg transition-colors duration-300
          `}
        >
            <span className={`relative flex h-2.5 w-2.5`}>
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentStyle.color}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${currentStyle.color}`}></span>
            </span>

            <span className="text-[10px] md:text-xs font-mono font-medium text-zinc-300 whitespace-nowrap">
              {statusText}
            </span>
        </motion.div>
      </div>
    </div>
  );
}