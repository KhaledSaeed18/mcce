import { MailIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ADMISSIONS_CHANGE_OF_MAJOR,
  ADMISSIONS_CONTACT_EMAILS,
  ADMISSIONS_CURRENT_LIU_NOTE,
  ADMISSIONS_NON_LIU_REQUIREMENTS,
  ADMISSIONS_PROGRAM_WINDOW,
  ADMISSIONS_TRACKS,
} from "@/config/admissions";
import { SectionDividerDots } from "../marketing/section-divider-dots";

export function AdmissionsDetails() {
  const liuTrack = ADMISSIONS_TRACKS.find((t) => t.id === "liu");
  const nonLiuTrack = ADMISSIONS_TRACKS.find((t) => t.id === "non-liu");

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className="font-head text-lg uppercase tracking-wide sm:text-xl">
          LIU bachelor graduates
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>
              <h3>{liuTrack?.label}</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm sm:text-base">{liuTrack?.gpaRequirement}</p>
            <ol className="list-decimal space-y-2 pl-5 text-sm sm:text-base">
              {liuTrack?.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <h3>Application window and notes</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm sm:text-base">
            <p>{ADMISSIONS_PROGRAM_WINDOW}</p>
            <p>{ADMISSIONS_CURRENT_LIU_NOTE}</p>
            <p>{ADMISSIONS_CHANGE_OF_MAJOR}</p>
          </CardContent>
        </Card>
      </section>

      <SectionDividerDots />

      <section className="flex flex-col gap-4">
        <h2 className="font-head text-lg uppercase tracking-wide sm:text-xl">
          Non-LIU bachelor graduates (new students)
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>
              <h3>Required documents</h3>
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

        <Card>
          <CardHeader>
            <CardTitle>
              <h3>{nonLiuTrack?.label}</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm sm:text-base">
              {nonLiuTrack?.gpaRequirement}
            </p>
            <ol className="list-decimal space-y-2 pl-5 text-sm sm:text-base">
              {nonLiuTrack?.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      <SectionDividerDots />

      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="inline-flex items-center gap-2">
              <MailIcon className="size-4" />
              Official contacts
            </h2>
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
