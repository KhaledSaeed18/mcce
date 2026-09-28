import { EditorDocumentArea } from "@/components/pdf-editor/editor-document-area";
import { EditorPlaceholder } from "@/components/pdf-editor/editor-placeholder";
import { EditorSearchBar } from "@/components/pdf-editor/editor-search-bar";
import { PdfPageList } from "@/components/pdf-editor/pdf-page-list";
import { TextSelectionMarker } from "@/components/pdf-editor/text-selection-marker";
import type { EditorSession } from "@/hooks/use-editor-session";
import type { EditorTools } from "@/hooks/use-editor-tools";
import type { EditorFile, EditorTreeNode } from "@/lib/pdf-editor/types";

interface EditorPaneProps {
  isBrowserOpen: boolean;
  isPanelAnimated: boolean;
  isRailOpen: boolean;
  node: EditorFile | null;
  nodes: EditorTreeNode[];
  onShowFiles: () => void;
  session: EditorSession;
  tools: EditorTools;
}

/** One file on screen: its rail, its pages, and its search. */
export function EditorPane({
  isBrowserOpen,
  isPanelAnimated,
  isRailOpen,
  node,
  nodes,
  onShowFiles,
  session,
  tools,
}: EditorPaneProps) {
  const {
    covers,
    doc,
    isDocumentShown,
    markup,
    navigation,
    retry,
    scrollRef,
    search,
    settings,
    sizes,
    status,
    zoom,
  } = session;

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
      {doc && search.isOpen ? (
        <EditorSearchBar
          current={search.current}
          focusRequest={search.focusRequest}
          isReading={search.isReading}
          matchCount={search.matchCount}
          onClose={search.close}
          onNext={search.next}
          onPrevious={search.previous}
          onQueryChange={search.setQuery}
          query={search.query}
        />
      ) : null}
      <EditorDocumentArea
        doc={doc}
        isLoading={status === "loading"}
        isPanelAnimated={isPanelAnimated}
        isRailOpen={isRailOpen}
        layout={markup.pages}
        navigation={navigation}
        pageActions={markup.pageActions}
        scrollRef={scrollRef}
        sizes={sizes}
      >
        {doc && isDocumentShown ? (
          <PdfPageList
            actions={markup.actions}
            annotations={markup.annotations}
            covers={covers}
            doc={doc}
            hitsByPosition={search.hitsByPosition}
            onTextDraftChange={markup.openDraft}
            pages={markup.pages}
            selectedId={markup.selectedId}
            settings={settings}
            textDraft={markup.draft}
            zoom={zoom.value}
          />
        ) : (
          <EditorPlaceholder
            isBrowserOpen={isBrowserOpen}
            nodes={nodes}
            onRetry={retry}
            onShowFiles={onShowFiles}
            source={node ? node.source : "drive"}
            status={status}
          />
        )}
      </EditorDocumentArea>
      <TextSelectionMarker
        highlightColor={tools.highlightColor}
        isEnabled={tools.tool === "select"}
        onAddMany={markup.actions.addMany}
        pages={markup.pages}
        penColor={tools.color}
        scrollRef={scrollRef}
        sizes={sizes}
        zoom={zoom.value}
      />
    </div>
  );
}
