import React from 'react';
import { getNowPlaying } from '@/lib/spotify';
import Image from 'next/image';
import { Music } from 'lucide-react';

export const SpotifyWidget = async () => {
  // Busca os dados no servidor
  const response = await getNowPlaying();
  
  // Se não estiver ouvindo nada ou der erro, mostramos o estado "Offline"
  if (response.status === 204 || response.status > 400) {
    return (
      <div className="w-full flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 opacity-70">
        <Music className="text-zinc-600" />
        <span className="text-xs font-mono text-zinc-500">SPOTIFY: OFFLINE</span>
      </div>
    );
  }

  const song = await response.json();
  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
  const albumArt = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return (
    <a
      href={songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full group relative flex items-center gap-4 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-[#1DB954] transition-all overflow-hidden"
    >
      {/* Glow Verde no fundo ao passar o mouse */}
      <div className="absolute inset-0 bg-[#1DB954] opacity-0 group-hover:opacity-5 transition-opacity" />

      {/* Capa do Álbum (Gira se estiver tocando) */}
      <div className={`relative w-12 h-12 rounded-full overflow-hidden border border-white/10 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
        <Image src={albumArt} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 w-3 h-3 m-auto bg-zinc-900 rounded-full border border-zinc-700" /> {/* Furo do vinil */}
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-[#1DB954] font-bold tracking-widest mb-1">
                LISTENING NOW
            </span>
            {/* Equalizador Animado (CSS puro) */}
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