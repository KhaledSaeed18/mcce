import { MailIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ADMISSIONS_CONTACT_EMAILS,
  ADMISSIONS_CURRENT_LIU_NOTE,
  ADMISSIONS_NON_LIU_REQUIREMENTS,
  ADMISSIONS_PROGRAM_WINDOW,
  ADMISSIONS_TRACKS,
} from "@/config/admissions";

export function AdmissionsDetails() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>
            Requirements for new students (non-LIU bachelor graduates)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
            {ADMISSIONS_NON_LIU_REQUIREMENTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {ADMISSIONS_TRACKS.map((track) => (
          <Card key={track.id}>
            <CardHeader>
              <CardTitle>{track.label}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <p className="text-sm sm:text-base">{track.gpaRequirement}</p>
              <ol className="list-decimal space-y-2 pl-5 text-sm sm:text-base">
                {track.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application window and notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm sm:text-base">
          <p>{ADMISSIONS_PROGRAM_WINDOW}</p>
          <p>{ADMISSIONS_CURRENT_LIU_NOTE}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-2">
            <MailIcon className="size-4" />
            Official contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm sm:text-base">
            {ADMISSIONS_CONTACT_EMAILS.map((email) => (
              <li key={email}>
                <a
                  className="underline underline-offset-2 hover:text-primary"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-muted-foreground text-xs sm:text-sm">
            This page is an independent, simplified guide. Policies can change,
            so confirm details with official LIU offices before you apply.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
