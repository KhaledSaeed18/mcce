import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { DRIVE_SOURCES } from "../../src/config/sources";
import type { DriveIndex } from "../../src/lib/drive/types";
import { DRIVE_WRITE_SCOPE, getAccessToken } from "../sync-drive/auth";
import { buildReadmeContext, findCourseFolder } from "./context";
import { buildCourseDoc } from "./course-doc";
import { findReadmeDoc } from "./drive-docs";
import { buildLectureVideoDocs } from "./lecture-videos-doc";
import { buildRootDoc } from "./root-doc";
import { buildSemesterDoc } from "./semester-doc";
import type { ReadmeDoc } from "./types";
import { writeDocs } from "./write";

const INDEX_PATH = resolve(process.cwd(), "src/data/drive-index.json");

function readmeFolders(index: DriveIndex): Array<{ id: string; name: string }> {
  const roots = DRIVE_SOURCES.map((source) => ({
    id: source.rootFolderId,
    name: source.driveLabel,
  }));
  const semestersAndCourses = index.nodes
    .filter((node) => node.kind === "folder" && node.depth <= 1)
    .map((node) => ({ id: node.id, name: node.pathNames.join("/") }));
  return [...roots, ...semestersAndCourses];
}

async function discoverReadmes(
  index: DriveIndex,
  accessToken: string
): Promise<Map<string, string>> {
  const folders = readmeFolders(index);
  const lookups = await Promise.all(
    folders.map((folder) => findReadmeDoc(folder.id, accessToken))
  );
  const ids = new Map<string, string>();
  lookups.forEach((lookup, i) => {
    if (lookup.kind === "found") {
      ids.set(folders[i].id, lookup.docId);
    } else if (lookup.kind === "ambiguous") {
      console.warn(
        `  ${folders[i].name}: several README docs (${lookup.names.join(", ")}), skipped`
      );
    }
  });
  return ids;
}

function buildAllDocs(
  index: DriveIndex,
  readmeIds: Map<string, string>
): ReadmeDoc[] {
  const ctx = buildReadmeContext(
    index.nodes,
    index.meta.generatedAt,
    readmeIds
  );
  const courseDocs = [...ctx.courses.values()].flatMap((course) => {
    const folder = findCourseFolder(ctx, course.code);
    return folder ? [buildCourseDoc(ctx, course, folder)] : [];
  });
  return [
    ...DRIVE_SOURCES.map((source) => buildRootDoc(ctx, source)),
    ...ctx.semesters.map((semester) => buildSemesterDoc(ctx, semester)),
    ...courseDocs,
    ...buildLectureVideoDocs(ctx),
  ];
}

async function main(): Promise<void> {
  const shouldApply = process.argv[2] === "apply";
  const index = JSON.parse(readFileSync(INDEX_PATH, "utf8")) as DriveIndex;
  const accessToken = await getAccessToken(DRIVE_WRITE_SCOPE);

  const readmeIds = await discoverReadmes(index, accessToken);
  const docs = buildAllDocs(index, readmeIds);
  const missing = docs.filter((doc) => !doc.docId);

  console.log(
    `${docs.length - missing.length} of ${docs.length} docs have a target in Drive.`
  );
  for (const doc of missing) {
    console.log(`  no doc yet: ${doc.name} (folder ${doc.folderId})`);
  }

  if (!shouldApply) {
    console.log("Dry run. Pass `apply` to write the docs.");
    return;
  }
  await writeDocs(docs, accessToken);
}

await main();
