import { createFileRoute } from "@tanstack/react-router";
import { EditorViewportNotice } from "@/components/pdf-editor/editor-viewport-notice";
import { PdfEditorWorkspace } from "@/components/pdf-editor/pdf-editor-workspace";
import { EDITOR_NARROW_ONLY_CLASS } from "@/config/pdf-editor";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { useEditorViewport } from "@/hooks/use-editor-viewport";
import { useIsHydrated } from "@/hooks/use-is-hydrated";
import { useLocalEditorFile } from "@/hooks/use-local-editor-file";
import {
  editorFileQueryOptions,
  editorTreeQueryOptions,
} from "@/lib/pdf-editor/queries";
import type { EditorSearch } from "@/lib/pdf-editor/types";
import { readOptionalString } from "@/lib/search-params";
import { buildPageMeta } from "@/lib/seo/meta";
import { formatPageTitle } from "@/lib/seo/page-title";

const EDITOR_URL = `${SITE_URL}/editor`;

export const Route = createFileRoute("/editor")({
  component: EditorPage,
  head: () => ({
    links: [{ href: EDITOR_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description: "Open a PDF from the index and mark it up in the browser.",
      robots: "noindex, follow",
      title: formatPageTitle("PDF editor", SITE_NAME),
      url: EDITOR_URL,
    }),
  }),
  loader: async ({ context, deps }) => {
    const [tree, file] = await Promise.all([
      context.queryClient.ensureQueryData(editorTreeQueryOptions),
      context.queryClient.ensureQueryData(editorFileQueryOptions(deps.file)),
    ]);
    return { file, tree };
  },
  // Typed up front so inference does not depend on key order, which the
  // formatter sorts alphabetically, putting this after the loader that reads it.
  loaderDeps: ({ search }: { search: EditorSearch }) => ({
    file: search.file,
  }),
  validateSearch: (search: Record<string, unknown>): EditorSearch => ({
    file: readOptionalString(search.file),
    local: readOptionalString(search.local),
  }),
});

function EditorPage() {
  const { file, tree } = Route.useLoaderData();
  const { local } = Route.useSearch();
  // A file from the index wins if the URL somehow names both.
  const localFile = useLocalEditorFile(file ? undefined : local);

  const isHydrated = useIsHydrated();
  const isWide = useEditorViewport();

  if (!isHydrated) {
    return (
      <EditorViewportNotice className={EDITOR_NARROW_ONLY_CLASS} node={file} />
    );
  }

  if (!isWide) {
    return <EditorViewportNotice node={file} />;
  }

  return <PdfEditorWorkspace node={file ?? localFile} nodes={tree} />;
}
