import querystring from "querystring";

import { isRecord, isString } from "@/lib/guards";

// Variáveis de ambiente para autenticação OAuth2 do Spotify
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

// Encoding das credenciais em Base64 para o header Authorization
const basic =
  client_id && client_secret
    ? Buffer.from(`${client_id}:${client_secret}`).toString("base64")
    : null;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export interface SpotifyNowPlaying {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string;
  songUrl: string;
}

/**
 * Obtém um novo Access Token usando o Refresh Token.
 * Necessário pois os access tokens do Spotify expiram rapidamente.
 * 
 * @returns {Promise<{access_token: string}>} O novo token de acesso.
 */
const getAccessToken = async () => {
  if (!basic || !refresh_token) return null;

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!response.ok) return null;

  const data: unknown = await response.json();
  if (!isRecord(data) || !isString(data.access_token)) {
    return null;
  }

  return data.access_token;
};

export function parseNowPlayingPayload(data: unknown): SpotifyNowPlaying | null {
  if (!isRecord(data) || typeof data.is_playing !== "boolean" || !isRecord(data.item)) {
    return null;
  }

  if (
    !isString(data.item.name) ||
    !Array.isArray(data.item.artists) ||
    !isRecord(data.item.album) ||
    !Array.isArray(data.item.album.images) ||
    !isRecord(data.item.external_urls) ||
    !isString(data.item.external_urls.spotify)
  ) {
    return null;
  }

  const artists = data.item.artists
    .filter((artist): artist is { name: string } => isRecord(artist) && isString(artist.name))
    .map((artist) => artist.name);

  const firstImage = data.item.album.images.find(
    (image): image is { url: string } => isRecord(image) && isString(image.url)
  );

  if (artists.length === 0 || !firstImage) {
    return null;
  }

  return {
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: artists.join(", "),
    albumArt: firstImage.url,
    songUrl: data.item.external_urls.spotify,
  };
}

/**
 * Busca a música que está tocando no momento (Now Playing).
 * Primeiro renova o token de acesso e depois consulta a API do Player.
 * Utiliza cache de curta duração (30s) para manter a interface quase real-time.
 * 
 * @returns {Promise<Response>} Resposta da API do Spotify.
 */
export const getNowPlaying = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 30 }
  });

  if (response.status === 204 || !response.ok) {
    return null;
  }

  const song: unknown = await response.json();
  return parseNowPlayingPayload(song);
};
