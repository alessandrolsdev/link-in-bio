import React from "react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import Magnetic from "./Magnetic";

/**
 * Seção de Links Sociais Magnéticos.
 * Exibe ícones de redes sociais que são atraídos pelo cursor do mouse (efeito magnético).
 */
export const SocialLinks = () => {
  return (
    <div className="flex justify-center gap-8 mt-12 items-center">
      <Magnetic><SocialIcon href="https://github.com/alessandrolsdev" icon={<Github size={24} />} /></Magnetic>
      <Magnetic><SocialIcon href="https://linkedin.com/in/seulinkedin" icon={<Linkedin size={24} />} /></Magnetic>
      <Magnetic><SocialIcon href="https://instagram.com/alessandrolsdev" icon={<Instagram size={24} />} /></Magnetic>
      <Magnetic><SocialIcon href="mailto:seuemail@gmail.com" icon={<Mail size={24} />} /></Magnetic>
    </div>
  );
};

/**
 * Botão de Ícone Social.
 * Componente auxiliar estilizado para os links.
 * @param {Object} props
 * @param {string} props.href - URL de destino.
 * @param {React.ReactNode} props.icon - Ícone Lucide.
 */
const SocialIcon = ({ href, icon }: any) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 border border-white/5 text-zinc-400 hover:text-neon hover:border-neon/50 hover:bg-neon/10 transition-all duration-300"
  >
    {icon}
  </a>
);