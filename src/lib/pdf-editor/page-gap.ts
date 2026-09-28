/** How far apart two locked panes are, as the lock's label says it: the
 * right pane's lead over the left, to the nearest page. */
export function formatPageGap(gap: number): string {
  const pages = Math.round(gap);
  if (pages === 0) {
    return "Same page";
  }
  const count = Math.abs(pages);
  const sign = pages > 0 ? "+" : "-";
  return `${sign}${count} ${count === 1 ? "page" : "pages"}`;
}
