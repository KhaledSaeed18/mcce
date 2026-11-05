import type { LucideIcon } from "lucide-react";

interface TextInkTriggerProps {
  color: string | undefined;
  icon: LucideIcon;
}

/** A color menu's button, its icon over a bar of the color in use. */
export function TextInkTrigger({ color, icon: Icon }: TextInkTriggerProps) {
  return (
    <span className="flex flex-col items-center">
      <Icon className="size-4" />
      <span
        className="h-1 w-4 rounded-sm border border-current"
        style={{ backgroundColor: color ?? "transparent" }}
      />
    </span>
  );
}
