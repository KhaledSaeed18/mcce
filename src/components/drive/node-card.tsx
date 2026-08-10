import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatBytes } from "@/lib/drive/format";
import type { DriveNode } from "@/lib/drive/types";
import { cn } from "@/lib/utils";
import { FilePreviewDialog } from "./file-preview-dialog";
import { KindIcon } from "./kind-icon";

const CARD_CLASSES = cn(
  "h-full cursor-pointer border-2 border-black shadow-md transition duration-200",
  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg",
  "active:translate-x-1 active:translate-y-1 active:shadow-none"
);

const FOCUS_RING_CLASSES =
  "block w-full text-left focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

interface NodeCardProps {
  childCount?: number;
  node: DriveNode;
}

function NodeCardBody({ node, childCount }: NodeCardProps) {
  const isFolder = node.kind === "folder";
  const subtitle = isFolder
    ? `${childCount ?? 0} item${childCount === 1 ? "" : "s"}`
    : formatBytes(node.sizeBytes);

  return (
    <Card className={CARD_CLASSES}>
      <CardContent className="flex items-center gap-3">
        <KindIcon
          className="size-8 shrink-0 text-muted-foreground"
          kind={node.kind}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{node.name}</p>
          <p className="truncate text-muted-foreground text-xs">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function FileNodeCard({ node }: { node: DriveNode }) {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);

  return (
    <>
      <button className={FOCUS_RING_CLASSES} onClick={handleOpen} type="button">
        <NodeCardBody node={node} />
      </button>
      <FilePreviewDialog node={node} onOpenChange={setOpen} open={open} />
    </>
  );
}

export function NodeCard({ node, childCount }: NodeCardProps) {
  if (node.kind === "folder") {
    return (
      <Link
        className={FOCUS_RING_CLASSES}
        params={{ folderId: node.id }}
        to="/browse/$folderId"
      >
        <NodeCardBody childCount={childCount} node={node} />
      </Link>
    );
  }

  return <FileNodeCard node={node} />;
}
