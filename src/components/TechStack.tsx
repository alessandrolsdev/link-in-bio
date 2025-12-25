import React from "react";

const techs = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "PostgreSQL"
];

/**
 * Lista de Tecnologias (Tech Stack).
 * Exibe pílulas com as principais tecnologias usadas, com efeitos de hover em neon.
 */
export const TechStack = () => {
  return (
    <div className="w-full mb-8">
      <p className="text-zinc-500 text-xs font-mono mb-3 uppercase tracking-widest text-center">
        Stack Principal
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {techs.map((tech) => (
          <div
            key={tech}
            className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono transition-all hover:border-neon/50 hover:text-neon hover:shadow-[0_0_10px_rgba(16,185,129,0.2)] cursor-default"
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
};