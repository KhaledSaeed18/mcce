import { RecentCourseGroup } from "@/components/recent/recent-course-group";
import { formatDate } from "@/lib/drive/format";
import type { RecentBatch } from "@/lib/drive/types";

interface RecentBatchSectionProps {
  batch: RecentBatch;
}

export function RecentBatchSection({ batch }: RecentBatchSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline gap-3 border-b-2 pb-2">
        <h2 className="font-head text-lg sm:text-xl">
          {formatDate(batch.addedAt)}
        </h2>
        <span className="text-muted-foreground text-sm">
          {batch.total} file{batch.total === 1 ? "" : "s"}
        </span>
      </div>

      {batch.courses.map((group) => (
        <RecentCourseGroup group={group} key={group.code} />
      ))}
    </section>
  );
}
