import {
  CircleIcon,
  DownloadIcon,
  EraserIcon,
  HandIcon,
  PenLineIcon,
  SquareIcon,
  TypeIcon,
} from "lucide-react";
import { ANNOTATION_COLORS, DEFAULT_COLOR } from "@/config/pdf-editor";
import { cn } from "@/lib/utils";

const TOOL_ICONS = [
  HandIcon,
  PenLineIcon,
  SquareIcon,
  CircleIcon,
  TypeIcon,
  EraserIcon,
];

const ACTIVE_TOOL_INDEX = 1;

export function EditorPreviewToolbar() {
  return (
    <div className="flex items-center gap-3 border-b-2 bg-card px-2 py-1.5">
      <div className="flex items-center gap-1">
        {TOOL_ICONS.map((Icon, index) => (
          <span
            className={cn(
              "flex size-6 items-center justify-center rounded border-2 border-transparent",
              index === ACTIVE_TOOL_INDEX &&
                "border-border bg-primary text-primary-foreground"
            )}
            key={Icon.displayName ?? index}
          >
            <Icon className="size-3.5" />
          </span>
        ))}
      </div>

      <span className="hidden h-4 w-0.5 bg-border sm:block" />

      <div className="hidden items-center gap-1.5 sm:flex">
        {ANNOTATION_COLORS.map((color) => (
          <span
            className={cn(
              "size-3.5 rounded-full border-2 border-border",
              color === DEFAULT_COLOR && "ring-2 ring-primary ring-offset-1"
            )}
            key={color}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <span className="ml-auto flex items-center gap-1 rounded border-2 bg-background px-2 py-0.5 font-head text-[10px]">
        <DownloadIcon className="size-3" />
        Export
      </span>
    </div>
  );
}
