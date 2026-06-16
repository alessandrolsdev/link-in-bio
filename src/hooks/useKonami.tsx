"use client";
import { useEffect, useEffectEvent, useRef, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

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
  const inputRef = useRef<string[]>([]);

  const activateHackerMode = useEffectEvent(() => {
    setIsHackerMode((prev) => !prev);
    document.body.classList.toggle("hacker-mode");

    if (!document.body.classList.contains("hacker-mode")) {
      alert("SYSTEM REBOOT: Normal Mode Restored");
    } else {
      alert("ACCESS GRANTED: God Mode Enabled");
    }
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const nextInput = [...inputRef.current, e.key].slice(-KONAMI_CODE.length);
      inputRef.current = nextInput;

      if (
        nextInput.length === KONAMI_CODE.length &&
        nextInput.every((key, index) => key === KONAMI_CODE[index])
      ) {
        inputRef.current = [];
        activateHackerMode();
      }

    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return isHackerMode;
};
