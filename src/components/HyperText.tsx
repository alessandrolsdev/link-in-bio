"use client";
import { useEffect, useRef, useState } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*!";

export default function HyperText({ text }: { text: string }) {
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
      onMouseEnter={scramble} // Dispara quando passa o mouse
      className="text-3xl font-bold mb-2 text-center tracking-tight cursor-default"
    >
      {displayText}
    </h1>
  );
}