import { type GithubProfile, getGithubProfile } from "@/lib/github";
import { getCurrentFocusStatus } from "@/lib/current-focus";

export interface NexusControlPanelViewModel {
  githubProfile: GithubProfile | null;
  currentFocusStatus: string;
}

export async function getNexusControlPanelViewModel(): Promise<NexusControlPanelViewModel> {
  const [githubProfile, currentFocusStatus] = await Promise.all([
    getGithubProfile(),
    getCurrentFocusStatus(),
  ]);

  return {
    githubProfile,
    currentFocusStatus,
  };
}
