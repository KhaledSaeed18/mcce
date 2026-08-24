import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CCE_ELECTIVE_NOTES } from "@/config/cce/content";
import { CCE_PROGRAMS } from "@/config/cce/programs";
import { getCceCourse } from "@/lib/cce/lookup";

const ELECTIVE_BLOCKS = CCE_PROGRAMS.map((program) => ({
  block: program.requirements.find(
    (requirement) => requirement.category === "major-elective"
  ),
  program,
}));

export function CceElectives() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-head text-xl sm:text-2xl">
        Electives, and how little choice there is
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {ELECTIVE_BLOCKS.map(({ block, program }) => (
          <Card key={program.id}>
            <CardHeader>
              <CardTitle>
                <h3 className="font-head">
                  {program.abbreviation} {block?.label.toLowerCase()},{" "}
                  {block?.credits} credits
                </h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <ul className="flex flex-col gap-2 text-sm">
                {block?.codes.map((code) => (
                  <li className="rounded border-2 bg-background p-3" key={code}>
                    <span className="font-head">{code}</span>
                    <span className="text-muted-foreground">
                      , {getCceCourse(code)?.name}
                    </span>
                  </li>
                ))}
              </ul>
              {block?.note ? (
                <p className="text-muted-foreground text-sm">{block.note}</p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {CCE_ELECTIVE_NOTES.map((note) => (
          <p className="text-muted-foreground text-sm sm:text-base" key={note}>
            {note}
          </p>
        ))}
      </div>
    </section>
  );
}
