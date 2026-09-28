import type { Annotation } from "./types";

/** The covers on a file, by id, in the order they were drawn. */
export function listCoverIds(annotations: readonly Annotation[]): string[] {
  return annotations.flatMap((annotation) =>
    annotation.type === "cover" ? [annotation.id] : []
  );
}

/** One cover revealed, or hidden again when it already was. */
export function toggleRevealed(
  revealed: ReadonlySet<string>,
  id: string
): ReadonlySet<string> {
  const next = new Set(revealed);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  return next;
}

/** Whether every cover is showing its answer. With no covers there is nothing
 * to show, so the answer is no. */
export function isEveryCoverRevealed(
  coverIds: readonly string[],
  revealed: ReadonlySet<string>
): boolean {
  return coverIds.length > 0 && coverIds.every((id) => revealed.has(id));
}
