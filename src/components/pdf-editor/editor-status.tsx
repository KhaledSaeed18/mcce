import { FileTextIcon, LoaderIcon, TriangleAlertIcon } from "lucide-react";
import { EditorIdleHint } from "@/components/pdf-editor/editor-idle-hint";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { PdfLoadStatus } from "@/hooks/use-pdf-document";

const CONTENT: Record<
  Exclude<PdfLoadStatus, "ready">,
  { description: string; title: string }
> = {
  error: {
    description:
      "Google Drive did not return the file. Open it in Drive instead, or try again.",
    title: "Could not load this PDF",
  },
  idle: {
    description:
      "Pick a PDF from the folders on the left to start marking it up.",
    title: "No file open",
  },
  loading: {
    description: "Fetching the file from Google Drive.",
    title: "Loading",
  },
};

const ICONS = {
  error: TriangleAlertIcon,
  idle: FileTextIcon,
  loading: LoaderIcon,
};

interface EditorStatusProps {
  status: PdfLoadStatus;
}

export function EditorStatus({ status }: EditorStatusProps) {
  if (status === "ready") {
    return null;
  }

  const Icon = ICONS[status];

  return (
    <div className="relative flex flex-1 items-center justify-center">
      {status === "idle" ? <EditorIdleHint /> : null}
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
      </Empty>
    </div>
  );
}
