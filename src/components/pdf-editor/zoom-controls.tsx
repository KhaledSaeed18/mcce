import { MaximizeIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const PERCENT = 100;

interface ZoomControlsProps {
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  zoom: number;
}

export function ZoomControls({
  onReset,
  onZoomIn,
  onZoomOut,
  zoom,
}: ZoomControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        aria-label="Zoom out"
        onClick={onZoomOut}
        size="icon"
        variant="outline"
      >
        <ZoomOutIcon />
      </Button>
      <span className="w-14 text-center font-head text-sm tabular-nums">
        {Math.round(zoom * PERCENT)}%
      </span>
      <Button
        aria-label="Zoom in"
        onClick={onZoomIn}
        size="icon"
        variant="outline"
      >
        <ZoomInIcon />
      </Button>
      <Button
        aria-label="Reset zoom"
        onClick={onReset}
        size="icon"
        variant="outline"
      >
        <MaximizeIcon />
      </Button>
    </div>
  );
}
