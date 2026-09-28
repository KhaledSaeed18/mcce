import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  MARKUP_OVERLAY_ATTRIBUTE,
  NOTE_CARD_WIDTH,
  NOTE_PLACEHOLDER,
  NOTE_REMOVE_LABEL,
} from "@/config/pdf-editor";
import { useNoteDraft } from "@/hooks/use-note-draft";
import { placeNoteCard } from "@/lib/pdf-editor/note-card";
import type {
  Annotation,
  NoteAnnotation,
  PageSize,
} from "@/lib/pdf-editor/types";

interface NoteCardProps {
  note: NoteAnnotation;
  onClose: () => void;
  onRemove: (id: string) => void;
  onReplace: (annotation: Annotation) => void;
  /** The page upright, which the card is placed in. */
  size: PageSize;
  zoom: number;
}

/** The open note: its text, beside its icon on the page. */
export function NoteCard({
  note,
  onClose,
  onRemove,
  onReplace,
  size,
  zoom,
}: NoteCardProps) {
  const draft = useNoteDraft({ note, onClose, onRemove, onReplace });
  const place = placeNoteCard(note, size, zoom);

  return (
    <div
      {...{ [MARKUP_OVERLAY_ATTRIBUTE]: true }}
      className="pointer-events-auto absolute flex flex-col gap-2 rounded border-2 bg-card p-2 text-card-foreground shadow-md"
      style={{ left: place.x, top: place.y, width: NOTE_CARD_WIDTH }}
    >
      <Textarea
        aria-label="Note"
        autoFocus
        className="min-h-20 resize-none text-sm"
        onBlur={draft.commit}
        onChange={draft.handleChange}
        onKeyDown={draft.handleKeyDown}
        placeholder={NOTE_PLACEHOLDER}
        value={draft.text}
      />
      <Button
        className="self-end"
        onClick={draft.remove}
        size="xs"
        variant="ghost"
      >
        <Trash2Icon />
        {NOTE_REMOVE_LABEL}
      </Button>
    </div>
  );
}
