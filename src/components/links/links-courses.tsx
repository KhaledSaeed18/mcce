import { LinksSemesterCourses } from "@/components/links/links-semester-courses";
import {
  getLinksFolderStyle,
  LINKS_COURSES_HEADING,
  LINKS_COURSES_INTRO,
} from "@/config/links";
import type { SemesterFolder } from "@/lib/drive/types";

interface LinksCoursesProps {
  folders: SemesterFolder[];
}

export function LinksCourses({ folders }: LinksCoursesProps) {
  return (
    <section
      aria-labelledby="links-courses-heading"
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-head text-base" id="links-courses-heading">
          {LINKS_COURSES_HEADING}
        </h2>
        <p className="text-muted-foreground text-sm text-pretty">
          {LINKS_COURSES_INTRO}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {folders.map((folder, index) => (
          <LinksSemesterCourses
            color={getLinksFolderStyle(index).color}
            folder={folder}
            key={folder.id}
          />
        ))}
      </div>
    </section>
  );
}
