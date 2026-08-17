import { NodeCard } from "@/components/drive/node-card";
import type { DriveNode } from "@/lib/drive/types";

interface NodeGridProps {
  /** Only needed where folders are listed, to show how many items each holds. */
  childrenMap?: Map<string, DriveNode[]>;
  nodes: DriveNode[];
  /** For lists gathered from across the tree, where a name alone is ambiguous. */
  showPath?: boolean;
}

export function NodeGrid({ childrenMap, nodes, showPath }: NodeGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {nodes.map((node) => (
        <NodeCard
          childCount={
            node.kind === "folder"
              ? (childrenMap?.get(node.id)?.length ?? 0)
              : undefined
          }
          key={node.id}
          node={node}
          showPath={showPath}
        />
      ))}
    </div>
  );
}
