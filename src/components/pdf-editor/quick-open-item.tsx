import { useCallback } from "react";
import { FileTypeChip } from "@/components/pdf-editor/file-type-chip";
import { CommandItem } from "@/components/ui/command";
import { findFileChip } from "@/lib/pdf-editor/file-chip";
import { stripPdfExtension } from "@/lib/pdf-editor/file-name";
import { buildTabLabels } from "@/lib/pdf-editor/tab-label";
import type { EditorTreeNode } from "@/lib/pdf-editor/types";

interface QuickOpenItemProps {
  node: EditorTreeNode;
  onSelect: (node: EditorTreeNode) => void;
}

export function QuickOpenItem({ node, onSelect }: QuickOpenItemProps) {
  const handleSelect = useCallback(() => onSelect(node), [node, onSelect]);
  const chip = findFileChip(node.name, node.materialType);
  // The short name splits joined words, so "formula sheet" finds FormulaSheet.
  const [{ text }] = buildTabLabels([node]);

  return (
    <CommandItem
      keywords={[node.name, text, node.courseCode ?? ""]}
      onSelect={handleSelect}
      value={node.id}
    >
      {chip ? <FileTypeChip chip={chip} /> : null}
      <span className="truncate">{stripPdfExtension(node.name)}</span>
      {node.courseCode ? (
        <span className="ml-auto shrink-0 text-muted-foreground text-xs">
          {node.courseCode}
        </span>
      ) : null}
    </CommandItem>
  );
}
