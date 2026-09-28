import { defaultFilter } from "cmdk";

/** Scores an item on its keywords alone. Its value is a file id, there only
 * to keep items apart, and would otherwise match stray letters and digits. */
export function filterByKeywords(
  _value: string,
  search: string,
  keywords?: string[]
): number {
  return defaultFilter(keywords?.join(" ") ?? "", search);
}
