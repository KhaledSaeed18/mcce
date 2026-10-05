import { CURRICULUM } from "../../src/config/curriculum";
import { DRIVE_SOURCES } from "../../src/config/sources";
import type {
  CurriculumCourse,
  CurriculumSemester,
} from "../../src/lib/curriculum/types";
import type { DriveNode, DriveSource } from "../../src/lib/drive/types";

export interface CourseEntry extends CurriculumCourse {
  semesterLabel: string;
  yearLabel: string;
}

export interface SemesterFolder {
  folderId: string;
  /** Folder name in Drive, e.g. "First Year | Fall Semester". */
  name: string;
  semester: CurriculumSemester;
  source: DriveSource;
}

export interface ReadmeContext {
  courses: Map<string, CourseEntry>;
  generatedAt: Date;
  nodes: DriveNode[];
  /** Folder id to the README doc that lives directly inside it. */
  readmeIds: Map<string, string>;
  semesters: SemesterFolder[];
}

function buildCourses(): Map<string, CourseEntry> {
  const entries = CURRICULUM.flatMap((year) =>
    year.semesters.flatMap((semester) =>
      semester.courses.map((course) => ({
        ...course,
        semesterLabel: semester.label,
        yearLabel: year.label,
      }))
    )
  );
  return new Map(entries.map((course) => [course.code, course]));
}

function buildSemesters(nodes: DriveNode[]): SemesterFolder[] {
  return CURRICULUM.flatMap((year) =>
    year.semesters.flatMap((semester) => {
      const name = `${year.label} | ${semester.label}`;
      const folder = nodes.find(
        (node) =>
          node.kind === "folder" && node.depth === 0 && node.name === name
      );
      const source = DRIVE_SOURCES.find((s) => s.id === folder?.sourceId);
      return folder && source
        ? [{ folderId: folder.id, name, semester, source }]
        : [];
    })
  );
}

export function buildReadmeContext(
  nodes: DriveNode[],
  generatedAt: string,
  readmeIds: Map<string, string>
): ReadmeContext {
  return {
    courses: buildCourses(),
    generatedAt: new Date(generatedAt),
    nodes,
    readmeIds,
    semesters: buildSemesters(nodes),
  };
}

export function childFolders(
  ctx: ReadmeContext,
  parentId: string
): DriveNode[] {
  return ctx.nodes.filter(
    (node) => node.kind === "folder" && node.parentId === parentId
  );
}

export function findCourseFolder(
  ctx: ReadmeContext,
  code: string
): DriveNode | undefined {
  return ctx.nodes.find(
    (node) =>
      node.kind === "folder" && node.depth === 1 && node.courseCode === code
  );
}

export function isReadme(node: DriveNode): boolean {
  return node.name.startsWith("README");
}

export function filesUnder(ctx: ReadmeContext, folderId: string): DriveNode[] {
  return ctx.nodes.filter(
    (node) =>
      node.kind !== "folder" &&
      !isReadme(node) &&
      node.pathIds.includes(folderId)
  );
}

/** Root folders are not in pathIds (paths start at the semester), so a whole Drive is matched by source. */
export function filesInSource(
  ctx: ReadmeContext,
  sourceId: string
): DriveNode[] {
  return ctx.nodes.filter(
    (node) =>
      node.kind !== "folder" && !isReadme(node) && node.sourceId === sourceId
  );
}
