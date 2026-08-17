export type DriveNodeKind =
  | "folder"
  | "pdf"
  | "doc"
  | "sheet"
  | "slides"
  | "video"
  | "audio"
  | "image"
  | "archive"
  | "other";

export type MaterialType =
  | "lecture"
  | "exam"
  | "exercise"
  | "assignment"
  | "lab"
  | "book"
  | "other";

export interface DriveNode {
  /** Folder names between the course folder and this node, at whatever depth the course uses. */
  categoryPath: string[];
  /** Parsed from the depth-2 folder name, e.g. "EENG537". */
  courseCode: string | null;
  courseName: string | null;
  /** 0 = a source's root folder. */
  depth: number;
  extension: string | null;
  iconLink: string | null;
  id: string;
  isShortcut: boolean;
  kind: DriveNodeKind;
  /** What the material is for, normalised at sync time from folder names that vary by instructor. */
  materialType: MaterialType;
  mimeType: string;
  modifiedTime: string;
  name: string;
  /** Set from crawl context (which folder this was listed under), not `file.parents[0]`. */
  parentId: string | null;
  pathIds: string[];
  pathNames: string[];
  /** Depth-1 folder name, when this node sits under a semester folder. */
  semester: string | null;
  /** Null for folders and native Google Docs/Sheets/Slides. */
  sizeBytes: number | null;
  sourceId: string;
  /** Academic year the item records in its own name or folder, e.g. "Fall 2025-2026". */
  termLabel: string | null;
  webViewLink: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface SearchFilterValues {
  course?: string;
  kind?: DriveNodeKind;
  q: string;
  semester?: string;
}

export interface DriveSource {
  color: string;
  id: string;
  label: string;
  rootFolderId: string;
}

export interface CourseSummary {
  code: string;
  fileCount: number;
  folderCount: number;
  name: string;
  semester: string | null;
  sourceId: string;
}

export interface DriveIndexStats {
  fileCount: number;
  folderCount: number;
  generatedAt: string;
  sourceCount: number;
}

export interface DriveIndex {
  meta: {
    generatedAt: string;
    sources: Array<{
      id: string;
      description: string | null;
      fileCount: number;
      folderCount: number;
      totalBytes: number;
    }>;
  };
  nodes: DriveNode[];
}
