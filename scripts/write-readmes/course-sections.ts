import { RESOURCE_CATEGORY_BY_ID } from "../../src/config/resources/categories";
import type { DriveNode } from "../../src/lib/drive/types";
import {
  COURSE_RESOURCE_CATEGORY,
  MATERIAL_FOLDER_DESCRIPTIONS,
  MATERIAL_FOLDER_ORDER,
} from "./config";
import {
  type CourseEntry,
  childFolders,
  filesUnder,
  type ReadmeContext,
} from "./context";
import type { CourseStats } from "./course-stats";
import {
  callout,
  escapeHtml,
  formatSize,
  heading,
  list,
  paragraph,
  plural,
  table,
} from "./html";
import { coursePageLink, folderLink, sitePage } from "./sections";

export function quickLinksTable(
  code: string,
  folderId: string,
  stats: CourseStats
): string {
  const categoryId = COURSE_RESOURCE_CATEGORY[code];
  const category = categoryId
    ? RESOURCE_CATEGORY_BY_ID.get(categoryId)
    : undefined;
  const rows = [
    [
      sitePage(`/course/${code}`, "Course page"),
      "Overview and all material for this course",
    ],
    stats.exams
      ? [
          sitePage(`/exams#${code}`, `${code} past exams`),
          "This course's section of the exam archive, grouped by term",
        ]
      : null,
    [
      sitePage(`/search?course=${code}&q=`, "Search this course"),
      "Find a file by name inside this course only",
    ],
    stats.exams
      ? [
          sitePage(`/search?course=${code}&material=exam&q=`, "Exams only"),
          "Search results filtered to past papers",
        ]
      : null,
    [
      sitePage(`/browse/${folderId}`, "Browse on the site"),
      "This same folder, with previews and no download needed",
    ],
    category
      ? [
          sitePage(`/resources/${category.id}`, `Tools: ${category.label}`),
          "Software and references picked for this subject",
        ]
      : null,
    [
      sitePage("/plan-of-study", "Plan of study"),
      "Where this course sits in the two-year plan",
    ],
    [
      sitePage("/gpa-calculator", "GPA calculator"),
      "Work out your semester and cumulative GPA",
    ],
  ];
  return table(
    rows.filter((row): row is string[] => row !== null),
    ["Link", "What you get"]
  );
}

export function aboutSection(course: CourseEntry): string {
  const parts = [heading(2, "About the course")];
  parts.push(
    paragraph(
      course.description
        ? escapeHtml(course.description)
        : `The official catalog does not publish a description for ${course.code} yet. The ${sitePage(`/course/${course.code}`, "course page")} will show it once it does.`
    )
  );
  if (course.objectives.length) {
    parts.push(
      heading(3, "Objectives"),
      list(course.objectives.map(escapeHtml))
    );
  }
  if (course.topics?.length) {
    parts.push(heading(3, "Main topics"), list(course.topics.map(escapeHtml)));
  }
  return parts.join("");
}

export function requirementsTable(
  ctx: ReadmeContext,
  course: CourseEntry
): string {
  const others = [...ctx.courses.values()];
  const leadsTo = others.filter((other) =>
    other.prerequisites.includes(course.code)
  );
  const corequisiteOf = others.filter(
    (other) =>
      other.corequisites.includes(course.code) &&
      !course.corequisites.includes(other.code)
  );
  const links = (codes: string[]) =>
    codes.map((code) => coursePageLink(ctx, code)).join(", ");

  const rows = [
    [
      "Prerequisites",
      course.prerequisites.length ? links(course.prerequisites) : "None",
    ],
  ];
  if (course.corequisites.length) {
    rows.push(["Taken with", links(course.corequisites)]);
  }
  if (corequisiteOf.length) {
    rows.push([
      "Corequisite of",
      links(corequisiteOf.map((other) => other.code)),
    ]);
  }
  rows.push([
    "Opens the way to",
    leadsTo.length
      ? links(leadsTo.map((other) => other.code))
      : "No later course requires it",
  ]);
  if (course.note) {
    rows.push(["Note", escapeHtml(course.note)]);
  }
  return table(rows);
}

function byMaterialOrder(a: DriveNode, b: DriveNode): number {
  return (
    MATERIAL_FOLDER_ORDER.indexOf(a.name) -
    MATERIAL_FOLDER_ORDER.indexOf(b.name)
  );
}

export function contentsSection(
  ctx: ReadmeContext,
  course: CourseEntry,
  folderId: string,
  stats: CourseStats
): string {
  const parts = [heading(2, "What is in this folder")];
  if (!stats.count) {
    parts.push(
      callout(
        `<b>This course has no material yet.</b> If you took ${course.code}, your slides, notes, or past exams would be the first files here. See "Contributing material" below.`
      )
    );
    return parts.join("");
  }

  const recordings = stats.videos
    ? `, including ${plural(stats.videos, "recording")}`
    : "";
  parts.push(
    paragraph(
      `<b>${plural(stats.count, "file")}</b>, about ${formatSize(stats.bytes)}${recordings}.`
    )
  );
  const subfolders = childFolders(ctx, folderId).sort(byMaterialOrder);
  parts.push(
    table(
      subfolders.map((sub) => [
        `<b>${folderLink(sub.id, sub.name)}</b>`,
        MATERIAL_FOLDER_DESCRIPTIONS[sub.name] ?? "",
        String(filesUnder(ctx, sub.id).length),
      ]),
      ["Folder", "Holds", "Files"]
    )
  );

  const lectures = subfolders.find((sub) => sub.name === "Lectures");
  const lectureFolders = lectures
    ? childFolders(ctx, lectures.id).sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    : [];
  if (lectureFolders.length > 1) {
    parts.push(
      heading(3, "Lectures"),
      paragraph(
        lectureFolders
          .map((lecture) => folderLink(lecture.id, lecture.name))
          .join(" | ")
      )
    );
  }
  return parts.join("");
}

export function examsSection(code: string, stats: CourseStats): string {
  if (!stats.terms.length) {
    return "";
  }
  const solutions = stats.solutions
    ? ` (${stats.solutions} worked solutions)`
    : "";
  return [
    heading(2, "Past exams and assessments"),
    paragraph(
      `${plural(stats.exams, "exam file")}${solutions} and ${plural(stats.assessments, "assessment file")}. Files per term:`
    ),
    list(
      stats.terms.map(
        ([label, count]) => `${escapeHtml(label)}: ${plural(count, "file")}`
      )
    ),
    paragraph(
      `The ${sitePage(`/exams#${code}`, "exam archive")} lists every one of them with a preview.`
    ),
  ].join("");
}
