import React from "react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export const SocialLinks = () => {
  return (
    <div className="flex justify-center gap-6 mt-8">
      <SocialIcon href="https://github.com/alessandrolsdev" icon={<Github size={20} />} label="GitHub" />
      <SocialIcon href="https://linkedin.com/in/seulinkedin" icon={<Linkedin size={20} />} label="LinkedIn" />
      <SocialIcon href="https://instagram.com/alessandrolsdev" icon={<Instagram size={20} />} label="Instagram" />
      <SocialIcon href="mailto:seuemail@gmail.com" icon={<Mail size={20} />} label="Email" />
    </div>
  );
};

const SocialIcon = ({ href, icon, label }: any) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-zinc-500 hover:text-neon transition-colors duration-300 hover:scale-110 transform"
    aria-label={label}
  >
    {icon}
  </a>
);