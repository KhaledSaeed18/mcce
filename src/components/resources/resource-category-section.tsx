import { ResourceGrid } from "@/components/resources/resource-grid";
import type { CategorySection } from "@/lib/resources/group";

interface ResourceCategorySectionProps {
  section: CategorySection;
}

export function ResourceCategorySection({
  section,
}: ResourceCategorySectionProps) {
  const { category, tools } = section;
  const CategoryIcon = category.icon;

  return (
    <section className="flex scroll-mt-20 flex-col gap-4" id={category.id}>
      <div className="flex items-center gap-3 border-b-2 pb-2">
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded border-2 border-black"
          style={{ backgroundColor: `var(--${category.color})` }}
        >
          <CategoryIcon aria-hidden="true" className="size-4 text-black" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-head text-lg sm:text-xl" tabIndex={-1}>
            {category.label}
          </h2>
          <p className="truncate text-muted-foreground text-xs">
            {category.tagline}
          </p>
        </div>
        <span className="shrink-0 text-muted-foreground text-sm">
          {tools.length} tools
        </span>
      </div>

      <ResourceGrid tools={tools} />
    </section>
  );
}
