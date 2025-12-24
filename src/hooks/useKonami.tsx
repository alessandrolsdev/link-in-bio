"use client";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export const useKonami = () => {
  const [isHackerMode, setIsHackerMode] = useState(false);
  const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  const [input, setInput] = useState<string[]>([]);
  
  // (Opcional) Som de sucesso ao ativar
  // const [playUnlock] = useSound("/sounds/unlock.mp3"); 

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Adiciona a tecla pressionada ao array
      const newInput = [...input, e.key];
      
      // Mantém o array do tamanho do código
      if (newInput.length > konamiCode.length) {
        newInput.shift();
      }
      
      setInput(newInput);

      // Checa se bateu com a sequência
      if (JSON.stringify(newInput) === JSON.stringify(konamiCode)) {
        activateHackerMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  const activateHackerMode = () => {
    setIsHackerMode((prev) => !prev);
    // playUnlock(); // Toca o som se tiver
    
    // Injeta a classe no body
    document.body.classList.toggle("hacker-mode");
    
    if (!document.body.classList.contains("hacker-mode")) {
        alert("SYSTEM REBOOT: Normal Mode Restored");
    } else {
        alert("ACCESS GRANTED: God Mode Enabled");
    }
  };

  return isHackerMode;
};