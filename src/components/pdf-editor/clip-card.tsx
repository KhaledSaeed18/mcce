import { useCallback } from "react";
import { ClipCardHeader } from "@/components/pdf-editor/clip-card-header";
import { ClipCardPicture } from "@/components/pdf-editor/clip-card-picture";
import { ClipExamCover } from "@/components/pdf-editor/clip-exam-cover";
import { ClipResizeHandle } from "@/components/pdf-editor/clip-resize-handle";
import {
  CLIP_BORDER_WIDTH,
  CLIP_CARD_ATTRIBUTE,
  CLIP_HEADER_HEIGHT,
  CLIPS_LABEL,
} from "@/config/pdf-editor";
import { useClipCardMove } from "@/hooks/use-clip-card-move";
import { useClipCardResize } from "@/hooks/use-clip-card-resize";
import type { ClipActions } from "@/hooks/use-clip-view";
import type { ClipPlace, EditorClip } from "@/lib/pdf-editor/clips/types";
import type { Box, PageSize, TabLabel } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface ClipCardProps {
  actions: ClipActions;
  area: PageSize;
  bottomInset: number;
  box: Box;
  canRedraw: boolean;
  clip: EditorClip;
  /** Time left on the exam covering the clip, or null when none does. */
  examRemaining: number | null;
  /** True while a stroke on the pages passes under it. */
  isPassedUnder: boolean;
  keepClear: (box: Box) => Box;
  label: TabLabel | undefined;
  onOpenSource: (clip: EditorClip) => void;
  onRedraw: (clip: EditorClip) => void;
  pageNumber: number | null;
}

/** One clip floating over the pages. */
export function ClipCard({
  actions,
  area,
  bottomInset,
  box,
  canRedraw,
  clip,
  examRemaining,
  isPassedUnder,
  keepClear,
  label,
  onOpenSource,
  onRedraw,
  pageNumber,
}: ClipCardProps) {
  const { close, fold, place } = actions;
  const { id } = clip;
  const handleClose = useCallback(() => close(id), [close, id]);
  const handleFold = useCallback(() => fold(id, true), [fold, id]);
  const handlePlace = useCallback(
    (next: ClipPlace) => place(id, next),
    [id, place]
  );
  const handleOpen = useCallback(
    () => onOpenSource(clip),
    [clip, onOpenSource]
  );
  const handleRedraw = useCallback(() => onRedraw(clip), [clip, onRedraw]);
  const move = useClipCardMove({
    area,
    bottomInset,
    box,
    keepClear,
    onClose: handleClose,
    onPlace: handlePlace,
  });
  const resize = useClipCardResize({
    area,
    aspect: clip.aspect,
    bottomInset,
    box,
    onPlace: handlePlace,
    place: clip.place,
  });
  const shown = resize.box ?? move.box;
  // A solution's clip cannot be looked at, or opened, while its exam runs.
  const isCovered = examRemaining !== null;
  const name = `${CLIPS_LABEL}: ${label?.text ?? clip.file.name}`;

  return (
    <section
      {...{ [CLIP_CARD_ATTRIBUTE]: "" }}
      aria-label={name}
      className={cn(
        "pointer-events-auto absolute flex flex-col overflow-hidden rounded border-2 bg-card shadow-md transition-opacity",
        isPassedUnder && "pointer-events-none opacity-20",
        move.isMoving && "shadow-lg"
      )}
      style={{
        height: shown.height,
        left: shown.x,
        top: shown.y,
        width: shown.width,
      }}
    >
      <ClipCardHeader
        canOpenSource={!isCovered}
        canRedraw={canRedraw && !isCovered}
        label={label}
        moveHandlers={move.handlers}
        onClose={handleClose}
        onFold={handleFold}
        onOpenSource={handleOpen}
        onRedraw={handleRedraw}
        pageNumber={pageNumber}
      />
      {isCovered ? (
        <ClipExamCover remaining={examRemaining} />
      ) : (
        <ClipCardPicture
          alt={name}
          height={shown.height - CLIP_HEADER_HEIGHT - 2 * CLIP_BORDER_WIDTH}
          id={clip.id}
          onOpen={handleOpen}
          version={clip.version}
          width={shown.width - 2 * CLIP_BORDER_WIDTH}
        />
      )}
      <ClipResizeHandle corner={clip.place.corner} handlers={resize.handlers} />
    </section>
  );
}
