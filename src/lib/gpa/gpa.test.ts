import { describe, expect, it } from "vitest";
import { MCCE_DEGREE_CREDITS } from "@/config/gpa";
import { getSemesterTotals } from "./calculate";
import { project } from "./projection";
import {
  getAverageForQualityPoints,
  getQualityPoints,
  isPassing,
} from "./scale";
import { canGraduate, formatGpa, getStanding } from "./standing";
import { solveTarget } from "./target";
import type { GpaTotals, GradeEntry } from "./types";

function entry(credits: number, average: number | null): GradeEntry {
  return {
    average,
    code: `TEST-${credits}-${average}`,
    credits,
    id: `${credits}-${average}`,
    name: "Test",
  };
}

function totals(gpa: number, credits: number): GpaTotals {
  return { credits, gpa, qualityPoints: gpa * credits };
}

/** The real MyLIU first-year record this scale was reverse-engineered from. */
const FALL = [entry(3, 85), entry(3, 78), entry(3, 72), entry(3, 74)];
const SPRING = [
  entry(3, 86),
  entry(3, 77),
  entry(3, 97),
  entry(3, 83),
  entry(1, 91),
];

describe("quality point scale", () => {
  it("matches the catalogue anchors", () => {
    expect(getQualityPoints(70)).toBe(2);
    expect(getQualityPoints(75)).toBe(2.5);
    expect(getQualityPoints(80)).toBe(3);
  });

  it("is continuous between the anchors, not banded", () => {
    expect(getQualityPoints(87)).toBeCloseTo(3.7, 10);
    expect(getQualityPoints(89)).toBeCloseTo(3.9, 10);
    expect(getQualityPoints(78)).toBeCloseTo(2.8, 10);
  });

  it("flattens at 4.0 from 90 upward", () => {
    expect(getQualityPoints(90)).toBe(4);
    expect(getQualityPoints(97)).toBe(4);
    expect(getQualityPoints(100)).toBe(4);
  });

  it("gives a failing course no quality points", () => {
    expect(getQualityPoints(60)).toBe(1);
    expect(getQualityPoints(59)).toBe(0);
    expect(getQualityPoints(0)).toBe(0);
    expect(isPassing(60)).toBe(true);
    expect(isPassing(59)).toBe(false);
  });

  it("inverts back to a course average", () => {
    expect(getAverageForQualityPoints(3.5)).toBeCloseTo(85, 10);
    expect(getAverageForQualityPoints(2)).toBeCloseTo(70, 10);
  });
});

describe("against the MyLIU transcript", () => {
  it("reproduces the fall semester GPA", () => {
    const result = getSemesterTotals(FALL);

    expect(result.credits).toBe(12);
    expect(result.qualityPoints).toBeCloseTo(32.7, 10);
    expect(formatGpa(result.gpa ?? 0)).toBe("2.72");
  });

  it("reproduces the spring semester GPA", () => {
    const result = getSemesterTotals(SPRING);

    expect(result.credits).toBe(13);
    expect(result.qualityPoints).toBeCloseTo(44.8, 10);
    expect(formatGpa(result.gpa ?? 0)).toBe("3.44");
  });

  it("reproduces the cumulative GPA", () => {
    const result = getSemesterTotals([...FALL, ...SPRING]);

    expect(result.credits).toBe(25);
    expect(result.qualityPoints).toBeCloseTo(77.5, 10);
    expect(formatGpa(result.gpa ?? 0)).toBe("3.10");
  });

  it("truncates like MyLIU rather than rounding up", () => {
    // The fall semester lands on exactly 2.725.
    expect(formatGpa(2.725)).toBe("2.72");
    expect(formatGpa(3.446_15)).toBe("3.44");
  });
});

describe("semester totals", () => {
  it("ignores rows with no average yet", () => {
    expect(getSemesterTotals([entry(3, null)]).credits).toBe(0);
    expect(getSemesterTotals([]).gpa).toBeNull();
  });

  it("counts a failed course in credits attempted", () => {
    const result = getSemesterTotals([entry(3, 90), entry(3, 40)]);

    expect(result.credits).toBe(6);
    expect(result.gpa).toBeCloseTo(2, 10);
  });

  it("is not the mean of the two semester GPAs", () => {
    const combined = getSemesterTotals([entry(1, 90), entry(9, 70)]);

    expect(combined.gpa).toBeCloseTo(2.2, 10);
  });
});

describe("projection", () => {
  it("caps the ceiling below 4.0 once credits are locked in", () => {
    const cumulative = getSemesterTotals([...FALL, ...SPRING]);
    const result = project(cumulative, MCCE_DEGREE_CREDITS);

    expect(result?.creditsRemaining).toBe(27);
    expect(result?.bestCase).toBeCloseTo((77.5 + 108) / 52, 10);
    expect(result?.worstCasePassing).toBeCloseTo((77.5 + 27) / 52, 10);
  });

  it("returns null when the degree is already complete", () => {
    expect(project(totals(3, 52), MCCE_DEGREE_CREDITS)).toBeNull();
  });
});

describe("target solver", () => {
  it("resolves a target to one required course average", () => {
    const cumulative = getSemesterTotals([...FALL, ...SPRING]);
    const result = solveTarget(cumulative, MCCE_DEGREE_CREDITS, 3.5);

    // (3.5 * 52 - 77.5) / 27 = 3.87037 quality points, so an 88.7 average.
    expect(result?.kind).toBe("achievable");
    expect(result?.requiredAverageQpt).toBeCloseTo(3.870_37, 5);
    expect(result?.requiredAverage).toBeCloseTo(88.7037, 4);
  });

  it("verifies the required average actually reaches the target", () => {
    const cumulative = getSemesterTotals([...FALL, ...SPRING]);
    const result = solveTarget(cumulative, MCCE_DEGREE_CREDITS, 3.5);
    if (result === null) {
      throw new Error("expected a solvable target");
    }

    const earned = getQualityPoints(result.requiredAverage) * 27;

    expect((cumulative.qualityPoints + earned) / 52).toBeCloseTo(3.5, 10);
  });

  it("reports an out-of-reach target", () => {
    const result = solveTarget(totals(2, 40), MCCE_DEGREE_CREDITS, 3.9);

    expect(result?.kind).toBe("impossible");
    expect(result?.requiredAverageQpt).toBeGreaterThan(4);
  });

  it("reports a target already locked in by passing everything", () => {
    expect(solveTarget(totals(3.9, 40), MCCE_DEGREE_CREDITS, 2)?.kind).toBe(
      "guaranteed"
    );
  });
});

describe("academic standing", () => {
  it("labels a 3.10 cumulative the way MyLIU does", () => {
    expect(getStanding(3.1).label).toBe("Very good");
  });

  it("maps the remaining status bands", () => {
    expect(getStanding(3.5).label).toBe("Excellent");
    expect(getStanding(2.5).label).toBe("Good");
    expect(getStanding(2).label).toBe("Fair");
    expect(getStanding(1.99).label).toBe("Probation");
  });

  it("uses the School of Engineering 2.0 graduation threshold", () => {
    expect(canGraduate(2)).toBe(true);
    expect(canGraduate(1.99)).toBe(false);
  });
});
