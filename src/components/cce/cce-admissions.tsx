import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CCE_ADMISSIONS_INTRO,
  CCE_ADMISSIONS_REQUIREMENTS,
} from "@/config/cce/content";

export function CceAdmissions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 className="font-head text-xl sm:text-2xl">
            Bachelor admissions requirements
          </h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm sm:text-base">
          {CCE_ADMISSIONS_INTRO}
        </p>

        <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
          {CCE_ADMISSIONS_REQUIREMENTS.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>

        <p className="text-muted-foreground text-sm">
          Applying to the master's program instead? The{" "}
          <Link
            className="underline underline-offset-2 hover:text-primary"
            to="/admissions"
          >
            MCCE admissions guide
          </Link>{" "}
          covers the graduate flow.
        </p>
      </CardContent>
    </Card>
  );
}
