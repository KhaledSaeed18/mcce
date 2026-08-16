import { Card, CardContent } from "@/components/ui/card";
import {
  GRADUATION_MIN_GPA,
  LIU_CATALOGUE_URL,
  PROBATION_GPA,
} from "@/config/gpa";
import { formatGpa } from "@/lib/gpa/standing";

export function GpaNotes() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <h2 className="font-head text-lg sm:text-xl">
          Where these rules come from
        </h2>

        <p className="text-sm">
          The scale is checked against a MyLIU transcript: two semesters and the
          cumulative figure all match to the second decimal. It also matches the
          three anchors LIU states in its{" "}
          <a
            className="underline underline-offset-2 hover:text-foreground"
            href={LIU_CATALOGUE_URL}
            rel="noopener"
            target="_blank"
          >
            University Catalogue
          </a>
          : 2.0 is 70/100, 2.5 is 75%, and 3.0 is 80/100. MyLIU truncates the
          result rather than rounding it, and so does this page.
        </p>

        <p className="text-sm">
          MCCE students graduate at a cumulative {formatGpa(GRADUATION_MIN_GPA)}
          , not the {formatGpa(3)} that applies to other LIU master's programs.
          Section 2.10 excepts engineering, and section 4.5.2 sets the School of
          Engineering graduate threshold at 70%. Falling below{" "}
          {formatGpa(PROBATION_GPA)} means probation, and two consecutive
          probations means Critical Academic Standing. Summer semesters do not
          count toward probation.
        </p>

        <p className="text-muted-foreground text-xs">
          Two things here are not confirmed. The status labels are inferred from
          a single data point, a 3.10 cumulative shown as "Very Good". And the
          catalogue refers to "Course Repetition Criteria" without ever defining
          it, so whether a repeated course replaces the original grade or both
          attempts stay in the GPA is unknown. This page counts every graded
          course once. Confirm a repeat with the Registrar.
        </p>
      </CardContent>
    </Card>
  );
}
