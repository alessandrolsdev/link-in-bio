"use client";

import { useState, useEffect, useCallback } from "react";

const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_USER_ID;

// --- TIPAGEM ESTRITA (Segurança de Código) ---
export interface LanyardData {
  discord_user: {
    username: string;
    avatar: string;
    id: string;
    discriminator: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify: {
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  } | null;
  activities: Array<{
    type: number;
    name: string;
    state?: string;
    details?: string;
    assets?: {
      large_image?: string;
      small_image?: string;
    };
  }>;
}

// --- HOOK ---
export const useLanyard = () => {
  const [data, setData] = useState<LanyardData | null>(null);
  const [isConnected, setIsConnected] = useState(false); // Útil para UI de status

  useEffect(() => {
    if (!DISCORD_ID) {
      console.warn("⚠️ Lanyard: DISCORD_USER_ID ausente.");
      return;
    }

    let socket: WebSocket | null = null;
    let heartbeatInterval: NodeJS.Timeout;

    const connect = () => {
      // Conecta diretamente ao socket do Lanyard
      socket = new WebSocket("wss://api.lanyard.rest/socket");

      socket.onopen = () => {
        setIsConnected(true);
        // Inicialização do Lanyard (Opcode 2)
        socket?.send(
          JSON.stringify({
            op: 2,
            d: { subscribe_to_id: DISCORD_ID },
          })
        );
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        // Opcode 1: Hello (Configurar Heartbeat para manter conexão viva)
        if (message.op === 1) {
          const interval = message.d.heartbeat_interval;
          heartbeatInterval = setInterval(() => {
            if (socket?.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ op: 3 })); // Enviar pulsação
            }
          }, interval);
        }

        // Opcode 0: Event Dispatch (Dados reais)
        if (message.op === 0) {
          if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
            // Atualiza o estado com os dados novos (merge se necessário)
            setData((prev) => ({ ...prev, ...message.d }));
          }
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        clearInterval(heartbeatInterval);
        // Tentar reconectar em 5s se cair
        setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      clearInterval(heartbeatInterval);
      socket?.close();
    };
  }, []);

  return { 
    data, 
    isConnected, // Agora você pode mostrar se está "Live" ou não
    isLoading: !data && isConnected 
  };
};