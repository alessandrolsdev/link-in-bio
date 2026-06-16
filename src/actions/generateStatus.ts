"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { unstable_cache } from "next/cache";

import { parseLanyardRestUserResponse } from "@/lib/lanyard";
import { getGithubEvents } from "@/lib/github";
type TimePeriod = "madrugada" | "manhã" | "tarde" | "noite";

function clampSnippet(input: string, maxLen: number): string {
  const normalized = input.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLen) return normalized;
  return `${normalized.slice(0, maxLen - 1)}…`;
}

function getLocalHour(timeZone: string): number {
  const hourText = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    hour12: false,
    timeZone,
  }).format(new Date());

  const hour = Number(hourText);
  return Number.isFinite(hour) ? hour : new Date().getHours();
}

function getTimePeriod(hour: number): TimePeriod {
  if (hour < 6) return "madrugada";
  if (hour < 12) return "manhã";
  if (hour < 18) return "tarde";
  return "noite";
}

async function fetchSpotifyContextFromLanyard(): Promise<
  | { listeningToSpotify: true; song: string; artist: string }
  | { listeningToSpotify: false }
> {
  const discordId = process.env.NEXT_PUBLIC_DISCORD_USER_ID;
  if (!discordId) return { listeningToSpotify: false };

  const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) return { listeningToSpotify: false };

  const json: unknown = await response.json();
  const payload = parseLanyardRestUserResponse(json);
  if (!payload) return { listeningToSpotify: false };

  if (!payload.data.listening_to_spotify || !payload.data.spotify) {
    return { listeningToSpotify: false };
  }

  const { song, artist } = payload.data.spotify;
  if (!song || !artist) return { listeningToSpotify: false };

  return {
    listeningToSpotify: true,
    song: clampSnippet(song, 60),
    artist: clampSnippet(artist, 60),
  };
}

async function getLastCommitMessage(): Promise<string | null> {
  const events = await getGithubEvents();
  const lastPush = events.find((ev) => ev.type === "PushEvent");
  if (!lastPush?.message) return null;

  const msg = clampSnippet(lastPush.message, 80);
  return msg.length > 0 ? msg : null;
}

async function generateLivingStatusUncached(): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "System Idle...";

  const [lastCommitMessage, spotifyContext] = await Promise.all([
    getLastCommitMessage(),
    fetchSpotifyContextFromLanyard(),
  ]);

  const hour = getLocalHour("America/Cuiaba");
  const timePeriod = getTimePeriod(hour);

  const commitLine = lastCommitMessage
    ? `Último commit: "${lastCommitMessage}".`
    : "Sem commit público recente detectado.";

  const spotifyLine =
    spotifyContext.listeningToSpotify
      ? `Spotify: ouvindo "${spotifyContext.song}" — ${spotifyContext.artist}.`
      : "Spotify: sem música no momento.";

  const prompt = [
    "Você é um bardo cyberpunk que narra o foco atual de um desenvolvedor.",
    "Gere exatamente 1 frase curta (máximo 120 caracteres), em PT-BR.",
    "Sem emojis. Sem aspas na resposta. Sem quebras de linha.",
    `Período do dia: ${timePeriod}.`,
    commitLine,
    spotifyLine,
    "Saída:",
  ].join("\n");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = clampSnippet(response.text(), 140);

  return text.length > 0 ? text : "System Idle...";
}

export const generateLivingStatus = unstable_cache(
  async (): Promise<string> => {
    try {
      return await generateLivingStatusUncached();
    } catch {
      return "System Idle...";
    }
  },
  ["living-status-v1"],
  { revalidate: 600 }
);

