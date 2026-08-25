import { describe, expect, it } from "vitest";
import type { LoopingProgress } from "@/hooks/use-looping-progress";
import { PLAN_MARK_LOOP } from "./plan-mark";
import { SYNC_LOOP } from "./sync-diagram";

const LOOPS: [string, LoopingProgress][] = [
  ["sync diagram", SYNC_LOOP],
  ["plan mark", PLAN_MARK_LOOP],
];

/** Every looping drawing rewinds to its rest state mid-cycle. If that rewind
 * drifts outside the blanked window the reader sees the animation snap
 * backwards, which is the one failure these configs can hide. */
describe.each(LOOPS)("%s loop", (_name, loop) => {
  it("pairs every keyframe with a time", () => {
    expect(loop.progress).toHaveLength(loop.progressTimes.length);
    expect(loop.opacity).toHaveLength(loop.opacityTimes.length);
  });

  it("runs its times in order from 0 to 1", () => {
    for (const times of [loop.progressTimes, loop.opacityTimes]) {
      expect(times.at(0)).toBe(0);
      expect(times.at(-1)).toBe(1);
      expect([...times]).toEqual([...times].sort((a, b) => a - b));
    }
  });

  it("rewinds only while blanked out", () => {
    const [, , resetFrom, resetUntil] = loop.progressTimes;
    const [, , blankFrom, blankUntil] = loop.opacityTimes;

    expect(loop.opacity[2]).toBe(0);
    expect(resetFrom).toBeGreaterThanOrEqual(blankFrom);
    expect(resetUntil).toBeLessThanOrEqual(blankUntil);
  });

  it("starts and ends on the same visible rest state", () => {
    expect(loop.progress.at(0)).toBe(loop.progress.at(-1));
    expect(loop.opacity.at(0)).toBe(loop.opacity.at(-1));
  });
});
