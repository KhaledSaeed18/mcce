import { SUMMARY_TITLE } from "@/config/pdf-editor";
import { describeStudyItem } from "../describe-study-item";
import type { StudyPageGroup } from "../study-items";

export type SummaryBlockKind = "heading" | "item" | "subtitle" | "title";

export interface SummaryBlock {
  kind: SummaryBlockKind;
  text: string;
}

/** The summary as it reads, top to bottom: the file, then each page's notes
 * and highlights under the page's number. */
export function buildSummaryBlocks(
  fileName: string,
  groups: readonly StudyPageGroup[]
): SummaryBlock[] {
  return [
    { kind: "title", text: fileName },
    { kind: "subtitle", text: SUMMARY_TITLE },
    ...groups.flatMap(({ items, position }): SummaryBlock[] => [
      { kind: "heading", text: `Page ${position + 1}` },
      ...items.map(
        (item): SummaryBlock => ({
          kind: "item",
          text: describeStudyItem(item),
        })
      ),
    ]),
  ];
}
