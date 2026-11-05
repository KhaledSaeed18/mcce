import { Link } from "@tanstack/react-router";
import {
  RESOURCES_NOT_SPONSORED,
  RESOURCES_SUGGEST_ACTION,
  RESOURCES_SUGGEST_BODY,
  RESOURCES_SUGGEST_TITLE,
} from "@/config/resources/copy";

export function ResourceSuggestBlock() {
  return (
    <div className="bg-card flex flex-col gap-3 rounded-lg border-2 p-4 shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-head text-lg">{RESOURCES_SUGGEST_TITLE}</h2>
        <p className="text-muted-foreground text-sm">
          {RESOURCES_SUGGEST_BODY} {RESOURCES_NOT_SPONSORED}
        </p>
      </div>
      <Link
        className="lift-hit-area bg-primary font-head focus-visible:outline-primary inline-flex w-fit shrink-0 items-center rounded border-2 border-black px-3 py-1.5 text-sm shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
        to="/contact"
      >
        {RESOURCES_SUGGEST_ACTION}
      </Link>
    </div>
  );
}
