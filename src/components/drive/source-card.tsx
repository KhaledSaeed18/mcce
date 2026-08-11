import { Link } from "@tanstack/react-router";
import { FolderOpenIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatBytes } from "@/lib/drive/format";
import type { DriveSource } from "@/lib/drive/types";
import { cn } from "@/lib/utils";

const CARD_CLASSES = cn(
  "cursor-pointer border-2 shadow-md transition duration-200",
  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg",
  "active:translate-x-1 active:translate-y-1 active:shadow-none"
);

interface SourceCardProps {
  description: string | null;
  fileCount: number;
  folderCount: number;
  source: DriveSource;
  totalBytes: number;
}

export function SourceCard({
  source,
  description,
  fileCount,
  folderCount,
  totalBytes,
}: SourceCardProps) {
  return (
    <Link params={{ folderId: source.rootFolderId }} to="/browse/$folderId">
      <Card className={CARD_CLASSES}>
        <CardHeader>
          <div
            className="flex size-10 items-center justify-center rounded border-2 border-black"
            style={{ backgroundColor: `var(--${source.color})` }}
          >
            <FolderOpenIcon className="size-5" />
          </div>
          <CardTitle>{source.label}</CardTitle>
          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          {folderCount} folders · {fileCount} files · {formatBytes(totalBytes)}
        </CardContent>
      </Card>
    </Link>
  );
}
