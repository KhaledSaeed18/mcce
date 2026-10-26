import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ThesisPart } from "@/lib/thesis/types";

interface ThesisPartCardProps {
  part: ThesisPart;
}

export function ThesisPartCard({ part }: ThesisPartCardProps) {
  return (
    <Card>
      <CardHeader className="border-b-2 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>
            <h3 className="font-head">
              <Link
                className="underline-offset-4 hover:underline"
                params={{ code: part.code }}
                to="/course/$code"
              >
                {part.code}
              </Link>{" "}
              {part.label}
            </h3>
          </CardTitle>
          <Badge variant="outline">{part.season}, 3 cr</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
          {part.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {part.grading.length > 0 ? (
          <dl className="grid grid-cols-3 gap-2 border-t-2 pt-3 text-sm">
            {part.grading.map((item) => (
              <div className="flex flex-col" key={item.activity}>
                <dt className="text-muted-foreground text-xs">
                  {item.activity}
                </dt>
                <dd className="font-head text-lg">{item.percent}%</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </CardContent>
    </Card>
  );
}
