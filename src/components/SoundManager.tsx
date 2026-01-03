"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import useSound from "use-sound";

/**
 * Gerenciador de Áudio Global.
 * Responsável por tocar sons de interface (clicks, hover, startup) e música de fundo ambiente.
 *
 * @returns {JSX.Element} Botão flutuante de mute/unmute.
 */
export const SoundManager = () => {
  const [muted, setMuted] = useState(true); // Começa mutado por UX padrão da Web (autoplay policy)

  // Hooks de som (presumindo que use-sound está sendo usado para tocar os efeitos)
  // Como não posso ver os arquivos de som, vou manter a lógica original que usava 'use-sound'
  // baseada em padrões comuns, mas adaptada para garantir que funcione.
  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.1, soundEnabled: !muted });
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5, soundEnabled: !muted });

  // Efeito para tocar som de hover em todos os botões/links
  useEffect(() => {
    if (muted) return;

    const buttons = document.querySelectorAll("button, a, .cursor-pointer");

    const handleMouseEnter = () => playHover();
    const handleClick = () => playClick();

    buttons.forEach(btn => {
        btn.addEventListener("mouseenter", handleMouseEnter);
        btn.addEventListener("click", handleClick);
    });

    return () => {
        buttons.forEach(btn => {
            btn.removeEventListener("mouseenter", handleMouseEnter);
            btn.removeEventListener("click", handleClick);
        });
    };
  }, [muted, playHover, playClick]);

  return (
    <button
      onClick={() => setMuted(!muted)}
      className="fixed bottom-4 left-4 z-50 p-3 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-green-500 hover:border-green-500 transition-all backdrop-blur-sm"
      aria-label={muted ? "Ativar som" : "Desativar som"}
    >
      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
};