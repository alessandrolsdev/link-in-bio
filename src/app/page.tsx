import Image from "next/image";
import Link from "next/link";
import { Youtube, Activity } from "lucide-react";

// --- COMPONENTES VISUAIS ---
import { TechStack } from "@/components/TechStack";
import { SpotifyWidget } from "@/components/SpotifyWidget"; 
import { BinaryClock } from "@/components/BinaryClock";
import { GithubLog } from "@/components/GithubLog";
import { DevMood } from "@/components/DevMood"; 
import { ActionButtons } from "@/components/ActionButtons";
import { ConsoleTerminal } from "@/components/ConsoleTerminal"; // Terminal Quake (Opcional, se quiser manter)

// --- WIDGETS PARA OS SLOTS ---
import { NexusControlPanel } from "@/components/NexusControlPanel";
import { GithubWidget } from "@/components/GithubWidget"; 
import { DiscordStatus } from "@/components/DiscordStatus"; 

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-200 selection:bg-purple-500/30 relative overflow-x-hidden pb-24">
      
      {/* --- HUD FIXO (APENAS DESKTOP) --- */}
      {/* Estes continuam ocultos no mobile para não poluir a tela */}
      <div className="fixed top-6 left-6 z-40 hidden xl:flex flex-col gap-4 w-80">
         <DevMood />
         <div className="bg-black/80 p-3 rounded-xl border border-zinc-800/50 backdrop-blur-md">
            <GithubLog />
         </div>
      </div>

      <div className="fixed top-6 right-6 z-40 hidden lg:block opacity-90 hover:opacity-100 transition-opacity">
         <BinaryClock />
         <div className="font-mono text-[10px] text-green-500 text-right mt-1 tracking-widest uppercase opacity-70">
            System_Time
         </div>
      </div>

      <div className="fixed bottom-6 left-6 z-40 hidden lg:block w-72">
         <SpotifyWidget />
      </div>
      
      <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
         <Link 
            href="https://youtube.com/playlist?list=PLcR6p6Bc6b2j1iNtPLXp-Ja9CkgUWkXOg" 
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


      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="max-w-4xl mx-auto px-6 pt-20 md:pt-24 relative z-10">
        
        {/* HEADER (AVATAR & NOME) */}
        <section className="text-center mb-6">
           <div className="inline-block relative">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-zinc-800 border-2 border-purple-500/50 mx-auto overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.4)] relative group cursor-pointer hover:scale-105 transition-transform">
                 <Image 
                   src="https://github.com/alessandrolsdev.png" 
                   alt="Avatar" 
                   width={112} 
                   height={112} 
                   className="object-cover"
                   priority 
                 />
              </div>
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
           </div>

           <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
             ALESSANDRO <span className="text-purple-500">LIMA</span>
           </h1>
           <p className="mt-2 text-zinc-400 font-mono text-xs md:text-sm mb-4">
             FullStack Engineer • Nexus Eleva Co-Founder
           </p>

           <div className="w-full max-w-md mx-auto mb-8">
              <ActionButtons />
           </div>
        </section>


        {/* NEXUS CONTROL PANEL */}
        <section className="mb-4">
           <NexusControlPanel 
              githubSlot={<GithubWidget />} 
              discordSlot={
                <div className="h-full flex flex-col gap-4">
                  <DiscordStatus />
                  <div className="flex-1 p-4 bg-zinc-900/40 border border-yellow-500/20 rounded-xl hover:border-yellow-500/50 transition-colors flex flex-col justify-center">
                     <div className="flex items-center gap-2 mb-2 text-yellow-500 text-xs font-mono font-bold uppercase">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
                        Current_Focus
                     </div>
                     <p className="text-sm text-zinc-300">
                        Otimizando algoritmos de <strong>OCR</strong> para a <strong>Nexus Eleva</strong>.
                     </p>
                  </div>
                </div>
              }
           />
        </section>


        {/* TECH STACKS */}
        <section className="mb-12">
           <TechStack />
        </section>


        {/* --- MOBILE DASHBOARD (EXCLUSIVO PARA CELULAR) --- */}
        {/* Esta seção só aparece em telas menores que LG (lg:hidden) */}
        <section className="lg:hidden mb-12 border-t border-zinc-900 pt-8">
            <div className="flex items-center gap-2 mb-6 justify-center text-zinc-500 text-xs font-mono tracking-widest uppercase">
                <Activity size={14} />
                <span>System_Modules // Mobile_View</span>
            </div>

            <div className="grid grid-cols-1 gap-6">
                
                {/* 1. Status & Logs */}
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <DevMood />
                    </div>
                    <div className="bg-black/40 border border-zinc-800 rounded-xl p-4 overflow-hidden">
                        <div className="text-[10px] text-zinc-600 font-mono mb-2">LATEST_ACTIVITY_LOG</div>
                        <GithubLog />
                    </div>
                </div>

                {/* 2. Spotify Widget */}
                <div className="bg-black/40 border border-zinc-800 rounded-xl p-2 flex justify-center">
                    <SpotifyWidget />
                </div>

                {/* 3. Utilities Row (Clock & Link) */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Clock (Scaled down to fit) */}
                    <div className="bg-black/40 border border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center overflow-hidden">
                         <div className="scale-[0.65] origin-center">
                             <BinaryClock />
                         </div>
                         <div className="mt-1 text-[9px] text-green-500 font-mono">SYS_TIME</div>
                    </div>

                    {/* Focus Mode Link */}
                    <Link 
                        href="https://youtube.com/playlist?list=SUA_PLAYLIST" 
                        target="_blank"
                        className="bg-black/40 border border-red-900/30 rounded-xl p-4 flex flex-col items-center justify-center text-red-500 hover:bg-red-900/10 transition-colors"
                    >
                        <Youtube size={24} className="mb-2" />
                        <span className="text-xs font-bold">FOCUS MODE</span>
                        <span className="text-[9px] opacity-60 font-mono">SOUNDTRACK</span>
                    </Link>
                </div>

            </div>
        </section>


        {/* FOOTER */}
        <footer className="text-center text-zinc-600 text-[10px] font-mono py-4 border-t border-zinc-900/50">
           <p>SYSTEM_ID: NEXUS_V3.1 // READY</p>
        </footer>

      </div>
        
      {/* Terminal Quake Style (Se você manteve) */}
      <ConsoleTerminal />

    </main>
  );
}