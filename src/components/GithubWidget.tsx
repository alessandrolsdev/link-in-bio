import React from "react";
import { GithubProfile } from "@/lib/github";
import { GitBranch, Users, Star } from "lucide-react";

export const GithubWidget = ({ profile }: { profile: GithubProfile }) => {
  return (
    <a 
      href={profile.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full group relative block bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 overflow-hidden hover:border-neon/50 transition-colors"
    >
      {/* Background Matrix/Grid sutil */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
      
      <div className="relative z-10 flex flex-col gap-4">
        
        {/* Cabeçalho do Card */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
             <span className="text-xs font-mono text-neon tracking-widest uppercase">
               GH_NET_LINK
             </span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">
            v4.0.0
          </span>
        </div>

        {/* Grid de Stats */}
        <div className="grid grid-cols-3 gap-2">
            
            {/* Stat 1: Repos */}
            <div className="flex flex-col items-center p-2 bg-black/20 rounded-lg border border-white/5">
                <GitBranch size={16} className="text-zinc-400 mb-1" />
                <span className="text-lg font-bold text-white">{profile.public_repos}</span>
                <span className="text-[9px] text-zinc-500 uppercase">Repos</span>
            </div>

            {/* Stat 2: Seguidores */}
            <div className="flex flex-col items-center p-2 bg-black/20 rounded-lg border border-white/5">
                <Users size={16} className="text-zinc-400 mb-1" />
                <span className="text-lg font-bold text-white">{profile.followers}</span>
                <span className="text-[9px] text-zinc-500 uppercase">Seguidores</span>
            </div>

             {/* Stat 3: Bio */}
             <div className="flex flex-col items-center p-2 bg-black/20 rounded-lg border border-white/5 group-hover:bg-neon/10 transition-colors">
                <Star size={16} className="text-zinc-400 group-hover:text-neon mb-1" />
                <span className="text-[9px] text-center text-zinc-400 leading-tight mt-1">
                  Ver Perfil
                </span>
            </div>
        </div>

        {/* Rodapé do Card */}
        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-600">
           <span>ID: {profile.login}</span>
           {/* AQUI ESTAVA O ERRO: Corrigido com &gt; */}
           <span className="group-hover:text-neon transition-colors">CONNECTED -&gt;</span>
        </div>

      </div>
    </a>
  );
};