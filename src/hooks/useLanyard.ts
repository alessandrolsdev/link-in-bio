"use client";

import { useEffect, useState } from "react";

import {
  type LanyardData,
  parseLanyardPresenceData,
  parseLanyardSocketMessage,
} from "@/lib/lanyard";

const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_USER_ID;

type LanyardConnectionState = "connecting" | "connected" | "disconnected";

// --- HOOK ---
export const useLanyard = () => {
  const [data, setData] = useState<LanyardData | null>(null);
  const [connectionState, setConnectionState] =
    useState<LanyardConnectionState>(DISCORD_ID ? "connecting" : "disconnected");

  useEffect(() => {
    if (!DISCORD_ID) {
      console.warn("⚠️ Lanyard: DISCORD_USER_ID ausente.");
      return;
    }

    let socket: WebSocket | null = null;
    let heartbeatInterval: ReturnType<typeof setInterval> | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

    const clearHeartbeat = () => {
      if (heartbeatInterval !== null) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
      }
    };

    const clearReconnect = () => {
      if (reconnectTimeout !== null) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }
    };

    const connect = () => {
      setConnectionState("connecting");
      // Conecta diretamente ao socket do Lanyard
      socket = new WebSocket("wss://api.lanyard.rest/socket");

      socket.onopen = () => {
        setConnectionState("connected");
        // Inicialização do Lanyard (Opcode 2)
        socket?.send(
          JSON.stringify({
            op: 2,
            d: { subscribe_to_id: DISCORD_ID },
          })
        );
      };

      socket.onmessage = (event) => {
        if (typeof event.data !== "string") return;

        let rawMessage: unknown;
        try {
          rawMessage = JSON.parse(event.data);
        } catch {
          return;
        }

        const message = parseLanyardSocketMessage(rawMessage);
        if (!message) return;

        // Opcode 1: Hello (Configurar Heartbeat para manter conexão viva)
        if (message.op === 1) {
          clearHeartbeat();
          heartbeatInterval = setInterval(() => {
            if (socket?.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ op: 3 })); // Enviar pulsação
            }
          }, message.d.heartbeat_interval);
          return;
        }

        // Opcode 0: Event Dispatch (Dados reais)
        const nextData = parseLanyardPresenceData(message.d);
        if (!nextData) return;

        setData((prev) => (prev ? { ...prev, ...nextData } : nextData));
      };

      socket.onclose = () => {
        setConnectionState("disconnected");
        clearHeartbeat();
        // Tentar reconectar em 5s se cair
        clearReconnect();
        reconnectTimeout = setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      clearHeartbeat();
      clearReconnect();
      socket?.close();
    };
  }, []);

  return {
    data,
    isConnected: connectionState === "connected",
    isLoading: connectionState === "connecting" && !data,
    connectionState,
  };
};
