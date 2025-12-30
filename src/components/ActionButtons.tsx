"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Linkedin, 
  Mail, 
  FileText, 
  Github, 
  Globe, 
  MessageCircle, 
  ArrowUpRight 
} from "lucide-react";

const links = [
  {
    label: "NEXUS ELEVA",
    sub: "Software House & Solutions",
    url: "https://nexuseleva.com.br", // Coloque o link real da sua empresa
    icon: <Globe size={20} />,
    color: "hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    bg: "bg-purple-500/10",
    text: "text-purple-400"
  },
  {
    label: "GITHUB",
    sub: "Source Code & Contributions",
    url: "https://github.com/alessandrolsdev",
    icon: <Github size={20} />,
    color: "hover:border-zinc-400 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    bg: "bg-zinc-800/50",
    text: "text-zinc-100"
  },
  {
    label: "LINKEDIN",
    sub: "Professional Network",
    url: "https://linkedin.com/in/seu-linkedin",
    icon: <Linkedin size={20} />,
    color: "hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    bg: "bg-blue-500/10",
    text: "text-blue-400"
  },
  {
    label: "RESUME / CV",
    sub: "Download PDF Version",
    url: "/curriculo.pdf",
    icon: <FileText size={20} />,
    color: "hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]",
    bg: "bg-green-500/10",
    text: "text-green-400"
  },
  {
    label: "CONTATO",
    sub: "Vamos construir algo?",
    url: "mailto:seuemail@gmail.com",
    icon: <Mail size={20} />,
    color: "hover:border-yellow-500 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]",
    bg: "bg-yellow-500/10",
    text: "text-yellow-400"
  }
];

export const ActionButtons = () => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm mx-auto mt-6">
      {links.map((link, i) => (
        <Link href={link.url} key={i} target="_blank" className="w-full group">
          <motion.div
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative flex items-center justify-between p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300
              ${link.color}
            `}
          >
            {/* Ícone e Texto */}
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-lg ${link.bg} ${link.text}`}>
                {link.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-zinc-200 tracking-wide group-hover:text-white transition-colors">
                  {link.label}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-400 uppercase tracking-wider">
                  {link.sub}
                </span>
              </div>
            </div>

            {/* Seta indicativa */}
            <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-zinc-500">
               <ArrowUpRight size={18} />
            </div>

          </motion.div>
        </Link>
      ))}
    </div>
  );
};