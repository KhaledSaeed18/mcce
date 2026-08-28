import { RedoIcon, Trash2Icon, UndoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoryControlsProps {
  canRedo: boolean;
  canUndo: boolean;
  onClear: () => void;
  onRedo: () => void;
  onUndo: () => void;
}

export function HistoryControls({
  canRedo,
  canUndo,
  onClear,
  onRedo,
  onUndo,
}: HistoryControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        aria-label="Undo"
        disabled={!canUndo}
        onClick={onUndo}
        size="icon"
        variant="outline"
      >
        <UndoIcon />
      </Button>
      <Button
        aria-label="Redo"
        disabled={!canRedo}
        onClick={onRedo}
        size="icon"
        variant="outline"
      >
        <RedoIcon />
      </Button>
      <Button
        aria-label="Clear all markup"
        onClick={onClear}
        size="icon"
        variant="outline"
      >
        <Trash2Icon />
      </Button>
    </div>
  );
}
