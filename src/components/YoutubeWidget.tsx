import { getLatestVideo } from "@/lib/youtube";
import Image from "next/image";
import { Youtube, PlayCircle } from "lucide-react";

/**
 * Widget do YouTube.
 * Mostra o vídeo mais recente postado ou assistido (dependendo da lógica da API).
 * Busca metadados via função server-side `getLatestVideo`.
 */
export const YoutubeWidget = async () => {
  const video = await getLatestVideo();

  if (!video) return null;

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-4 overflow-hidden rounded-xl bg-zinc-900/60 p-4 border border-white/5 transition-all hover:bg-zinc-800/80 hover:border-[#FF0000]/30 hover:shadow-[0_0_20px_rgba(255,0,0,0.1)]"
    >
      {/* Background Glow Vermelho Sutil */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FF0000] opacity-5 blur-[50px] transition-opacity group-hover:opacity-10" />

      {/* Capa do Vídeo */}
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md shadow-lg border border-white/5">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        {/* Ícone de Play no hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayCircle size={20} className="text-white drop-shadow-md" />
        </div>
      </div>

      {/* Textos Informativos */}
      <div className="flex flex-col gap-1 min-w-0 z-10">
        <div className="flex items-center gap-2 mb-1">
          <Youtube size={12} className="text-[#FF0000]" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
            Watching / Learning
          </span>
        </div>

        <h3 className="truncate font-bold text-zinc-100 text-sm group-hover:text-[#FF0000] transition-colors">
          {video.title}
        </h3>
        <p className="truncate text-xs text-zinc-500 font-mono">
          {video.channel}
        </p>
      </div>

      {/* Seta indicativa animada */}
      <div className="absolute right-4 text-zinc-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        →
      </div>
    </a>
  );
};  