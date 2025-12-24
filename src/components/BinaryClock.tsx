"use client";
import { useEffect, useState } from "react";

export const BinaryClock = () => {
  const [time, setTime] = useState(new Date());

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  // Componente interno para uma coluna de bits
  const BinaryColumn = ({ digit, label }: { digit: string, label: string }) => {
    const num = parseInt(digit);
    const binary = num.toString(2).padStart(4, '0'); // Ex: 5 vira "0101"

    return (
      <div className="flex flex-col items-center gap-2">
        {/* As 4 Bolinhas (8, 4, 2, 1) */}
        <div className="flex flex-col gap-1.5">
          {binary.split('').map((bit, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-black/20 ${
                bit === '1' 
                  ? 'bg-neon shadow-[0_0_10px_#10b981] scale-110' // Aceso
                  : 'bg-zinc-800/40 shadow-inner' // Apagado
              }`}
            />
          ))}
        </div>
        
        {/* O número decimal (aparece no Hover) */}
        <span className="text-[10px] font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity -mb-4">
          {digit}
        </span>
      </div>
    );
  };

  return (
    <div className="group flex flex-col items-center p-5 rounded-2xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm hover:border-neon/20 transition-all duration-500">
      
      {/* Título do Widget */}
      <div className="flex w-full justify-between items-center mb-3 px-1 border-b border-white/5 pb-2">
        <span className="text-[9px] font-mono text-zinc-500 tracking-widest">SYS_TIME</span>
        <span className="text-[9px] font-mono text-neon animate-pulse">● LIVE</span>
      </div>

      <div className="flex items-start gap-6">
        
        {/* Grupo de Horas */}
        <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
                <BinaryColumn digit={hours[0]} label="H1" />
                <BinaryColumn digit={hours[1]} label="H2" />
            </div>
            <span className="text-[9px] font-mono text-zinc-600 tracking-wider mt-1">HRS</span>
        </div>

        {/* Separador (: de pontos) */}
        <div className="flex flex-col gap-3 pt-4 opacity-20">
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
        </div>

        {/* Grupo de Minutos */}
        <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
                <BinaryColumn digit={minutes[0]} label="M1" />
                <BinaryColumn digit={minutes[1]} label="M2" />
            </div>
            <span className="text-[9px] font-mono text-zinc-600 tracking-wider mt-1">MIN</span>
        </div>

        {/* Separador (: de pontos) */}
        <div className="flex flex-col gap-3 pt-4 opacity-20">
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
        </div>

        {/* Grupo de Segundos */}
        <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
                <BinaryColumn digit={seconds[0]} label="S1" />
                <BinaryColumn digit={seconds[1]} label="S2" />
            </div>
            <span className="text-[9px] font-mono text-zinc-600 tracking-wider mt-1">SEC</span>
        </div>

      </div>
    </div>
  );
};