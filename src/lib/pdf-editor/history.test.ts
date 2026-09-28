import { describe, expect, it } from "vitest";
import { MAX_HISTORY_STEPS } from "@/config/pdf-editor";
import { commitStep, createHistory, redoStep, undoStep } from "./history";
import { buildPages } from "./pages";
import type { EditorSnapshot } from "./types";

function withPages(count: number): EditorSnapshot {
  return { annotations: [], pages: buildPages(count) };
}

describe("commitStep", () => {
  it("keeps what was on screen as a step back and clears the steps forward", () => {
    const first = withPages(1);
    const second = withPages(2);
    const history = { ...createHistory(first), future: [withPages(3)] };

    const next = commitStep(history, () => second);

    expect(next.present).toBe(second);
    expect(next.past).toEqual([first]);
    expect(next.future).toEqual([]);
  });

  it("hands back the same history for an edit that changes nothing", () => {
    const history = createHistory(withPages(1));

    expect(commitStep(history, (current) => ({ ...current }))).toBe(history);
  });

  it("drops the oldest step once there are more than it keeps", () => {
    let history = createHistory(withPages(0));
    for (let count = 1; count <= MAX_HISTORY_STEPS + 1; count += 1) {
      history = commitStep(history, () => withPages(count));
    }

    expect(history.past).toHaveLength(MAX_HISTORY_STEPS);
    expect(history.past[0].pages).toHaveLength(1);
  });
});

describe("undoStep and redoStep", () => {
  it("step back and forward through what was committed", () => {
    const first = withPages(1);
    const second = withPages(2);
    const edited = commitStep(createHistory(first), () => second);

    const undone = undoStep(edited);
    expect(undone.present).toBe(first);
    expect(undone.future).toEqual([second]);

    expect(redoStep(undone).present).toBe(second);
  });

  it("hand back the same history when there is nowhere to go", () => {
    const history = createHistory(withPages(1));

    expect(undoStep(history)).toBe(history);
    expect(redoStep(history)).toBe(history);
  });
});
