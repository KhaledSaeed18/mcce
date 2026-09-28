import { describe, expect, it } from "vitest";
import { readTabDragData, writeTabDragData } from "./tab-drag-data";

describe("tab drag data", () => {
  it("carries a file's id and where it lives", () => {
    const file = { id: "local-notes", source: "local" } as const;

    expect(readTabDragData(writeTabDragData(file))).toEqual(file);
  });

  it("turns away anything else", () => {
    expect(readTabDragData("not json")).toBeNull();
    expect(readTabDragData('{"id":3,"source":"drive"}')).toBeNull();
    expect(readTabDragData('{"id":"a","source":"cloud"}')).toBeNull();
  });
});
