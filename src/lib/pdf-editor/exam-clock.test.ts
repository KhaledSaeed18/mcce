import { describe, expect, it } from "vitest";
import {
  formatCountdown,
  formatDuration,
  getRemaining,
  parseExam,
  startExam,
} from "./exam-clock";

describe("startExam", () => {
  it("ends the given number of minutes from now", () => {
    expect(startExam(45, 1000)).toEqual({
      endsAt: 1000 + 45 * 60_000,
      minutes: 45,
    });
  });
});

describe("getRemaining", () => {
  it("counts down to the end, and no further", () => {
    const session = startExam(1, 0);

    expect(getRemaining(session, 15_000)).toBe(45_000);
    expect(getRemaining(session, 90_000)).toBe(0);
  });
});

describe("formatCountdown", () => {
  it("reads minutes and seconds", () => {
    expect(formatCountdown(65_000)).toBe("01:05");
  });

  it("puts hours in front once there are any", () => {
    expect(formatCountdown(2 * 3_600_000 + 5 * 60_000)).toBe("2:05:00");
  });

  it("counts a part second as a whole one, so zero means time is up", () => {
    expect(formatCountdown(400)).toBe("00:01");
    expect(formatCountdown(0)).toBe("00:00");
  });
});

describe("formatDuration", () => {
  it("says a length in minutes, hours, or both", () => {
    expect(formatDuration(45)).toBe("45 min");
    expect(formatDuration(120)).toBe("2 h");
    expect(formatDuration(90)).toBe("1 h 30 min");
  });
});

describe("parseExam", () => {
  it("accepts a stored exam", () => {
    expect(parseExam({ endsAt: 5, minutes: 30 })).toEqual({
      endsAt: 5,
      minutes: 30,
    });
  });

  it("turns away anything else", () => {
    expect(parseExam(null)).toBeNull();
    expect(parseExam({ endsAt: "soon", minutes: 30 })).toBeNull();
    expect(parseExam([])).toBeNull();
  });
});
