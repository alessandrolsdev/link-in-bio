import Image from "next/image";
import Link from "next/link";
import { Youtube } from "lucide-react";

// --- COMPONENTES VISUAIS ---
import { MatrixRain } from "@/components/MatrixRain";
import { CommandMenu } from "@/components/CommandMenu";
import { GeminiTerminal } from "@/components/GeminiTerminal";
import { TechStack } from "@/components/TechStack";
import { SpotifyWidget } from "@/components/SpotifyWidget";
import { BinaryClock } from "@/components/BinaryClock";
import { GithubLog } from "@/components/GithubLog";
import { DevMood } from "@/components/DevMood";
import { ActionButtons } from "@/components/ActionButtons";

// --- NOVOS IMPORTS (QUE ESTAVAM FALTANDO) ---
import { NexusControlPanel } from "@/components/NexusControlPanel";
import { GithubWidget } from "@/components/GithubWidget";   // <--- Faltava este
import { DiscordStatus } from "@/components/DiscordStatus"; // <--- E este

export default function Home() {
   return (
      <main className="min-h-screen bg-black text-zinc-200 selection:bg-purple-500/30 relative overflow-x-hidden pb-32">

         {/* LAYER DE FUNDO */}
         <MatrixRain />
         <CommandMenu />

         {/* --- HUD FIXO --- */}
         {/* Top Left */}
         <div className="fixed top-6 left-6 z-40 hidden xl:flex flex-col gap-4 w-80">
            <DevMood />
            <div className="bg-black/80 p-3 rounded-xl border border-zinc-800/50 backdrop-blur-md">
               <GithubLog />
            </div>
         </div>

         {/* Top Right */}
         <div className="fixed top-6 right-6 z-40 hidden lg:block opacity-90 hover:opacity-100 transition-opacity">
            <BinaryClock />
            <div className="font-mono text-[10px] text-green-500 text-right mt-1 tracking-widest uppercase opacity-70">
               System_Time
            </div>
         </div>

         {/* Bottom Widgets */}
         <div className="fixed bottom-6 left-6 z-40 hidden lg:block w-72">
            <SpotifyWidget />
         </div>
         <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
            <Link
               href="https://youtube.com/playlist?list=SUA_PLAYLIST"
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


         {/* --- CONTEÚDO PRINCIPAL COMPACTO --- */}
         {/* Reduzi pt-20 para pt-10 para ganhar espaço */}
         <div className="max-w-4xl mx-auto px-6 pt-10 relative z-10">

            {/* HEADER: Mais compacto */}
            <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white">
               ALESSANDRO <span className="text-purple-500">LIMA</span>
            </h1>
            <p className="mt-2 text-zinc-400 font-mono text-xs md:text-sm mb-6"> {/* Adicionei mb-6 aqui para afastar dos botões */}
               FullStack Engineer • Nexus Eleva Co-Founder
            </p>

            {/* Botões Estilo Linktree */}
            <div className="mb-10 w-full px-4"> {/* Container para controlar a largura no mobile */}
               <ActionButtons />
            </div>


            {/* ÁREA DE CONTROLE (Passando os widgets como Props) */}
            <section className="mb-8">
               <NexusControlPanel
                  githubSlot={<GithubWidget />} // O Server Component passa o Widget pronto
                  discordSlot={
                     <>
                        <DiscordStatus />
                        {/* Focus Card também pode vir aqui ou ficar dentro do componente se for estático */}
                        <div className="p-4 bg-zinc-900/40 border border-yellow-500/20 rounded-xl hover:border-yellow-500/50 transition-colors mt-4">
                           <div className="flex items-center gap-2 mb-2 text-yellow-500 text-xs font-mono font-bold uppercase">
                              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
                              Current_Focus
                           </div>
                           <p className="text-sm text-zinc-300">
                              Otimizando algoritmos de <strong>OCR (Tesseract)</strong> e arquitetura escalável para a <strong>Nexus Eleva</strong>.
                           </p>
                        </div>
                     </>
                  }
               />
            </section>


            {/* TECH STACK */}
            <section className="mb-20">
               <TechStack />
            </section>


            {/* FOOTER */}
            <footer className="text-center text-zinc-600 text-[10px] font-mono py-6 border-t border-zinc-900">
               <p>SYSTEM_ID: NEXUS_V3.0 // OPERATIONAL</p>
            </footer>

         </div>

         {/* TERMINAL GLOBAL */}
         <GeminiTerminal />

      </main>
   );
}