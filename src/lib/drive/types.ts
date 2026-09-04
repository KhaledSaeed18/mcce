export type DriveNodeKind =
  | "folder"
  | "pdf"
  | "doc"
  | "sheet"
  | "slides"
  | "video"
  | "audio"
  | "text"
  | "image"
  | "archive"
  | "other";

export type MaterialType =
  | "lecture"
  | "assessment"
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
  /** When a sync first saw this id, which is not the same as when Drive last touched it. */
  firstSeenAt: string;
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

/** The file whose preview the URL is asking for, on any route that lists files. */
export interface FilePreviewSearch {
  file?: string;
}

export interface SearchFilterValues {
  course?: string;
  kind?: DriveNodeKind;
  material?: MaterialType;
  q: string;
  semester?: string;
}

export interface DriveSource {
  color: string;
  /** The folder's own name in Drive, which differs from the label used on this site. */
  driveLabel: string;
  id: string;
  label: string;
  rootFolderId: string;
  year: number;
}

export interface CourseSummary {
  code: string;
  fileCount: number;
  folderCount: number;
  name: string;
  semester: string | null;
  sourceId: string;
}

export interface ExamTermGroup {
  items: DriveNode[];
  label: string;
}

export interface ExamCourseGroup {
  code: string;
  name: string;
  terms: ExamTermGroup[];
  total: number;
}

export interface CourseMaterialGroup {
  items: DriveNode[];
  label: string;
  type: MaterialType;
}

export interface RecentCourseGroup {
  code: string;
  items: DriveNode[];
  name: string | null;
}

export interface RecentBatch {
  /** Latest sync instant of the day, used for feed timestamps. */
  addedAt: string;
  courses: RecentCourseGroup[];
  /** UTC date the batch is grouped and keyed by. */
  day: string;
  total: number;
}

export interface DriveIndexStats {
  fileCount: number;
  folderCount: number;
  generatedAt: string;
  sourceCount: number;
}

export interface DriveIndex {
  meta: {
    /**
     * The run that stamped every node at once because there was nothing to diff
     * against. Nodes still carrying it were not added then, they were merely
     * seen first then, so they must not be reported as new.
     */
    baselineAt: string;
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
