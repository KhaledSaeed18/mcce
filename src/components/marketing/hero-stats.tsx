import { formatDateTime } from "@/lib/drive/format";
import type { DriveIndexStats } from "@/lib/drive/types";

interface HeroStatsProps {
  stats: DriveIndexStats;
}

export function HeroStats({ stats }: HeroStatsProps) {
  const items = [
    `${stats.fileCount} files`,
    `${stats.folderCount} folders`,
    `${stats.sourceCount} drive folders indexed`,
    `synced ${formatDateTime(stats.generatedAt)}`,
  ];

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground text-xs sm:text-sm">
      {items.map((item, index) => (
        <span className="flex items-center gap-2" key={item}>
          {index > 0 && <span aria-hidden="true">·</span>}
          <span className="tabular-nums">{item}</span>
        </span>
      ))}
    </p>
  );
}
