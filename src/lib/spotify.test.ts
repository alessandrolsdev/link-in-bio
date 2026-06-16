import { describe, expect, it } from "vitest";

import { parseNowPlayingPayload } from "@/lib/spotify";

describe("parseNowPlayingPayload", () => {
  it("extracts a stable now-playing view model", () => {
    expect(
      parseNowPlayingPayload({
        is_playing: true,
        item: {
          name: "Technologic",
          artists: [{ name: "Daft Punk" }],
          album: {
            images: [{ url: "https://i.scdn.co/image/cover" }],
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/123",
          },
        },
      })
    ).toEqual({
      isPlaying: true,
      title: "Technologic",
      artist: "Daft Punk",
      albumArt: "https://i.scdn.co/image/cover",
      songUrl: "https://open.spotify.com/track/123",
    });
  });

  it("rejects incomplete payloads", () => {
    expect(parseNowPlayingPayload({ is_playing: true })).toBeNull();
  });
});
