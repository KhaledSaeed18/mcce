import { Link } from "@tanstack/react-router";
import { BookOpenTextIcon, GraduationCapIcon } from "lucide-react";
import { ThesisPartCard } from "@/components/thesis/thesis-part-card";
import { Button } from "@/components/ui/button";
import { RESOURCES_THESIS_PATH } from "@/config/resources/copy";
import { THESIS_GUIDE_PATH, THESIS_PARTS } from "@/config/thesis";

interface CourseThesisPanelProps {
  code: string;
}

export function CourseThesisPanel({ code }: CourseThesisPanelProps) {
  const part = THESIS_PARTS.find((candidate) => candidate.code === code);

  if (!part) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-muted-foreground text-xs uppercase tracking-wide">
        What this part delivers
      </h2>
      <ThesisPartCard part={part} />
      <div className="flex flex-wrap gap-2">
        <Button nativeButton={false} render={<Link to={THESIS_GUIDE_PATH} />}>
          <BookOpenTextIcon data-icon="inline-start" />
          Thesis guide
        </Button>
        <Button
          nativeButton={false}
          render={<Link to={RESOURCES_THESIS_PATH} />}
          variant="outline"
        >
          <GraduationCapIcon data-icon="inline-start" />
          Thesis toolkit
        </Button>
      </div>
    </div>
  );
}
