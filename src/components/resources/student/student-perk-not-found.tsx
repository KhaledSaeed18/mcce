import { Link } from "@tanstack/react-router";
import { SearchXIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RESOURCES_STUDENT_PATH } from "@/config/resources/copy";

interface StudentPerkNotFoundProps {
  perkId: string;
}

export function StudentPerkNotFound({ perkId }: StudentPerkNotFoundProps) {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchXIcon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>No student offer called {perkId}</EmptyTitle>
          <EmptyDescription>
            That offer is not in the hub. Pick one below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link
            className="underline underline-offset-4 hover:text-primary"
            to={RESOURCES_STUDENT_PATH}
          >
            All student plans
          </Link>
        </EmptyContent>
      </Empty>
    </main>
  );
}
