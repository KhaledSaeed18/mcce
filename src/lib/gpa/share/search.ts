import { GPA_SHARE_PARAM } from "@/config/gpa";
import { readOptionalString } from "@/lib/search-params";

export type GpaShareSearch = Partial<Record<typeof GPA_SHARE_PARAM, string>>;

export function toShareSearch(search: Record<string, unknown>): GpaShareSearch {
  return { [GPA_SHARE_PARAM]: readOptionalString(search[GPA_SHARE_PARAM]) };
}
