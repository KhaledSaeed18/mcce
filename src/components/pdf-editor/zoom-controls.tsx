import {
  MoveHorizontalIcon,
  ScanIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ZoomControl } from "@/lib/pdf-editor/types";

const PERCENT = 100;

export function ZoomControls({
  fitPage,
  fitWidth,
  mode,
  value,
  zoomIn,
  zoomOut,
}: ZoomControl) {
  return (
    <div className="flex items-center gap-1">
      <Button
        aria-label="Zoom out"
        onClick={zoomOut}
        size="icon"
        variant="outline"
      >
        <ZoomOutIcon />
      </Button>
      <span className="w-14 text-center font-head text-sm tabular-nums">
        {Math.round(value * PERCENT)}%
      </span>
      <Button
        aria-label="Zoom in"
        onClick={zoomIn}
        size="icon"
        variant="outline"
      >
        <ZoomInIcon />
      </Button>
      <Button
        aria-label="Fit the width"
        aria-pressed={mode === "fit-width"}
        onClick={fitWidth}
        size="icon"
        variant="outline"
      >
        <MoveHorizontalIcon />
      </Button>
      <Button
        aria-label="Fit the page"
        aria-pressed={mode === "fit-page"}
        onClick={fitPage}
        size="icon"
        variant="outline"
      >
        <ScanIcon />
      </Button>
    </div>
  );
}
