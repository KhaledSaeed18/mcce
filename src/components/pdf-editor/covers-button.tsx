import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  COVERS_HIDE_ALL_LABEL,
  COVERS_LOCKED_LABEL,
  COVERS_SHOW_ALL_LABEL,
} from "@/config/pdf-editor";

interface CoversButtonProps {
  isAllRevealed: boolean;
  /** Held shut during an exam. */
  isLocked: boolean;
  onToggle: () => void;
}

/** Shows every covered answer at once, or covers them all again. */
export function CoversButton({
  isAllRevealed,
  isLocked,
  onToggle,
}: CoversButtonProps) {
  const label = isAllRevealed ? COVERS_HIDE_ALL_LABEL : COVERS_SHOW_ALL_LABEL;

  return (
    <Button
      aria-label={label}
      aria-pressed={isAllRevealed}
      disabled={isLocked}
      onClick={onToggle}
      size="icon"
      title={isLocked ? COVERS_LOCKED_LABEL : label}
      variant="outline"
    >
      {isAllRevealed ? <EyeOffIcon /> : <EyeIcon />}
    </Button>
  );
}
