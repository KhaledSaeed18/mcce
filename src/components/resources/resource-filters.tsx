import { useCallback } from "react";
import { SearchFilterSelect } from "@/components/drive/search-filter-select";
import { ResourceBadgeToggle } from "@/components/resources/resource-badge-toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BADGE_FILTERS } from "@/config/resources/badges";
import { RESOURCE_CATEGORIES } from "@/config/resources/categories";
import {
  BADGE_LEGEND_ID,
  BADGE_LEGEND_LINK,
  RESOURCES_EMPTY_ACTION,
} from "@/config/resources/copy";
import type {
  BadgeFilter,
  ResourceCategoryId,
  ResourceFilterValues,
} from "@/lib/resources/types";

const QUERY_INPUT_ID = "resource-search-query";

const CATEGORY_OPTIONS = RESOURCE_CATEGORIES.map((category) => ({
  label: category.label,
  value: category.id,
}));

interface ResourceFiltersProps {
  badgeCounts: Record<BadgeFilter, number>;
  hasCriteria: boolean;
  onChange: (patch: Partial<ResourceFilterValues>) => void;
  onClear: () => void;
  resultCount: number;
  /** Omitted on the category and thesis pages, where the category is fixed. */
  showCategory?: boolean;
  /** Only the tools page carries the legend section this points at. */
  showLegendLink?: boolean;
  values: ResourceFilterValues;
}

export function ResourceFilters({
  badgeCounts,
  hasCriteria,
  onChange,
  onClear,
  resultCount,
  showCategory = true,
  showLegendLink = false,
  values,
}: ResourceFiltersProps) {
  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ q: event.target.value || undefined }),
    [onChange]
  );

  const handleCategoryChange = useCallback(
    (category: string | undefined) =>
      onChange({ category: category as ResourceCategoryId | undefined }),
    [onChange]
  );

  const handleBadgeToggle = useCallback(
    (badge: BadgeFilter) => {
      const current = values.badge ?? [];
      const next = current.includes(badge)
        ? current.filter((item) => item !== badge)
        : [...current, badge];
      onChange({ badge: next.length > 0 ? next : undefined });
    },
    [onChange, values.badge]
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <div className="min-w-56 flex-1">
          <Label className="sr-only" htmlFor={QUERY_INPUT_ID}>
            Search tools
          </Label>
          <Input
            id={QUERY_INPUT_ID}
            onChange={handleQueryChange}
            placeholder="Search tools..."
            value={values.q ?? ""}
          />
        </div>
        {showCategory ? (
          <SearchFilterSelect
            allLabel="All categories"
            label="Category"
            onValueChange={handleCategoryChange}
            options={CATEGORY_OPTIONS}
            value={values.category}
          />
        ) : null}
      </div>

      <div className="flex flex-wrap gap-1">
        {BADGE_FILTERS.map((badge) => (
          <ResourceBadgeToggle
            badge={badge}
            count={badgeCounts[badge]}
            key={badge}
            onToggle={handleBadgeToggle}
            pressed={values.badge?.includes(badge) ?? false}
          />
        ))}
      </div>

      <p
        aria-live="polite"
        className="flex items-center gap-3 text-muted-foreground text-sm"
      >
        <span>{resultCount} tools</span>
        {showLegendLink ? (
          <a
            className="underline underline-offset-4 hover:text-primary"
            href={`#${BADGE_LEGEND_ID}`}
          >
            {BADGE_LEGEND_LINK}
          </a>
        ) : null}
        {hasCriteria ? (
          <button
            className="underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            onClick={onClear}
            type="button"
          >
            {RESOURCES_EMPTY_ACTION}
          </button>
        ) : null}
      </p>
    </div>
  );
}
