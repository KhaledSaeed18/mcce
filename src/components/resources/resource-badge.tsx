import { Badge } from "@/components/ui/badge";
import {
  ACCESS_BADGE_COLORS,
  ACCESS_BADGE_LABELS,
  BADGE_FILTER_EXPLANATIONS,
  OPEN_SOURCE_LABEL,
} from "@/config/resources/badges";
import type { BadgeFilter } from "@/lib/resources/types";

interface ResourceBadgeProps {
  badge: BadgeFilter;
}

/** Colour marks the badge, the text names it, so the meaning never rides on colour alone. */
export function ResourceBadge({ badge }: ResourceBadgeProps) {
  const label =
    badge === "open-source" ? OPEN_SOURCE_LABEL : ACCESS_BADGE_LABELS[badge];
  const color = badge === "open-source" ? null : ACCESS_BADGE_COLORS[badge];

  return (
    <Badge
      className={color ? "text-black" : undefined}
      style={color ? { backgroundColor: `var(--${color})` } : undefined}
      title={BADGE_FILTER_EXPLANATIONS[badge]}
      variant={color ? "default" : "outline"}
    >
      {label}
    </Badge>
  );
}
