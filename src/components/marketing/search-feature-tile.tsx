import { Link } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FeatureTile } from "@/components/marketing/feature-tile";
import { Badge } from "@/components/ui/badge";
import { SEARCH_PREVIEW_CHIPS, SEARCH_PREVIEW_QUERY } from "@/config/features";

const CARET_BLINK_SECONDS = 1.2;

export function SearchFeatureTile() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link className="block h-full" search={{ q: "" }} to="/search">
      <FeatureTile
        color="chart-1"
        description="One box over every file in both years. Narrow it down by semester, course code, or file type without leaving the results."
        icon={SearchIcon}
        interactive
        linkLabel="Open search"
        title="Search the whole index"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 rounded border-2 bg-background px-3 py-2 shadow-sm">
            <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate text-sm">{SEARCH_PREVIEW_QUERY}</span>
            <motion.span
              animate={shouldReduceMotion ? undefined : { opacity: [1, 0, 1] }}
              aria-hidden="true"
              className="h-4 w-0.5 shrink-0 bg-foreground"
              transition={{
                duration: CARET_BLINK_SECONDS,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {SEARCH_PREVIEW_CHIPS.map((chip) => (
              <Badge key={chip} variant="outline">
                {chip}
              </Badge>
            ))}
          </div>
        </div>
      </FeatureTile>
    </Link>
  );
}
