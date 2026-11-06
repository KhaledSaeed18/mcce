import { describe, expect, it } from "vitest";
import {
  buildSemesterFolders,
  formatSemesterFolderLabel,
} from "./semester-folders";
import { makeNode } from "./test-fixtures";

const FALL_ONE = "First Year | Fall Semester";
const SPRING_ONE = "First Year | Spring Semester";
const FALL_TWO = "Second Year | Fall Semester";

const folder = (id: string, name: string) =>
  makeNode({ depth: 0, id, kind: "folder", name, semester: name });

describe("buildSemesterFolders", () => {
  it("orders by year, then fall before spring", () => {
    const folders = buildSemesterFolders([
      folder("c", FALL_TWO),
      folder("b", SPRING_ONE),
      folder("a", FALL_ONE),
    ]);

    expect(folders.map(({ id }) => id)).toEqual(["a", "b", "c"]);
    expect(folders[1]).toMatchObject({ term: "Spring", year: 1 });
  });

  it("counts files and distinct courses, not subfolders", () => {
    const [semester] = buildSemesterFolders([
      folder("a", FALL_ONE),
      makeNode({
        courseCode: "ENGG515",
        courseName: "Advanced Engineering Mathematics",
        id: "course",
        kind: "folder",
        semester: FALL_ONE,
      }),
      makeNode({
        courseCode: "ENGG515",
        courseName: "Advanced Engineering Mathematics",
        id: "one",
        kind: "pdf",
        semester: FALL_ONE,
      }),
      makeNode({
        courseCode: "CENG507",
        courseName: "Embedded Systems",
        id: "two",
        kind: "video",
        semester: FALL_ONE,
      }),
      makeNode({
        courseCode: "CENG566",
        courseName: "Machine Learning",
        id: "elsewhere",
        kind: "pdf",
        semester: SPRING_ONE,
      }),
    ]);

    expect(semester.fileCount).toBe(2);
    expect(semester.courses).toEqual([
      { code: "CENG507", name: "Embedded Systems" },
      { code: "ENGG515", name: "Advanced Engineering Mathematics" },
    ]);
  });

  it("links straight to the folder in Drive", () => {
    const [semester] = buildSemesterFolders([folder("a", FALL_ONE)]);

    expect(semester.href).toBe("https://drive.google.com/drive/folders/a");
  });

  it("skips top-level folders that are not semesters, and nested lookalikes", () => {
    const folders = buildSemesterFolders([
      folder("other", "Lecture Videos"),
      makeNode({ depth: 1, id: "nested", kind: "folder", name: FALL_ONE }),
    ]);

    expect(folders).toEqual([]);
  });

  it("labels a folder by year and term", () => {
    expect(formatSemesterFolderLabel({ term: "Spring", year: 2 })).toBe(
      "Year 2, Spring semester"
    );
  });
});
