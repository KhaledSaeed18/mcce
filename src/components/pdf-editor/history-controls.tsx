import { ListRestartIcon, RedoIcon, Trash2Icon, UndoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHORTCUT_HINTS } from "@/config/pdf-editor";
import { withShortcut } from "@/lib/pdf-editor/shortcut-label";

const RESTORE_LABEL = "Restore the original file";

interface HistoryControlsProps {
  canClear: boolean;
  canRedo: boolean;
  canRestore: boolean;
  canUndo: boolean;
  onClear: () => void;
  onRedo: () => void;
  onRestore: () => void;
  onUndo: () => void;
}

export function HistoryControls({
  canClear,
  canRedo,
  canRestore,
  canUndo,
  onClear,
  onRedo,
  onRestore,
  onUndo,
}: HistoryControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        aria-label="Undo"
        disabled={!canUndo}
        onClick={onUndo}
        size="icon"
        title={withShortcut("Undo", SHORTCUT_HINTS.undo)}
        variant="outline"
      >
        <UndoIcon />
      </Button>
      <Button
        aria-label="Redo"
        disabled={!canRedo}
        onClick={onRedo}
        size="icon"
        title={withShortcut("Redo", SHORTCUT_HINTS.redo)}
        variant="outline"
      >
        <RedoIcon />
      </Button>
      <Button
        aria-label="Clear all markup"
        disabled={!canClear}
        onClick={onClear}
        size="icon"
        title="Clear all markup"
        variant="outline"
      >
        <Trash2Icon />
      </Button>
      <Button
        aria-label={RESTORE_LABEL}
        disabled={!canRestore}
        onClick={onRestore}
        size="icon"
        title={RESTORE_LABEL}
        variant="outline"
      >
        <ListRestartIcon />
      </Button>
    </div>
  );
}
