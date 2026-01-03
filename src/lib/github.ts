/**
 * Interface que representa um evento do GitHub formatado para a UI.
 */
export interface GithubEvent {
  id: string;
  type: string;
  repo: string;
  date: string;
  message: string;
}

/**
 * Interface que representa as estatísticas de produtividade calculadas.
 */
export interface ProductivityStats {
  score: number;
  level: string;
  color: string;
  message: string;
}

// Interfaces auxiliares para a resposta da API do GitHub (não exportadas se não necessário fora)
interface GithubApiEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: Array<{ message: string }>;
    pull_request?: { title: string };
    issue?: { title: string };
    size?: number;
  };
}

/**
 * Busca os eventos públicos mais recentes do GitHub do usuário.
 * Utiliza fetch com cache de 60 segundos (Next.js Revalidation).
 *
 * @returns {Promise<GithubEvent[]>} Lista de eventos formatados.
 */
export async function getGithubEvents(): Promise<GithubEvent[]> {
  try {
    // Busca os últimos 15 eventos públicos do seu usuário
    const response = await fetch("https://api.github.com/users/alessandrolsdev/events?per_page=15", {
      next: { revalidate: 60 }, // Cache de 1 minuto
    });

    if (!response.ok) return [];

    const events: GithubApiEvent[] = await response.json();

    // Filtra só o que interessa
    return events
      .filter((ev) =>
        ev.type === "PushEvent" ||
        ev.type === "CreateEvent" ||
        ev.type === "WatchEvent" ||
        ev.type === "PullRequestEvent" ||
        ev.type === "IssuesEvent"
      )
      .map((ev) => {
        // Lógica para pegar a mensagem correta dependendo do evento
        let message = "System update";

        if (ev.type === "PushEvent") message = ev.payload.commits?.[0]?.message || "No commit message";
        else if (ev.type === "PullRequestEvent") message = `PR: ${ev.payload.pull_request?.title || "Unknown PR"}`;
        else if (ev.type === "IssuesEvent") message = `Issue: ${ev.payload.issue?.title || "Unknown Issue"}`;
        else if (ev.type === "WatchEvent") message = "Starred repository";
        else if (ev.type === "CreateEvent") message = "Created repository/branch";

        return {
          id: ev.id,
          type: ev.type,
          repo: ev.repo.name.replace("alessandrolsdev/", ""),
          date: ev.created_at,
          message: message,
        };
      });
  } catch (error) {
    console.error("Erro GitHub:", error);
    return [];
  }
}

// --- NOVA FUNÇÃO DE PRODUTIVIDADE ---

/**
 * Calcula a "produtividade diária" baseada na atividade recente do GitHub.
 * Define um nível de humor/energia para o widget DevMood.
 *
 * @returns {Promise<ProductivityStats>} Estatísticas e mensagens de status.
 */
export async function getDailyProductivity(): Promise<ProductivityStats> {
  try {
    // Busca os últimos 100 eventos para garantir que cobrimos o dia
    const res = await fetch("https://api.github.com/users/alessandrolsdev/events?per_page=100", {
      next: { revalidate: 300 }, // Cache de 5 min
    });

    if (!res.ok) return { score: 0, level: "OFFLINE", color: "text-zinc-500", message: "GitHub API Sleeping..." };

    const events: GithubApiEvent[] = await res.json();

    // Data de hoje (UTC simples)
    const today = new Date().toISOString().split('T')[0];

    // Filtra eventos de HOJE
    const todaysEvents = events.filter((ev) => ev.created_at?.startsWith(today));

    // Calcula pontuação
    let score = 0;

    todaysEvents.forEach((ev) => {
      if (ev.type === "PushEvent") {
        score += ev.payload.size || 1;
      } else if (ev.type === "PullRequestEvent" || ev.type === "IssuesEvent" || ev.type === "CreateEvent") {
        score += 1;
      }
    });

    return calculateMood(score);

  } catch (error) {
    console.error(error);
    return { score: 0, level: "ERROR", color: "text-red-500", message: "System Error: Caffeine required." };
  }
}

/**
 * Função auxiliar interna para determinar o "Humor" com base no score.
 *
 * @param {number} score - Pontuação de produtividade calculada.
 * @returns {ProductivityStats} Objeto com nível, cor e mensagem.
 */
function calculateMood(score: number): ProductivityStats {
  if (score === 0) return {
    score,
    level: "ZEN MODE",
    color: "text-blue-400",
    message: "0 commits. Provavelmente tocando a grama ou desenhando no Figma. 🌱"
  };

  if (score <= 5) return {
    score,
    level: "AQUECENDO",
    color: "text-green-400",
    message: "Produtividade leve. Apenas um café preto e code review. ☕"
  };

  if (score <= 15) return {
    score,
    level: "FLOW STATE",
    color: "text-yellow-400",
    message: "No ritmo. Uma lata de Monster Branco foi consumida. ⚡"
  };

  if (score <= 30) return {
    score,
    level: "HIGH VOLTAGE",
    color: "text-orange-500",
    message: "Fritando teclados. Duas latas de Monster e zero paciência. 🔋"
  };

  return {
    score,
    level: "GOD MODE",
    color: "text-purple-500",
    message: "Olhos sangrando. Codando em binário. O sistema sou eu. 💀"
  };
}