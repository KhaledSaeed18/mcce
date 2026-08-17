import { SourceCard } from "@/components/drive/source-card";
import { DRIVE_SOURCES } from "@/config/sources";
import type { DriveIndex } from "@/lib/drive/types";

interface SourcesSectionProps {
  sourceSummaries: DriveIndex["meta"]["sources"];
}

export function SourcesSection({ sourceSummaries }: SourcesSectionProps) {
  return (
    <section className="flex scroll-mt-20 flex-col gap-6" id="materials">
      <div className="flex flex-col gap-1">
        <h2 className="font-head text-2xl sm:text-3xl">Program materials</h2>
        <p className="text-muted-foreground text-sm">
          Start from a year and walk down through semesters and courses.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {DRIVE_SOURCES.map((source) => {
          const summary = sourceSummaries.find((s) => s.id === source.id);

          return (
            <SourceCard
              description={summary?.description ?? null}
              fileCount={summary?.fileCount ?? 0}
              folderCount={summary?.folderCount ?? 0}
              key={source.id}
              source={source}
              totalBytes={summary?.totalBytes ?? 0}
            />
          );
        })}
      </div>
    </section>
  );
}
