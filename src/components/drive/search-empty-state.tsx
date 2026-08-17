import { SearchIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface SearchEmptyStateProps {
  description: string;
  title: string;
}

export function SearchEmptyState({
  description,
  title,
}: SearchEmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
