import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { KindIcon } from "@/components/drive/kind-icon";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import { searchNodes } from "@/lib/drive/search";
import type { DriveNode } from "@/lib/drive/types";

const RESULT_LIMIT = 8;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: driveIndex } = useQuery(driveIndexQueryOptions);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const results = useMemo(() => {
    if (!(driveIndex && query.trim())) {
      return [];
    }
    return searchNodes(driveIndex.nodes, query).slice(0, RESULT_LIMIT);
  }, [driveIndex, query]);

  const goToNode = useCallback(
    (node: DriveNode) => {
      setOpen(false);
      setQuery("");
      if (node.kind === "folder") {
        navigate({ params: { folderId: node.id }, to: "/browse/$folderId" });
      } else {
        window.open(node.webViewLink, "_blank", "noopener");
      }
    },
    [navigate]
  );

  const handleSelectResult = useCallback(
    (nodeId: string) => {
      const node = results.find((result) => result.id === nodeId);
      if (node) {
        goToNode(node);
      }
    },
    [results, goToNode]
  );

  const goToFullSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
    navigate({ search: { q: query }, to: "/search" });
  }, [query, navigate]);

  const handleOpenClick = useCallback(() => setOpen(true), []);

  return (
    <>
      <Button
        aria-label="Search files and folders"
        onClick={handleOpenClick}
        size="sm"
        variant="outline"
      >
        <SearchIcon data-icon="inline-start" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border-2 bg-muted px-1 font-sans text-xs sm:inline">
          ⌘K
        </kbd>
      </Button>
      <CommandDialog onOpenChange={setOpen} open={open}>
        <Command shouldFilter={false}>
          <CommandInput
            onValueChange={setQuery}
            placeholder="Search files and folders..."
            value={query}
          />
          <CommandList>
            <CommandEmpty>
              {query.trim() ? "No matches." : "Start typing to search."}
            </CommandEmpty>
            {results.length > 0 && (
              <CommandGroup heading="Results">
                {results.map((node) => (
                  <CommandItem
                    className="gap-2"
                    key={node.id}
                    onSelect={handleSelectResult}
                    value={node.id}
                  >
                    <KindIcon
                      className="text-muted-foreground"
                      kind={node.kind}
                    />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate">{node.name}</span>
                      <span className="truncate text-muted-foreground text-xs">
                        {node.pathNames.slice(0, -1).join(" / ")}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {query.trim() && (
              <CommandGroup heading="More">
                <CommandItem
                  onSelect={goToFullSearch}
                  value={`view-all-${query}`}
                >
                  <SearchIcon />
                  View all results for "{query}"
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
