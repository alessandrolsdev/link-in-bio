import { getGithubEvents } from "@/lib/github";
import { GithubLogList } from "./GithubLogList";

export const GithubLog = async () => {
  // Busca os dados no servidor (Server Component)
  const events = await getGithubEvents();

  if (!events || events.length === 0) return null;

  // Passa para o componente Cliente que tem a interatividade
  return <GithubLogList events={events} />;
};