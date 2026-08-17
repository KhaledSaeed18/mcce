import { CourseMaterialGroup } from "@/components/course/course-material-group";
import type { CourseMaterialGroup as CourseMaterialGroupData } from "@/lib/drive/types";

interface CourseMaterialsProps {
  courseCode: string;
  groups: CourseMaterialGroupData[];
}

export function CourseMaterials({ courseCode, groups }: CourseMaterialsProps) {
  if (groups.length === 0) {
    return (
      <p className="rounded border-2 border-dashed p-4 text-muted-foreground text-sm">
        No material for this course has reached the Drive yet. If you have some,
        send it through the contact page.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <CourseMaterialGroup
          courseCode={courseCode}
          group={group}
          key={group.type}
        />
      ))}
    </div>
  );
}
