import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CCE_PROGRAMS } from "@/config/cce/programs";
import { getCatalogCodes, getCceCourse } from "@/lib/cce/lookup";

const CATALOG_CODES = getCatalogCodes(CCE_PROGRAMS);

const NO_DESCRIPTION_NOTE =
  "The department publishes no English description for this course in the course description PDFs.";

export function CceCatalogSection() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-head text-xl sm:text-2xl">Course descriptions</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Every course on either track, as described by the department. ARAB200
          and CULT200 are described in Arabic in the official PDFs, and the
          major electives carry no published description.
        </p>
      </div>

      <Accordion multiple>
        {CATALOG_CODES.map((code) => {
          const course = getCceCourse(code);

          if (!course) {
            return null;
          }

          return (
            <AccordionItem key={code} value={code}>
              <AccordionTrigger>
                <span className="flex flex-wrap items-center gap-2 text-left">
                  <span className="font-head">{course.code}</span>
                  <span className="text-muted-foreground">{course.name}</span>
                  <Badge variant="outline">{course.credits} cr</Badge>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p>{course.description ?? NO_DESCRIPTION_NOTE}</p>
                {course.prerequisites.length > 0 ? (
                  <p>
                    <span className="font-head">Prerequisites: </span>
                    {course.prerequisites.join(", ")}
                  </p>
                ) : null}
                {course.corequisites.length > 0 ? (
                  <p>
                    <span className="font-head">Corequisites: </span>
                    {course.corequisites.join(", ")}
                  </p>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
