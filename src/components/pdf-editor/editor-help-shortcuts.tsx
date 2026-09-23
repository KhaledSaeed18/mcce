import { EditorHelpSection } from "@/components/pdf-editor/editor-help-section";
import { EditorShortcutRow } from "@/components/pdf-editor/editor-shortcut-row";
import {
  EDITOR_SHORTCUT_TOOLS,
  TOOL_HOTKEYS,
  TOOL_LABELS,
} from "@/config/pdf-editor";
import {
  EDITOR_HELP_SHORTCUT_GROUPS,
  EDITOR_HELP_TOOLS_TITLE,
} from "@/config/pdf-editor-help";

/** Tool keys come from the tool list itself, so a new tool shows up here on its own. */
export function EditorHelpShortcuts() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
      <EditorHelpSection title={EDITOR_HELP_TOOLS_TITLE}>
        <ul className="divide-y">
          {EDITOR_SHORTCUT_TOOLS.map((tool) => (
            <EditorShortcutRow
              key={tool}
              keys={TOOL_HOTKEYS[tool]}
              label={TOOL_LABELS[tool]}
            />
          ))}
        </ul>
      </EditorHelpSection>
      {EDITOR_HELP_SHORTCUT_GROUPS.map((group) => (
        <EditorHelpSection key={group.title} title={group.title}>
          <ul className="divide-y">
            {group.items.map((item) => (
              <EditorShortcutRow
                key={item.label}
                keys={item.keys}
                label={item.label}
              />
            ))}
          </ul>
        </EditorHelpSection>
      ))}
    </div>
  );
}
