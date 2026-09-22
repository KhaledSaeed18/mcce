import { Link } from "@tanstack/react-router";
import { KindIcon } from "@/components/drive/kind-icon";
import { EDITOR_PATH } from "@/config/pdf-editor";
import type { EditorTreeNode } from "@/lib/pdf-editor/types";

interface EditorRecentFileProps {
  node: EditorTreeNode;
}

export function EditorRecentFile({ node }: EditorRecentFileProps) {
  return (
    <Link
      className="flex min-w-0 items-center gap-2 rounded border-2 bg-card px-3 py-2 text-sm shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-x-0 active:translate-y-0 active:shadow-none"
      search={{ file: node.id }}
      title={node.name}
      to={EDITOR_PATH}
    >
      <KindIcon className="size-4 shrink-0" kind={node.kind} />
      <span className="truncate">{node.name}</span>
    </Link>
  );
}
