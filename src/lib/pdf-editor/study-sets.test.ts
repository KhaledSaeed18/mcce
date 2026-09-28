import { afterEach, describe, expect, it } from "vitest";
import { buildStudySetSearch, readSetIds } from "./study-set-link";
import { openSavedSet, openSharedSet } from "./study-set-opening";
import { parseStudySets } from "./study-set-parse";
import {
  addStudySet,
  forgetFileInStudySets,
  readStudySets,
  removeStudySet,
  renameStudySet,
} from "./study-sets";
import type { StudySet } from "./types";

const EXAM = { id: "exam", name: "Exam.pdf", source: "drive" } as const;
const SOLUTION = {
  id: "sol",
  name: "[Solution]Exam.pdf",
  source: "drive",
} as const;
const NOTES = {
  id: "local-notes",
  name: "Notes.pdf",
  source: "local",
} as const;

const SET: StudySet = {
  besideId: "sol",
  files: [EXAM, SOLUTION, NOTES],
  id: "set-1",
  lockGap: 2,
  name: "DSP final",
  primaryId: "exam",
  savedAt: "2026-09-28T12:00:00.000Z",
};

afterEach(() => {
  for (const set of readStudySets()) {
    removeStudySet(set.id);
  }
});

describe("study set store", () => {
  it("adds, renames, and removes sets, newest first", () => {
    addStudySet(SET);
    addStudySet({ ...SET, id: "set-2", name: "Wireless" });
    renameStudySet("set-1", "DSP midterm");

    expect(readStudySets().map((set) => set.name)).toEqual([
      "Wireless",
      "DSP midterm",
    ]);
  });

  it("takes a forgotten file out of every set, and drops a set left empty", () => {
    addStudySet(SET);
    addStudySet({ ...SET, files: [NOTES], id: "set-2" });
    forgetFileInStudySets("sol");
    forgetFileInStudySets("local-notes");

    expect(readStudySets()).toEqual([
      { ...SET, besideId: null, files: [EXAM], lockGap: null },
    ]);
  });
});

describe("study set links", () => {
  it("names the index files, the first pane's first, and what sits beside it", () => {
    expect(buildStudySetSearch(SET)).toEqual({
      leftOut: 1,
      search: { beside: "sol", set: "exam,sol" },
    });
    expect(readSetIds("exam,sol")).toEqual(["exam", "sol"]);
    expect(readSetIds(undefined)).toEqual([]);
  });
});

describe("parseStudySets", () => {
  it("drops what does not fit and sets with no files", () => {
    expect(
      parseStudySets([SET, { id: "x", name: "Empty", files: [] }, "nope"])
    ).toEqual([SET]);
    expect(parseStudySets(null)).toEqual([]);
  });
});

describe("opening a set", () => {
  it("lays a saved set out as it was, with its lock", () => {
    expect(openSavedSet(SET)).toEqual({
      files: SET.files,
      lock: { files: "exam|sol", gap: 2 },
      search: { beside: "sol", file: "exam" },
    });
  });

  it("opens the index files a shared link names, first in the first pane", () => {
    const nodes = [EXAM, SOLUTION].map((file) => ({
      courseCode: null,
      id: file.id,
      kind: "pdf" as const,
      materialType: "exam" as const,
      name: file.name,
      parentId: null,
    }));

    expect(openSharedSet(nodes, "exam,gone,sol", "sol")).toEqual({
      files: [EXAM, SOLUTION],
      lock: null,
      search: { beside: "sol", file: "exam" },
    });
    expect(openSharedSet(nodes, "gone", undefined)).toBeNull();
  });
});
