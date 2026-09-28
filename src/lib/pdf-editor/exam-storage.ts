import { PDF_EXAM_KEY_PREFIX } from "@/config/pdf-editor";
import { readJson, removeStored, writeJson } from "@/lib/storage";
import { getRemaining, parseExam } from "./exam-clock";
import type { ExamSession } from "./types";

function buildExamKey(fileId: string): string {
  return `${PDF_EXAM_KEY_PREFIX}.${fileId}`;
}

export function readExam(fileId: string): ExamSession | null {
  return parseExam(readJson<unknown>(buildExamKey(fileId), null));
}

/** Whether an exam on the file has time left, read from what is kept. */
export function isExamRunning(fileId: string, now: number): boolean {
  const session = readExam(fileId);
  return session !== null && getRemaining(session, now) > 0;
}

export function writeExam(fileId: string, session: ExamSession): void {
  writeJson(buildExamKey(fileId), session);
}

export function removeExam(fileId: string): void {
  removeStored(buildExamKey(fileId));
}
