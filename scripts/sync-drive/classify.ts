import type { DriveNodeKind } from "../../src/lib/drive/types";

const KIND_BY_MIME_PREFIX: [string, DriveNodeKind][] = [
  ["application/vnd.google-apps.folder", "folder"],
  ["application/vnd.google-apps.document", "doc"],
  ["application/vnd.google-apps.spreadsheet", "sheet"],
  ["application/vnd.google-apps.presentation", "slides"],
  ["application/pdf", "pdf"],
  ["video/", "video"],
  ["audio/", "audio"],
  ["image/", "image"],
];

const EXTENSION_TO_KIND: Record<string, DriveNodeKind> = {
  "7z": "archive",
  csv: "sheet",
  doc: "doc",
  docx: "doc",
  // Plain text that Drive renders in its own viewer, so the site can embed it.
  m: "text",
  md: "text",
  pdf: "pdf",
  ppt: "slides",
  pptx: "slides",
  rar: "archive",
  rtf: "text",
  txt: "text",
  xls: "sheet",
  xlsx: "sheet",
  zip: "archive",
};

const EXTENSION_PATTERN = /\.([a-zA-Z0-9]+)$/;
const COURSE_CODE_PATTERN = /^([A-Z]{2,5}\d{3}[A-Z]?)\s*-\s*(.+)$/;

export function extensionOf(name: string): string | null {
  const match = EXTENSION_PATTERN.exec(name);
  return match ? match[1].toLowerCase() : null;
}

export function classifyKind(mimeType: string, name: string): DriveNodeKind {
  for (const [prefix, kind] of KIND_BY_MIME_PREFIX) {
    if (mimeType.startsWith(prefix)) {
      return kind;
    }
  }

  const extension = extensionOf(name);
  if (extension && extension in EXTENSION_TO_KIND) {
    return EXTENSION_TO_KIND[extension];
  }

  return "other";
}

export function parseCourseFolderName(name: string): {
  courseCode: string | null;
  courseName: string | null;
} {
  const match = COURSE_CODE_PATTERN.exec(name.trim());
  if (!match) {
    return { courseCode: null, courseName: null };
  }
  return { courseCode: match[1], courseName: match[2].trim() };
}
