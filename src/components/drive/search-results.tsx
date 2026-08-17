import { NodeGrid } from "@/components/drive/node-grid";
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
        description="Type a name, or filter by semester, course, material, or file type."
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

  return <NodeGrid childrenMap={childrenMap} nodes={results} showPath />;
}
