import { Link } from "@tanstack/react-router";
import { FolderOpenIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DriveSource } from "@/lib/drive/types";

interface EmptySourceCardProps {
  source: DriveSource;
}

/** Stands in for a source whose Drive folder exists but holds no files, so the
 * year does not read as a broken link. */
export function EmptySourceCard({ source }: EmptySourceCardProps) {
  return (
    <Card className="h-full border-2 border-dashed shadow-none">
      <CardHeader>
        <div
          className="flex size-10 items-center justify-center rounded border-2 border-black opacity-60"
          style={{ backgroundColor: `var(--${source.color})` }}
        >
          <FolderOpenIcon className="size-5" />
        </div>
        <CardTitle className="text-muted-foreground">{source.label}</CardTitle>
        <CardDescription>
          Nothing shared to this year's Drive folder yet.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        Material appears here once it reaches the Drive. If you have slides,
        exams, or notes for this year,{" "}
        <Link className="underline underline-offset-4" to="/contact">
          send them in
        </Link>
        .
      </CardContent>
    </Card>
  );
}
