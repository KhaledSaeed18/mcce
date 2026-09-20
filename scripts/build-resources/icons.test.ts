import { describe, expect, it } from "vitest";
import { indexSvglByTitle } from "./icons";

describe("indexSvglByTitle", () => {
  it("matches titles case-insensitively and keeps the first duplicate", () => {
    const index = indexSvglByTitle([
      { route: "a.svg", title: "Photoshop" },
      { route: "b.svg", title: "Photoshop" },
      { route: { dark: "d.svg", light: "l.svg" }, title: "GitHub" },
    ]);
    expect(index.get("photoshop")?.route).toBe("a.svg");
    expect(index.get("github")?.route).toEqual({
      dark: "d.svg",
      light: "l.svg",
    });
  });
});
