import { Github, Users, GitFork, ArrowRight } from "lucide-react";
import Link from "next/link";

async function getGithubData() {
  try {
    const res = await fetch("https://api.github.com/users/alessandrolsdev", {
      next: { revalidate: 3600 }, // Atualiza a cada 1 hora
    });
    
    if (!res.ok) throw new Error("Falha ao buscar GitHub");
    
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const GithubWidget = async () => {
  const user = await getGithubData();

  if (!user) return null;

  return (
    <Link 
      href={user.html_url} 
      target="_blank"
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-zinc-900/60 p-5 border border-white/5 transition-all hover:bg-zinc-800/80 hover:border-zinc-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
    >
      
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 p-3 opacity-20 transition-opacity group-hover:opacity-40">
        <Github size={40} />
      </div>

      {/* Cabeçalho "Tech" */}
      <div className="flex justify-between items-start mb-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
        <span>GH_NET_LINK</span>
        <span>v4.0.0</span>
      </div>

      {/* Grid de Estatísticas */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Repositórios */}
        <div className="flex flex-col items-center justify-center p-2 rounded bg-black/40 border border-white/5">
          <GitFork size={14} className="text-zinc-400 mb-1" />
          <span className="text-lg font-bold text-zinc-200">{user.public_repos}</span>
          <span className="text-[9px] text-zinc-500 uppercase">Repos</span>
        </div>

        {/* Seguidores */}
        <div className="flex flex-col items-center justify-center p-2 rounded bg-black/40 border border-white/5">
          <Users size={14} className="text-zinc-400 mb-1" />
          <span className="text-lg font-bold text-zinc-200">{user.followers}</span>
          <span className="text-[9px] text-zinc-500 uppercase">Seguidores</span>
        </div>

        {/* Botão Ver Perfil */}
        <div className="flex flex-col items-center justify-center p-2 rounded bg-zinc-800/50 border border-white/10 group-hover:bg-zinc-700/50 transition-colors">
            <Github size={14} className="text-white mb-1" />
            <span className="text-[9px] text-zinc-300 mt-1 uppercase text-center">Ver Perfil</span>
        </div>
      </div>

      {/* Rodapé Hacker */}
      <div className="flex justify-between items-end border-t border-white/5 pt-3">
        <div className="flex flex-col">
            <span className="text-[9px] text-zinc-600 font-mono">ID: {user.login}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-green-500/80 font-mono">
            <span>CONNECTED</span>
            <ArrowRight size={10} className="-rotate-45 group-hover:rotate-0 transition-transform" />
        </div>
      </div>

    </Link>
  );
};