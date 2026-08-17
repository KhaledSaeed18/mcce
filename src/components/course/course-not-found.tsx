import { Link } from "@tanstack/react-router";
import { BookOpenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function CourseNotFound({ code }: { code: string }) {
  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BookOpenIcon />
          </EmptyMedia>
          <EmptyTitle>No course called {code}</EmptyTitle>
          <EmptyDescription>
            The plan of study doesn't list this code. It may be spelled
            differently, or belong to another program.
          </EmptyDescription>
        </EmptyHeader>
        <Button nativeButton={false} render={<Link to="/plan-of-study" />}>
          See the plan of study
        </Button>
      </Empty>
    </main>
  );
}
