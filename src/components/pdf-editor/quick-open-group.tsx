import { QuickOpenItem } from "@/components/pdf-editor/quick-open-item";
import { CommandGroup } from "@/components/ui/command";
import type { EditorTreeNode } from "@/lib/pdf-editor/types";

interface QuickOpenGroupProps {
  heading: string;
  nodes: EditorTreeNode[];
  onSelect: (node: EditorTreeNode) => void;
}

/** One group of quick open's list, left out when it has nothing in it. */
export function QuickOpenGroup({
  heading,
  nodes,
  onSelect,
}: QuickOpenGroupProps) {
  if (nodes.length === 0) {
    return null;
  }
  return (
    <CommandGroup heading={heading}>
      {nodes.map((node) => (
        <QuickOpenItem key={node.id} node={node} onSelect={onSelect} />
      ))}
    </CommandGroup>
  );
}
