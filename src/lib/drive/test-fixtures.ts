import type { DriveNode } from "./types";

export function makeNode(
  overrides: Partial<DriveNode> & { id: string }
): DriveNode {
  return {
    categoryPath: [],
    courseCode: null,
    courseName: null,
    depth: 0,
    extension: null,
    firstSeenAt: "2026-01-01T00:00:00.000Z",
    iconLink: null,
    isShortcut: false,
    kind: "other",
    materialType: "other",
    mimeType: "application/octet-stream",
    modifiedTime: "2026-01-01T00:00:00.000Z",
    name: overrides.id,
    parentId: "root",
    pathIds: [],
    pathNames: [overrides.id],
    semester: null,
    sizeBytes: null,
    sourceId: "year1",
    termLabel: null,
    webViewLink: `https://drive.google.com/file/d/${overrides.id}/view`,
    ...overrides,
  };
}
