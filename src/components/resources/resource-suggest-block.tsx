import { Link } from "@tanstack/react-router";
import {
  RESOURCES_NOT_SPONSORED,
  RESOURCES_SUGGEST_ACTION,
  RESOURCES_SUGGEST_BODY,
  RESOURCES_SUGGEST_TITLE,
} from "@/config/resources/copy";

export function ResourceSuggestBlock() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border-2 bg-card p-4 shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-head text-lg">{RESOURCES_SUGGEST_TITLE}</h2>
        <p className="text-muted-foreground text-sm">
          {RESOURCES_SUGGEST_BODY} {RESOURCES_NOT_SPONSORED}
        </p>
      </div>
      <Link
        className="inline-flex w-fit shrink-0 items-center rounded border-2 border-black bg-primary px-3 py-1.5 font-head text-sm shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        to="/contact"
      >
        {RESOURCES_SUGGEST_ACTION}
      </Link>
    </div>
  );
}
