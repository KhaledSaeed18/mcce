import { KindIcon } from "@/components/drive/kind-icon";
import { Card, CardContent } from "@/components/ui/card";
import { getCourseIcon } from "@/lib/drive/courses";
import { formatBytes } from "@/lib/drive/format";
import { formatNodeContext } from "@/lib/drive/node-path";
import type { DriveNode } from "@/lib/drive/types";
import { cn } from "@/lib/utils";

const COURSE_ROOT_DEPTH = 1;

const CARD_CLASSES = cn(
  "h-full cursor-pointer border-2 shadow-md transition duration-200",
  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg",
  "active:translate-x-1 active:translate-y-1 active:shadow-none"
);

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
    <Card className={cn(CARD_CLASSES, isCourseRoot && "bg-primary/10")}>
      {/* Right padding leaves room for the save button sitting above the link. */}
      <CardContent className="flex items-center gap-3 pr-11">
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
          {context ? (
            <p className="truncate text-muted-foreground text-xs">{context}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
