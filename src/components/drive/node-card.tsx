import { Link } from "@tanstack/react-router";
import { useCallback } from "react";
import { NodeCardBody } from "@/components/drive/node-card-body";
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

  if (node.kind === "folder") {
    return (
      <Link
        className={FOCUS_RING_CLASSES}
        params={{ folderId: node.id }}
        to="/browse/$folderId"
      >
        <NodeCardBody childCount={childCount} node={node} showPath={showPath} />
      </Link>
    );
  }

  // The preview lives in the URL, so the card is a link: shareable, and the
  // back button closes it.
  return (
    <Link className={FOCUS_RING_CLASSES} search={toFilePreview} to=".">
      <NodeCardBody node={node} showPath={showPath} />
    </Link>
  );
}
