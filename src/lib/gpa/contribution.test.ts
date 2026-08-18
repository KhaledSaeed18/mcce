import { describe, expect, it } from "vitest";
import { getSemesterTotals } from "./calculate";
import { getPeakContribution } from "./chart";
import { buildContributions } from "./contribution";
import type { GradeEntry } from "./types";

function entry(code: string, credits: number, average: number | null) {
  return { average, code, credits, id: code, name: `Course ${code}` };
}

/** The real MyLIU first-year record the scale was reverse-engineered from. */
const ENTRIES: GradeEntry[] = [
  entry("A", 3, 85),
  entry("B", 3, 78),
  entry("C", 3, 72),
  entry("D", 3, 74),
];

function build(entries: GradeEntry[]) {
  return buildContributions(entries, getSemesterTotals(entries));
}

describe("course contributions", () => {
  it("sums to zero, since the pulls are a split of one number", () => {
    const total = build(ENTRIES).reduce(
      (sum, item) => sum + item.contribution,
      0
    );

    expect(total).toBeCloseTo(0, 10);
  });

  it("sorts by pull, strongest lift first", () => {
    expect(build(ENTRIES).map((item) => item.code)).toEqual([
      "A",
      "B",
      "D",
      "C",
    ]);
  });

  it("puts courses above the cumulative GPA on the lifting side", () => {
    const contributions = build(ENTRIES);
    const lift = contributions.find((item) => item.code === "A");
    const drag = contributions.find((item) => item.code === "C");

    expect(lift?.contribution).toBeGreaterThan(0);
    expect(drag?.contribution).toBeLessThan(0);
  });

  it("weights a pull by credits, so a lab moves less than a course", () => {
    const entries = [entry("A", 3, 90), entry("B", 1, 90), entry("C", 3, 60)];
    const contributions = build(entries);
    const course = contributions.find((item) => item.code === "A");
    const lab = contributions.find((item) => item.code === "B");

    expect(course?.contribution).toBeCloseTo((lab?.contribution ?? 0) * 3, 10);
  });

  it("ignores ungraded rows", () => {
    const contributions = build([entry("A", 3, 85), entry("B", 3, null)]);

    expect(contributions.map((item) => item.code)).toEqual(["A"]);
  });

  it("returns nothing when no course is graded", () => {
    expect(build([entry("A", 3, null)])).toEqual([]);
  });

  it("reports the largest pull in either direction as the peak", () => {
    const contributions = build(ENTRIES);
    const peak = getPeakContribution(contributions);

    expect(peak).toBeCloseTo(Math.abs(contributions[0].contribution), 10);
  });

  it("has no peak when there is nothing to plot", () => {
    expect(getPeakContribution([])).toBe(0);
  });
});
