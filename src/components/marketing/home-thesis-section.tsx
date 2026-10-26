import { Link } from "@tanstack/react-router";
import { ArrowRightIcon, GraduationCapIcon } from "lucide-react";
import { m } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RESOURCES_THESIS_PATH } from "@/config/resources/copy";
import { THESIS_GUIDE_PATH, THESIS_PARTS } from "@/config/thesis";
import { useReveal } from "@/hooks/use-reveal";

const LINK_CLASS =
  "inline-flex items-center gap-1 underline underline-offset-2 hover:text-primary";

export function HomeThesisSection() {
  const reveal = useReveal();

  return (
    <m.section {...reveal.single}>
      <Card>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded border-2 border-black bg-primary">
              <GraduationCapIcon className="size-5" />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="font-head text-xl sm:text-2xl">
                Starting the thesis?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Who can register, what each part delivers, and how to find a
                topic, in one guide.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-sm">
                {THESIS_PARTS.map((part) => (
                  <Link
                    className={LINK_CLASS}
                    key={part.code}
                    params={{ code: part.code }}
                    to="/course/$code"
                  >
                    {part.code} {part.label}
                  </Link>
                ))}
                <Link className={LINK_CLASS} to={RESOURCES_THESIS_PATH}>
                  Thesis toolkit
                </Link>
              </div>
            </div>
          </div>
          <Button
            className="shrink-0"
            nativeButton={false}
            render={<Link to={THESIS_GUIDE_PATH} />}
            size="lg"
          >
            Thesis guide
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </CardContent>
      </Card>
    </m.section>
  );
}
