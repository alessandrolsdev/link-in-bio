import Image from "next/image";

export const GlitchImage = () => {
  return (
    // A classe 'glitch-container' aqui é essencial!
    <div className="relative w-32 h-32 mb-6 cursor-pointer glitch-container mx-auto group">
      
      {/* CAMADA 1: Imagem Base (Normal) */}
      <div className="relative z-10 bg-zinc-800 w-full h-full rounded-full overflow-hidden border-2 border-neon/80">
        <Image src="/eu.jpeg" alt="Alessandro" fill className="object-cover" priority />
      </div>

      {/* CAMADA 2: Glitch Ciano (Classe 'glitch-img' essencial!) */}
      <div className="glitch-img absolute inset-0 z-20 rounded-full overflow-hidden opacity-0 mix-blend-hard-light pointer-events-none transition-opacity duration-100">
         {/* O 'hue-rotate-90' muda a cor para ciano/verde */}
         <Image src="/eu.jpeg" alt="" fill className="object-cover filter hue-rotate-90" />
      </div>

      {/* CAMADA 3: Glitch Magenta (Classe 'glitch-img' essencial!) */}
      <div className="glitch-img absolute inset-0 z-20 rounded-full overflow-hidden opacity-0 mix-blend-hard-light pointer-events-none transition-opacity duration-100">
         {/* O '-hue-rotate-90' muda a cor para magenta/roxo */}
         <Image src="/eu.jpeg" alt="" fill className="object-cover filter -hue-rotate-90" />
      </div>

      {/* Anel Neon de fundo (Blur) */}
      <div className="absolute inset-0 rounded-full border-2 border-neon blur-[12px] opacity-40 group-hover:opacity-80 transition duration-500 z-0" />
    </div>
  );
};