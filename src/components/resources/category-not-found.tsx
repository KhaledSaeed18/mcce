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

interface CategoryNotFoundProps {
  categoryId: string;
}

export function CategoryNotFound({ categoryId }: CategoryNotFoundProps) {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchXIcon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>No category called {categoryId}</EmptyTitle>
          <EmptyDescription>
            The tools directory has no section by that name.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link
            className="underline underline-offset-4 hover:text-primary"
            to="/resources"
          >
            All tools
          </Link>
        </EmptyContent>
      </Empty>
    </main>
  );
}
