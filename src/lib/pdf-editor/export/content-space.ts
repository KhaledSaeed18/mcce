/** Markup is placed from the top down; PDF user space counts from the bottom up. */
export function flipY(height: number, y: number): number {
  return height - y;
}
