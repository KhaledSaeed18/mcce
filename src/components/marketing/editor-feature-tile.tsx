import { Link } from "@tanstack/react-router";
import { FilePenLineIcon } from "lucide-react";
import { EditorPreview } from "@/components/marketing/editor-preview";
import { FeatureTile } from "@/components/marketing/feature-tile";
import { EDITOR_PATH } from "@/config/pdf-editor";

export function EditorFeatureTile() {
  return (
    <Link className="block h-full" to={EDITOR_PATH}>
      <FeatureTile
        color="chart-4"
        description="Open any PDF from the index, draw and type on it, rotate or reorder pages, and save a copy. Your markup stays in this browser. Needs a desktop-width screen."
        icon={FilePenLineIcon}
        interactive
        linkLabel="Open the editor"
        title="Mark up any PDF"
      >
        <EditorPreview />
      </FeatureTile>
    </Link>
  );
}
