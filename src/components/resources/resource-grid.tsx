import { ResourceCard } from "@/components/resources/resource-card";
import type { ResourceEntry } from "@/lib/resources/types";

interface ResourceGridProps {
  tools: ResourceEntry[];
}

export function ResourceGrid({ tools }: ResourceGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <li className="min-w-0" key={tool.id}>
          <ResourceCard tool={tool} />
        </li>
      ))}
    </ul>
  );
}
