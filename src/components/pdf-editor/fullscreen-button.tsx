import { ExpandIcon, ShrinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EDITOR_CONTROL_HEIGHT_CLASS,
  FULLSCREEN_HOTKEY_KEY,
} from "@/config/pdf-editor";
import { cn } from "@/lib/utils";

const LABEL = {
  enter: "Full screen",
  exit: "Exit full screen",
};

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export function FullscreenButton({
  isFullscreen,
  onToggle,
}: FullscreenButtonProps) {
  const label = isFullscreen ? LABEL.exit : LABEL.enter;

  return (
    <Button
      aria-label={label}
      aria-pressed={isFullscreen}
      className={cn("bg-card", EDITOR_CONTROL_HEIGHT_CLASS)}
      onClick={onToggle}
      size="icon"
      title={`${label} (${FULLSCREEN_HOTKEY_KEY.toUpperCase()})`}
      variant="outline"
    >
      {isFullscreen ? <ShrinkIcon /> : <ExpandIcon />}
    </Button>
  );
}
