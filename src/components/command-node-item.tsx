import { useCallback } from "react";
import { KindIcon } from "@/components/drive/kind-icon";
import { CommandItem } from "@/components/ui/command";
import { formatNodePath } from "@/lib/drive/node-path";
import type { DriveNode } from "@/lib/drive/types";

interface CommandNodeItemProps {
  node: DriveNode;
  onSelect: (node: DriveNode) => void;
}

export function CommandNodeItem({ node, onSelect }: CommandNodeItemProps) {
  const handleSelect = useCallback(() => onSelect(node), [node, onSelect]);

  return (
    <CommandItem
      className="gap-2"
      key={node.id}
      onSelect={handleSelect}
      value={node.id}
    >
      <KindIcon className="text-muted-foreground" kind={node.kind} />
      <div className="flex min-w-0 flex-col">
        <span className="truncate">{node.name}</span>
        <span className="truncate text-muted-foreground text-xs">
          {formatNodePath(node)}
        </span>
      </div>
    </CommandItem>
  );
}
