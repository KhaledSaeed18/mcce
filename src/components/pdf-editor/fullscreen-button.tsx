import { ExpandIcon, ShrinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FULLSCREEN_HOTKEY_KEY } from "@/config/pdf-editor";

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
      onClick={onToggle}
      size="icon"
      title={`${label} (${FULLSCREEN_HOTKEY_KEY.toUpperCase()})`}
      variant="outline"
    >
      {isFullscreen ? <ShrinkIcon /> : <ExpandIcon />}
    </Button>
  );
}
