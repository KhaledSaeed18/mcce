import {
  THESIS_ROUTE_MAP,
  THESIS_TERM_LABELS,
} from "@/config/resources/thesis-stages";

/** The week-by-week shape of the two terms, as a compact strip under the hero. */
export function ThesisRouteMap() {
  return (
    <ol className="grid gap-2 sm:grid-cols-3">
      {THESIS_ROUTE_MAP.map((row) => (
        <li
          className="flex flex-col gap-0.5 rounded border-2 bg-card px-3 py-2 text-sm"
          key={`${row.term}-${row.weeks}`}
        >
          <span className="text-muted-foreground text-xs">
            {THESIS_TERM_LABELS[row.term]}, weeks {row.weeks}
          </span>
          <span>{row.activity}</span>
        </li>
      ))}
    </ol>
  );
}
