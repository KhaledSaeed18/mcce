import type { LucideIcon } from "lucide-react";
import type { MouseEventHandler } from "react";
import { Button } from "@/components/ui/button";
import { preventFocus } from "@/lib/prevent-focus";
import { cn } from "@/lib/utils";

interface TextToolbarButtonProps {
  icon: LucideIcon;
  /** Set for a button that stays on, like bold. */
  isActive?: boolean;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

/** Pressing it leaves the focus where it is, so typing carries on after it. */
export function TextToolbarButton({
  icon: Icon,
  isActive,
  label,
  onClick,
}: TextToolbarButtonProps) {
  return (
    <Button
      aria-label={label}
      aria-pressed={isActive}
      className={cn(isActive && "bg-accent text-accent-foreground")}
      onClick={onClick}
      onMouseDown={preventFocus}
      size="icon-sm"
      title={label}
      type="button"
      variant="ghost"
    >
      <Icon />
    </Button>
  );
}
