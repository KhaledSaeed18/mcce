import { Link } from "@tanstack/react-router";
import { CalculatorIcon, FolderOpenIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseQuickLinksProps {
  code: string;
  folderId: string | null;
}

export function CourseQuickLinks({ code, folderId }: CourseQuickLinksProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {folderId ? (
        <Button
          nativeButton={false}
          render={<Link params={{ folderId }} to="/browse/$folderId" />}
          variant="outline"
        >
          <FolderOpenIcon data-icon="inline-start" />
          Browse the folder
        </Button>
      ) : null}
      <Button
        nativeButton={false}
        render={<Link search={{ course: code, q: "" }} to="/search" />}
        variant="outline"
      >
        <SearchIcon data-icon="inline-start" />
        Search this course
      </Button>
      <Button
        nativeButton={false}
        render={<Link to="/gpa-calculator" />}
        variant="outline"
      >
        <CalculatorIcon data-icon="inline-start" />
        GPA calculator
      </Button>
    </div>
  );
}
