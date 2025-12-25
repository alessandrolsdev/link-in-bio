"use client";
import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Github, Linkedin, Mail, Rocket, Music, Copy } from "lucide-react";

/**
 * Menu de Comandos Global (Command Palette).
 * Acessível via Ctrl+K ou Cmd+K, permitindo navegação rápida e execução de ações.
 * Utiliza a biblioteca `cmdk` para acessibilidade e composição.
 */
export const CommandMenu = () => {
  const [open, setOpen] = useState(false);

  // Escuta o evento de teclado para abrir/fechar o menu
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-zinc-900/90 border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl z-[9999] overflow-hidden"
    >
      <div className="flex items-center border-b border-white/5 px-4">
        <Command.Input
          placeholder="O que você precisa?..."
          className="w-full bg-transparent p-4 text-white placeholder:text-zinc-500 outline-none font-mono"
        />
        <div className="flex gap-1">
          <kbd className="bg-zinc-800 text-zinc-400 px-2 py-1 rounded text-xs font-mono">ESC</kbd>
        </div>
      </div>

      <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
        <Command.Empty className="p-4 text-center text-zinc-500 font-mono text-sm">
          Nenhum comando encontrado.
        </Command.Empty>

        <Command.Group heading="Ações Rápidas" className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-2 px-2">
          <Item onSelect={() => runCommand(() => window.open('https://wa.me/SEU_NUMERO', '_blank'))}>
            <Rocket className="w-4 h-4 mr-2" />
            Orçar Projeto
          </Item>
          <Item onSelect={() => runCommand(() => { navigator.clipboard.writeText('seuemail@gmail.com'); alert('Email copiado!'); })}>
            <Copy className="w-4 h-4 mr-2" />
            Copiar Email
          </Item>
        </Command.Group>

        <Command.Group heading="Social" className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-2 px-2 mt-4">
          <Item onSelect={() => runCommand(() => window.open('https://github.com/alessandrolsdev', '_blank'))}>
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Item>
          <Item onSelect={() => runCommand(() => window.open('https://linkedin.com', '_blank'))}>
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Item>
        </Command.Group>

      </Command.List>

      <div className="border-t border-white/5 p-2 bg-black/20 flex justify-between items-center px-4">
        <span className="text-[10px] text-zinc-600 font-mono">Pro Tip: Use as setas para navegar</span>
        <span className="text-[10px] text-zinc-600 font-mono">LINK-IN-BIO OS v1.0</span>
      </div>
    </Command.Dialog>
  );
};

// Componente auxiliar para estilização unificada dos itens da lista
const Item = ({ children, onSelect }: any) => {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center px-3 py-3 rounded-lg text-sm text-zinc-300 hover:bg-neon/10 hover:text-neon aria-selected:bg-neon/10 aria-selected:text-neon cursor-pointer transition-colors group"
    >
      {children}
      <span className="ml-auto opacity-0 group-hover:opacity-100 text-neon transition-opacity">↵</span>
    </Command.Item>
  )
}