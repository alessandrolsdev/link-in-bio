"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Linkedin, Mail, FileText, Github, Globe, ArrowUpRight 
} from "lucide-react";

// --- DADOS DOS LINKS ---
const links = [
  {
    label: "NEXUS ELEVA",
    sub: "Software House & Solutions",
    url: "https://nexuseleva.com.br",
    icon: <Globe size={18} />,
    color: "hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    bg: "bg-purple-500/10",
    text: "text-purple-400"
  },
  {
    label: "GITHUB",
    sub: "Source Code & Contributions",
    url: "https://github.com/alessandrolsdev",
    icon: <Github size={18} />,
    color: "hover:border-zinc-400 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    bg: "bg-zinc-800/50",
    text: "text-zinc-100"
  },
  {
    label: "LINKEDIN",
    sub: "Professional Network",
    url: "https://linkedin.com/in/alessandrolsdev",
    icon: <Linkedin size={18} />,
    color: "hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    bg: "bg-blue-500/10",
    text: "text-blue-400"
  },
  {
    label: "RESUME / CV",
    sub: "Download PDF Version",
    url: "/curriculo.pdf",
    icon: <FileText size={18} />,
    color: "hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]",
    bg: "bg-green-500/10",
    text: "text-green-400"
  },
  {
    label: "CONTATO",
    sub: "Vamos construir algo?",
    url: "mailto:alessandrolsdev@gmail.com",
    icon: <Mail size={18} />,
    color: "hover:border-yellow-500 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]",
    bg: "bg-yellow-500/10",
    text: "text-yellow-400"
  }
];

// --- COMPONENTE MAGNÉTICO INDIVIDUAL ---

/**
 * Interface para as props do MagneticButton.
 */
interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * Componente Botão Magnético.
 * Aplica um efeito de atração magnética ao cursor do mouse quando ele se aproxima do botão.
 * Utiliza Framer Motion para suavizar o movimento.
 *
 * @param {MagneticButtonProps} props - Propriedades do botão.
 * @param {React.ReactNode} props.children - Conteúdo do botão.
 * @param {string} [props.className] - Classes CSS adicionais.
 */
const MagneticButton = ({ children, className }: MagneticButtonProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    /**
     * Calcula a posição do mouse relativa ao centro do botão e atualiza o estado `position`.
     * O efeito é multiplicado por 0.1 para controlar a intensidade.
     */
    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.1, y: middleY * 0.1 }); // Intensidade do ímã
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    const { x, y } = position;
    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/**
 * Componente ActionButtons.
 * Renderiza uma lista de botões de ação (links sociais, currículo, etc.) com efeito magnético.
 * Os dados são estáticos definidos na constante `links`.
 */
export const ActionButtons = () => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto mt-4">
      {links.map((link, i) => (
        <Link href={link.url} key={i} target="_blank" className="w-full group">
          <MagneticButton
            className={`
              relative flex items-center justify-between p-3 rounded-xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm transition-colors duration-300
              ${link.color}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${link.bg} ${link.text}`}>
                {link.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs md:text-sm font-bold text-zinc-200 tracking-wide group-hover:text-white transition-colors">
                  {link.label}
                </span>
                <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 group-hover:text-zinc-400 uppercase tracking-wider">
                  {link.sub}
                </span>
              </div>
            </div>

            <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-zinc-500">
               <ArrowUpRight size={16} />
            </div>

          </MagneticButton>
        </Link>
      ))}
    </div>
  );
};