import { describe, expect, it } from "vitest";
import { buildGradesCsv } from "./csv";
import type { GpaExportPayload } from "./types";

function makePayload(
  courses: GpaExportPayload["semesters"][number]["courses"]
): GpaExportPayload {
  return {
    contributions: [],
    cumulative: { credits: 3, gpa: 3.5, qualityPoints: 10.5 },
    degreeCredits: 52,
    generatedAt: "2026-08-16T00:00:00.000Z",
    projection: null,
    semesters: [
      {
        courses,
        credits: 3,
        cumulativeGpa: 3.5,
        gpa: 3.5,
        label: "First Year, Fall Semester",
        qualityPoints: 10.5,
      },
    ],
    standing: "Excellent",
    target: null,
    targetGpa: 3,
    trend: [],
  };
}

describe("grades csv", () => {
  it("quotes a course name containing a comma so it stays one column", () => {
    const csv = buildGradesCsv(
      makePayload([
        {
          average: 85,
          code: "CENG625",
          credits: 3,
          name: "Cryptography, Advanced",
          qualityPoints: 3.5,
        },
      ])
    );
    const columns = csv.split("\r\n")[1].split('","');

    expect(columns).toHaveLength(8);
    expect(csv).toContain('"Cryptography, Advanced"');
  });

  it("escapes an embedded quote by doubling it", () => {
    const csv = buildGradesCsv(
      makePayload([
        {
          average: null,
          code: "TEST",
          credits: 3,
          name: 'The "Hard" One',
          qualityPoints: null,
        },
      ])
    );

    expect(csv).toContain('"The ""Hard"" One"');
  });

  it("leaves an ungraded course empty rather than writing a zero", () => {
    const csv = buildGradesCsv(
      makePayload([
        {
          average: null,
          code: "TEST",
          credits: 3,
          name: "Ungraded",
          qualityPoints: null,
        },
      ])
    );

    expect(csv).not.toContain('"0"');
    expect(csv.split("\r\n")[1]).toContain('"","",');
  });

  it("starts with a BOM so Excel reads it as UTF-8", () => {
    const csv = buildGradesCsv(makePayload([]));

    expect(csv.charCodeAt(0)).toBe(0xfe_ff);
  });
});
