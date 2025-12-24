// src/app/page.tsx
import { TechStack } from "@/components/TechStack";
import { SocialLinks } from "@/components/SocialLinks";
import { GithubWidget } from "@/components/GithubWidget";
import { SpotifyWidget } from "@/components/SpotifyWidget";
import { getGithubProfile } from "@/lib/github";
import Image from "next/image";
import { Briefcase, Rocket, Code2 } from "lucide-react";
import { HoloCard } from "@/components/HoloCard";
import HyperText from "@/components/HyperText";

// Componente Wrapper para animação de entrada
import { AnimatedSection } from "@/components/AnimatedSection"; 

export default async function Home() {
  const githubProfile = await getGithubProfile();

  return (
    <main className="relative flex min-h-screen flex-col items-center py-16 px-4 max-w-md mx-auto z-10">
      
      {/* 1. Header com Animação Simples */}
      <AnimatedSection delay={0}>
        <div className="relative w-32 h-32 mb-6 group cursor-pointer mx-auto">
          <div className="absolute inset-0 rounded-full border-2 border-neon blur-[12px] opacity-40 group-hover:opacity-80 transition duration-500" />
          <div className="bg-zinc-800 w-full h-full rounded-full overflow-hidden border-2 border-neon/80 flex items-center justify-center relative z-10">
              <Image src="/eu.jpeg" alt="Alessandro" fill className="object-cover" priority />
          </div>
        </div>
        <HyperText text="Alessandro Lima" />
        <p className="text-zinc-400 font-mono text-sm mb-6 text-center bg-zinc-900/50 px-3 py-1 rounded border border-zinc-800 w-fit mx-auto">
          &lt;FullStack Engineer /&gt;
        </p>
        
      </AnimatedSection>

      {/* 2. Stack entra depois */}
      <AnimatedSection delay={0.2}>
        <TechStack />
      </AnimatedSection>

      <div className="w-full space-y-3">
        {/* 3. Widgets entram em cascata */}
        <AnimatedSection delay={0.3}>
          <GithubWidget profile={githubProfile} />
        </AnimatedSection>
        
        <AnimatedSection delay={0.4}>
          <SpotifyWidget />
        </AnimatedSection>

        {/* 4. Links Holográficos */}
        <HoloCard 
          index={5} // Controla o delay
          title="Portfólio & Projetos" 
          subtitle="Meus Cases Reais" 
          icon={<Briefcase size={20} />} 
          href="https://seusite.com"
        />
        
        <HoloCard 
          index={6}
          title="Orçar Landing Page" 
          subtitle="Alta Conversão" 
          icon={<Rocket size={20} />} 
          href="https://wa.me/..."
        />

        <HoloCard 
          index={7}
          title="Meu Setup & Configs" 
          subtitle="VSCode, Terminal, Etc" 
          icon={<Code2 size={20} />} 
          href="#"
        />
      </div>

      <AnimatedSection delay={0.8}>
        <SocialLinks />
      </AnimatedSection>

      <footer className="mt-12 text-zinc-800 text-[10px] font-mono uppercase tracking-widest text-center">
        Designed by Alessandro • 2025
      </footer>
    </main>
  );
}