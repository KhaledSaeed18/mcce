import { Link } from "@tanstack/react-router";
import { ArrowRightIcon, SparkleIcon } from "lucide-react";
import { formatDate } from "@/lib/drive/format";

interface RecentStripProps {
  addedAt: string;
  count: number;
}

/** Only rendered once a sync has actually found something, so it never says "0 new". */
export function RecentStrip({ addedAt, count }: RecentStripProps) {
  return (
    <Link
      className="flex items-center gap-3 rounded border-2 bg-primary/10 p-3 transition hover:bg-primary/20"
      to="/recent"
    >
      <SparkleIcon className="size-5 shrink-0" />
      <p className="min-w-0 flex-1 text-sm">
        <span className="font-medium">
          {count} file{count === 1 ? "" : "s"} added
        </span>
        <span className="text-muted-foreground"> on {formatDate(addedAt)}</span>
      </p>
      <ArrowRightIcon className="size-4 shrink-0" />
    </Link>
  );
}
