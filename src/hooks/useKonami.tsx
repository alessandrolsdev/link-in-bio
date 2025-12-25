"use client";
import { useEffect, useState } from "react";
import useSound from "use-sound";

/**
 * Hook personalizado para detectar o "Konami Code".
 * Sequência: ↑ ↑ ↓ ↓ ← → ← → B A
 * 
 * Ao completar a sequência, alterna a classe `.hacker-mode` no body, 
 * ativando efeitos visuais globais (Matrix Rain, fontes terminal, cores, etc).
 * 
 * @returns {boolean} Estado atual do modo hacker (ativo/inativo).
 */
export const useKonami = () => {
  const [isHackerMode, setIsHackerMode] = useState(false);
  const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  const [input, setInput] = useState<string[]>([]);

  // (Opcional) Som de sucesso ao ativar
  // const [playUnlock] = useSound("/sounds/unlock.mp3"); 

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Adiciona a tecla pressionada ao histórico
      const newInput = [...input, e.key];

      // Mantém o histórico apenas com o tamanho da sequência necessária
      if (newInput.length > konamiCode.length) {
        newInput.shift();
      }

      setInput(newInput);

      // Verifica se a sequência bate com o código Konami
      if (JSON.stringify(newInput) === JSON.stringify(konamiCode)) {
        activateHackerMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  const activateHackerMode = () => {
    setIsHackerMode((prev) => !prev);
    // playUnlock();

    // Toggle da classe global para ativar CSS específico
    document.body.classList.toggle("hacker-mode");

    if (!document.body.classList.contains("hacker-mode")) {
      alert("SYSTEM REBOOT: Normal Mode Restored");
    } else {
      alert("ACCESS GRANTED: God Mode Enabled");
    }
  };

  return isHackerMode;
};