import { describe, expect, it } from "vitest";
import {
  CLIP_CLOSED_LIMIT,
  CLIP_LIMIT,
  CLIP_MARGIN,
  CLIP_START_WIDTH,
} from "@/config/pdf-editor";
import { type PointerTools, pickPointerTool } from "../pointer-tools";
import { findCardBox, findCardHeight } from "./clip-card-box";
import { addClip, closeClip, EMPTY_CLIP_DESK, reopenClip } from "./clip-desk";
import { forgetFileClips } from "./clip-desk-forget";
import { parseClipDesk } from "./clip-desk-parse";
import { findClipPageNumber } from "./clip-page-number";
import { placeCardAt, placeNewClip } from "./clip-place";
import { toRenderedBox } from "./rendered-box";
import { findSelectionClipBox } from "./selection-clip-box";
import type { EditorClip } from "./types";

function clip(id: string, change: Partial<EditorClip> = {}): EditorClip {
  return {
    aspect: 2,
    box: { height: 50, width: 100, x: 10, y: 20 },
    file: { id: "file", name: "Sheet.pdf", source: "drive" },
    id,
    isFolded: false,
    pageId: "p0",
    pageNumber: 1,
    place: { corner: "bottom-right", width: CLIP_START_WIDTH, x: 12, y: 12 },
    version: 0,
    ...change,
  };
}

const AREA = { height: 800, width: 1000 };

describe("clip desk", () => {
  it("closes the oldest clip once past the limit", () => {
    let desk = EMPTY_CLIP_DESK;
    for (let index = 0; index <= CLIP_LIMIT; index += 1) {
      ({ desk } = addClip(desk, clip(`c${index}`)));
    }
    expect(desk.clips).toHaveLength(CLIP_LIMIT);
    expect(desk.clips[0].id).toBe("c1");
    expect(desk.closed.map((item) => item.id)).toEqual(["c0"]);
  });

  it("lets go of closed clips past their limit, naming their pictures", () => {
    let desk = EMPTY_CLIP_DESK;
    let dropped: string[] = [];
    for (let index = 0; index <= CLIP_CLOSED_LIMIT; index += 1) {
      ({ desk } = addClip(desk, clip(`c${index}`)));
      ({ desk, dropped } = closeClip(desk, `c${index}`));
    }
    expect(desk.closed).toHaveLength(CLIP_CLOSED_LIMIT);
    expect(dropped).toEqual(["c0"]);
  });

  it("brings a closed clip back unfolded, on top, and shows hidden clips", () => {
    let { desk } = addClip(EMPTY_CLIP_DESK, clip("a", { isFolded: true }));
    ({ desk } = addClip(desk, clip("b")));
    ({ desk } = closeClip({ ...desk, isHidden: true }, "a"));

    const { desk: back } = reopenClip(desk, "a");

    expect(back.clips.map((item) => item.id)).toEqual(["b", "a"]);
    expect(back.clips[1].isFolded).toBe(false);
    expect(back.closed).toEqual([]);
    expect(back.isHidden).toBe(false);
  });
});

describe("forgetFileClips", () => {
  it("drops a file's clips, on screen and closed, naming their pictures", () => {
    const other = { id: "other", name: "Notes.pdf", source: "local" as const };
    let { desk } = addClip(EMPTY_CLIP_DESK, clip("a"));
    ({ desk } = addClip(desk, clip("b", { file: other })));
    ({ desk } = addClip(desk, clip("c")));
    ({ desk } = closeClip(desk, "c"));

    const change = forgetFileClips(desk, "file");

    expect(change.desk.clips.map((item) => item.id)).toEqual(["b"]);
    expect(change.desk.closed).toEqual([]);
    expect(change.dropped).toEqual(["a", "c"]);
  });
});

describe("parseClipDesk", () => {
  it("keeps clips that hold together and drops the rest", () => {
    const desk = parseClipDesk({
      clips: [clip("good"), { ...clip("bad"), box: null }, "nonsense"],
      closed: [{ ...clip("gone"), place: { corner: "middle" } }],
      isHidden: true,
    });
    expect(desk.clips.map((item) => item.id)).toEqual(["good"]);
    expect(desk.closed).toEqual([]);
    expect(desk.isHidden).toBe(true);
    expect(parseClipDesk(null)).toEqual(EMPTY_CLIP_DESK);
  });
});

