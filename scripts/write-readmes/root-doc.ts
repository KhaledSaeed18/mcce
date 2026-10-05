import { SITE_URL } from "../../src/config/site";
import type { DriveSource } from "../../src/lib/drive/types";
import { ROOT_README_NAME, SOURCE_NOTES } from "./config";
import { childFolders, filesInSource, type ReadmeContext } from "./context";
import {
  callout,
  formatSize,
  heading,
  link,
  paragraph,
  plural,
  wrapDocument,
} from "./html";
import {
  coursesTable,
  driveFoldersTable,
  folderLayoutTable,
  folderLink,
  footerSection,
  namingSection,
  readmeLink,
  semestersTable,
  sitePage,
  sitePagesTable,
  sourceHolds,
} from "./sections";
import type { ReadmeDoc } from "./types";

function rootTitle(source: DriveSource): string {
  return source.year === 1
    ? "MCCE First Year: shared materials"
    : `MCCE ${sourceHolds(source).replace(" semester", " Semester")}: shared materials`;
}

function semesterSections(ctx: ReadmeContext, source: DriveSource): string {
  return ctx.semesters
    .filter((semester) => semester.source.id === source.id)
    .map((semester) => {
      const { courses } = semester.semester;
      const credits = courses.reduce((sum, course) => sum + course.credits, 0);
      const guide = readmeLink(ctx, semester.folderId, "semester README");
      return [
        heading(3, folderLink(semester.folderId, semester.name)),
        paragraph(
          `${plural(courses.length, "course")} in the plan of study, ${credits} credits.${guide ? ` Full guide: ${guide}.` : ""}`
        ),
        coursesTable(
          ctx,
          courses.map((course) => course.code)
        ),
      ].join("");
    })
    .join("");
}

export function buildRootDoc(
  ctx: ReadmeContext,
  source: DriveSource
): ReadmeDoc {
  const files = filesInSource(ctx, source.id);
  const bytes = files.reduce((sum, file) => sum + (file.sizeBytes ?? 0), 0);
  const courseCount = ctx.semesters
    .filter((semester) => semester.source.id === source.id)
    .reduce(
      (sum, semester) => sum + childFolders(ctx, semester.folderId).length,
      0
    );
  const note = SOURCE_NOTES[source.id];

  const body = [
    heading(1, rootTitle(source)),
    paragraph(
      `Course material for the ${sourceHolds(source).toLowerCase()} of the LIU M.S. in Computer and Communication Engineering (MCCE) program: lecture slides and recordings, exercises, assignments, past exams, and reference books.`
    ),
    paragraph(
      `This folder holds <b>${plural(files.length, "file")}</b> across <b>${plural(courseCount, "course")}</b>, about ${formatSize(bytes)} in total.`
    ),
    heading(2, "Start here"),
    callout(
      `<b>Everything in all three folders is indexed and searchable at ${link(SITE_URL, "mcce.khaledsaeed.tech")}</b><br>The site is usually faster than browsing Drive: search every course at once, filter by material type, and preview a file without downloading it. Drive stays the source of truth, and the site re-reads these folders every week.`
    ),
    paragraph(
      "Every semester folder and every course folder also has its own README with the course description, what is inside, and direct links to the matching pages on the site."
    ),
    heading(2, "The three MCCE folders"),
    paragraph(
      "The program's material is split across three Drive folders. Each one links to the others."
    ),
    driveFoldersTable(ctx, source),
    heading(2, "What is in this folder"),
    note ? paragraph(note) : "",
    semesterSections(ctx, source),
    source.year === 2
      ? paragraph(
          `The master thesis (CENG695A in Fall, CENG695B in Spring) has no shared folder, since every thesis is different. The ${sitePage("/resources/thesis", "thesis guide")} on the site covers each stage and the tools for it.`
        )
      : "",
    heading(2, "All semesters"),
    semestersTable(ctx),
    heading(2, "How the folders are organized"),
    paragraph(
      "Every course folder is named <i>CODE - Course Name</i> and uses the same set of folders, so once you know one course you know all of them. A course only carries the folders it has material for."
    ),
    folderLayoutTable(),
    namingSection(),
    heading(2, "On the site"),
    sitePagesTable(),
    footerSection(ctx),
  ].join("");

  return {
    docId: ctx.readmeIds.get(source.rootFolderId),
    folderId: source.rootFolderId,
    html: wrapDocument(body),
    name: ROOT_README_NAME,
  };
}
