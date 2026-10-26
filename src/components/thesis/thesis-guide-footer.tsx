import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RESOURCES_THESIS_PATH } from "@/config/resources/copy";
import { THESIS_CHECK_NOTE } from "@/config/thesis";

export function ThesisGuideFooter() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <h2 className="font-head text-lg">The tools for each stage</h2>
        <p className="text-sm">
          The thesis toolkit lists a first pick and alternates for every step
          above, from the database search to the defense deck.
        </p>
        <Link
          className="inline-flex w-fit items-center gap-1.5 text-sm underline underline-offset-2 hover:text-primary"
          to={RESOURCES_THESIS_PATH}
        >
          Open the thesis toolkit
          <ArrowRightIcon className="size-3.5" />
        </Link>
        <p className="text-muted-foreground text-xs">{THESIS_CHECK_NOTE}</p>
      </CardContent>
    </Card>
  );
}
