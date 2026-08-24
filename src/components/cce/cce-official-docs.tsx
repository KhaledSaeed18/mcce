import { TextLink } from "@/components/text-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CCE_OFFICIAL_DEPARTMENT_URL,
  CCE_OFFICIAL_UNDERGRADUATE_URL,
} from "@/config/cce/content";
import { CCE_PROGRAMS } from "@/config/cce/programs";
import { PROGRAM_SCHOOL_URL } from "@/config/site";

const DEPARTMENT_LINKS = [
  {
    href: CCE_OFFICIAL_UNDERGRADUATE_URL,
    label: "Undergraduate programs, CCE department",
  },
  { href: CCE_OFFICIAL_DEPARTMENT_URL, label: "CCE department site" },
  { href: PROGRAM_SCHOOL_URL, label: "LIU School of Engineering" },
];

export function CceOfficialDocs() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-head text-xl sm:text-2xl">Official documents</h2>
        <p className="max-w-4xl text-muted-foreground text-sm sm:text-base">
          Everything on this page is drawn from these sources. They open in a
          new tab, on LIU's own servers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {CCE_PROGRAMS.map((program) => (
          <Card key={program.id}>
            <CardHeader>
              <CardTitle>
                <h3 className="font-head">
                  {program.abbreviation}, {program.shortLabel}
                </h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm">
              <TextLink href={program.links.planOfStudy}>
                Plan of study (PDF)
              </TextLink>
              <TextLink href={program.links.contractSheet}>
                Contract sheet (PDF)
              </TextLink>
              <TextLink href={program.links.courseDescriptions}>
                Course descriptions (PDF)
              </TextLink>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle>
              <h3 className="font-head">Department and school</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            {DEPARTMENT_LINKS.map((link) => (
              <TextLink href={link.href} key={link.href}>
                {link.label}
              </TextLink>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
