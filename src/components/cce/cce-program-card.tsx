import { TextLink } from "@/components/text-link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CceProgram } from "@/lib/cce/types";

interface CceProgramCardProps {
  program: CceProgram;
}

export function CceProgramCard({ program }: CceProgramCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h3 className="font-head text-lg sm:text-xl">{program.degree}</h3>
        </CardTitle>
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge>{program.abbreviation}</Badge>
          <Badge variant="outline">Major code {program.majorCode}</Badge>
          <Badge variant="outline">{program.credits} credits</Badge>
          <Badge variant="outline">{program.years} years</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm sm:text-base">
          {program.summary}
        </p>

        <dl className="flex flex-col gap-2 text-sm">
          {program.requirements.map((block) => (
            <div
              className="flex items-baseline justify-between gap-4 border-b pb-2 last:border-b-0"
              key={block.label}
            >
              <dt className="text-muted-foreground">{block.label}</dt>
              <dd className="shrink-0 font-head">{block.credits} credits</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-1.5 text-sm">
          <TextLink href={program.links.planOfStudy}>
            Official plan of study (PDF)
          </TextLink>
          <TextLink href={program.links.contractSheet}>
            Official contract sheet (PDF)
          </TextLink>
          <TextLink href={program.links.courseDescriptions}>
            Official course descriptions (PDF)
          </TextLink>
        </div>
      </CardContent>
    </Card>
  );
}
