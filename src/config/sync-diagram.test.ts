import { describe, expect, it } from "vitest";
import {
  SYNC_FAN_DURATION,
  SYNC_FAN_STAGGER,
  SYNC_INDEX_DURATION,
  SYNC_LINK_ARROW_RANGE,
  SYNC_LINK_RANGE,
  SYNC_LINKED_INDEX,
  SYNC_ROWS,
  SYNC_SCAN_RANGE,
  SYNC_SHEETS,
} from "./sync-diagram";

/** The diagram reads as a sequence, so the stages have to stay in order. These
 * cover the orderings that are easy to break by nudging one number. */
describe("sync diagram timeline", () => {
  it("finishes fanning a sheet out before the scan reaches it", () => {
    for (const [index, sheet] of SYNC_SHEETS.entries()) {
      const fanEnd = index * SYNC_FAN_STAGGER + SYNC_FAN_DURATION;
      expect(fanEnd).toBeLessThan(sheet.indexAt);
    }
  });

  it("scans the sheets left to right", () => {
    const byX = [...SYNC_SHEETS].sort((left, right) => left.fanX - right.fanX);
    expect(byX.map((sheet) => sheet.indexAt)).toEqual(
      SYNC_SHEETS.map((sheet) => sheet.indexAt)
    );
  });

  it("indexes every sheet inside the scan pass", () => {
    const [scanStart, scanEnd] = SYNC_SCAN_RANGE;
    for (const sheet of SYNC_SHEETS) {
      expect(sheet.indexAt).toBeGreaterThanOrEqual(scanStart);
      expect(sheet.indexAt + SYNC_INDEX_DURATION).toBeLessThanOrEqual(scanEnd);
    }
  });

  it("draws the link only after the last row is written", () => {
    const lastWrite = Math.max(
      ...SYNC_SHEETS.map((sheet) => sheet.indexAt + SYNC_INDEX_DURATION)
    );
    expect(SYNC_LINK_RANGE[0]).toBeGreaterThanOrEqual(lastWrite);
    expect(SYNC_LINK_ARROW_RANGE[1]).toBeLessThanOrEqual(1);
  });

  it("gives every sheet a row to be written into", () => {
    expect(SYNC_ROWS).toHaveLength(SYNC_SHEETS.length);
    expect(SYNC_LINKED_INDEX).toBeLessThan(SYNC_SHEETS.length);
  });
});
