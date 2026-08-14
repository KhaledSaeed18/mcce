import { Link } from "@tanstack/react-router";
import { FolderOpenIcon } from "lucide-react";
import { CurriculumRequirementList } from "@/components/curriculum/curriculum-requirement-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { CurriculumCourseContext } from "@/lib/curriculum/types";

interface CurriculumCourseDialogProps {
  context: CurriculumCourseContext;
  fileCount: number | undefined;
  lookup: Map<string, CurriculumCourseContext>;
  onOpenChange: (open: boolean) => void;
  onSelectRequirement: (code: string) => void;
  open: boolean;
}

export function CurriculumCourseDialog({
  context,
  fileCount,
  lookup,
  onOpenChange,
  onSelectRequirement,
  open,
}: CurriculumCourseDialogProps) {
  const { course, semester, year } = context;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="flex max-h-[85vh] flex-col overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{course.name}</DialogTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{course.code}</Badge>
            <Badge variant="outline">{course.credits} cr</Badge>
            {course.kind === "lab" && <Badge variant="secondary">Lab</Badge>}
            <Badge variant="outline">
              {year.label}, {semester.label}
            </Badge>
          </div>
        </DialogHeader>

        <p className="text-sm">
          {course.description ?? "No description available yet."}
        </p>

        <Separator />

        <div className="flex flex-col gap-2">
          <h3 className="text-muted-foreground text-xs uppercase tracking-wide">
            Objectives
          </h3>
          {course.objectives.length === 0 ? (
            <p className="text-sm">No objectives listed.</p>
          ) : (
            <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
              {course.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          )}
        </div>

        <Separator />

        <div className="grid grid-cols-1 gap-6 gap-y-4">
          <CurriculumRequirementList
            codes={course.prerequisites}
            label="Prerequisites"
            lookup={lookup}
            onSelect={onSelectRequirement}
          />
          <CurriculumRequirementList
            codes={course.corequisites}
            label="Corequisites"
            lookup={lookup}
            onSelect={onSelectRequirement}
          />
        </div>

        <DialogFooter>
          {fileCount ? (
            <Button
              nativeButton={false}
              render={
                <Link search={{ course: course.code, q: "" }} to="/search" />
              }
            >
              <FolderOpenIcon data-icon="inline-start" />
              {`View materials (${fileCount})`}
            </Button>
          ) : (
            <Button disabled>
              <FolderOpenIcon data-icon="inline-start" />
              No materials indexed yet
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
