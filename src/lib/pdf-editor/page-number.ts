/**
 * What a typed page number means as an index into the document, or nothing when
 * it is not a number at all. Anything outside the document lands on its nearest
 * page rather than being refused.
 */
export function readPageIndex(typed: string, pageCount: number): number | null {
  const page = Number.parseInt(typed, 10);
  if (Number.isNaN(page)) {
    return null;
  }
  return Math.min(Math.max(page, 1), pageCount) - 1;
}
