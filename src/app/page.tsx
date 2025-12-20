import { CyberCard } from "@/components/CyberCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-20 px-4 max-w-md mx-auto">
      
      {/* Avatar com Anel Neon */}
      <div className="relative w-32 h-32 mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-neon blur-[2px]" />
        {/* Substitua pelo seu caminho de imagem depois */}
        <div className="bg-zinc-800 w-full h-full rounded-full overflow-hidden border-2 border-neon/50 flex items-center justify-center">
            <span className="text-xs font-mono text-zinc-500">IMG</span>
        </div>
      </div>

      {/* Header Texto */}
      <h1 className="text-3xl font-bold mb-2 text-center">Alessandro Lima</h1>
      <p className="text-zinc-400 font-mono text-sm mb-10 text-center">
        &lt;FullStack Developer /&gt;
      </p>

      {/* Grid de Links */}
      <div className="w-full space-y-4">
        <CyberCard 
          title="Portfólio & Projetos" 
          subtitle="Meus Cases" 
          href="https://seusite.com"
        />
        
        <CyberCard 
          title="Orçar Landing Page" 
          subtitle="Alta Conversão" 
          href="https://wa.me/..."
        />

        <CyberCard 
          title="GitHub" 
          subtitle="@alessandrolsdev" 
          href="https://github.com/alessandrolsdev"
        />
      </div>

      {/* Footer "Hacker" */}
      <footer className="mt-12 text-zinc-700 text-xs font-mono">
        SYSTEM_STATUS: <span className="text-neon">ONLINE</span>
      </footer>
    </main>
  );
}