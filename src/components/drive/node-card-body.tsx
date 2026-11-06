import { KindIcon } from "@/components/drive/kind-icon";
import { CardContent } from "@/components/ui/card";
import { getCourseIcon } from "@/lib/drive/courses";
import { formatBytes } from "@/lib/drive/format";
import { formatNodeContext } from "@/lib/drive/node-path";
import type { DriveNode } from "@/lib/drive/types";
import { cn } from "@/lib/utils";

const COURSE_ROOT_DEPTH = 1;

interface NodeCardBodyProps {
  childCount?: number;
  node: DriveNode;
  /** Where the node sits, for result lists where the name alone is ambiguous. */
  showPath?: boolean;
}

export function NodeCardBody({
  childCount,
  node,
  showPath,
}: NodeCardBodyProps) {
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
  const context = showPath ? formatNodeContext(node) : "";

  return (
    <div className={cn("node-card", isCourseRoot && "bg-primary/10")}>
      <CardContent className="flex items-center gap-3">
        {CourseIcon ? (
          <div className="bg-primary flex size-8 shrink-0 items-center justify-center rounded border-2 border-black">
            <CourseIcon className="size-4" />
          </div>
        ) : (
          <KindIcon
            className="text-muted-foreground size-8 shrink-0"
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
          {context ? (
            <p className="text-muted-foreground truncate text-xs">{context}</p>
          ) : null}
        </div>
      </CardContent>
    </div>
  );
}
