// src/lib/github.ts

/**
 * Interface representando o perfil do usuário retornada pela API do GitHub.
 */
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

/**
 * Busca os dados do perfil do usuário no GitHub.
 * Utiliza fetch com cache configurado para 1 hora (ISR) para evitar rate links e melhorar performance.
 * 
 * @returns {Promise<GithubProfile>} Dados do perfil.
 * @throws {Error} Se a requisição falhar.
 */
export async function getGithubProfile(): Promise<GithubProfile> {
  const res = await fetch('https://api.github.com/users/alessandrolsdev', {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados do GitHub');
  }

  return res.json();
}