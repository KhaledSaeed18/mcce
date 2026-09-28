import { useCallback } from "react";
import { FileTypeChip } from "@/components/pdf-editor/file-type-chip";
import { MATCH_TAB_CLASS } from "@/config/pdf-editor";
import { findFileChip } from "@/lib/pdf-editor/file-chip";
import { describeMatch } from "@/lib/pdf-editor/match-label";
import type { EditorTreeNode } from "@/lib/pdf-editor/types";

interface EditorMatchTabProps {
  match: EditorTreeNode;
  onOpen: () => void;
}

/** A suggestion rather than an open file, next to the tab on screen: the
 * paper's solution, or the solution's paper, one press from sitting beside
 * it with the two scrolling together. */
export function EditorMatchTab({ match, onOpen }: EditorMatchTabProps) {
  const chip = findFileChip(match.name, match.materialType);
  const label = describeMatch(match.name);
  const handleClick = useCallback(() => onOpen(), [onOpen]);

  return (
    <li className="flex shrink-0" data-match-tab="">
      <button
        className={MATCH_TAB_CLASS}
        onClick={handleClick}
        title={`${label}: ${match.name}`}
        type="button"
      >
        {chip ? <FileTypeChip chip={chip} /> : null}
        <span className="truncate">{label}</span>
      </button>
    </li>
  );
}
