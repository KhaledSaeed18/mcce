import { useEffect } from "react";
import { isDialogTarget } from "@/lib/is-dialog-target";
import { isEditableTarget } from "@/lib/is-editable-target";
import { resolveTabKey } from "@/lib/pdf-editor/tab-key-result";
import { readTabKey } from "@/lib/pdf-editor/tab-keys";
import type { EditorDesk, OpenFile } from "@/lib/pdf-editor/types";

interface EditorTabKeyOptions {
  activeId: string | undefined;
  desk: EditorDesk;
  onClose: (id: string) => void;
  onShow: (file: OpenFile) => void;
}

/** Alt+1 to 9 goes to a tab, Alt+[ and Alt+] step through them, Alt+` goes
 * back to the last file, Alt+W closes the tab, and Alt+Shift+T reopens the
 * one closed last. */
export function useEditorTabKeys({
  activeId,
  desk,
  onClose,
  onShow,
}: EditorTabKeyOptions) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target) || isDialogTarget(event.target)) {
        return;
      }
      const key = readTabKey(event);
      if (!key) {
        return;
      }
      event.preventDefault();
      const result = resolveTabKey(desk, activeId, key);
      if (result?.type === "close") {
        onClose(result.id);
      } else if (result) {
        onShow(result.file);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeId, desk, onClose, onShow]);
}
