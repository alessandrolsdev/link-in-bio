import { describe, expect, it } from "vitest";

import { buildNexusPrompt } from "@/lib/chat";

describe("buildNexusPrompt", () => {
  it("embeds the user message into the NEXUS_AI prompt", () => {
    const prompt = buildNexusPrompt("Quem é ele?");

    expect(prompt).toContain("[INPUT DO USUÁRIO]: \"Quem é ele?\"");
    expect(prompt).toContain("Responda como NEXUS_AI");
  });
});
