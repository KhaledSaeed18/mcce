import { expandResourceToken } from "@/config/resources/search-synonyms";

/** A hit on the name beats a hit anywhere else, and a whole word beats part of one. */
const NAME_WORD_SCORE = 6;
const NAME_PARTIAL_SCORE = 4;
const HAYSTACK_WORD_SCORE = 2;
const HAYSTACK_PARTIAL_SCORE = 1;

const WORD_CHARACTER = /[a-z0-9]/;

function hasWordStart(haystack: string, token: string): boolean {
  let index = haystack.indexOf(token);
  while (index !== -1) {
    if (index === 0 || !WORD_CHARACTER.test(haystack[index - 1])) {
      return true;
    }
    index = haystack.indexOf(token, index + 1);
  }
  return false;
}

export interface Searchable {
  haystack: string;
  name: string;
}

function scoreVariant(token: string, name: string, haystack: string): number {
  if (hasWordStart(name, token)) {
    return NAME_WORD_SCORE;
  }
  if (name.includes(token)) {
    return NAME_PARTIAL_SCORE;
  }
  if (hasWordStart(haystack, token)) {
    return HAYSTACK_WORD_SCORE;
  }
  return haystack.includes(token) ? HAYSTACK_PARTIAL_SCORE : 0;
}

/** Best of the token and its synonyms, so "latex" still finds Typst. */
function scoreToken(token: string, name: string, haystack: string): number {
  let best = 0;
  for (const variant of expandResourceToken(token)) {
    best = Math.max(best, scoreVariant(variant, name, haystack));
  }
  return best;
}

/** Zero unless every token matches, so extra words narrow rather than widen. */
export function scoreSearchable(item: Searchable, tokens: string[]): number {
  const name = item.name.toLowerCase();
  let total = 0;
  for (const token of tokens) {
    const score = scoreToken(token, name, item.haystack);
    if (score === 0) {
      return 0;
    }
    total += score;
  }
  return total;
}
