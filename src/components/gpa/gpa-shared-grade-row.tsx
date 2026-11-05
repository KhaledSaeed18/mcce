import type { SharedGrade } from "@/lib/gpa/share/decode";

interface GpaSharedGradeRowProps {
  grade: SharedGrade;
}

export function GpaSharedGradeRow({ grade }: GpaSharedGradeRowProps) {
  return (
    <li className="border-border/60 flex items-center justify-between gap-3 border-b-2 px-3 py-1.5 last:border-b-0">
      <span className="min-w-0 truncate">
        <span className="font-medium">{grade.code}</span>{" "}
        <span className="text-muted-foreground">{grade.name}</span>
      </span>
      <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
        {grade.credits} cr
      </span>
      <span className="shrink-0 tabular-nums">{grade.average}</span>
    </li>
  );
}
