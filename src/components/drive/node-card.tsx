import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getCourseIcon } from "@/lib/drive/courses";
import { formatBytes } from "@/lib/drive/format";
import type { DriveNode } from "@/lib/drive/types";
import { cn } from "@/lib/utils";
import { FilePreviewDialog } from "./file-preview-dialog";
import { KindIcon } from "./kind-icon";

const COURSE_ROOT_DEPTH = 1;

const CARD_CLASSES = cn(
  "h-full cursor-pointer border-2 shadow-md transition duration-200",
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
  const isCourseRoot =
    isFolder && node.depth === COURSE_ROOT_DEPTH && Boolean(node.courseCode);
  const subtitle = isFolder
    ? `${childCount ?? 0} item${childCount === 1 ? "" : "s"}`
    : formatBytes(node.sizeBytes);
  const CourseIcon =
    isCourseRoot && node.courseCode && node.courseName
      ? getCourseIcon(node.courseCode, node.courseName)
      : null;
  const subtitleText = isCourseRoot ? `Course folder · ${subtitle}` : subtitle;

  return (
    <Card className={cn(CARD_CLASSES, isCourseRoot && "bg-primary/10")}>
      <CardContent className="flex items-center gap-3">
        {CourseIcon ? (
          <div className="flex size-8 shrink-0 items-center justify-center rounded border-2 border-black bg-primary">
            <CourseIcon className="size-4" />
          </div>
        ) : (
          <KindIcon
            className="size-8 shrink-0 text-muted-foreground"
            kind={node.kind}
          />
        )}
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "truncate font-medium",
              isCourseRoot && "font-semibold"
            )}
          >
            {node.name}
          </p>
          <p
            className={cn(
              "truncate text-xs",
              isCourseRoot ? "text-primary" : "text-muted-foreground"
            )}
          >
            {subtitleText}
          </p>
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
