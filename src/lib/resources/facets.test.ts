import { describe, expect, it } from "vitest";
import { countByBadge } from "./facets";
import { makeTool } from "./test-fixtures";

describe("countByBadge", () => {
  it("counts access badges and the open source flag separately", () => {
    const counts = countByBadge([
      makeTool({ access: "free", isOpenSource: true, name: "A" }),
      makeTool({ access: "free", name: "B" }),
      makeTool({ access: "student", name: "C" }),
    ]);
    expect(counts.free).toBe(2);
    expect(counts["open-source"]).toBe(1);
    expect(counts.student).toBe(1);
    expect(counts.paid).toBe(0);
  });
});
