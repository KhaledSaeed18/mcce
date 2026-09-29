import { FILE_TEXT_LIMIT } from "@/config/pdf-editor";
import { lowercaseInPlace } from "../page-text";
import type { OpenFile } from "../types";
import { readFileText, removeFileText, saveFileText } from "./file-text-store";
import { readDocumentText } from "./read-document-text";
import type { FileText } from "./types";

/** Text read this visit, so a search typed again needs no trip to disk. */
const readTexts = new Map<string, { text: FileText; version: string }>();
/** Files being read now, so a search typed again waits for the same read
 * rather than downloading the file a second time. */
const reading = new Map<string, Promise<FileText>>();

function remember(id: string, version: string, pages: string[]): FileText {
  const text = { lowered: pages.map(lowercaseInPlace), pages };
  readTexts.delete(id);
  readTexts.set(id, { text, version });
  // A map keeps the order entries went in, so the first is the oldest.
  const [oldest] = readTexts.keys();
  if (readTexts.size > FILE_TEXT_LIMIT && oldest) {
    readTexts.delete(oldest);
  }
  return text;
}

/** The file's text from this visit or this browser, without opening it. */
export async function loadKnownText(
  file: OpenFile,
  version: string
): Promise<FileText | null> {
  const entry = readTexts.get(file.id);
  if (entry?.version === version) {
    return entry.text;
  }
  const stored = await readFileText(file.id, version).catch(() => null);
  return stored ? remember(file.id, version, stored) : null;
}

/** Reads the text from the file itself and keeps it for next time. */
export function readNewText(
  file: OpenFile,
  version: string
): Promise<FileText> {
  const pending = reading.get(file.id);
  if (pending) {
    return pending;
  }
  const read = (async () => {
    const pages = await readDocumentText(file);
    await saveFileText(file.id, version, pages).catch(() => undefined);
    return remember(file.id, version, pages);
  })().finally(() => reading.delete(file.id));
  reading.set(file.id, read);
  return read;
}

/** Drops a file's text from this visit and this browser. */
export async function forgetFileText(id: string): Promise<void> {
  readTexts.delete(id);
  await removeFileText(id).catch(() => undefined);
}
