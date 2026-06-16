import { describe, expect, it } from "vitest";

import {
  calculateMood,
  parseGithubEventsResponse,
  parseGithubProfile,
} from "@/lib/github";

describe("parseGithubEventsResponse", () => {
  it("maps supported GitHub events into internal view models", () => {
    const events = parseGithubEventsResponse([
      {
        id: "1",
        type: "PushEvent",
        created_at: "2026-06-15T10:00:00Z",
        repo: { name: "alessandrolsdev/link-in-bio" },
        payload: {
          commits: [{ message: "fix: tighten contracts" }],
        },
      },
      {
        id: "2",
        type: "ForkEvent",
        created_at: "2026-06-15T11:00:00Z",
        repo: { name: "alessandrolsdev/ignored" },
        payload: {},
      },
    ]);

    expect(events).toEqual([
      {
        id: "1",
        type: "PushEvent",
        repo: "link-in-bio",
        date: "2026-06-15T10:00:00Z",
        message: "fix: tighten contracts",
      },
    ]);
  });
});

describe("parseGithubProfile", () => {
  it("normalizes the GitHub profile payload", () => {
    expect(
      parseGithubProfile({
        login: "alessandrolsdev",
        html_url: "https://github.com/alessandrolsdev",
        public_repos: 42,
        followers: 7,
      })
    ).toEqual({
      login: "alessandrolsdev",
      htmlUrl: "https://github.com/alessandrolsdev",
      publicRepos: 42,
      followers: 7,
    });
  });
});

describe("calculateMood", () => {
  it("keeps the public mood thresholds stable", () => {
    expect(calculateMood(0).level).toBe("ZEN MODE");
    expect(calculateMood(6).level).toBe("FLOW STATE");
    expect(calculateMood(31).level).toBe("GOD MODE");
  });
});
