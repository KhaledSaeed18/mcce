import { describe, expect, it } from "vitest";
import { CLOSED_TAB_LIMIT, EDITOR_TAB_LIMIT } from "@/config/pdf-editor";
import { closeFile, EMPTY_DESK, showFile } from "./desk";
import { findNextFile, findSiblingFile, moveFile } from "./desk-order";
import { parseDesk } from "./desk-storage";
import type { EditorDesk, OpenFile } from "./types";

function file(id: string): OpenFile {
  return { id, name: `${id}.pdf`, source: "drive" };
}

function openAll(fileIds: string[]): EditorDesk {
  return fileIds.reduce((desk, id) => showFile(desk, file(id)), EMPTY_DESK);
}

function ids(files: OpenFile[]): string[] {
  return files.map((item) => item.id);
}

describe("showFile", () => {
  it("puts a new file right after the tab shown before it", () => {
    let desk = openAll(["a", "b", "c"]);
    desk = showFile(desk, file("a"));
    desk = showFile(desk, file("d"));

    expect(ids(desk.files)).toEqual(["a", "d", "b", "c"]);
    expect(desk.recent).toEqual(["d", "a", "c", "b"]);
  });

  it("hands back the same desk when the file is already in front", () => {
    const desk = openAll(["a"]);

    expect(showFile(desk, file("a"))).toBe(desk);
  });

  it("takes a name that arrives later, and ignores an empty one", () => {
    const desk = showFile(EMPTY_DESK, { id: "a", name: "", source: "local" });
    const named = showFile(desk, {
      id: "a",
      name: "Notes.pdf",
      source: "local",
    });

    expect(named.files[0].name).toBe("Notes.pdf");
    expect(showFile(named, { id: "a", name: "", source: "local" })).toBe(named);
  });

  it("closes the tab gone longest unseen past the limit", () => {
    const opened = Array.from({ length: EDITOR_TAB_LIMIT }, (_, i) => `f${i}`);
    let desk = openAll(opened);
    desk = showFile(desk, file("f0"));
    desk = showFile(desk, file("new"));

    expect(desk.files).toHaveLength(EDITOR_TAB_LIMIT);
    expect(ids(desk.files)).not.toContain("f1");
    expect(ids(desk.closed)[0]).toBe("f1");
  });

  it("takes a reopened file off the closed list", () => {
    const desk = showFile(closeFile(openAll(["a", "b"]), "a"), file("a"));

    expect(desk.closed).toEqual([]);
  });
});

describe("closeFile", () => {
  it("keeps closed tabs newest first, up to the limit", () => {
    const opened = Array.from(
      { length: CLOSED_TAB_LIMIT + 2 },
      (_, i) => `f${i}`
    );
    const desk = opened.reduce(closeFile, openAll(opened));

    expect(desk.files).toEqual([]);
    expect(desk.closed).toHaveLength(CLOSED_TAB_LIMIT);
    expect(desk.closed[0].id).toBe(opened.at(-1));
  });
});

describe("moving between tabs", () => {
  it("moves a tab to a new place", () => {
    expect(ids(moveFile(openAll(["a", "b", "c"]), 0, 2).files)).toEqual([
      "b",
      "c",
      "a",
    ]);
  });

  it("goes to the file seen before the one closing", () => {
    const desk = showFile(openAll(["a", "b", "c"]), file("a"));

    expect(findNextFile(desk, "a")?.id).toBe("c");
    expect(findNextFile(openAll(["a"]), "a")).toBeNull();
  });

  it("steps along the tabs and comes round at the ends", () => {
    const desk = openAll(["a", "b", "c"]);

    expect(findSiblingFile(desk, "c", 1)?.id).toBe("a");
    expect(findSiblingFile(desk, "a", -1)?.id).toBe("c");
  });
});

describe("parseDesk", () => {
  it("drops what does not fit and recent ids with no tab", () => {
    const desk = parseDesk({
      closed: "nope",
      files: [file("a"), { id: 3 }, { id: "b", name: "b", source: "cloud" }],
      recent: ["a", "gone", 7],
    });

    expect(desk).toEqual({ closed: [], files: [file("a")], recent: ["a"] });
    expect(parseDesk(null)).toEqual(EMPTY_DESK);
  });
});
