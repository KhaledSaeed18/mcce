import { afterEach, describe, expect, it, vi } from "vitest";
import { commitStep, EMPTY_HISTORY, undoStep } from "./history";
import {
  forgetHistory,
  openHistory,
  readHistory,
  subscribeHistory,
  updateHistory,
} from "./history-store";
import { buildPages } from "./pages";

const FILE_A = "file-a";
const FILE_B = "file-b";

afterEach(() => {
  forgetHistory(FILE_A);
  forgetHistory(FILE_B);
});

describe("history store", () => {
  it("reads a file it does not hold as the empty history itself", () => {
    expect(readHistory(FILE_A)).toBe(EMPTY_HISTORY);
    expect(readHistory(undefined)).toBe(EMPTY_HISTORY);
  });

  it("keeps each file's steps apart", () => {
    openHistory(FILE_A, { annotations: [], pages: buildPages(1) });
    openHistory(FILE_B, { annotations: [], pages: buildPages(2) });

    updateHistory(FILE_A, (history) =>
      commitStep(history, () => ({ annotations: [], pages: buildPages(3) }))
    );

    expect(readHistory(FILE_A).past).toHaveLength(1);
    expect(readHistory(FILE_B).past).toHaveLength(0);
  });

  it("leaves a file alone until it is opened", () => {
    updateHistory(FILE_A, (history) =>
      commitStep(history, () => ({ annotations: [], pages: buildPages(1) }))
    );

    expect(readHistory(FILE_A)).toBe(EMPTY_HISTORY);
  });

  it("tells listeners about a change, and not about a step that changes nothing", () => {
    openHistory(FILE_A, { annotations: [], pages: buildPages(1) });
    const listener = vi.fn();
    const unsubscribe = subscribeHistory(listener);

    updateHistory(FILE_A, undoStep);
    expect(listener).not.toHaveBeenCalled();

    forgetHistory(FILE_A);
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
  });
});
