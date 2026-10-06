import { CourseObjectiveList } from "@/components/course/course-objective-list";

interface CourseObjectivesProps {
  objectives: string[];
}

export function CourseObjectives({ objectives }: CourseObjectivesProps) {
  if (objectives.length === 0) {
    return null;
  }

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <h2 className="text-muted-foreground text-xs uppercase tracking-wide">
        Objectives
      </h2>
      <CourseObjectiveList objectives={objectives} />
    </div>
  );
}
