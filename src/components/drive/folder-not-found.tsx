import { Link } from "@tanstack/react-router";
import { FolderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function FolderNotFound() {
  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderIcon />
          </EmptyMedia>
          <EmptyTitle>Folder not found</EmptyTitle>
          <EmptyDescription>
            This folder isn't in the current index. It may have moved, or the
            index may be stale.
          </EmptyDescription>
        </EmptyHeader>
        <Button nativeButton={false} render={<Link to="/" />}>
          Back to homepage
        </Button>
      </Empty>
    </main>
  );
}
