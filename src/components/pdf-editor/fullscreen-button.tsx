import { ExpandIcon, ShrinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EDITOR_HEADER_ICON_BUTTON_CLASS,
  FULLSCREEN_HOTKEY_KEY,
} from "@/config/pdf-editor";
import { cn } from "@/lib/utils";

const LABEL = {
  enter: "Full screen",
  exit: "Exit full screen",
};

interface FullscreenButtonProps {
  className?: string;
  isFullscreen: boolean;
  onToggle: () => void;
}

export function FullscreenButton({
  className,
  isFullscreen,
  onToggle,
}: FullscreenButtonProps) {
  const label = isFullscreen ? LABEL.exit : LABEL.enter;

  return (
    <Button
      aria-label={label}
      aria-pressed={isFullscreen}
      className={cn(EDITOR_HEADER_ICON_BUTTON_CLASS, className)}
      onClick={onToggle}
      size="icon"
      title={`${label} (${FULLSCREEN_HOTKEY_KEY.toUpperCase()})`}
      variant="outline"
    >
      {isFullscreen ? <ShrinkIcon /> : <ExpandIcon />}
    </Button>
  );
}
