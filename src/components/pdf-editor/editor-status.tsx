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
import type { EditorFile } from "@/lib/pdf-editor/types";

type ShownStatus = Exclude<PdfLoadStatus, "idle" | "ready">;

const ERROR_TITLE = "Could not load this PDF";
const LOADING_TITLE = "Loading";

const CONTENT: Record<
  EditorFile["source"],
  Record<ShownStatus, { description: string; title: string }>
> = {
  drive: {
    error: {
      description:
        "Google Drive did not return the file. Try again, or open it in Drive.",
      title: ERROR_TITLE,
    },
    loading: {
      description: "Fetching the file from Google Drive.",
      title: LOADING_TITLE,
    },
  },
  local: {
    error: {
      description:
        "This browser no longer has the file. Open it from your computer again.",
      title: ERROR_TITLE,
    },
    loading: {
      description: "Opening the file kept in this browser.",
      title: LOADING_TITLE,
    },
  },
};

const ICONS = {
  error: TriangleAlertIcon,
  loading: LoaderIcon,
};

interface EditorStatusProps {
  onRetry: () => void;
  source: EditorFile["source"];
  status: Exclude<PdfLoadStatus, "idle">;
}

export function EditorStatus({ onRetry, source, status }: EditorStatusProps) {
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
          <EmptyTitle>{CONTENT[source][status].title}</EmptyTitle>
          <EmptyDescription>
            {CONTENT[source][status].description}
          </EmptyDescription>
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
