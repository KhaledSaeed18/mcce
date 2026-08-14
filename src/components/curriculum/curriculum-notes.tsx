import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { PROGRAM_OFFICIAL_POS_URL } from "@/config/site";

export function CurriculumNotes() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
      <Card>
        <CardContent className="flex flex-col gap-3">
          <h2 className="font-head text-lg sm:text-xl">
            Notes on this plan of study
          </h2>

          <p className="text-sm">
            The official Plan of Study is published as a{" "}
            <a
              className="underline underline-offset-2 hover:text-foreground"
              href={PROGRAM_OFFICIAL_POS_URL}
              rel="noopener"
              target="_blank"
            >
              PDF
            </a>
            . It lists a wider set of elective courses than what the department
            actually runs. Several of those electives have no offering on any
            campus, current or planned, even though they still appear in that
            document.
          </p>

          <p className="text-sm">
            What's shown on this page is the current version: only the courses
            that are open and available for registration. It's kept up to date
            as the offering changes, so treat it as the more reliable reference,
            and confirm with your advisor before you register.
          </p>

          <p className="text-muted-foreground text-xs">
            Course descriptions, objectives, and requirements above come from
            the department's course catalog. If something here looks out of
            date, report it through the contact page.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
