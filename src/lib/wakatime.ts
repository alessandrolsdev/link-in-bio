import { isNumber, isRecord, isString } from "@/lib/guards";

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;

export interface WakatimeLanguage {
  name: string;
  text: string;
  percent: number;
}

export interface WakatimeStats {
  humanReadableTotal: string;
  languages: WakatimeLanguage[];
}

function coercePercent(value: unknown): number | null {
  if (isNumber(value)) return value;
  if (isString(value)) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

export function parseWakatimeStatsResponse(data: unknown): WakatimeStats | null {
  if (!isRecord(data) || !isRecord(data.data) || !Array.isArray(data.data.languages)) {
    return null;
  }

  const humanReadableTotal = isString(data.data.human_readable_total)
    ? data.data.human_readable_total
    : "0 hrs 0 mins";

  const languages = data.data.languages
    .map((language) => {
      if (!isRecord(language) || !isString(language.name) || !isString(language.text)) {
        return null;
      }

      const percent = coercePercent(language.percent);
      if (percent === null) return null;

      return {
        name: language.name,
        text: language.text,
        percent,
      };
    })
    .filter((language): language is WakatimeLanguage => language !== null);

  if (languages.length === 0) {
    return null;
  }

  return {
    humanReadableTotal,
    languages,
  };
}

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

    const data: unknown = await response.json();
    return parseWakatimeStatsResponse(data);
  } catch (error) {
    console.error("Erro ao buscar Wakatime:", error);
    return null;
  }
}
