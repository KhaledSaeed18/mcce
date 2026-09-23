import type { LucideIcon } from "lucide-react";
import {
  CheckIcon,
  CopyIcon,
  HighlighterIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { TextMarkButton } from "@/components/pdf-editor/text-mark-button";
import { Button } from "@/components/ui/button";
import { SELECTION_MENU_OFFSET } from "@/config/pdf-editor";
import { keepSelection } from "@/lib/keep-selection";
import type { TextMarkStyle } from "@/lib/pdf-editor/types";

const STYLES: Array<{ icon: LucideIcon; style: TextMarkStyle }> = [
  { icon: HighlighterIcon, style: "highlight" },
  { icon: UnderlineIcon, style: "underline" },
  { icon: StrikethroughIcon, style: "strike" },
];

const COPY_LABEL = "Copy";
const COPIED_LABEL = "Copied";

interface TextSelectionMenuProps {
  isCopied: boolean;
  onCopy: () => void;
  onMark: (style: TextMarkStyle) => void;
  rect: DOMRect;
}

export function TextSelectionMenu({
  isCopied,
  onCopy,
  onMark,
  rect,
}: TextSelectionMenuProps) {
  return (
    <div
      aria-label="Selected text"
      className="fixed z-30 flex -translate-x-1/2 items-center gap-1 rounded border-2 bg-card p-1 shadow-md"
      role="toolbar"
      style={{
        left: rect.left + rect.width / 2,
        top: rect.bottom + SELECTION_MENU_OFFSET,
      }}
    >
      {STYLES.map(({ icon, style }) => (
        <TextMarkButton icon={icon} key={style} onMark={onMark} style={style} />
      ))}
      <Button
        aria-label={isCopied ? COPIED_LABEL : COPY_LABEL}
        onClick={onCopy}
        onMouseDown={keepSelection}
        size="icon-sm"
        title={COPY_LABEL}
        variant="ghost"
      >
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  );
}
