import { describe, expect, it } from "vitest";
import { isSvgDocument, sanitiseSvg } from "./svg";

describe("sanitiseSvg", () => {
  it("removes scripts, handlers, and external hrefs", () => {
    const dirty =
      '<svg onload="x()"><script>alert(1)</script><a href="https://evil"><path d="M0 0"/></a><use href="#g"/></svg>';
    expect(sanitiseSvg(dirty)).toBe(
      '<svg><a><path d="M0 0"/></a><use href="#g"/></svg>'
    );
  });
});

describe("isSvgDocument", () => {
  it("accepts an svg root and rejects html", () => {
    expect(isSvgDocument('<svg xmlns="http://www.w3.org/2000/svg"/>')).toBe(
      true
    );
    expect(isSvgDocument("<html><body>404</body></html>")).toBe(false);
  });
});
