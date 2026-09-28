import { MATCH_LABELS } from "@/config/pdf-editor";
import { isSolutionName } from "./file-chip";

/** "Solution beside" for a paper's match, "Questions beside" for a
 * solution's. */
export function describeMatch(matchName: string): string {
  return isSolutionName(matchName) ? MATCH_LABELS.solution : MATCH_LABELS.paper;
}
