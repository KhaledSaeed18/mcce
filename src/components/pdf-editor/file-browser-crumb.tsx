import { useCallback } from "react";
import type { BrowserCrumb } from "@/lib/pdf-editor/browser-entries";

interface FileBrowserCrumbProps {
  crumb: BrowserCrumb;
  onSelect: (id: string | null) => void;
}

export function FileBrowserCrumb({ crumb, onSelect }: FileBrowserCrumbProps) {
  const handleClick = useCallback(
    () => onSelect(crumb.id),
    [crumb.id, onSelect]
  );

  return (
    <button
      className="cursor-pointer text-muted-foreground hover:underline"
      onClick={handleClick}
      type="button"
    >
      {crumb.name}
    </button>
  );
}
