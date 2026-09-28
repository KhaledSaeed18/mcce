import { EditorTab } from "@/components/pdf-editor/editor-tab";
import { OPEN_FILES_LABEL } from "@/config/pdf-editor";
import type { OpenFile, TabLabel } from "@/lib/pdf-editor/types";

interface EditorTabStripProps {
  activeId: string | undefined;
  files: OpenFile[];
  /** One per file, in the same order. */
  labels: TabLabel[];
  onClose: (id: string) => void;
}

/** The open files, in the file bar where the file's title used to be. */
export function EditorTabStrip({
  activeId,
  files,
  labels,
  onClose,
}: EditorTabStripProps) {
  return (
    <nav aria-label={OPEN_FILES_LABEL} className="flex min-w-0 flex-1">
      {/* Room below and right for the active tab's shadow, which the scroller
          would clip, taken back from the bar so it keeps its height. */}
      <ul className="-mb-1 flex min-w-0 items-center gap-1.5 overflow-x-auto pr-1 pb-1 [scrollbar-width:none]">
        {files.map((file, index) => (
          <EditorTab
            file={file}
            isActive={file.id === activeId}
            key={file.id}
            label={labels[index]}
            onClose={onClose}
          />
        ))}
      </ul>
    </nav>
  );
}
