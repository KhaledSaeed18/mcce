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
    recent,
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
        className="size-8 p-0 lg:size-auto lg:h-8 lg:px-3"
        onClick={handleOpenClick}
        size="sm"
        variant="outline"
      >
        <SearchIcon data-icon="inline-start" />
        <span className="hidden lg:inline">Search</span>
        <kbd className="hidden rounded border-2 bg-muted px-1 font-sans text-xs lg:inline">
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
            {!(query.trim() || recent.length) && (
              <CommandEmpty>Start typing to search.</CommandEmpty>
            )}
            {/* The "More" group keeps an item mounted, so CommandEmpty never
                fires on a fruitless query and this branch has to cover it. */}
            {Boolean(query.trim()) && results.length === 0 && (
              <p className="py-6 text-center text-muted-foreground text-sm">
                No files or folders match "{query}".
              </p>
            )}
            {recent.length > 0 && (
              <CommandGroup heading="Recently opened">
                {recent.map((node) => (
                  <CommandNodeItem
                    key={node.id}
                    node={node}
                    onSelect={goToNode}
                  />
                ))}
              </CommandGroup>
            )}
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
