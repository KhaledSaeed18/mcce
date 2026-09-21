import { SearchXIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  RESOURCES_EMPTY_ACTION,
  RESOURCES_EMPTY_TITLE,
} from "@/config/resources/copy";

interface ResourceEmptyStateProps {
  onClear: () => void;
}

export function ResourceEmptyState({ onClear }: ResourceEmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>{RESOURCES_EMPTY_TITLE}</EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <button
          className="underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          onClick={onClear}
          type="button"
        >
          {RESOURCES_EMPTY_ACTION}
        </button>
      </EmptyContent>
    </Empty>
  );
}
