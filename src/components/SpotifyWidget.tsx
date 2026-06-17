import { getNowPlaying } from '@/lib/spotify';
import Image from 'next/image';
import { Music } from 'lucide-react';

import { WidgetStatus } from '@/components/WidgetStatus';

/**
 * Widget "Listening Now" do Spotify.
 * Exibe a música que o usuário está ouvindo no momento (via Spotify API).
 * Se não houver música tocando, exibe um estado offline discreto ou nada.
 */
export const SpotifyWidget = async () => {
  // Busca dados em tempo real (Server Component)
  const song = await getNowPlaying();

  // Tratamento para quando não há musica tocando ou erro na API
  if (!song) {
    return (
      <WidgetStatus
        icon={Music}
        label="SPOTIFY_SIGNAL"
        title="Spotify offline"
        description="Nenhuma faixa está tocando ou acessível agora."
        tone="green"
        variant="inline"
        className="opacity-80"
      />
    );
  }

  const { isPlaying, title, artist, albumArt, songUrl } = song;

  return (
    <a
      href={songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full group relative flex items-center gap-4 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-[#1DB954] transition-all overflow-hidden"
    >
      {/* Background Glow (Verde Spotify) */}
      <div className="absolute inset-0 bg-[#1DB954] opacity-0 group-hover:opacity-5 transition-opacity" />

      {/* Arte do Álbum (Vinil Girando) */}
      <div className={`relative w-12 h-12 rounded-full overflow-hidden border border-white/10 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
        <Image src={albumArt} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 w-3 h-3 m-auto bg-zinc-900 rounded-full border border-zinc-700" /> {/* Furo central do vinil */}
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono text-[#1DB954] font-bold tracking-widest mb-1">
            LISTENING NOW
          </span>
          {/* Animação de Equalizador (Barras pulando) */}
          {isPlaying && (
            <div className="flex gap-[2px] items-end h-3">
              <span className="w-1 bg-[#1DB954] animate-[bounce_1s_infinite] h-2"></span>
              <span className="w-1 bg-[#1DB954] animate-[bounce_1.2s_infinite] h-3"></span>
              <span className="w-1 bg-[#1DB954] animate-[bounce_0.8s_infinite] h-1"></span>
            </div>
          )}
        </div>

        <h3 className="text-sm font-bold text-white truncate font-sans">{title}</h3>
        <p className="text-xs text-zinc-400 truncate font-mono">{artist}</p>
      </div>
    </a>
  );
};
