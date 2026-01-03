"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Linkedin, Mail, FileText, Github, Globe, 
  ChevronDown, MessageCircle, Instagram, ExternalLink,
  Layers, Rocket, Smartphone
} from "lucide-react";

// --- TIPOS DE DADOS ---
type SubLink = {
  label: string;
  url: string;
  icon?: React.ReactNode;
  badge?: string; // Ex: "Online", "Beta"
};

type ActionItem = {
  id: string;
  label: string;
  sub: string;
  type: "link" | "group";
  url?: string; // Só se for link direto
  links?: SubLink[]; // Só se for grupo
  icon: React.ReactNode;
  color: string;
  bg: string;
  text: string;
};

// --- CONFIGURAÇÃO DOS BOTÕES ---
const items: ActionItem[] = [
  {
    id: "nexus",
    label: "NEXUS ELEVA",
    sub: "Software House & Solutions",
    type: "link",
    url: "https://nexuseleva.com.br",
    icon: <Globe size={18} />,
    color: "group-hover:border-purple-500 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    bg: "bg-purple-500/10",
    text: "text-purple-400"
  },
  {
    id: "projects",
    label: "DEPLOYMENTS & PROJETOS",
    sub: "Apps rodando em produção (Vercel)",
    type: "group",
    icon: <Rocket size={18} />,
    color: "group-hover:border-cyan-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    links: [
      { 
        label: "NOMAD Fintech", 
        url: "https://nomad-api-cf.vercel.app", // Coloque o link real
        icon: <Layers size={14} />,
        badge: "LIVE"
      },
      { 
        label: "Project Clutch (Gamer Social)", 
        url: "https://project-clutch.vercel.app", 
        icon: <Github size={14} />,
        badge: "DEV"
      },
      { 
        label: "Autoscan RPA (Demo)", 
        url: "https://github.com/alessandrolsdev/autoscan", 
        icon: <Github size={14} />
      }
    ]
  },
  {
    id: "github",
    label: "GITHUB PROFILE",
    sub: "Código Fonte & Contribuições",
    type: "link",
    url: "https://github.com/alessandrolsdev",
    icon: <Github size={18} />,
    color: "group-hover:border-zinc-400 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    bg: "bg-zinc-800/50",
    text: "text-zinc-100"
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    sub: "Conexões Profissionais",
    type: "link",
    url: "https://linkedin.com/in/alessandrolsdev",
    icon: <Linkedin size={18} />,
    color: "group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    bg: "bg-blue-500/10",
    text: "text-blue-400"
  },
  {
    id: "contact",
    label: "CANAIS DE CONTATO",
    sub: "WhatsApp, Email & Redes",
    type: "group",
    icon: <Smartphone size={18} />,
    color: "group-hover:border-green-500 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]",
    bg: "bg-green-500/10",
    text: "text-green-400",
    links: [
      { 
        label: "WhatsApp Comercial", 
        url: "https://wa.me/5567991710135", 
        icon: <MessageCircle size={14} /> 
      },
      { 
        label: "E-mail Direto", 
        url: "mailto:alessandrolsdev@gmail.com", 
        icon: <Mail size={14} /> 
      },
      { 
        label: "Instagram", 
        url: "https://instagram.com/alessandrolsdev", 
        icon: <Instagram size={14} /> 
      }
    ]
  }
];

export const ActionButtons = () => {
  // Estado para saber qual botão está expandido (null = nenhum)
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto mt-4">
      {items.map((item) => {
        const isExpanded = expandedId === item.id;

        // --- RENDERIZAÇÃO DO CONTEÚDO DO BOTÃO PRINCIPAL ---
        const MainButtonContent = () => (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.bg} ${item.text}`}>
                {item.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs md:text-sm font-bold text-zinc-200 tracking-wide group-hover:text-white transition-colors">
                  {item.label}
                </span>
                <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 group-hover:text-zinc-400 uppercase tracking-wider">
                  {item.sub}
                </span>
              </div>
            </div>

            {/* Ícone da Direita (Seta ou Chevron) */}
            <div className={`text-zinc-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
               {item.type === "group" ? (
                 <ChevronDown size={16} />
               ) : (
                 <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               )}
            </div>
          </div>
        );

        return (
          <div key={item.id} className="w-full relative group">
            
            {/* --- SE FOR LINK DIRETO --- */}
            {item.type === "link" ? (
              <Link href={item.url!} target="_blank">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center p-3 rounded-xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 ${item.color}`}
                >
                  <MainButtonContent />
                </motion.div>
              </Link>
            ) : (
              // --- SE FOR GRUPO EXPANSÍVEL ---
              <motion.div
                layout // Animação suave de layout
                onClick={() => toggleExpand(item.id)}
                className={`
                   relative overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 cursor-pointer
                   ${isExpanded ? "border-zinc-600 bg-zinc-900/80" : item.color}
                `}
              >
                {/* Cabeçalho do Grupo */}
                <div className="p-3">
                   <MainButtonContent />
                </div>

                {/* Conteúdo Expansível (Sub-links) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-zinc-800/50 bg-black/20"
                    >
                      <div className="p-2 space-y-1">
                        {item.links?.map((subLink, idx) => (
                          <Link key={idx} href={subLink.url} target="_blank" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800/50 transition-colors group/sub">
                              <div className="flex items-center gap-2 text-zinc-400 group-hover/sub:text-white">
                                {subLink.icon}
                                <span className="text-xs font-mono">{subLink.label}</span>
                              </div>
                              {subLink.badge && (
                                <span className={`text-[9px] px-1.5 py-0.5 rounded border ${
                                    subLink.badge === "LIVE" ? "border-green-500/30 text-green-400 bg-green-500/10" : 
                                    "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"
                                }`}>
                                    {subLink.badge}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};