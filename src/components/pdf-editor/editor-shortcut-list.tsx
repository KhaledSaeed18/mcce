import { EditorIdleSection } from "@/components/pdf-editor/editor-idle-section";
import { EditorKey } from "@/components/pdf-editor/editor-key";
import {
  EDITOR_SHORTCUT_TOOLS,
  EDITOR_SHORTCUTS_TITLE,
  TOOL_HOTKEYS,
  TOOL_LABELS,
} from "@/config/pdf-editor";

export function EditorShortcutList() {
  return (
    <EditorIdleSection title={EDITOR_SHORTCUTS_TITLE}>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {EDITOR_SHORTCUT_TOOLS.map((tool) => (
          <li className="flex items-center gap-1.5 text-sm" key={tool}>
            <EditorKey>{TOOL_HOTKEYS[tool]}</EditorKey>
            {TOOL_LABELS[tool]}
          </li>
        ))}
      </ul>
    </EditorIdleSection>
  );
}
