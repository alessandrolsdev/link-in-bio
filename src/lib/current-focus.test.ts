import { describe, expect, it } from "vitest";

import { buildCurrentFocusPrompt } from "@/lib/current-focus";

describe("buildCurrentFocusPrompt", () => {
  it("combines commit, spotify context and time period into the service prompt", () => {
    const prompt = buildCurrentFocusPrompt(
      "refactor: move dashboard logic to services",
      {
        listeningToSpotify: true,
        song: "Voyager",
        artist: "Daft Punk",
      },
      "noite"
    );

    expect(prompt).toContain('Último commit: "refactor: move dashboard logic to services".');
    expect(prompt).toContain('Spotify: ouvindo "Voyager" — Daft Punk.');
    expect(prompt).toContain("Período do dia: noite.");
  });
});
