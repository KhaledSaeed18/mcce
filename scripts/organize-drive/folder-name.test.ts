import { describe, expect, it } from "vitest";
import { normaliseFolderName } from "./folder-name";

describe("normaliseFolderName", () => {
  it("pads a number so Drive orders Lecture 10 after Lecture 2", () => {
    expect(normaliseFolderName("Lecture1")).toBe("Lecture 01");
    expect(normaliseFolderName("Lecture 10")).toBe("Lecture 10");
    expect(normaliseFolderName("Chapter 1")).toBe("Chapter 01");
  });

  it("pads both ends of a folder covering two lectures", () => {
    expect(normaliseFolderName("Lecture4&5")).toBe("Lecture 04-05");
  });

  it("folds the MATLAB spellings into one", () => {
    expect(normaliseFolderName("MATLAB codes")).toBe("MATLAB");
    expect(normaliseFolderName("MATLAB-files")).toBe("MATLAB");
    expect(normaliseFolderName("MATLAB")).toBe("MATLAB");
  });

  it("drops a bracketed prefix", () => {
    expect(normaliseFolderName("[Exercise]Z-Transform")).toBe("Z-Transform");
  });

  it("leaves a name that is already canonical", () => {
    expect(normaliseFolderName("Exercises")).toBe("Exercises");
    expect(normaliseFolderName("Paper Based")).toBe("Paper Based");
  });
});
