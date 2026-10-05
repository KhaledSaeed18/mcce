import { COURSE_REQUIREMENT_CATEGORY_LABEL } from "../../src/config/courses";
import { FOOTER_CONTACT_EMAIL } from "../../src/config/footer";
import { PROGRAM_OFFICIAL_URL, SITE_URL } from "../../src/config/site";
import { DRIVE_SOURCES } from "../../src/config/sources";
import type { CurriculumCourse } from "../../src/lib/curriculum/types";
import type { DriveSource } from "../../src/lib/drive/types";
import { buildDriveFolderUrl } from "../../src/lib/drive/urls";
import {
  MATERIAL_FOLDER_DESCRIPTIONS,
  MATERIAL_FOLDER_ORDER,
  NAMING_RULES,
  ROOT_README_NAME,
  SITE_PAGES,
} from "./config";
import { filesUnder, findCourseFolder, type ReadmeContext } from "./context";
import { heading, link, list, paragraph, table } from "./html";

export function docUrl(docId: string): string {
  return `https://docs.google.com/document/d/${docId}/edit`;
}

export function sitePage(path: string, label: string): string {
  return link(`${SITE_URL}${path}`, label);
}

export function folderLink(folderId: string, label: string): string {
  return link(buildDriveFolderUrl(folderId), label);
}

/** Links a README when it exists; before the blank docs are made it is simply left out. */
export function readmeLink(
  ctx: ReadmeContext,
  folderId: string,
  label: string
): string | null {
  const docId = ctx.readmeIds.get(folderId);
  return docId ? link(docUrl(docId), label) : null;
}

const SOURCE_TERM_SUFFIX = / \((\w+)\)/;

export function sourceHolds(source: DriveSource): string {
  return source.label === "First Year"
    ? "First Year, Fall and Spring semesters"
    : source.label.replace(SOURCE_TERM_SUFFIX, ", $1 semester");
}

export function courseTags(course: CurriculumCourse): string {
  const tags = [
    `${course.credits} credits`,
    COURSE_REQUIREMENT_CATEGORY_LABEL[course.requirementCategory],
  ];
  if (course.kind === "lab") {
    tags.push("Lab");
  }
  if (course.kind === "thesis") {
    tags.push("Thesis");
  }
  return tags.join(" | ");
}

export function coursePageLink(ctx: ReadmeContext, code: string): string {
  const course = ctx.courses.get(code);
  return sitePage(`/course/${code}`, course ? `${code} ${course.name}` : code);
}

export function driveFoldersTable(
  ctx: ReadmeContext,
  current?: DriveSource
): string {
  const rows = DRIVE_SOURCES.map((source) => [
    `<b>${folderLink(source.rootFolderId, source.driveLabel)}</b>${source === current ? " (this folder)" : ""}`,
    sourceHolds(source),
    readmeLink(ctx, source.rootFolderId, ROOT_README_NAME) ?? "",
  ]);
  return table(rows, ["Drive folder", "Holds", "Guide"]);
}

export function semestersTable(ctx: ReadmeContext, currentId?: string): string {
  const rows = ctx.semesters.map((semester) => [
    `${folderLink(semester.folderId, semester.name)}${semester.folderId === currentId ? " (this folder)" : ""}`,
    readmeLink(ctx, semester.folderId, "Semester README") ?? "",
    folderLink(semester.source.rootFolderId, semester.source.driveLabel),
  ]);
  return table(rows, ["Semester", "Guide", "Lives in"]);
}

function filesCell(folderExists: boolean, count: number): string {
  if (!folderExists) {
    return "";
  }
  return count ? `${count} files` : "Empty so far";
}

export function coursesTable(ctx: ReadmeContext, codes: string[]): string {
  const rows = codes.map((code) => {
    const course = ctx.courses.get(code);
    const folder = findCourseFolder(ctx, code);
    const count = folder ? filesUnder(ctx, folder.id).length : 0;
    const driveCell = folder
      ? [folderLink(folder.id, "Folder"), readmeLink(ctx, folder.id, "README")]
          .filter(Boolean)
          .join(" | ")
      : "Not in Drive";
    return [
      `<b>${code}</b>`,
      sitePage(`/course/${code}`, course?.name ?? code),
      String(course?.credits ?? ""),
      driveCell,
      filesCell(Boolean(folder), count),
    ];
  });
  return table(rows, [
    "Code",
    "Course (site page)",
    "Credits",
    "In Drive",
    "Files",
  ]);
}

export function sitePagesTable(): string {
  return table(
    SITE_PAGES.map(([path, label, purpose]) => [
      sitePage(path, label),
      purpose,
    ]),
    ["Page", "What it is for"]
  );
}

export function folderLayoutTable(): string {
  return table(
    MATERIAL_FOLDER_ORDER.map((name) => [
      `<b>${name}</b>`,
      MATERIAL_FOLDER_DESCRIPTIONS[name],
    ]),
    ["Folder", "Holds"]
  );
}

export function namingSection(): string {
  return heading(2, "How files are named") + list(NAMING_RULES);
}

export function footerSection(ctx: ReadmeContext): string {
  const updated = ctx.generatedAt.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return [
    heading(2, "Contributing material"),
    paragraph(
      `Have slides, notes, exercises, past exams, or recordings that are not here? Send them through the ${sitePage("/contact", "contact page")} or by email to ${link(`mailto:${FOOTER_CONTACT_EMAIL}`, FOOTER_CONTACT_EMAIL)}. Old papers and worked solutions help the most. You do not need to name or sort anything before sending it.`
    ),
    heading(2, "A note on what this is"),
    paragraph(
      `This is a student-built collection, not an official Lebanese International University page, and nothing here is published or endorsed by the university. For official program details, see the ${link(PROGRAM_OFFICIAL_URL, "official program page")}. If a file should not be here, say so at the address above and it will be removed.`
    ),
    paragraph(
      `<i>Last updated ${updated}. File counts come from the site's index of these folders, which is refreshed every week.</i>`
    ),
  ].join("");
}
