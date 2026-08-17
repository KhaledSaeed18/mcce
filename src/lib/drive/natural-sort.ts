/** Compares names so Lecture 2 precedes Lecture 10, and case never decides the order. */
export function compareNaturally(a: string, b: string): number {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}
