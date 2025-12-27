import { MatrixRain } from "@/components/MatrixRain";
import { CommandMenu } from "@/components/CommandMenu";
import { GeminiTerminal } from "@/components/GeminiTerminal";
import { GithubWidget } from "@/components/GithubWidget";
import { TechStack } from "@/components/TechStack";
import { DiscordStatus } from "@/components/DiscordStatus"; 
import { SpotifyWidget } from "@/components/SpotifyWidget"; 
import { BinaryClock } from "@/components/BinaryClock";
import { GithubLog } from "@/components/GithubLog";
import { DevMood } from "@/components/DevMood"; // Importante
import { Youtube, Linkedin, Mail, FileText } from "lucide-react";
import Link from "next/link";

// Botões de Ação (Links Sociais)
const ActionButtons = () => (
  <div className="flex flex-wrap gap-3 justify-center mt-6 mb-8">
    <Link 
      href="https://linkedin.com/in/seu-linkedin" 
      target="_blank"
      className="flex items-center gap-2 px-5 py-2.5 bg-blue-600/10 border border-blue-500/50 rounded hover:bg-blue-600 hover:text-white text-blue-400 transition-all text-sm font-mono font-bold"
    >
      <Linkedin size={16} />
      <span>LINKEDIN</span>
    </Link>

    <Link 
      href="/curriculo.pdf" 
      target="_blank"
      className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 border border-zinc-700 rounded hover:bg-zinc-700 text-zinc-300 transition-all text-sm font-mono"
    >
      <FileText size={16} />
      <span>CV / RESUME</span>
    </Link>

    <Link 
      href="mailto:seuemail@gmail.com"
      className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 border border-zinc-700 rounded hover:bg-zinc-700 text-zinc-300 transition-all text-sm font-mono"
    >
      <Mail size={16} />
      <span>CONTATO</span>
    </Link>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-200 selection:bg-purple-500/30 relative overflow-x-hidden pb-32">
      
      {/* 1. LAYER DE FUNDO */}
      <MatrixRain />
      <CommandMenu />
      <GeminiTerminal />
      {/* --- HUD: ELEMENTOS FIXOS NOS 4 CANTOS --- */}
      
      {/* ↖ CANTO SUPERIOR ESQUERDO: Status & Logs */}
      <div className="fixed top-6 left-6 z-50 hidden xl:flex flex-col gap-4 w-80">
         {/* O Widget de Humor/Monster */}
         <DevMood />
         
         {/* Os Logs de Commit rolando embaixo */}
         <div className="bg-black/80 p-3 rounded-xl border border-zinc-800/50 backdrop-blur-md">
            <GithubLog />
         </div>
      </div>

      {/* ↗ CANTO SUPERIOR DIREITO: Relógio */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block opacity-90 hover:opacity-100 transition-opacity">
         <BinaryClock />
         <div className="font-mono text-[10px] text-green-500 text-right mt-1 tracking-widest uppercase opacity-70">
            System_Time
         </div>
      </div>

      {/* ↙ CANTO INFERIOR ESQUERDO: Spotify */}
      <div className="fixed bottom-6 left-6 z-50 hidden lg:block w-72">
         <SpotifyWidget />
      </div>

      {/* ↘ CANTO INFERIOR DIREITO: YouTube */}
      <div className="fixed bottom-6 right-6 z-50 hidden lg:block">
         <Link 
            href="https://youtube.com/playlist?list=PL_SUA_PLAYLIST_AQUI" 
            target="_blank"
            className="flex items-center gap-3 p-3 bg-black/80 border border-red-900/50 rounded-lg text-red-500 hover:bg-red-900/20 hover:border-red-500 transition-all group backdrop-blur-md"
         >
            <div className="text-right">
                <div className="text-[10px] font-mono opacity-60">SOUNDTRACK</div>
                <div className="text-xs font-bold">FOCUS_MODE</div>
            </div>
            <Youtube size={24} className="group-hover:scale-110 transition-transform" />
         </Link>
      </div>


      {/* 3. CONTEÚDO PRINCIPAL (Scrollável no Centro) */}
      <div className="max-w-4xl mx-auto px-6 pt-20 relative z-10">
        
        {/* HEADER: Perfil */}
        <section className="text-center mb-12">
           <div className="inline-block relative">
              <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-purple-500/50 mx-auto overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                 <img src="https://github.com/alessandrolsdev.png" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" title="Online via Neural Link" />
           </div>

           <h1 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight text-white">
             ALESSANDRO <span className="text-purple-500">LIMA</span>
           </h1>
           <p className="mt-3 text-zinc-400 font-mono text-sm md:text-base">
             FullStack Engineer • Nexus Eleva Co-Founder • Python & React Expert
           </p>

           <ActionButtons />
        </section>

        
        
        {/* GRID PRINCIPAL (Agora mais limpo sem os logs) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 items-start">
           
           {/* Coluna 1: GitHub Card */}
           <div className="flex flex-col gap-4">
              <GithubWidget />
           </div>

           {/* Coluna 2: Discord & Foco Atual */}
           <div className="flex flex-col gap-4">
              <DiscordStatus />
              
              {/* Current Focus (Manual/Estático) */}
              <div className="p-4 bg-zinc-900/40 border border-yellow-500/20 rounded-xl hover:border-yellow-500/50 transition-colors">
                 <div className="flex items-center gap-2 mb-2 text-yellow-500 text-xs font-mono font-bold uppercase">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
                    Current_Focus
                 </div>
                 <p className="text-sm text-zinc-300">
                    Otimizando algoritmos de <strong>OCR (Tesseract)</strong> e desenvolvendo nova arquitetura escalável para a <strong>Nexus Eleva</strong>.
                 </p>
              </div>
           </div>

        </section>

        {/* TECH STACK */}
        <section className="mb-20">
           <TechStack />
        </section>

        {/* FOOTER */}
        <footer className="text-center text-zinc-600 text-xs font-mono py-10 border-t border-zinc-900">
           <p>SYSTEM_ID: NEXUS_V2.5 // ALL SYSTEMS OPERATIONAL</p>
           <p className="mt-2">© 2025 Alessandro Lima. Built with Next.js & Gemini AI.</p>
        </footer>

      </div>
    </main>
  );
}