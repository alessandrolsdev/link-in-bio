const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;

export async function getWakatimeStats() {
  if (!WAKATIME_API_KEY) return null;

  try {
    // Busca estatísticas dos últimos 7 dias
    const response = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/last_7_days",
      {
        headers: {
          Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString("base64")}`,
        },
        next: { revalidate: 3600 }, // Cache de 1 hora para não estourar limite da API
      }
    );

    if (!response.ok) {
        console.error("Erro Wakatime:", response.statusText);
        return null;
    }

    const data = await response.json();
    return data.data; // Retorna o objeto completo de estatísticas
  } catch (error) {
    console.error("Erro ao buscar Wakatime:", error);
    return null;
  }
}