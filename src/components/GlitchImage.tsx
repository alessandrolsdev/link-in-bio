import Image from "next/image";

/**
 * Componente de Imagem com Efeito Glitch.
 * Renderiza uma imagem principal e duas camadas sobrepostas (ciano e magenta) com mix-blend-mode.
 * O efeito de glitch (tremor/distorção) é ativado via CSS no hover do container pai.
 *
 * Estrutura:
 * 1. Camada Base: Imagem original visível.
 * 2. Camada Ciano: Cópia da imagem com filtro de cor, deslocada ligeiramente na animação.
 * 3. Camada Magenta: Cópia da imagem com filtro de cor oposto, deslocada inversamente.
 *
 * @returns {JSX.Element} O componente de imagem estilizado.
 */
export const GlitchImage = () => {
  return (
    // 'glitch-container' é a classe gatilho para a animação
    <div className="relative w-32 h-32 mb-6 cursor-pointer glitch-container mx-auto group">

      {/* Camada 1: Imagem Base (Original) */}
      <div className="relative z-10 bg-zinc-800 w-full h-full rounded-full overflow-hidden border-2 border-neon/80">
        <Image src="/eu.jpeg" alt="Alessandro" fill className="object-cover" priority />
      </div>

      {/* Camada 2: Canal Ciano (Shift Glitch) */}
      <div className="glitch-img absolute inset-0 z-20 rounded-full overflow-hidden opacity-0 mix-blend-hard-light pointer-events-none transition-opacity duration-100">
        <Image src="/eu.jpeg" alt="" fill className="object-cover filter hue-rotate-90" />
      </div>

      {/* Camada 3: Canal Magenta (Shift Glitch Inverso) */}
      <div className="glitch-img absolute inset-0 z-20 rounded-full overflow-hidden opacity-0 mix-blend-hard-light pointer-events-none transition-opacity duration-100">
        <Image src="/eu.jpeg" alt="" fill className="object-cover filter -hue-rotate-90" />
      </div>

      {/* Halo Neon (Brilho Externo) */}
      <div className="absolute inset-0 rounded-full border-2 border-neon blur-[12px] opacity-40 group-hover:opacity-80 transition duration-500 z-0" />
    </div>
  );
};