import { NodeCard } from "@/components/drive/node-card";
import { SearchEmptyState } from "@/components/drive/search-empty-state";
import type { DriveNode } from "@/lib/drive/types";

interface SearchResultsProps {
  childrenMap: Map<string, DriveNode[]>;
  hasCriteria: boolean;
  results: DriveNode[];
}

export function SearchResults({
  childrenMap,
  hasCriteria,
  results,
}: SearchResultsProps) {
  if (!hasCriteria) {
    return (
      <SearchEmptyState
        description="Type a name, or pick a semester, course, or type to browse by filter."
        title="Search the program materials"
      />
    );
  }

  if (results.length === 0) {
    return (
      <SearchEmptyState
        description="Try a different search term or clear a filter."
        title="No results"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((node) => (
        <NodeCard
          childCount={
            node.kind === "folder"
              ? (childrenMap.get(node.id)?.length ?? 0)
              : undefined
          }
          key={node.id}
          node={node}
        />
      ))}
    </div>
  );
}
