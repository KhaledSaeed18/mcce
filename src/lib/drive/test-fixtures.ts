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
    iconLink: null,
    isShortcut: false,
    kind: "other",
    mimeType: "application/octet-stream",
    modifiedTime: "2026-01-01T00:00:00.000Z",
    name: overrides.id,
    parentId: "root",
    pathIds: [],
    pathNames: [overrides.id],
    semester: null,
    sizeBytes: null,
    sourceId: "year1",
    webViewLink: `https://drive.google.com/file/d/${overrides.id}/view`,
    ...overrides,
  };
}
