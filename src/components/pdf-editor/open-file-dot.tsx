import { OPEN_FILE_DOT_LABEL } from "@/config/pdf-editor";

/** Marks a file in the panel that already has a tab. */
export function OpenFileDot() {
  return (
    <span
      className="ml-auto size-2 shrink-0 rounded-full border border-border bg-primary"
      title={OPEN_FILE_DOT_LABEL}
    >
      <span className="sr-only">{OPEN_FILE_DOT_LABEL}</span>
    </span>
  );
}
