"use client";
import { useEffect, useRef, useState } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*!";

/**
 * Propriedades do componente HyperText.
 */
interface HyperTextProps {
    /** O texto a ser exibido e animado. */
    text: string;
}

/**
 * Componente de Texto Hiperativo (Matrix Effect).
 * Ao passar o mouse, o texto embaralha aleatoriamente antes de estabilizar na palavra original.
 * 
 * @param {HyperTextProps} props - Propriedades do componente.
 */
export default function HyperText({ text }: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return LETTERS[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <h1
      onMouseEnter={scramble}
      className="text-3xl font-bold mb-2 text-center tracking-tight cursor-default"
    >
      {displayText}
    </h1>
  );
}