import { isRecord, isString } from "@/lib/guards";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/playlistItems";

export interface YoutubeVideo {
  title: string;
  channel: string;
  url: string;
  thumbnail: string;
}

export function parseLatestVideoResponse(data: unknown): YoutubeVideo | null {
  if (!isRecord(data) || !Array.isArray(data.items) || data.items.length === 0) {
    return null;
  }

  const firstItem = data.items[0];
  if (!isRecord(firstItem) || !isRecord(firstItem.snippet)) {
    return null;
  }

  const { snippet } = firstItem;
  if (
    !isString(snippet.title) ||
    !isString(snippet.videoOwnerChannelTitle) ||
    !isRecord(snippet.resourceId) ||
    !isString(snippet.resourceId.videoId) ||
    !isRecord(snippet.thumbnails)
  ) {
    return null;
  }

  const mediumThumbnail =
    isRecord(snippet.thumbnails.medium) && isString(snippet.thumbnails.medium.url)
      ? snippet.thumbnails.medium.url
      : null;
  const defaultThumbnail =
    isRecord(snippet.thumbnails.default) && isString(snippet.thumbnails.default.url)
      ? snippet.thumbnails.default.url
      : null;

  const thumbnail = mediumThumbnail ?? defaultThumbnail;
  if (!thumbnail) {
    return null;
  }

  return {
    title: snippet.title,
    channel: snippet.videoOwnerChannelTitle,
    url: `https://www.youtube.com/watch?v=${snippet.resourceId.videoId}`,
    thumbnail,
  };
}

/**
 * Busca o vídeo mais recente de uma playlist espefícica do YouTube.
 * Útil para mostrar o último vídeo publicado ou uma playlist de curadoria.
 * 
 * @returns {Promise<{title: string, channel: string, url: string, thumbnail: string} | null>} Metadados do vídeo.
 */
export async function getLatestVideo() {
  if (!YOUTUBE_API_KEY || !PLAYLIST_ID) {
    return null;
  }

  const url = `${YOUTUBE_API_URL}?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=1&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Atualização a cada 60 segundos
    });

    if (!response.ok) {
      console.error("Erro YouTube:", await response.text());
      return null;
    }

    const data: unknown = await response.json();
    return parseLatestVideoResponse(data);
  } catch (error) {
    console.error("Erro ao buscar YouTube:", error);
    return null;
  }
}
