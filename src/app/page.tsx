import { GlitchImage } from "@/components/GlitchImage"; // A Foto Cyberpunk
import HyperText from "@/components/HyperText"; // O Texto Matrix
import { TechStack } from "@/components/TechStack";
import { SocialLinks } from "@/components/SocialLinks";
import { GithubWidget } from "@/components/GithubWidget";
import { SpotifyWidget } from "@/components/SpotifyWidget";
import { HoloCard } from "@/components/HoloCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { BinaryClock } from "@/components/BinaryClock"; // O Relógio Geek
import { getGithubProfile } from "@/lib/github";
import { Briefcase, Rocket, Code2 } from "lucide-react";
import { YoutubeWidget } from "@/components/YoutubeWidget";
import { DiscordStatus } from "@/components/DiscordStatus";
import { WakaTimeWidget } from "@/components/WakaTimeWidget";
import { GeminiTerminal } from "@/components/GeminiTerminal";
export default async function Home() {
  // Busca os dados do GitHub no servidor (Server Component)
  const githubProfile = await getGithubProfile();

  return (
    <main className="relative flex min-h-screen flex-col items-center py-16 px-4 max-w-md mx-auto z-10 selection:bg-neon selection:text-black">

      {/* 1. Header com Efeito Glitch e Texto Matrix */}
      <AnimatedSection delay={0}>
        <GlitchImage />
        <div className="flex justify-center -mt-4 mb-6">
          <DiscordStatus />
        </div>
        <HyperText text="Alessandro Lima" />

        <p className="text-zinc-400 font-mono text-sm mb-6 text-center bg-zinc-900/50 px-3 py-1 rounded border border-zinc-800 w-fit mx-auto mt-2">
          &lt;FullStack Engineer /&gt;
        </p>
      </AnimatedSection>

      {/* 2. Stack Tecnológica */}
      <AnimatedSection delay={0.2}>
        <TechStack />
      </AnimatedSection>

      <div className="w-full space-y-3">
        {/* 3. Widgets de Dados em Tempo Real */}
        <AnimatedSection delay={0.3}>
          <GithubWidget profile={githubProfile} />
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <SpotifyWidget />
        </AnimatedSection>

        {/* YOUTUBE (Video/Learning) */}
        <AnimatedSection delay={0.5}>
          <YoutubeWidget />
        </AnimatedSection>
        {/* WAKATIME (Coding Stats) - NOVO! */}
        <AnimatedSection delay={0.6}>
          <WakaTimeWidget />
        </AnimatedSection>
        {/* GEMINI (Chat AI) - NOVO! */}
        <AnimatedSection delay={0.7}>
          <GeminiTerminal />
        </AnimatedSection>

        {/* 4. Links Holográficos com Física 3D */}
        {/* Note que o 'index' aumenta para criar o efeito cascata */}
        <HoloCard
          index={5}
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
          href="https://wa.me/seu-numero"
        />

        <HoloCard
          index={7}
          title="Meu Setup & Configs"
          subtitle="VSCode, Terminal, Etc"
          icon={<Code2 size={20} />}
          href="#"
        />
      </div>

      {/* 5. Rodapé com Magnetismo e Relógio Binário */}
      <AnimatedSection delay={0.8}>
        <SocialLinks />

        <footer className="mt-12 flex flex-col items-center gap-4 text-zinc-800 text-[10px] font-mono uppercase tracking-widest text-center">
          {/* O Relógio Binário que só dev entende */}
          <BinaryClock />

          <span className="hover:text-neon transition-colors cursor-default">
            Designed by Alessandro • 2025
          </span>
        </footer>
      </AnimatedSection>

    </main>
  );
}