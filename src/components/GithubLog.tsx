import { getGithubEvents } from "@/lib/github";
import { GithubLogList } from "./GithubLogList";

/**
 * Componente GithubLog (Server Component).
 * Container que busca os eventos do GitHub no lado do servidor e passa para o componente cliente.
 *
 * @returns {JSX.Element | null} O componente de lista de logs ou null se não houver dados.
 */
export const GithubLog = async () => {
  // Busca os dados no servidor (Server Component) para performance e segurança
  const events = await getGithubEvents();

  if (!events || events.length === 0) return null;

  // Passa para o componente Cliente que tem a interatividade (expandir/recolher)
  return <GithubLogList events={events} />;
};