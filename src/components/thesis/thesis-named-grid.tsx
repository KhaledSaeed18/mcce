import { ThesisNamedCard } from "@/components/thesis/thesis-named-card";
import type { ThesisNamedItem } from "@/lib/thesis/types";

interface ThesisNamedGridProps {
  items: ThesisNamedItem[];
}

export function ThesisNamedGrid({ items }: ThesisNamedGridProps) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li className="flex *:flex-1" key={item.title}>
          <ThesisNamedCard item={item} />
        </li>
      ))}
    </ul>
  );
}
