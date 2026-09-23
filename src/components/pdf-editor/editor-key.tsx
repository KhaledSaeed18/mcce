import type { ReactNode } from "react";

interface EditorKeyProps {
  children: ReactNode;
}

/** One key of a shortcut, drawn as a keycap. */
export function EditorKey({ children }: EditorKeyProps) {
  return (
    <kbd className="inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded border-2 bg-card px-1 font-head text-[0.65rem] uppercase shadow-sm">
      {children}
    </kbd>
  );
}
