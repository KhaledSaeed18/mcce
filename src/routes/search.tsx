import { createFileRoute } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { NodeCard } from "@/components/drive/node-card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SITE_URL } from "@/config/site";
import { buildChildrenMap } from "@/lib/drive/children-map";
import { buildFacetOptions } from "@/lib/drive/facets";
import { filterNodes } from "@/lib/drive/filter";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import { searchNodes } from "@/lib/drive/search";
import type { DriveNodeKind } from "@/lib/drive/types";

const ALL_VALUE = "all";
const SEARCH_URL = `${SITE_URL}/search`;

interface SearchPageSearch {
  course?: string;
  kind?: DriveNodeKind;
  q: string;
  semester?: string;
}

function readOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () => ({
    links: [{ href: SEARCH_URL, rel: "canonical" }],
    meta: [
      { title: "Search · MCCE" },
      {
        content:
          "Search MCCE program materials by name, semester, course, or file type.",
        name: "description",
      },
      { content: "noindex, follow", name: "robots" },
    ],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
  validateSearch: (search: Record<string, unknown>): SearchPageSearch => ({
    course: readOptionalString(search.course),
    kind: readOptionalString(search.kind) as DriveNodeKind | undefined,
    q: typeof search.q === "string" ? search.q : "",
    semester: readOptionalString(search.semester),
  }),
});

function SearchPage() {
  const driveIndex = Route.useLoaderData();
  const { q, semester, course, kind } = Route.useSearch();
  const navigate = Route.useNavigate();

  const facets = useMemo(
    () => buildFacetOptions(driveIndex.nodes),
    [driveIndex.nodes]
  );
  const childrenMap = useMemo(
    () => buildChildrenMap(driveIndex.nodes),
    [driveIndex.nodes]
  );

  const hasCriteria =
    q.trim().length > 0 || Boolean(semester || course || kind);

  const results = useMemo(() => {
    if (!hasCriteria) {
      return [];
    }
    const filtered = filterNodes(driveIndex.nodes, {
      courseCode: course,
      kind,
      semester,
    });
    return searchNodes(filtered, q);
  }, [driveIndex.nodes, q, semester, course, kind, hasCriteria]);

  const updateSearch = useCallback(
    (patch: Partial<SearchPageSearch>) => {
      navigate({ search: (prev) => ({ ...prev, ...patch }) });
    },
    [navigate]
  );

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      updateSearch({ q: event.target.value }),
    [updateSearch]
  );

  const handleSemesterChange = useCallback(
    (value: string | null) =>
      updateSearch({
        semester: value === null || value === ALL_VALUE ? undefined : value,
      }),
    [updateSearch]
  );

  const handleCourseChange = useCallback(
    (value: string | null) =>
      updateSearch({
        course: value === null || value === ALL_VALUE ? undefined : value,
      }),
    [updateSearch]
  );

  const handleKindChange = useCallback(
    (value: string | null) =>
      updateSearch({
        kind:
          value === null || value === ALL_VALUE
            ? undefined
            : (value as DriveNodeKind),
      }),
    [updateSearch]
  );

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-4 p-4 sm:p-6">
      <h1 className="font-head text-xl sm:text-2xl">Search</h1>

      <Input
        onChange={handleQueryChange}
        placeholder="Search files and folders..."
        value={q}
      />

      <div className="flex flex-wrap gap-2">
        <Select
          onValueChange={handleSemesterChange}
          value={semester ?? ALL_VALUE}
        >
          <SelectTrigger>
            <SelectValue>
              {(value: string) =>
                value === ALL_VALUE ? "All semesters" : value
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={ALL_VALUE}>All semesters</SelectItem>
              {facets.semesters.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={handleCourseChange} value={course ?? ALL_VALUE}>
          <SelectTrigger>
            <SelectValue>
              {(value: string) => (value === ALL_VALUE ? "All courses" : value)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={ALL_VALUE}>All courses</SelectItem>
              {facets.courses.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.code}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={handleKindChange} value={kind ?? ALL_VALUE}>
          <SelectTrigger>
            <SelectValue>
              {(value: string) => (value === ALL_VALUE ? "All types" : value)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={ALL_VALUE}>All types</SelectItem>
              {facets.kinds.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {hasCriteria ? null : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle>Search the program materials</EmptyTitle>
            <EmptyDescription>
              Type a name, or pick a semester, course, or type to browse by
              filter.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {hasCriteria && results.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle>No results</EmptyTitle>
            <EmptyDescription>
              Try a different search term or clear a filter.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {hasCriteria && results.length > 0 && (
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
      )}
    </main>
  );
}
