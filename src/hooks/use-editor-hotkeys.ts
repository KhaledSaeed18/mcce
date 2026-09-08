import { useEffect } from "react";
import {
  DELETE_HOTKEY_KEYS,
  DESELECT_HOTKEY_KEY,
  REDO_HOTKEY_KEY,
  TOOL_HOTKEYS,
  UNDO_HOTKEY_KEY,
} from "@/config/pdf-editor";
import { isEditableTarget } from "@/lib/is-editable-target";
import type { EditorTool } from "@/lib/pdf-editor/types";

interface EditorHotkeyOptions {
  onDeselect: () => void;
  onFitWidth: () => void;
  onRedo: () => void;
  onRemove: () => void;
  onToolChange: (tool: EditorTool) => void;
  onUndo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const KEY_TO_TOOL = new Map<string, EditorTool>(
  Object.entries(TOOL_HOTKEYS).map(([tool, key]) => [key, tool as EditorTool])
);

function handleHistory(
  event: KeyboardEvent,
  onRedo: () => void,
  onUndo: () => void
): boolean {
  if (!(event.metaKey || event.ctrlKey)) {
    return false;
  }
  const key = event.key.toLowerCase();
  if (key === REDO_HOTKEY_KEY) {
    event.preventDefault();
    onRedo();
    return true;
  }
  if (key === UNDO_HOTKEY_KEY) {
    event.preventDefault();
    (event.shiftKey ? onRedo : onUndo)();
    return true;
  }
  return false;
}

function handleZoom(
  event: KeyboardEvent,
  onFitWidth: () => void,
  onZoomIn: () => void,
  onZoomOut: () => void
): boolean {
  if (!(event.metaKey || event.ctrlKey) || event.altKey) {
    return false;
  }
  const { key } = event;
  if (key === "+" || key === "=") {
    event.preventDefault();
    onZoomIn();
    return true;
  }
  if (key === "-") {
    event.preventDefault();
    onZoomOut();
    return true;
  }
  if (key === "0") {
    event.preventDefault();
    onFitWidth();
    return true;
  }
  return false;
}

function handleSelection(
  event: KeyboardEvent,
  onDeselect: () => void,
  onRemove: () => void
): boolean {
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return false;
  }
  if (DELETE_HOTKEY_KEYS.includes(event.key)) {
    event.preventDefault();
    onRemove();
    return true;
  }
  if (event.key === DESELECT_HOTKEY_KEY) {
    onDeselect();
    return true;
  }
  return false;
}

function handleToolSwitch(
  event: KeyboardEvent,
  onToolChange: (tool: EditorTool) => void
): boolean {
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return false;
  }
  const tool = KEY_TO_TOOL.get(event.key);
  if (tool) {
    event.preventDefault();
    onToolChange(tool);
    return true;
  }
  return false;
}

/**
 * Cmd/Ctrl+Z steps back and Cmd/Ctrl+Shift+Z or Cmd/Ctrl+Y steps forward;
 * Delete takes the selected text off the page and Escape lets go of it.
 * P/E/T/R/C switch tools; Cmd/Ctrl+=/-/0 control zoom.
 */
export function useEditorHotkeys({
  onDeselect,
  onFitWidth,
  onRedo,
  onRemove,
  onToolChange,
  onUndo,
  onZoomIn,
  onZoomOut,
}: EditorHotkeyOptions) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) {
        return;
      }
      if (handleHistory(event, onRedo, onUndo)) {
        return;
      }
      if (handleZoom(event, onFitWidth, onZoomIn, onZoomOut)) {
        return;
      }
      if (handleSelection(event, onDeselect, onRemove)) {
        return;
      }
      handleToolSwitch(event, onToolChange);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    onDeselect,
    onFitWidth,
    onRedo,
    onRemove,
    onToolChange,
    onUndo,
    onZoomIn,
    onZoomOut,
  ]);
}
