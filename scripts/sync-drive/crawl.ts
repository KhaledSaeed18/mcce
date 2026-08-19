import type { DriveNode, DriveSource } from "../../src/lib/drive/types";
import { classifyKind, extensionOf, parseCourseFolderName } from "./classify";
import type { DriveApiFile } from "./drive-client";
import { listChildren } from "./drive-client";
import { classifyMaterialType } from "./material-type";
import { parseTermLabel } from "./term-label";

/** The crawl cannot know when an id was first seen; `stampFirstSeen` adds that afterwards. */
export type CrawledNode = Omit<DriveNode, "firstSeenAt">;

const CONCURRENCY = 5;
const FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";
const SHORTCUT_MIME_TYPE = "application/vnd.google-apps.shortcut";

interface QueueItem {
  depth: number;
  file: DriveApiFile;
  parentId: string | null;
  pathIds: string[];
  pathNames: string[];
}

interface Facets {
  categoryPath: string[];
  courseCode: string | null;
  courseName: string | null;
  semester: string | null;
}

function deriveFacets(item: QueueItem, isFolder: boolean): Facets {
  const { depth, pathNames, file } = item;

  if (depth === 0) {
    return {
      categoryPath: [],
      courseCode: null,
      courseName: null,
      semester: isFolder ? file.name : null,
    };
  }

  const [semester] = pathNames;

  if (depth === 1) {
    const parsed = isFolder
      ? parseCourseFolderName(file.name)
      : { courseCode: null, courseName: null };
    return { semester, ...parsed, categoryPath: [] };
  }

  const parsed = parseCourseFolderName(pathNames[1]);
  return {
    semester,
    ...parsed,
    categoryPath: pathNames.slice(2, -1),
  };
}

function toNode(item: QueueItem, source: DriveSource): CrawledNode {
  const { file, parentId, depth, pathIds, pathNames } = item;
  const isFolder = file.mimeType === FOLDER_MIME_TYPE;
  const facets = deriveFacets(item, isFolder);
  // A folder's own name is the deepest segment of its path; a file's is not.
  const folderSegments = isFolder
    ? [...facets.categoryPath, file.name]
    : facets.categoryPath;
  const fileName = isFolder ? null : file.name;
  const materialType = classifyMaterialType(folderSegments, fileName);

  return {
    categoryPath: facets.categoryPath,
    courseCode: facets.courseCode,
    courseName: facets.courseName,
    depth,
    extension: isFolder ? null : extensionOf(file.name),
    iconLink: file.iconLink ?? null,
    id: file.id,
    isShortcut: file.mimeType === SHORTCUT_MIME_TYPE,
    kind: classifyKind(file.mimeType, file.name),
    materialType,
    mimeType: file.mimeType,
    modifiedTime: file.modifiedTime,
    // Named explicitly (not spread) so a facet field can never shadow a Drive-sourced field.
    name: file.name,
    parentId,
    pathIds,
    pathNames,
    semester: facets.semester,
    sizeBytes: file.size ? Number(file.size) : null,
    sourceId: source.id,
    termLabel: parseTermLabel(folderSegments, fileName, {
      materialType,
      semester: facets.semester,
    }),
    webViewLink:
      file.webViewLink ?? `https://drive.google.com/file/d/${file.id}/view`,
  };
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const current = cursor;
      cursor += 1;
      // Sequential within a worker by design: parallelism comes from running
      // `limit` workers concurrently, not from overlapping calls within one.
      // biome-ignore lint/performance/noAwaitInLoops: intentional, see above
      results[current] = await fn(items[current]);
    }
  }

  const workerCount = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workerCount }, worker));

  return results;
}

export async function crawlSource(
  source: DriveSource,
  accessToken: string
): Promise<CrawledNode[]> {
  const nodes: CrawledNode[] = [];

  const rootItem: QueueItem = {
    depth: -1,
    file: {
      id: source.rootFolderId,
      mimeType: FOLDER_MIME_TYPE,
      modifiedTime: new Date(0).toISOString(),
      name: source.label,
    },
    parentId: null,
    pathIds: [],
    pathNames: [],
  };

  let frontier: QueueItem[] = [rootItem];

  while (frontier.length > 0) {
    const folders = frontier.filter(
      (item) => item.file.mimeType === FOLDER_MIME_TYPE
    );

    // Each BFS level depends on the previous level's results, so levels
    // must be awaited in sequence; within a level, mapWithConcurrency
    // already fans out.
    // biome-ignore lint/performance/noAwaitInLoops: intentional, see above
    const batches = await mapWithConcurrency(
      folders,
      CONCURRENCY,
      async (item) => {
        const children = await listChildren(item.file.id, accessToken);
        return { children, item };
      }
    );

    const nextFrontier: QueueItem[] = [];

    for (const { item, children } of batches) {
      for (const child of children) {
        const childItem: QueueItem = {
          depth: item.depth + 1,
          file: child,
          parentId: item.file.id,
          pathIds: [...item.pathIds, child.id],
          pathNames: [...item.pathNames, child.name],
        };
        nodes.push(toNode(childItem, source));
        nextFrontier.push(childItem);
      }
    }

    frontier = nextFrontier;
  }

  return nodes;
}
