"use client";
import { useRef, useState } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*!";

interface HyperTextProps {
  text: string;
  className?: string; // Adicionado para permitir estilização externa
}

/**
 * Componente de Texto Hiperativo (Matrix Effect).
 * Ao passar o mouse, o texto embaralha aleatoriamente.
 */
export default function HyperText({ text, className = "" }: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span
      onMouseEnter={scramble}
      className={`cursor-default inline-block ${className}`} // inline-block permite animação correta
    >
      {displayText}
    </span>
  );
}