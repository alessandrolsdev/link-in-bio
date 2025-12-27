"use client";
import { useEffect, useState } from "react";

export const BinaryClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Converte número para array de bits (ex: 5 -> [1, 0, 1])
  const getBits = (num: number) => {
    return num.toString(2).padStart(4, "0").split("").map(Number);
  };

  const hours = getBits(time.getHours());
  const minutes = getBits(time.getMinutes());
  const seconds = getBits(time.getSeconds());

  return (
    <div className="flex gap-2 p-2 bg-black/50 border border-zinc-800 rounded backdrop-blur-sm">
      {/* Colunas de Bits */}
      <div className="flex flex-col gap-1">
        {hours.map((bit, i) => (
           <div key={i} className={`w-1.5 h-1.5 rounded-full ${bit ? "bg-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.8)]" : "bg-zinc-800"}`} />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {minutes.map((bit, i) => (
           <div key={i} className={`w-1.5 h-1.5 rounded-full ${bit ? "bg-green-500 shadow-[0_0_5px_rgba(74,222,128,0.8)]" : "bg-zinc-800"}`} />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {seconds.map((bit, i) => (
           <div key={i} className={`w-1.5 h-1.5 rounded-full ${bit ? "bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]" : "bg-zinc-800"}`} />
        ))}
      </div>
      
      {/* Texto legível embaixo (Opcional) */}
      <div className="hidden">
         {time.toLocaleTimeString()}
      </div>
    </div>
  );
};