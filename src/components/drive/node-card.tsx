import { Link } from "@tanstack/react-router";
import { useCallback } from "react";
import { NodeCardBody } from "@/components/drive/node-card-body";
import { SaveNodeButton } from "@/components/drive/save-node-button";
import type { DriveNode } from "@/lib/drive/types";

const FOCUS_RING_CLASSES =
  "block w-full text-left focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

interface NodeCardProps {
  childCount?: number;
  node: DriveNode;
  showPath?: boolean;
}

export function NodeCard({ node, childCount, showPath }: NodeCardProps) {
  const toFilePreview = useCallback(
    (prev: Record<string, unknown>) => ({ ...prev, file: node.id }),
    [node.id]
  );

  const isFolder = node.kind === "folder";

  return (
    <div className="relative h-full">
      {isFolder ? (
        <Link
          className={FOCUS_RING_CLASSES}
          params={{ folderId: node.id }}
          to="/browse/$folderId"
        >
          <NodeCardBody
            childCount={childCount}
            node={node}
            showPath={showPath}
          />
        </Link>
      ) : (
        // The preview lives in the URL, so the card is a link: shareable, and
        // the back button closes it.
        <Link className={FOCUS_RING_CLASSES} search={toFilePreview} to=".">
          <NodeCardBody node={node} showPath={showPath} />
        </Link>
      )}

      <SaveNodeButton name={node.name} nodeId={node.id} />
    </div>
  );
}
