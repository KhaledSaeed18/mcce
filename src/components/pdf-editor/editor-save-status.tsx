import { CheckIcon, TriangleAlertIcon } from "lucide-react";
import { SAVE_STATUS_COPY } from "@/config/pdf-editor";
import type { SaveStatus } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface EditorSaveStatusProps {
  /** True while the file loads: the label keeps its room, unseen, so the
   * tabs beside it do not shift on every switch. */
  isPending?: boolean;
  status: SaveStatus;
}

export function EditorSaveStatus({ isPending, status }: EditorSaveStatusProps) {
  const copy = SAVE_STATUS_COPY[status];
  const Icon = status === "saved" ? CheckIcon : TriangleAlertIcon;

  return (
    <span
      className={cn(
        "items-center gap-1.5 whitespace-nowrap text-xs",
        // Only a failure is worth the room on the narrowest screens the editor allows.
        status === "saved"
          ? "hidden text-muted-foreground xl:flex"
          : "flex text-destructive",
        isPending && "invisible"
      )}
      role={isPending ? undefined : "status"}
      title={copy.detail}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {copy.label}
    </span>
  );
}
