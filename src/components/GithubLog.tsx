import { getGithubEvents } from "@/lib/github";
import { Terminal } from "lucide-react";

import { GithubLogList } from "./GithubLogList";
import { WidgetStatus } from "./WidgetStatus";

export const GithubLog = async () => {
  // Busca os dados no servidor (Server Component)
  const events = await getGithubEvents();

  if (!events || events.length === 0) {
    return (
      <WidgetStatus
        icon={Terminal}
        label="GH_ACTIVITY"
        title="Sem eventos recentes"
        description="O feed público do GitHub não trouxe atividade nova neste ciclo."
        tone="green"
        variant="inline"
      />
    );
  }

  // Passa para o componente Cliente que tem a interatividade
  return <GithubLogList events={events} />;
};
