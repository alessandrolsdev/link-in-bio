import Image from "next/image";
import Link from "next/link";
import { Youtube } from "lucide-react";

// --- COMPONENTES VISUAIS ---
import { TechStack } from "@/components/TechStack";
import { SpotifyWidget } from "@/components/SpotifyWidget";
import { BinaryClock } from "@/components/BinaryClock";
import { GithubLog } from "@/components/GithubLog";
import { DevMood } from "@/components/DevMood";
import { ActionButtons } from "@/components/ActionButtons";

// --- WIDGETS PARA OS SLOTS ---
import { NexusControlPanel } from "@/components/NexusControlPanel";
import { GithubWidget } from "@/components/GithubWidget";
import { DiscordStatus } from "@/components/DiscordStatus";
import { ConsoleTerminal } from "@/components/ConsoleTerminal";

export default function Home() {
   return (
      <main className="min-h-screen bg-black text-zinc-200 selection:bg-purple-500/30 relative overflow-x-hidden pb-20"> {/* Reduzi pb-32 para pb-20 */}

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


         {/* --- CONTEÚDO PRINCIPAL --- */}
         {/* Reduzi pt-36 para pt-28. Em telas menores, pode ir para pt-24 se precisar */}
         <div className="max-w-4xl mx-auto px-6 pt-20 md:pt-24 relative z-10">

            {/* HEADER COMPACTO */}
            <section className="text-center mb-6">
               <div className="inline-block relative">
                  {/* Reduzi levemente o avatar para w-20/h-20 mobile */}
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-zinc-800 border-2 border-purple-500/50 mx-auto overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.4)] relative group cursor-pointer hover:scale-105 transition-transform">
                     <Image
                        src="https://github.com/alessandrolsdev.png"
                        alt="Avatar Alessandro Lima"
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
               <p className="mt-2 text-zinc-400 font-mono text-xs md:text-sm mb-4"> {/* Reduzi mb-8 para mb-4 */}
                  FullStack Engineer • Nexus Eleva Co-Founder
               </p>

               {/* BOTÕES COMPACTOS */}
               <div className="w-full max-w-md mx-auto mb-8"> {/* Reduzi mb-12 para mb-8 */}
                  <ActionButtons />
               </div>
            </section>


            {/* BARRA DE CONTROLE (NEXUS CORE) */}
            <section className="mb-4"> {/* Reduzi mb-6 para mb-4 */}
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


            {/* BARRA DE STACKS */}
            <section className="mb-12"> {/* Reduzi mb-24 para mb-12 */}
               <TechStack />
            </section>


            {/* FOOTER */}
            <footer className="text-center text-zinc-600 text-[10px] font-mono py-4 border-t border-zinc-900/50">
               <p>SYSTEM_ID: NEXUS_V3.1 // READY</p>
            </footer>

         </div>
         <ConsoleTerminal />
      </main>
   );
}