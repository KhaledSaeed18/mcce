import { describe, expect, it } from "vitest";
import { classifyKind, parseCourseFolderName } from "./classify";

describe("classifyKind", () => {
  it("reads plain text formats Drive can render", () => {
    expect(classifyKind("text/plain", "Installation.txt")).toBe("text");
    expect(classifyKind("text/rtf", "README.rtf")).toBe("text");
    expect(classifyKind("text/x-objcsrc", "pulseshape2.m")).toBe("text");
  });

  it("keeps a native Google Doc a doc, whatever the file is called", () => {
    expect(
      classifyKind("application/vnd.google-apps.document", "README.rtf")
    ).toBe("doc");
  });

  it("keeps csv a spreadsheet rather than text", () => {
    expect(classifyKind("text/csv", "grades.csv")).toBe("sheet");
  });

  it("falls back to other for formats with no viewer", () => {
    expect(classifyKind("application/zip", "bundle.zip")).toBe("archive");
    expect(classifyKind("application/octet-stream", "firmware.bin")).toBe(
      "other"
    );
  });
});

describe("parseCourseFolderName", () => {
  it("splits a course folder into code and name", () => {
    expect(parseCourseFolderName("CENG507 - Embedded Systems")).toEqual({
      courseCode: "CENG507",
      courseName: "Embedded Systems",
    });
  });

  it("returns nulls for a folder that is not a course", () => {
    expect(parseCourseFolderName("Materials")).toEqual({
      courseCode: null,
      courseName: null,
    });
  });
});
