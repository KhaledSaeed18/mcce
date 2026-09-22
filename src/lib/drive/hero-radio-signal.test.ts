import { describe, expect, it } from "vitest";
import {
  dialPercent,
  frequencyAt,
  nearestStation,
  positionFromDialPercent,
  signalStrength,
} from "./hero-radio-signal";

describe("signalStrength", () => {
  it("is full on a station and gone halfway between two", () => {
    expect(signalStrength(3)).toBe(1);
    expect(signalStrength(3.5)).toBe(0);
    expect(signalStrength(3.1)).toBeGreaterThan(signalStrength(3.2));
  });
});

describe("frequencyAt", () => {
  it("reads between the stations around the needle", () => {
    expect(frequencyAt(0.5, [500, 600, 700])).toBe(550);
    expect(frequencyAt(9, [500, 600, 700])).toBe(700);
  });
});

describe("dial mapping", () => {
  it("round-trips a position through the dial", () => {
    expect(positionFromDialPercent(dialPercent(4.25, 14), 14)).toBeCloseTo(
      4.25
    );
  });

  it("keeps the needle on the dial", () => {
    expect(nearestStation(-3, 14)).toBe(0);
    expect(nearestStation(40, 14)).toBe(13);
  });
});
