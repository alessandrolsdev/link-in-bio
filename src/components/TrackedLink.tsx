"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { track } from "@/lib/tracker"; // Certifique-se que este arquivo existe conforme passo anterior

interface TrackedLinkProps {
  href: string;
  eventName: string; // Ex: "click_whatsapp"
  eventData?: Record<string, any>; // Ex: { origem: "header" }
  children: ReactNode;
  className?: string;
  target?: string;
}

/**
 * Wrapper inteligente para Links.
 * Registra o clique no Supabase e depois navega.
 */
export function TrackedLink({ 
  href, 
  eventName, 
  eventData = {}, 
  children, 
  className, 
  target = "_blank" 
}: TrackedLinkProps) {

  const handleClick = () => {
    // Dispara o evento de forma não bloqueante (Fire and Forget)
    track({ 
      event_name: eventName, 
      metadata: { 
        ...eventData, 
        url: href 
      } 
    });
  };

  return (
    <Link 
      href={href} 
      className={className} 
      target={target}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}