import { describe, expect, it } from "vitest";
import { formatNodeContext, formatNodePath } from "./node-path";
import { makeNode } from "./test-fixtures";

const nested = makeNode({
  courseCode: "EENG537",
  id: "matlab",
  kind: "folder",
  name: "MATLAB codes",
  pathNames: [
    "First Year | Fall Semester",
    "EENG537 - Digital Communications",
    "Materials",
    "Lecture 6",
    "MATLAB codes",
  ],
});

describe("formatNodePath", () => {
  it("drops the node itself", () => {
    expect(formatNodePath(nested)).toBe(
      "First Year | Fall Semester / EENG537 - Digital Communications / Materials / Lecture 6"
    );
  });
});

describe("formatNodeContext", () => {
  it("names the course and the folder the node sits in", () => {
    expect(formatNodeContext(nested)).toBe("EENG537 · Lecture 6");
  });

  it("does not repeat the code when the parent is the course folder", () => {
    const node = makeNode({
      courseCode: "EENG537",
      id: "direct",
      name: "syllabus.pdf",
      pathNames: [
        "First Year | Fall Semester",
        "EENG537 - Digital Communications",
        "syllabus.pdf",
      ],
    });

    expect(formatNodeContext(node)).toBe("EENG537");
  });

  it("falls back to the parent folder when there is no course", () => {
    const node = makeNode({
      id: "top",
      name: "MCCE-PlanOfStudy.pdf",
      pathNames: ["First Year", "MCCE-PlanOfStudy.pdf"],
    });

    expect(formatNodeContext(node)).toBe("First Year");
  });
});
