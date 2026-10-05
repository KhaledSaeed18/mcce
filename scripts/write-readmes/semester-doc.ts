import type { CurriculumCourse } from "../../src/lib/curriculum/types";
import { ROOT_README_NAME } from "./config";
import {
  filesUnder,
  findCourseFolder,
  type ReadmeContext,
  type SemesterFolder,
} from "./context";
import {
  callout,
  escapeHtml,
  heading,
  paragraph,
  plural,
  wrapDocument,
} from "./html";
import {
  coursePageLink,
  coursesTable,
  courseTags,
  driveFoldersTable,
  folderLayoutTable,
  folderLink,
  footerSection,
  namingSection,
  readmeLink,
  semestersTable,
  sitePage,
} from "./sections";
import type { ReadmeDoc } from "./types";

const SUMMARY_LENGTH = 320;

function summarize(text: string): string {
  return text.length > SUMMARY_LENGTH + 10
    ? `${text.slice(0, text.lastIndexOf(" ", SUMMARY_LENGTH))}...`
    : text;
}

function courseLinks(ctx: ReadmeContext, course: CurriculumCourse): string {
  const folder = findCourseFolder(ctx, course.code);
  const links = [sitePage(`/course/${course.code}`, "Course page")];
  if (folder) {
    links.push(folderLink(folder.id, "Drive folder"));
    links.push(readmeLink(ctx, folder.id, "Course README") ?? "");
    const hasExams = filesUnder(ctx, folder.id).some(
      (file) => file.materialType === "exam"
    );
    if (hasExams) {
      links.push(sitePage(`/exams#${course.code}`, "Past exams"));
    }
  } else if (course.kind === "thesis") {
    links.push(sitePage("/resources/thesis", "Thesis guide"));
  }
  return links.filter(Boolean).join(" | ");
}

function courseSummary(ctx: ReadmeContext, course: CurriculumCourse): string {
  const parts = [
    heading(3, `${course.code}: ${escapeHtml(course.name)}`),
    paragraph(`<i>${courseTags(course)}</i>`),
  ];
  if (course.description) {
    parts.push(paragraph(escapeHtml(summarize(course.description))));
  }
  if (course.prerequisites.length) {
    parts.push(
      paragraph(
        `Prerequisites: ${course.prerequisites.map((code) => coursePageLink(ctx, code)).join(", ")}`
      )
    );
  }
  if (course.corequisites.length) {
    parts.push(
      paragraph(
        `Taken with: ${course.corequisites.map((code) => coursePageLink(ctx, code)).join(", ")}`
      )
    );
  }
  if (course.note) {
    parts.push(paragraph(escapeHtml(course.note)));
  }
  parts.push(paragraph(courseLinks(ctx, course)));
  return parts.join("");
}

export function buildSemesterDoc(
  ctx: ReadmeContext,
  semester: SemesterFolder
): ReadmeDoc {
  const { courses } = semester.semester;
  const { source } = semester;
  const credits = courses.reduce((sum, course) => sum + course.credits, 0);
  const search = `/search?semester=${encodeURIComponent(semester.name)}`;
  const rootGuide = readmeLink(ctx, source.rootFolderId, ROOT_README_NAME);

  const body = [
    heading(1, semester.name),
    paragraph(
      `MCCE ${semester.name.replace(" | ", ", ").toLowerCase()}: ${plural(courses.length, "course")} and ${credits} credits in the plan of study. This folder sits inside ${folderLink(source.rootFolderId, source.driveLabel)}${rootGuide ? `, whose ${rootGuide} covers the whole Drive` : ""}.`
    ),
    callout(
      `<b>This semester on the site:</b> ${sitePage(`/browse/${semester.folderId}`, "open this folder")} | ${sitePage(search, "search this semester")} | ${sitePage("/plan-of-study", "plan of study")} | ${sitePage("/exams", "past exams")}`
    ),
    heading(2, "Courses"),
    coursesTable(
      ctx,
      courses.map((course) => course.code)
    ),
    ...courses.map((course) => courseSummary(ctx, course)),
    heading(2, "Other semesters"),
    semestersTable(ctx, semester.folderId),
    heading(2, "The three MCCE folders"),
    driveFoldersTable(ctx, source),
    heading(2, "Inside each course folder"),
    folderLayoutTable(),
    namingSection(),
    footerSection(ctx),
  ].join("");

  return {
    docId: ctx.readmeIds.get(semester.folderId),
    folderId: semester.folderId,
    html: wrapDocument(body),
    name: `README (${semester.name.replace(" | ", ", ")})`,
  };
}
