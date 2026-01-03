import querystring from 'querystring';

// Variáveis de ambiente para autenticação OAuth2 do Spotify
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

// Encoding das credenciais em Base64 para o header Authorization
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

/**
 * Obtém um novo Access Token usando o Refresh Token.
 * Necessário pois os access tokens do Spotify expiram rapidamente.
 * 
 * @returns {Promise<{access_token: string}>} O novo token de acesso.
 */
const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

/**
 * Busca a música que está tocando no momento (Now Playing).
 * Primeiro renova o token de acesso e depois consulta a API do Player.
 * Utiliza cache de curta duração (30s) para manter a interface quase real-time.
 * 
 * @returns {Promise<Object | null>} Objeto com as informações da música ou null se não houver música tocando.
 */
export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: { revalidate: 30 }
  });

  if (response.status === 204 || response.status > 400) {
    return null;
  }

  const song = await response.json();

  if (!song || !song.item) {
      return null;
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
  const album = song.item.album.name;
  const albumArt = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return {
    album,
    albumArt,
    artist,
    isPlaying,
    songUrl,
    title,
  };
};