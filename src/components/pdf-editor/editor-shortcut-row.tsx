import { EditorKey } from "@/components/pdf-editor/editor-key";
import { formatKeys } from "@/lib/pdf-editor/shortcut-label";

interface EditorShortcutRowProps {
  keys: string;
  label: string;
}

export function EditorShortcutRow({ keys, label }: EditorShortcutRowProps) {
  return (
    <li className="flex items-center justify-between gap-3 py-1">
      <span>{label}</span>
      <span className="flex items-center gap-1">
        {formatKeys(keys).map((key) => (
          <EditorKey key={key}>{key}</EditorKey>
        ))}
      </span>
    </li>
  );
}
