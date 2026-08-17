import { describe, expect, it } from "vitest";
import { buildFacetOptions } from "./facets";
import { makeNode } from "./test-fixtures";

describe("buildFacetOptions", () => {
  it("collects distinct semesters and courses", () => {
    const nodes = [
      makeNode({
        courseCode: "EENG537",
        courseName: "Digital Communications",
        id: "1",
        semester: "Fall",
      }),
      makeNode({
        courseCode: "EENG537",
        courseName: "Digital Communications",
        id: "2",
        semester: "Fall",
      }),
      makeNode({
        courseCode: "CENG675",
        courseName: "Multimedia Networks",
        id: "3",
        semester: "Spring",
      }),
      makeNode({ id: "4" }),
    ];

    const facets = buildFacetOptions(nodes);

    expect(facets.semesters).toEqual([
      { label: "Fall", value: "Fall" },
      { label: "Spring", value: "Spring" },
    ]);
    expect(facets.courses).toEqual([
      { label: "CENG675", value: "CENG675" },
      { label: "EENG537", value: "EENG537" },
    ]);
  });

  it("collects distinct kinds", () => {
    const nodes = [
      makeNode({ id: "1", kind: "pdf" }),
      makeNode({ id: "2", kind: "pdf" }),
      makeNode({ id: "3", kind: "video" }),
    ];

    expect(buildFacetOptions(nodes).kinds).toEqual([
      { label: "pdf", value: "pdf" },
      { label: "video", value: "video" },
    ]);
  });

  it("orders material types by the configured order, not alphabetically", () => {
    const nodes = [
      makeNode({ id: "1", materialType: "exam" }),
      makeNode({ id: "2", materialType: "lecture" }),
      makeNode({ id: "3", materialType: "exam" }),
    ];

    expect(buildFacetOptions(nodes).materialTypes).toEqual([
      { label: "Lectures", value: "lecture" },
      { label: "Exams", value: "exam" },
    ]);
  });
});
