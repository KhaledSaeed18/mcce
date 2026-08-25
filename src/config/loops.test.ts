import { describe, expect, it } from "vitest";
import type { LoopingProgress } from "@/hooks/use-looping-progress";
import { ABOUT_MARK_LOOP } from "./about-mark";
import { ADMISSIONS_MARK_LOOP } from "./admissions-mark";
import { CCE_MARK_LOOP } from "./cce-mark";
import { CONTACT_MARK_LOOP } from "./contact-mark";
import { EXAMS_MARK_LOOP } from "./exams-mark";
import { GPA_MARK_LOOP } from "./gpa-mark";
import { LEGAL_MARK_LOOP } from "./legal-mark";
import { PLAN_MARK_LOOP } from "./plan-mark";
import { RECENT_MARK_LOOP } from "./recent-mark";
import { SAVED_MARK_LOOP } from "./saved-mark";
import { SITEMAP_MARK_LOOP } from "./sitemap-mark";
import { SYNC_LOOP } from "./sync-diagram";
import { TUITION_MARK_LOOP } from "./tuition-mark";

const LOOPS: [string, LoopingProgress][] = [
  ["sync diagram", SYNC_LOOP],
  ["plan mark", PLAN_MARK_LOOP],
  ["contact mark", CONTACT_MARK_LOOP],
  ["about mark", ABOUT_MARK_LOOP],
  ["gpa mark", GPA_MARK_LOOP],
  ["tuition mark", TUITION_MARK_LOOP],
  ["admissions mark", ADMISSIONS_MARK_LOOP],
  ["legal mark", LEGAL_MARK_LOOP],
  ["sitemap mark", SITEMAP_MARK_LOOP],
  ["cce mark", CCE_MARK_LOOP],
  ["saved mark", SAVED_MARK_LOOP],
  ["recent mark", RECENT_MARK_LOOP],
  ["exams mark", EXAMS_MARK_LOOP],
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
