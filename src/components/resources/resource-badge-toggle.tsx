import { useCallback } from "react";
import { ResourceBadge } from "@/components/resources/resource-badge";
import type { BadgeFilter } from "@/lib/resources/types";
import { cn } from "@/lib/utils";

interface ResourceBadgeToggleProps {
  badge: BadgeFilter;
  count: number;
  onToggle: (badge: BadgeFilter) => void;
  pressed: boolean;
}

export function ResourceBadgeToggle({
  badge,
  count,
  onToggle,
  pressed,
}: ResourceBadgeToggleProps) {
  const handleClick = useCallback(() => onToggle(badge), [badge, onToggle]);

  return (
    <button
      aria-pressed={pressed}
      className={cn(
        "flex items-center gap-1.5 rounded border-2 px-1.5 py-1 transition focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        pressed
          ? "border-black bg-accent"
          : "border-transparent hover:bg-accent"
      )}
      onClick={handleClick}
      type="button"
    >
      <ResourceBadge badge={badge} />
      <span className="text-muted-foreground text-xs tabular-nums">
        {count}
      </span>
    </button>
  );
}
