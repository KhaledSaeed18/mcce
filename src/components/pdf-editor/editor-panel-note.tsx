import type { ReactNode } from "react";

interface EditorPanelNoteProps {
  children: ReactNode;
}

/** What a side panel says in place of a list with nothing in it yet. */
export function EditorPanelNote({ children }: EditorPanelNoteProps) {
  return <p className="text-muted-foreground p-4 text-sm">{children}</p>;
}
