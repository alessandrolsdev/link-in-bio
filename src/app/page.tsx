import { CyberCard } from "@/components/CyberCard";
import { TechStack } from "@/components/TechStack"; 
import { SocialLinks } from "@/components/SocialLinks"; 
import { GithubWidget } from "@/components/GithubWidget"; // <--- Importe o Widget
import { getGithubProfile } from "@/lib/github"; // <--- Importe a função de dados
import Image from "next/image";
import { Briefcase, Rocket, Code2 } from "lucide-react"; 
import { SpotifyWidget } from "@/components/SpotifyWidget";

// Note o "async" aqui! Isso transforma em Server Component Assíncrono
export default async function Home() {
  
  // Buscando os dados ANTES de renderizar o HTML
  const githubProfile = await getGithubProfile();

  return (
    <main className="flex min-h-screen flex-col items-center py-16 px-4 max-w-md mx-auto">
      
      {/* --- SEU HEADER DE PERFIL (MANTÉM IGUAL) --- */}
      <div className="relative w-32 h-32 mb-6 group cursor-pointer">
        {/* ... código da foto ... */}
        <div className="absolute inset-0 rounded-full border-2 border-neon blur-[10px] opacity-50 group-hover:opacity-100 transition duration-500" />
        <div className="bg-zinc-800 w-full h-full rounded-full overflow-hidden border-2 border-neon/80 flex items-center justify-center relative z-10">
            <Image src="/eu.jpeg" alt="Alessandro" fill className="object-cover" priority />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2 text-center tracking-tight">Alessandro Lima</h1>
      <p className="text-zinc-400 font-mono text-sm mb-6 text-center bg-zinc-900/50 px-3 py-1 rounded border border-zinc-800">
        &lt;FullStack Engineer /&gt;
      </p>

      {/* --- STACK --- */}
      <TechStack />

      {/* --- GRID DE AÇÃO --- */}
      <div className="w-full space-y-3">
        
        {/* O NOVO WIDGET ENTRA AQUI NO TOPO PARA MOSTRAR PODER */}
        <GithubWidget profile={githubProfile} />
        <SpotifyWidget />
        <CyberCard 
          title="Portfólio & Projetos" 
          subtitle="Meus Cases Reais" 
          icon={<Briefcase size={22} />} 
          href="https://seusite.com"
        />
        
        <CyberCard 
          title="Orçar Landing Page" 
          subtitle="Alta Conversão" 
          icon={<Rocket size={22} />} 
          href="https://wa.me/..."
        />

        <CyberCard 
          title="Meu Setup & Configs" 
          subtitle="VSCode, Terminal, Etc" 
          icon={<Code2 size={22} />}  
          href="#"
        />
      </div>

      <SocialLinks />

      <footer className="mt-12 text-zinc-800 text-[10px] font-mono uppercase tracking-widest">
        Designed by Alessandrolsdev • 2025
      </footer>
    </main>
  );
}