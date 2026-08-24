import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CCE_DIFFERENCE_NOTE } from "@/config/cce/content";
import { CENG_PROGRAM, TENG_PROGRAM } from "@/config/cce/programs";
import { getCceProgramDifference } from "@/lib/cce/difference";
import type { CceCourse } from "@/lib/cce/types";

const DIFFERENCE = getCceProgramDifference(CENG_PROGRAM, TENG_PROGRAM);

interface DifferenceColumnProps {
  courses: CceCourse[];
  label: string;
}

function DifferenceColumn({ courses, label }: DifferenceColumnProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-head text-muted-foreground text-sm uppercase tracking-wide">
        {label}
      </h3>
      {courses.map((course) => (
        <div className="rounded border-2 bg-background p-3" key={course.code}>
          <p className="font-head">{course.code}</p>
          <p className="text-muted-foreground text-sm">{course.name}</p>
        </div>
      ))}
    </div>
  );
}

export function CceDifference() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 className="font-head text-xl sm:text-2xl">
            CENG and TENG differ by one course
          </h2>
        </CardTitle>
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant="outline">
            {DIFFERENCE.sharedCount} shared courses
          </Badge>
          <Badge variant="outline">1 course apart</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <p className="text-muted-foreground text-sm sm:text-base">
          Once the major elective that never opens is set aside, the two plans
          of study land on the same {DIFFERENCE.sharedCount} courses. Computer
          Engineering fills the last slot with data structures and algorithms;
          Communications Engineering fills it with electromagnetics.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DifferenceColumn
            courses={DIFFERENCE.cengOnly}
            label={`Only in ${CENG_PROGRAM.abbreviation}`}
          />
          <DifferenceColumn
            courses={DIFFERENCE.tengOnly}
            label={`Only in ${TENG_PROGRAM.abbreviation}`}
          />
        </div>

        <p className="text-muted-foreground text-xs sm:text-sm">
          {CCE_DIFFERENCE_NOTE}
        </p>
      </CardContent>
    </Card>
  );
}
