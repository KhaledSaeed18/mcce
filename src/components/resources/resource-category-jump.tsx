import { Link } from "@tanstack/react-router";
import type { CategorySection } from "@/lib/resources/group";

interface ResourceCategoryJumpProps {
  sections: CategorySection[];
}

/** Twenty-five sections is a long page, so the labels double as a table of contents. */
export function ResourceCategoryJump({ sections }: ResourceCategoryJumpProps) {
  return (
    <nav aria-label="Jump to a category" className="flex flex-wrap gap-2">
      {sections.map(({ category, tools }) => (
        <Link
          className="rounded border-2 px-2 py-1 font-medium text-xs transition hover:bg-primary"
          hash={category.id}
          key={category.id}
          to="."
        >
          {category.label}
          <span className="ml-1 text-muted-foreground">{tools.length}</span>
        </Link>
      ))}
    </nav>
  );
}
