// src/lib/github.ts

export interface GithubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export async function getGithubProfile(): Promise<GithubProfile> {
  // O "next: { revalidate: 3600 }" faz cache por 1 hora. 
  // O GitHub não te bloqueia e seu site carrega voando.
  const res = await fetch('https://api.github.com/users/alessandrolsdev', {
    next: { revalidate: 3600 } 
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados do GitHub');
  }

  return res.json();
}