import { describe, expect, it } from "vitest";

import { parseWakatimeStatsResponse } from "@/lib/wakatime";

describe("parseWakatimeStatsResponse", () => {
  it("normalizes languages and coerces percentage values", () => {
    expect(
      parseWakatimeStatsResponse({
        data: {
          human_readable_total: "12 hrs 10 mins",
          languages: [
            { name: "TypeScript", text: "8 hrs", percent: "66.5" },
            { name: "Python", text: "4 hrs", percent: 33.5 },
          ],
        },
      })
    ).toEqual({
      humanReadableTotal: "12 hrs 10 mins",
      languages: [
        { name: "TypeScript", text: "8 hrs", percent: 66.5 },
        { name: "Python", text: "4 hrs", percent: 33.5 },
      ],
    });
  });

  it("returns null when no valid languages are present", () => {
    expect(
      parseWakatimeStatsResponse({
        data: {
          languages: [{ name: "TypeScript" }],
        },
      })
    ).toBeNull();
  });
});
