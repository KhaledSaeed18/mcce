import { describe, expect, it } from "vitest";
import { duplicatePage } from "./duplicate-page";
import { buildPages } from "./pages";
import type { Annotation, EditorSnapshot } from "./types";

function makeNote(pageId: string, id: string): Annotation {
  return {
    color: "#e63946",
    fontSize: 16,
    id,
    pageId,
    text: "note",
    type: "text",
    x: 10,
    y: 20,
  };
}

function makeSnapshot(): EditorSnapshot {
  return {
    annotations: [makeNote("p0", "a"), makeNote("p1", "b")],
    pages: buildPages(3),
  };
}

describe("duplicatePage", () => {
  it("puts the copy directly after the page it came from", () => {
    const { pages } = duplicatePage(makeSnapshot(), "p1");

    expect(pages).toHaveLength(4);
    expect(pages[1].id).toBe("p1");
    expect(pages[2].sourceIndex).toBe(1);
    expect(pages[3].id).toBe("p2");
  });

  it("gives the copy an identity of its own", () => {
    const { pages } = duplicatePage(makeSnapshot(), "p1");

    expect(pages[2].id).not.toBe("p1");
    expect(new Set(pages.map((page) => page.id)).size).toBe(pages.length);
  });

  it("keeps the turn the page had been given", () => {
    const snapshot = makeSnapshot();
    snapshot.pages[1].rotation = 90;

    expect(duplicatePage(snapshot, "p1").pages[2].rotation).toBe(90);
  });

  it("carries the markup over as markup of its own", () => {
    const { annotations, pages } = duplicatePage(makeSnapshot(), "p1");
    const copied = annotations.filter(
      (annotation) => annotation.pageId === pages[2].id
    );

    expect(copied).toHaveLength(1);
    expect(copied[0].id).not.toBe("b");
    expect(annotations.filter((a) => a.pageId === "p1")).toHaveLength(1);
  });

  it("leaves markup on other pages where it was", () => {
    const { annotations } = duplicatePage(makeSnapshot(), "p1");

    expect(annotations.filter((a) => a.pageId === "p0")).toHaveLength(1);
  });

  it("does nothing for a page that is not there", () => {
    const snapshot = makeSnapshot();

    expect(duplicatePage(snapshot, "nope")).toBe(snapshot);
  });
});
