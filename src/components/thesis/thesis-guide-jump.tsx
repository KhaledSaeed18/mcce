import { Link } from "@tanstack/react-router";
import { THESIS_GUIDE_ORDER } from "@/config/thesis";

export function ThesisGuideJump() {
  return (
    <nav aria-label="Jump to a section" className="flex flex-wrap gap-2">
      {THESIS_GUIDE_ORDER.map((section) => (
        <Link
          className="rounded border-2 px-2 py-1 font-medium text-xs transition hover:bg-primary"
          hash={section.id}
          key={section.id}
          to="."
        >
          {section.label}
        </Link>
      ))}
    </nav>
  );
}
