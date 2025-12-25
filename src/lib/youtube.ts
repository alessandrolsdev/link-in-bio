const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/playlistItems";

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

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const item = data.items[0].snippet;

    return {
      title: item.title,
      channel: item.videoOwnerChannelTitle,
      url: `https://www.youtube.com/watch?v=${item.resourceId.videoId}`,
      thumbnail: item.thumbnails.medium?.url || item.thumbnails.default?.url,
    };
  } catch (error) {
    console.error("Erro ao buscar YouTube:", error);
    return null;
  }
}