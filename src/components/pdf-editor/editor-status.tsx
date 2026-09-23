import { LoaderIcon, RotateCwIcon, TriangleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { PdfLoadStatus } from "@/hooks/use-pdf-document";

type ShownStatus = Exclude<PdfLoadStatus, "idle" | "ready">;

const CONTENT: Record<ShownStatus, { description: string; title: string }> = {
  error: {
    description:
      "Google Drive did not return the file. Try again, or open it in Drive.",
    title: "Could not load this PDF",
  },
  loading: {
    description: "Fetching the file from Google Drive.",
    title: "Loading",
  },
};

const ICONS = {
  error: TriangleAlertIcon,
  loading: LoaderIcon,
};

interface EditorStatusProps {
  onRetry: () => void;
  status: Exclude<PdfLoadStatus, "idle">;
}

export function EditorStatus({ onRetry, status }: EditorStatusProps) {
  if (status === "ready") {
    return null;
  }

  const Icon = ICONS[status];

  return (
    <div className="flex flex-1 items-center justify-center">
      <Empty className="w-auto flex-none border-0 bg-transparent px-8 py-6">
        <EmptyHeader>
          <EmptyMedia className="bg-primary" variant="icon">
            <Icon
              className={status === "loading" ? "animate-spin" : undefined}
            />
          </EmptyMedia>
          <EmptyTitle>{CONTENT[status].title}</EmptyTitle>
          <EmptyDescription>{CONTENT[status].description}</EmptyDescription>
        </EmptyHeader>
        {status === "error" ? (
          <EmptyContent>
            <Button onClick={onRetry}>
              <RotateCwIcon data-icon="inline-start" />
              Try again
            </Button>
          </EmptyContent>
        ) : null}
      </Empty>
    </div>
  );
}
