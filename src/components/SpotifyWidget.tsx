import { getNowPlaying } from "@/lib/spotify";
import { Music, Disc3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Widget do Spotify (Real-Time).
 * Busca o que o usuário está ouvindo agora na API do Spotify.
 * Se nada estiver tocando, exibe a última música ou uma mensagem padrão.
 * Renderizado no servidor para performance e SEO.
 *
 * @returns {JSX.Element | null} O widget do Spotify ou null se não houver dados.
 */
export const SpotifyWidget = async () => {
  const data = await getNowPlaying();

  // Se não houver dados, retorna null ou estado vazio (opcional)
  if (!data) return null;

  const isPlaying = data.isPlaying;

  return (
    <Link
      href={data.songUrl || "#"}
      target="_blank"
      className="group relative flex items-center gap-4 overflow-hidden rounded-xl bg-zinc-900/60 p-4 border border-white/5 transition-all hover:bg-zinc-800/80 hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]"
    >

      {/* Background Glow (Aura Verde) */}
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-green-500 opacity-5 blur-[50px] transition-opacity group-hover:opacity-10" />

      {/* Capa do Álbum (com animação de vinil girando se estiver tocando) */}
      <div className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-zinc-800 shadow-xl ${isPlaying ? 'animate-spin-slow' : ''}`}>
         {data.albumArt ? (
            <Image
                src={data.albumArt}
                alt={data.album}
                fill
                className="object-cover"
            />
         ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                <Disc3 className="text-zinc-600" />
            </div>
         )}
         {/* Furo do Vinil */}
         <div className="absolute inset-0 m-auto w-4 h-4 bg-zinc-900 rounded-full border border-zinc-700" />
      </div>

      {/* Equalizador Animado (Só aparece se tocando) */}
      {isPlaying && (
          <div className="absolute bottom-4 right-4 flex gap-1 items-end h-4">
              <div className="w-1 bg-green-500 animate-[music-bar_1s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
              <div className="w-1 bg-green-500 animate-[music-bar_1s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }} />
              <div className="w-1 bg-green-500 animate-[music-bar_1s_ease-in-out_infinite]" style={{ animationDelay: '400ms' }} />
          </div>
      )}

      {/* Informações da Música */}
      <div className="flex flex-col min-w-0 z-10">
        <div className="flex items-center gap-2 mb-1">
            <Music size={12} className={isPlaying ? "text-green-500" : "text-zinc-500"} />
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
                {isPlaying ? "Now Playing" : "Offline / Last Played"}
            </span>
        </div>

        <h3 className="truncate font-bold text-zinc-100 text-sm group-hover:text-green-400 transition-colors">
            {data.title || "Silence..."}
        </h3>
        <p className="truncate text-xs text-zinc-500 font-mono">
            {data.artist || "Spotify Disconnected"}
        </p>
      </div>

    </Link>
  );
};