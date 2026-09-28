import { useRef } from "react";
import { ClipCard } from "@/components/pdf-editor/clip-card";
import { ClipFoldRow } from "@/components/pdf-editor/clip-fold-row";
import {
  CLIP_LAYER_RAIL_LEFT_CLASS,
  CLIP_LAYER_SPLIT_TOP_CLASS,
} from "@/config/pdf-editor";
import { useClipLayout } from "@/hooks/use-clip-layout";
import { useClipSeeThrough } from "@/hooks/use-clip-see-through";
import type { ClipView } from "@/hooks/use-clip-view";
import { useElementSize } from "@/hooks/use-element-size";
import { cn } from "@/lib/utils";

interface EditorClipLayerProps {
  isRailOpen: boolean;
  isSplit: boolean;
  view: ClipView;
}

/** Clips float over the pages only, never over the bars or side panels, so
 * every control stays in reach. */
export function EditorClipLayer({
  isRailOpen,
  isSplit,
  view,
}: EditorClipLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const area = useElementSize(layerRef);
  const { desk, labels, pageNumbers } = view;
  const layout = useClipLayout(desk.clips, area);
  const passedUnder = useClipSeeThrough(layerRef, layout.boxes);
  const isShown = area !== null && !desk.isHidden;

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-0 bottom-0 z-20 overflow-hidden",
        isSplit ? CLIP_LAYER_SPLIT_TOP_CLASS : "top-0",
        isRailOpen && !isSplit ? CLIP_LAYER_RAIL_LEFT_CLASS : "left-0"
      )}
      ref={layerRef}
    >
      {isShown
        ? layout.cards.map(({ box, clip }) => (
            <ClipCard
              actions={view.actions}
              area={area}
              bottomInset={layout.bottomInset}
              box={box}
              canRedraw={view.canRedraw(clip)}
              clip={clip}
              isPassedUnder={passedUnder.has(clip.id)}
              key={clip.id}
              label={labels.get(clip.id)}
              onOpenSource={view.openSource}
              onRedraw={view.redraw}
              pageNumber={pageNumbers.get(clip.id) ?? null}
            />
          ))
        : null}
      {isShown && layout.folded.length > 0 ? (
        <ClipFoldRow
          clips={layout.folded}
          labels={labels}
          onFold={view.actions.fold}
          pageNumbers={pageNumbers}
        />
      ) : null}
    </div>
  );
}
