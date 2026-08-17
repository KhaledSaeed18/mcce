import { SearchIcon } from "lucide-react";
import { useCallback } from "react";
import { CommandNodeItem } from "@/components/command-node-item";
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
import { useCommandPalette } from "@/hooks/use-command-palette";

export function CommandPalette() {
  const {
    goToFullSearch,
    goToNode,
    handleOpenChange,
    open,
    query,
    results,
    setQuery,
  } = useCommandPalette();

  const handleOpenClick = useCallback(
    () => handleOpenChange(true),
    [handleOpenChange]
  );

  return (
    <>
      <Button
        aria-label="Search files and folders"
        className="h-8"
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
      <CommandDialog onOpenChange={handleOpenChange} open={open}>
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
                  <CommandNodeItem
                    key={node.id}
                    node={node}
                    onSelect={goToNode}
                  />
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
