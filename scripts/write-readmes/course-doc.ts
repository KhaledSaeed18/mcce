import { DRIVE_SOURCES } from "../../src/config/sources";
import type { DriveNode } from "../../src/lib/drive/types";
import { ROOT_README_NAME } from "./config";
import {
  type CourseEntry,
  childFolders,
  filesUnder,
  type ReadmeContext,
} from "./context";
import {
  aboutSection,
  contentsSection,
  examsSection,
  quickLinksTable,
  requirementsTable,
} from "./course-sections";
import { computeCourseStats } from "./course-stats";
import {
  callout,
  escapeHtml,
  heading,
  list,
  paragraph,
  table,
  wrapDocument,
} from "./html";
import {
  courseTags,
  folderLink,
  footerSection,
  readmeLink,
  sitePage,
  sourceHolds,
} from "./sections";
import type { ReadmeDoc } from "./types";

const STUDY_TIPS = [
  "Start with <b>Lectures</b> in order. Folder numbers follow the order the course is taught.",
  "Work the <b>Exercises</b> and <b>Assignments</b> before opening their <b>[Solution]</b> files.",
  "Use <b>Exams</b> last, as timed practice. Recent terms are the closest to what you will sit.",
];

function navigationTable(ctx: ReadmeContext, folder: DriveNode): string {
  const semester = ctx.semesters.find((s) => s.folderId === folder.parentId);
  if (!semester) {
    return "";
  }
  const { source } = semester;
  const semesterGuide = readmeLink(ctx, semester.folderId, "semester README");
  const rootGuide = readmeLink(ctx, source.rootFolderId, ROOT_README_NAME);
  const siblings = childFolders(ctx, semester.folderId)
    .filter((sibling) => sibling.id !== folder.id)
    .map((sibling) =>
      folderLink(sibling.id, sibling.courseCode ?? sibling.name)
    );

  return table([
    [
      "This semester",
      `${folderLink(semester.folderId, semester.name)}${semesterGuide ? ` (${semesterGuide})` : ""}`,
    ],
    ["Same semester", siblings.join(" | ")],
    [
      "This Drive",
      `${folderLink(source.rootFolderId, source.driveLabel)}${rootGuide ? ` (${rootGuide})` : ""}`,
    ],
    [
      "Other Drives",
      DRIVE_SOURCES.filter((other) => other.id !== source.id)
        .map(
          (other) =>
            `${folderLink(other.rootFolderId, other.driveLabel)} (${sourceHolds(other)})`
        )
        .join("<br>"),
    ],
    ["All courses", sitePage("/course", "mcce.khaledsaeed.tech/course")],
  ]);
}

export function buildCourseDoc(
  ctx: ReadmeContext,
  course: CourseEntry,
  folder: DriveNode
): ReadmeDoc {
  const { code } = course;
  const stats = computeCourseStats(filesUnder(ctx, folder.id));
  const coursePage = sitePage(
    `/course/${code}`,
    `mcce.khaledsaeed.tech/course/${code}`
  );

  const body = [
    heading(1, `${code}: ${escapeHtml(course.name)}`),
    paragraph(
      `<i>${course.yearLabel}, ${course.semesterLabel} | ${courseTags(course)} | LIU MCCE</i>`
    ),
    callout(
      `<b>Full course page on the site: ${coursePage}</b><br>Description, prerequisites, and every file in this folder grouped by type, with in-browser previews.`
    ),
    heading(2, "Quick links"),
    quickLinksTable(code, folder.id, stats),
    aboutSection(course),
    heading(2, "Before and after this course"),
    requirementsTable(ctx, course),
    contentsSection(ctx, course, folder.id, stats),
    examsSection(code, stats),
    heading(2, "How to use this folder"),
    list([
      ...STUDY_TIPS,
      `Short on time? The ${sitePage(`/course/${code}`, "course page")} previews files in the browser, so there is nothing to download.`,
    ]),
    heading(2, "Find your way around"),
    navigationTable(ctx, folder),
    footerSection(ctx),
  ].join("");

  return {
    docId: ctx.readmeIds.get(folder.id),
    folderId: folder.id,
    html: wrapDocument(body),
    name: `README (${code} ${course.name})`,
  };
}
