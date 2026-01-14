"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/tracker";

export function PageViewTracker() {
  const pathname = usePathname();
  // Ref para garantir que não dispare duplicado em React Strict Mode (comum em dev)
  const initialized = useRef(false);

  useEffect(() => {
    // Evita contar 2x no desenvolvimento local
    if (initialized.current) return;
    initialized.current = true;

    // Dispara o evento de visita
    track({
      event_name: "page_view",
      metadata: {
        path: pathname,
        referrer: document.referrer || "direct", // Pega quem indicou o site (ex: instagram.com)
        screen_width: window.innerWidth, // Útil para saber se é mobile ou desktop
      },
    });
    
    // Resetar o ref se o pathname mudar (navegação interna)
    return () => { initialized.current = false; };
  }, [pathname]);

  return null; // Componente fantasma (não renderiza nada visualmente)
}