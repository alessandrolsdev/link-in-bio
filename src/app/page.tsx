import { GlitchImage } from "@/components/GlitchImage";
import HyperText from "@/components/HyperText";
import { TechStack } from "@/components/TechStack";
import { SocialLinks } from "@/components/SocialLinks";
import { GithubWidget } from "@/components/GithubWidget";
import { SpotifyWidget } from "@/components/SpotifyWidget";
import { HoloCard } from "@/components/HoloCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { BinaryClock } from "@/components/BinaryClock";
import { getGithubProfile } from "@/lib/github";
import { Briefcase, Rocket, Code2 } from "lucide-react";
import { YoutubeWidget } from "@/components/YoutubeWidget";
import { DiscordStatus } from "@/components/DiscordStatus";
import { WakaTimeWidget } from "@/components/WakaTimeWidget";
import { GeminiTerminal } from "@/components/GeminiTerminal";

/**
 * Componente da página inicial (Home).
 * Renderiza a landing page principal com widgets interativos, apresentação e links.
 * 
 * É um Server Component assíncrono que realiza o fetch inicial de dados (GitHub).
 */
export default async function Home() {
  // Busca dos dados do perfil do GitHub (Server-side fetching)
  const githubProfile = await getGithubProfile();

  return (
    <main className="relative flex min-h-screen flex-col items-center py-16 px-4 max-w-md mx-auto z-10 selection:bg-neon selection:text-black">

      {/* Seção 1: Cabeçalho com Identidade Visual */}
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

      {/* Seção 2: Stack Tecnológica */}
      <AnimatedSection delay={0.2}>
        <TechStack />
      </AnimatedSection>

      <div className="w-full space-y-3">
        {/* Seção 3: Widgets de Integração (GitHub, Spotify, Youtube, WakaTime) */}
        <AnimatedSection delay={0.3}>
          <GithubWidget profile={githubProfile} />
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <SpotifyWidget />
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <YoutubeWidget />
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <WakaTimeWidget />
        </AnimatedSection>


        {/* Terminal AI Interativo */}
        <AnimatedSection delay={0.7}>
          <GeminiTerminal />
        </AnimatedSection>

        {/* Seção 4: Links Principais (Cards Holográficos) */}
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

      {/* Seção 5: Rodapé */}
      <AnimatedSection delay={0.8}>
        <SocialLinks />

        <footer className="mt-12 flex flex-col items-center gap-4 text-zinc-800 text-[10px] font-mono uppercase tracking-widest text-center">
          <BinaryClock />

          <span className="hover:text-neon transition-colors cursor-default">
            Designed by Alessandro • 2025
          </span>
        </footer>
      </AnimatedSection>

    </main>
  );
}