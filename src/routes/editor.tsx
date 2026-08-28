import { createFileRoute } from "@tanstack/react-router";
import { PdfEditorWorkspace } from "@/components/pdf-editor/pdf-editor-workspace";
import { SITE_URL } from "@/config/site";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import type { FilePreviewSearch } from "@/lib/drive/types";
import { readOptionalString } from "@/lib/search-params";
import { buildPageMeta } from "@/lib/seo/meta";

const EDITOR_URL = `${SITE_URL}/editor`;

export const Route = createFileRoute("/editor")({
  component: EditorPage,
  head: () => ({
    links: [{ href: EDITOR_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description: "Open a PDF from the index and mark it up in the browser.",
      robots: "noindex, follow",
      title: "PDF editor · MCCE",
      url: EDITOR_URL,
    }),
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
  validateSearch: (search: Record<string, unknown>): FilePreviewSearch => ({
    file: readOptionalString(search.file),
  }),
});

function EditorPage() {
  const driveIndex = Route.useLoaderData();
  const { file } = Route.useSearch();
  const node =
    driveIndex.nodes.find(
      (candidate) => candidate.id === file && candidate.kind === "pdf"
    ) ?? null;

  return <PdfEditorWorkspace node={node} nodes={driveIndex.nodes} />;
}
