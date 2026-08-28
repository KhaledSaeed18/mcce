import { ChevronRightIcon } from "lucide-react";
import { Fragment } from "react";
import { FileBrowserCrumb } from "@/components/pdf-editor/file-browser-crumb";
import type { BrowserCrumb } from "@/lib/pdf-editor/browser-entries";

interface FileBrowserCrumbsProps {
  crumbs: BrowserCrumb[];
  onSelect: (id: string | null) => void;
}

export function FileBrowserCrumbs({
  crumbs,
  onSelect,
}: FileBrowserCrumbsProps) {
  return (
    <nav
      aria-label="Folder path"
      className="flex flex-wrap items-center gap-1 border-b-2 p-2 text-xs"
    >
      {crumbs.map((crumb, index) => (
        <Fragment key={crumb.id ?? "root"}>
          {index > 0 ? (
            <ChevronRightIcon className="size-3 text-muted-foreground" />
          ) : null}
          {index === crumbs.length - 1 ? (
            <span className="font-head">{crumb.name}</span>
          ) : (
            <FileBrowserCrumb crumb={crumb} onSelect={onSelect} />
          )}
        </Fragment>
      ))}
    </nav>
  );
}
