import { describe, expect, it } from "vitest";
import { makeNode } from "@/lib/drive/test-fixtures";
import { findFolderCourseCode } from "./folder-canonical";

describe("findFolderCourseCode", () => {
  it("maps a course's top-level folder to its course code", () => {
    const node = makeNode({
      courseCode: "ENGG515",
      depth: 1,
      id: "course",
      kind: "folder",
    });

    expect(findFolderCourseCode(node)).toBe("ENGG515");
  });

  it("leaves deeper folders alone", () => {
    const node = makeNode({
      courseCode: "ENGG515",
      depth: 2,
      id: "lectures",
      kind: "folder",
    });

    expect(findFolderCourseCode(node)).toBeNull();
  });

  it("leaves a code the curriculum does not list alone", () => {
    const node = makeNode({
      courseCode: "CENG999",
      depth: 1,
      id: "unknown",
      kind: "folder",
    });

    expect(findFolderCourseCode(node)).toBeNull();
  });

  it("handles a source root, which has no node", () => {
    expect(findFolderCourseCode(null)).toBeNull();
  });
});
