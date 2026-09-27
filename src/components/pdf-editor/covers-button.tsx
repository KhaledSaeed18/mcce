import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  COVERS_HIDE_ALL_LABEL,
  COVERS_SHOW_ALL_LABEL,
} from "@/config/pdf-editor";

interface CoversButtonProps {
  isAllRevealed: boolean;
  onToggle: () => void;
}

/** Shows every covered answer at once, or covers them all again. */
export function CoversButton({ isAllRevealed, onToggle }: CoversButtonProps) {
  const label = isAllRevealed ? COVERS_HIDE_ALL_LABEL : COVERS_SHOW_ALL_LABEL;

  return (
    <Button
      aria-label={label}
      aria-pressed={isAllRevealed}
      onClick={onToggle}
      size="icon"
      title={label}
      variant="outline"
    >
      {isAllRevealed ? <EyeOffIcon /> : <EyeIcon />}
    </Button>
  );
}
