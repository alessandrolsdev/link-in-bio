const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;

/**
 * Busca estatísticas de programação do WakaTime.
 * Retorna dados agregados dos últimos 7 dias.
 * 
 * @returns {Promise<any | null>} Objeto de dados do WakaTime ou null em caso de erro.
 */
export async function getWakatimeStats() {
  if (!WAKATIME_API_KEY) return null;

  try {
    const response = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/last_7_days",
      {
        headers: {
          Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString("base64")}`,
        },
        next: { revalidate: 3600 }, // Cache de 1 hora para evitar limites de API e melhorar performance
      }
    );

    if (!response.ok) {
      console.error("Erro Wakatime:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erro ao buscar Wakatime:", error);
    return null;
  }
}