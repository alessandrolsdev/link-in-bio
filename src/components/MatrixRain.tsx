"use client";
import { useEffect, useRef } from "react";

/**
 * Efeito Visual "Chuva Matrix".
 * Versão otimizada com requestAnimationFrame e controle de FPS (throttling).
 */
export const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajusta o canvas para tela cheia
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Caracteres do efeito
    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポvu0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letters = katakana.split("");

    const fontSize = 14;
    // Recalcula colunas baseado na largura atual
    let columns = Math.ceil(canvas.width / fontSize);

    // Estado das gotas (posição Y)
    let drops: number[] = [];
    const initDrops = () => {
      columns = Math.ceil(canvas.width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -(canvas.height / fontSize); // Inicia fora da tela para cair natural
      }
    };
    initDrops();

    // Controle de FPS
    let lastTime = 0;
    const fps = 30; // Limite de 30 FPS para efeito retrô e economia de bateria
    const interval = 1000 / fps;
    let animationFrameId: number;

    const draw = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;

      if (deltaTime >= interval) {
        lastTime = timestamp - (deltaTime % interval);

        // Cria o rastro translúcido (fade effect)
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0"; // Cor do texto (Matrix Green)
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.fillText(text, x, y);

          // Reseta a gota aleatoriamente
          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Inicia o loop
    animationFrameId = requestAnimationFrame(draw);

    const handleResize = () => {
      setCanvasSize();
      initDrops();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas fixed inset-0 pointer-events-none z-[1]"
      style={{ display: "none" }} // Controlado por CSS global (.hacker-mode)
    />
  );
};