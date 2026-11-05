import type { ReactNode } from "react";

interface EditorKeyProps {
  children: ReactNode;
}

/** One key of a shortcut, drawn as a keycap. */
export function EditorKey({ children }: EditorKeyProps) {
  return (
    <kbd className="bg-card font-head inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded border-2 px-1 text-[0.65rem] uppercase shadow-sm">
      {children}
    </kbd>
  );
}
