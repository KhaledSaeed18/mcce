import { motion } from "motion/react";
import { EmptySourceCard } from "@/components/drive/empty-source-card";
import { SourceCard } from "@/components/drive/source-card";
import { DRIVE_SOURCES } from "@/config/sources";
import { useReveal } from "@/hooks/use-reveal";
import type { DriveIndex } from "@/lib/drive/types";

interface SourcesSectionProps {
  sourceSummaries: DriveIndex["meta"]["sources"];
}

export function SourcesSection({ sourceSummaries }: SourcesSectionProps) {
  const reveal = useReveal();

  return (
    <section className="flex scroll-mt-20 flex-col gap-6" id="materials">
      <motion.div className="flex flex-col gap-1" {...reveal.single}>
        <h2 className="font-head text-2xl sm:text-3xl">Program materials</h2>
        <p className="text-muted-foreground text-sm">
          Start from a year and walk down through semesters and courses.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        {...reveal.group}
      >
        {DRIVE_SOURCES.map((source) => {
          const summary = sourceSummaries.find((s) => s.id === source.id);

          return (
            <motion.div key={source.id} {...reveal.item}>
              {summary?.fileCount ? (
                <SourceCard
                  description={summary.description}
                  fileCount={summary.fileCount}
                  folderCount={summary.folderCount}
                  source={source}
                  totalBytes={summary.totalBytes}
                />
              ) : (
                <EmptySourceCard source={source} />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
