"use client";
import { useState, useEffect } from "react";

/**
 * Componente Relógio Binário.
 * Exibe a hora atual (Horas, Minutos, Segundos) em formato binário.
 * Cada coluna representa um dígito e cada ponto representa um bit.
 *
 * Implementa lógica de hidratação (client-side only) para evitar incompatibilidade
 * entre servidor e cliente (hydration mismatch) ao lidar com datas.
 *
 * @returns {JSX.Element | null} O relógio binário ou null se não estiver montado.
 */
export const BinaryClock = () => {
  // 1. Inicia como mounted = false para indicar que estamos no servidor ou renderização inicial
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 2. Assim que carregar no navegador, marca como montado e inicia o timer
    setMounted(true);
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. SE NÃO ESTIVER MONTADO (SERVER-SIDE), NÃO RENDERIZA NADA (ou renderiza um esqueleto fixo)
  // Isso previne erros de hidratação pois o servidor e o cliente teriam horários diferentes.
  if (!mounted) return null; 

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  /**
   * Converte um número para uma string binária de 6 dígitos.
   * @param {number} num - O número a ser convertido.
   * @returns {string[]} Array de caracteres '0' ou '1'.
   */
  const toBinary = (num: number) => num.toString(2).padStart(6, "0").split("");

  const timeMap = [
    { value: hours, binary: toBinary(hours) },
    { value: minutes, binary: toBinary(minutes) },
    { value: seconds, binary: toBinary(seconds) },
  ];

  return (
    <div className="flex gap-4 p-4 bg-black/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg shadow-xl hover:border-green-500/30 transition-colors group">
      {timeMap.map((unit, i) => (
        <div key={i} className="flex flex-col gap-1 items-center">
          <div className="flex flex-col-reverse gap-1.5">
            {unit.binary.map((bit, idx) => (
              <div
                key={idx}
                // Renderiza o bit visualmente. Se for "1", acende em verde neon.
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  bit === "1"
                    ? "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)] scale-110"
                    : "bg-zinc-800 opacity-20"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-zinc-600 mt-1">{unit.value.toString().padStart(2, '0')}</span>
        </div>
      ))}
    </div>
  );
};