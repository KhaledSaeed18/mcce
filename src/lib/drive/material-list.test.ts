import { describe, expect, it } from "vitest";
import { countMaterialFiles, formatMaterialList } from "./material-list";
import { makeNode } from "./test-fixtures";
import type { CourseMaterialGroup } from "./types";

const GROUPS: CourseMaterialGroup[] = [
  {
    items: [makeNode({ id: "l1" }), makeNode({ id: "l2" })],
    label: "Lectures",
    type: "lecture",
  },
  { items: [makeNode({ id: "e1" })], label: "Exams", type: "exam" },
  { items: [makeNode({ id: "x1" })], label: "Labs", type: "lab" },
  { items: [makeNode({ id: "o1" })], label: "Other", type: "other" },
];

describe("formatMaterialList", () => {
  it("lists the kinds as prose and leaves out other", () => {
    expect(formatMaterialList(GROUPS)).toBe("lectures, exams, and labs");
  });

  it("returns null when only other files exist", () => {
    expect(formatMaterialList(GROUPS.slice(3))).toBeNull();
  });
});

describe("countMaterialFiles", () => {
  it("counts every file, other included", () => {
    expect(countMaterialFiles(GROUPS)).toBe(5);
  });
});
