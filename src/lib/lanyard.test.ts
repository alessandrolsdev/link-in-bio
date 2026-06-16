import { describe, expect, it } from "vitest";

import {
  parseLanyardPresenceData,
  parseLanyardRestUserResponse,
  parseLanyardSocketMessage,
} from "@/lib/lanyard";

describe("parseLanyardRestUserResponse", () => {
  it("extracts the Spotify slice used by Current Focus", () => {
    expect(
      parseLanyardRestUserResponse({
        success: true,
        data: {
          listening_to_spotify: true,
          spotify: {
            song: "Harder Better Faster Stronger",
            artist: "Daft Punk",
          },
        },
      })
    ).toEqual({
      success: true,
      data: {
        listening_to_spotify: true,
        spotify: {
          song: "Harder Better Faster Stronger",
          artist: "Daft Punk",
        },
      },
    });
  });
});

describe("parseLanyardPresenceData", () => {
  it("normalizes the presence payload consumed by the Discord widget", () => {
    expect(
      parseLanyardPresenceData({
        discord_user: {
          username: "alessandro",
          avatar: "avatar",
          id: "123",
          discriminator: "0",
        },
        discord_status: "online",
        active_on_discord_web: false,
        active_on_discord_desktop: true,
        active_on_discord_mobile: false,
        listening_to_spotify: false,
        spotify: null,
        activities: [
          {
            type: 0,
            name: "Visual Studio Code",
            details: "Editing",
            state: "TypeScript",
            timestamps: { start: 1, end: 2 },
            assets: { large_image: "vscode", small_image: "ts" },
          },
        ],
      })
    ).toMatchObject({
      discord_status: "online",
      activities: [
        {
          name: "Visual Studio Code",
          details: "Editing",
          state: "TypeScript",
        },
      ],
    });
  });
});

describe("parseLanyardSocketMessage", () => {
  it("accepts hello and dispatch messages only", () => {
    expect(
      parseLanyardSocketMessage({
        op: 1,
        d: { heartbeat_interval: 30000 },
      })
    ).toEqual({
      op: 1,
      d: { heartbeat_interval: 30000 },
    });

    expect(
      parseLanyardSocketMessage({
        op: 9,
      })
    ).toBeNull();
  });
});
