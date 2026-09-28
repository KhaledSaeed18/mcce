import { describe, expect, it } from "vitest";
import { closePane, focusPane, swapPanes } from "./pane-layout";
import { openInOtherPane, placeFile } from "./pane-search";

const EXAM = { id: "exam", source: "drive" } as const;
const SOLUTION = { id: "solution", source: "drive" } as const;
const NOTES = { id: "local-notes", source: "local" } as const;

const SPLIT = { beside: "solution", file: "exam" };
const SPLIT_BESIDE_FOCUSED = { ...SPLIT, focus: "beside" } as const;

describe("placeFile", () => {
  it("replaces the only file when the view is not split", () => {
    expect(placeFile({ file: "exam" }, NOTES)).toEqual({
      local: "local-notes",
    });
  });

  it("puts a file in the pane with focus and keeps the other", () => {
    expect(placeFile(SPLIT, NOTES)).toEqual({
      beside: "solution",
      local: "local-notes",
    });
    expect(placeFile(SPLIT_BESIDE_FOCUSED, NOTES)).toEqual({
      beside: "local-notes",
      file: "exam",
      focus: "beside",
    });
  });

  it("gives focus to the pane already showing the file", () => {
    expect(placeFile(SPLIT, SOLUTION)).toEqual(SPLIT_BESIDE_FOCUSED);
    expect(placeFile(SPLIT_BESIDE_FOCUSED, EXAM)).toEqual(SPLIT);
  });
});

describe("openInOtherPane", () => {
  it("splits the view with the file beside, and focuses it", () => {
    expect(openInOtherPane({ file: "exam" }, SOLUTION)).toEqual(
      SPLIT_BESIDE_FOCUSED
    );
  });

  it("uses the pane without focus once split", () => {
    expect(openInOtherPane(SPLIT_BESIDE_FOCUSED, NOTES)).toEqual({
      beside: "solution",
      local: "local-notes",
    });
  });

  it("does nothing for a file already on screen, or opens it with none", () => {
    expect(openInOtherPane({ file: "exam" }, EXAM)).toEqual({ file: "exam" });
    expect(openInOtherPane({}, EXAM)).toEqual({ file: "exam" });
  });
});

describe("pane layout", () => {
  it("closes either pane, leaving the other's file on its own", () => {
    expect(closePane(SPLIT_BESIDE_FOCUSED, "beside")).toEqual({ file: "exam" });
    expect(closePane(SPLIT, "primary")).toEqual({ file: "solution" });
    expect(
      closePane({ beside: "local-notes", file: "exam" }, "primary")
    ).toEqual({ local: "local-notes" });
    expect(closePane({ file: "exam" }, "primary")).toEqual({});
  });

  it("swaps the files and keeps focus with the file that had it", () => {
    expect(swapPanes(SPLIT)).toEqual({
      beside: "exam",
      file: "solution",
      focus: "beside",
    });
    expect(swapPanes(SPLIT_BESIDE_FOCUSED)).toEqual({
      beside: "exam",
      file: "solution",
    });
  });

  it("moves focus between the panes of a split only", () => {
    expect(focusPane(SPLIT, "beside")).toEqual(SPLIT_BESIDE_FOCUSED);
    expect(focusPane(SPLIT_BESIDE_FOCUSED, "primary")).toEqual(SPLIT);
    expect(focusPane({ file: "exam" }, "beside")).toEqual({ file: "exam" });
  });
});