describe("card places", () => {
  it("stacks a new card above the ones at the bottom right", () => {
    const below = clip("below");
    const place = placeNewClip([below, clip("folded", { isFolded: true })]);
    expect(place).toEqual({
      corner: "bottom-right",
      width: CLIP_START_WIDTH,
      x: CLIP_MARGIN,
      y: CLIP_MARGIN + findCardHeight(CLIP_START_WIDTH, 2) + CLIP_MARGIN,
    });
  });

  it("keeps a card to its corner as the pages change size", () => {
    const { place } = clip("a");
    const wide = findCardBox(place, 2, AREA, 0);
    const narrow = findCardBox(place, 2, { height: 600, width: 700 }, 0);
    expect(AREA.width - wide.x - wide.width).toBe(12);
    expect(700 - narrow.x - narrow.width).toBe(12);
    expect(600 - narrow.y - narrow.height).toBe(12);
  });

  it("settles a card at the nearest corner, snapping to edges it is near", () => {
    const place = placeCardAt(
      { height: 100, width: 200, x: 20, y: 300 },
      AREA,
      0
    );
    expect(place).toEqual({ corner: "top-left", width: 200, x: 12, y: 300 });
    const free = placeCardAt(
      { height: 100, width: 200, x: 20, y: 650 },
      AREA,
      0,
      false
    );
    expect(free).toEqual({ corner: "bottom-left", width: 200, x: 20, y: 50 });
  });
});

describe("toRenderedBox", () => {
  const size = { height: 800, width: 600 };
  const box = { height: 20, width: 100, x: 10, y: 30 };

  it("leaves an upright page alone and turns a turned one", () => {
    expect(toRenderedBox(box, size, 0)).toEqual(box);
    expect(toRenderedBox(box, size, 90)).toEqual({
      height: 100,
      width: 20,
      x: 750,
      y: 10,
    });
    expect(toRenderedBox(box, size, 180)).toEqual({
      height: 20,
      width: 100,
      x: 490,
      y: 750,
    });
  });
});

describe("findClipPageNumber", () => {
  const pages = [
    { id: "p2", rotation: 0, sourceIndex: 2 },
    { id: "p0", rotation: 0, sourceIndex: 0 },
  ];

  it("follows the page where it has moved, or knows it was removed", () => {
    expect(findClipPageNumber(clip("a"), pages)).toBe(2);
    expect(findClipPageNumber(clip("a", { pageId: "p1" }), pages)).toBeNull();
  });

  it("reads a file's own page from its id when the pages were never changed", () => {
    expect(findClipPageNumber(clip("a", { pageId: "p4" }), null)).toBe(5);
    expect(
      findClipPageNumber(clip("a", { pageId: "sheet", pageNumber: 7 }), null)
    ).toBe(7);
  });
});

describe("findSelectionClipBox", () => {
  it("takes the lines with a margin, kept on the page", () => {
    const box = findSelectionClipBox(
      [
        { height: 10, width: 50, x: 2, y: 100 },
        { height: 10, width: 80, x: 20, y: 112 },
      ],
      { height: 800, width: 90 }
    );
    expect(box).toEqual({ height: 34, width: 90, x: 0, y: 94 });
  });
});

describe("pickPointerTool", () => {
  const handlers = (name: string) => ({
    handleDown: () => name,
    handleMove: () => undefined,
    handleUp: () => undefined,
  });
  const tools = Object.fromEntries(
    ["clip", "eraser", "hand", "note", "shapes", "text"].map((name) => [
      name,
      handlers(name),
    ])
  ) as unknown as PointerTools;

  it("gives the clip tool its own handlers and shapes the rest", () => {
    expect(pickPointerTool("clip", tools)).toBe(tools.clip);
    expect(pickPointerTool("rect", tools)).toBe(tools.shapes);
    expect(pickPointerTool("select", tools)).not.toBe(tools.shapes);
  });
});
