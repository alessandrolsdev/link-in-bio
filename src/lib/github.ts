import { isNumber, isRecord, isString } from "@/lib/guards";

export interface GithubEvent {
  id: string;
  type: string;
  repo: string;
  date: string;
  message: string;
}

export interface GithubProfile {
  login: string;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
}

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

type SupportedGithubEventType =
  | "PushEvent"
  | "CreateEvent"
  | "WatchEvent"
  | "PullRequestEvent"
  | "IssuesEvent";

interface GithubApiProfile {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
}

function isGithubApiEvent(value: unknown): value is GithubApiEvent {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.type) &&
    isString(value.created_at) &&
    isRecord(value.repo) &&
    isString(value.repo.name) &&
    isRecord(value.payload)
  );
}

function isSupportedEventType(type: string): type is SupportedGithubEventType {
  return (
    type === "PushEvent" ||
    type === "CreateEvent" ||
    type === "WatchEvent" ||
    type === "PullRequestEvent" ||
    type === "IssuesEvent"
  );
}

function isGithubApiProfile(value: unknown): value is GithubApiProfile {
  return (
    isRecord(value) &&
    isString(value.login) &&
    isString(value.html_url) &&
    isNumber(value.public_repos) &&
    isNumber(value.followers)
  );
}

function getEventMessage(event: GithubApiEvent): string {
  if (event.type === "PushEvent") {
    const commits = Array.isArray(event.payload.commits)
      ? event.payload.commits
      : [];

    const firstCommit = commits.find(
      (commit): commit is { message: string } =>
        isRecord(commit) && isString(commit.message)
    );

    return firstCommit?.message ?? "No commit message";
  }

  if (event.type === "PullRequestEvent") {
    return isRecord(event.payload.pull_request) &&
      isString(event.payload.pull_request.title)
      ? `PR: ${event.payload.pull_request.title}`
      : "PR: Unknown PR";
  }

  if (event.type === "IssuesEvent") {
    return isRecord(event.payload.issue) && isString(event.payload.issue.title)
      ? `Issue: ${event.payload.issue.title}`
      : "Issue: Unknown Issue";
  }

  if (event.type === "WatchEvent") {
    return "Starred repository";
  }

  return "Created repository/branch";
}

export function mapGithubEvent(event: GithubApiEvent): GithubEvent {
  return {
    id: event.id,
    type: event.type,
    repo: event.repo.name.replace("alessandrolsdev/", ""),
    date: event.created_at,
    message: getEventMessage(event),
  };
}

export function parseGithubEventsResponse(data: unknown): GithubEvent[] {
  if (!Array.isArray(data)) return [];

  return data
    .filter(isGithubApiEvent)
    .filter((event) => isSupportedEventType(event.type))
    .map(mapGithubEvent);
}

export function parseGithubProfile(data: unknown): GithubProfile | null {
  if (!isGithubApiProfile(data)) return null;

  return {
    login: data.login,
    htmlUrl: data.html_url,
    publicRepos: data.public_repos,
    followers: data.followers,
  };
}

export async function getGithubEvents(): Promise<GithubEvent[]> {
  try {
    // Busca os últimos 15 eventos públicos do seu usuário
    const response = await fetch("https://api.github.com/users/alessandrolsdev/events?per_page=15", {
      next: { revalidate: 60 }, // Cache de 1 minuto
    });

    if (!response.ok) return [];

    const events: unknown = await response.json();
    return parseGithubEventsResponse(events);
  } catch (error) {
    console.error("Erro GitHub:", error);
    return [];
  }
}

export async function getGithubProfile(): Promise<GithubProfile | null> {
  try {
    const response = await fetch("https://api.github.com/users/alessandrolsdev", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const profile: unknown = await response.json();
    return parseGithubProfile(profile);
  } catch (error) {
    console.error("Erro GitHub Profile:", error);
    return null;
  }
}

export async function getDailyProductivity(): Promise<ProductivityStats> {
  try {
    // Busca os últimos 100 eventos para garantir que cobrimos o dia
    const res = await fetch("https://api.github.com/users/alessandrolsdev/events?per_page=100", {
      next: { revalidate: 300 }, // Cache de 5 min
    });

    if (!res.ok) return { score: 0, level: "OFFLINE", color: "text-zinc-500", message: "GitHub API Sleeping..." };

    const events = parseGithubEventsResponse(await res.json());

    // Data de hoje (UTC simples)
    const today = new Date().toISOString().split("T")[0];

    // Filtra eventos de HOJE
    const todaysEvents = events.filter((event) => event.date.startsWith(today));

    // Calcula pontuação
    let score = 0;

    todaysEvents.forEach((event) => {
      if (event.type === "PushEvent") {
        score += 1;
      } else if (
        event.type === "PullRequestEvent" ||
        event.type === "IssuesEvent" ||
        event.type === "CreateEvent"
      ) {
        score += 1;
      }
    });

    return calculateMood(score);

  } catch (error) {
    console.error(error);
    return { score: 0, level: "ERROR", color: "text-red-500", message: "System Error: Caffeine required." };
  }
}

// Função auxiliar interna
export function calculateMood(score: number): ProductivityStats {
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
