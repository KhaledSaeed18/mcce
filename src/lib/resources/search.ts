import { type Searchable, scoreSearchable } from "./search-score";

const WHITESPACE = /\s+/;

export function tokenise(query: string): string[] {
  return query.trim().toLowerCase().split(WHITESPACE).filter(Boolean);
}

/**
 * Ranks by score, then keeps the incoming order (featured first, then name),
 * so a tie does not shuffle the grid between keystrokes.
 */
export function searchItems<T extends Searchable>(
  items: T[],
  query: string
): T[] {
  const tokens = tokenise(query);
  if (tokens.length === 0) {
    return items;
  }
  const scored: Array<{ item: T; score: number; order: number }> = [];
  items.forEach((item, order) => {
    const score = scoreSearchable(item, tokens);
    if (score > 0) {
      scored.push({ item, order, score });
    }
  });
  return scored
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .map((entry) => entry.item);
}
