import { getWakatimeStats } from "@/lib/wakatime";
import { Code2, Clock } from "lucide-react";

export const WakaTimeWidget = async () => {
    const stats = await getWakatimeStats();
    if (!stats || !stats.languages) return null;

    // Pega apenas as top 4 linguagens para não poluir
    const topLanguages = stats.languages.slice(0, 4);

    return (
        <div className="group relative flex flex-col gap-3 overflow-hidden rounded-xl bg-zinc-900/60 p-5 border border-white/5 transition-all hover:bg-zinc-800/80 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]">

            {/* Background Glow Roxo (Diferente do verde/vermelho dos outros) */}
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-purple-500 opacity-5 blur-[50px] transition-opacity group-hover:opacity-10" />

            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                    <Code2 size={14} className="text-purple-400" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                        Weekly Code Stats
                    </span>
                </div>
                <div className="flex items-center gap-1 text-zinc-500 text-[10px] font-mono">
                    <Clock size={10} />
                    {stats.human_readable_total}
                </div>
            </div>

            {/* Lista de Linguagens */}
            <div className="flex flex-col gap-3 z-10">
                {topLanguages.map((lang: any) => (
                    <div key={lang.name} className="flex flex-col gap-1">
                        <div className="flex justify-between text-xs">
                            <span className="font-bold text-zinc-200">{lang.name}</span>
                            <span className="font-mono text-zinc-500">{lang.text}</span>
                        </div>

                        {/* Barra de Progresso */}
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out group-hover:brightness-125"
                                style={{ width: `${lang.percent}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};