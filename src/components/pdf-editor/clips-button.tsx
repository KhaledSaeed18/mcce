import { EyeIcon, EyeOffIcon, GalleryVerticalEndIcon } from "lucide-react";
import { ClipsClosedRow } from "@/components/pdf-editor/clips-closed-row";
import { ClipsMenuRow } from "@/components/pdf-editor/clips-menu-row";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CLIPS_CLOSED_LABEL,
  CLIPS_HIDE_LABEL,
  CLIPS_LABEL,
  CLIPS_ON_SCREEN_LABEL,
  CLIPS_SHOW_LABEL,
  SHORTCUT_HINTS,
} from "@/config/pdf-editor";
import type { ClipView } from "@/hooks/use-clip-view";
import { withShortcut } from "@/lib/pdf-editor/shortcut-label";

interface ClipsButtonProps {
  view: ClipView;
}

const HEADING_CLASS =
  "px-3 pt-2 pb-1 font-medium text-muted-foreground text-xs";

/** Shown once there is a clip: how many are on screen, and a menu to fold,
 * close, bring back, or hide them. */
export function ClipsButton({ view }: ClipsButtonProps) {
  const { actions, desk, labels, pageNumbers } = view;
  const count = desk.clips.length;
  if (count + desk.closed.length === 0) {
    return null;
  }
  const hideLabel = desk.isHidden ? CLIPS_SHOW_LABEL : CLIPS_HIDE_LABEL;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            aria-label={`${CLIPS_LABEL}, ${count}`}
            className="relative"
            size="icon"
            title={withShortcut(CLIPS_LABEL, SHORTCUT_HINTS.toggleClips)}
            variant="outline"
          />
        }
      >
        <GalleryVerticalEndIcon />
        <span className="absolute -top-2 -right-2 min-w-5 rounded-full border-2 bg-primary px-1 font-head text-[0.65rem] text-primary-foreground tabular-nums leading-4">
          {count}
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 py-1">
        {count > 0 ? (
          <>
            <p className={HEADING_CLASS}>{CLIPS_ON_SCREEN_LABEL}</p>
            <ul>
              {desk.clips.map((clip) => (
                <ClipsMenuRow
                  clip={clip}
                  key={clip.id}
                  label={labels.get(clip.id)}
                  onClose={actions.close}
                  onFold={actions.fold}
                  pageNumber={pageNumbers.get(clip.id) ?? null}
                />
              ))}
            </ul>
          </>
        ) : null}
        {desk.closed.length > 0 ? (
          <>
            <p className={HEADING_CLASS}>{CLIPS_CLOSED_LABEL}</p>
            <ul>
              {desk.closed.map((clip) => (
                <ClipsClosedRow
                  id={clip.id}
                  key={clip.id}
                  label={labels.get(clip.id)}
                  onReopen={actions.reopen}
                  pageNumber={pageNumbers.get(clip.id) ?? null}
                />
              ))}
            </ul>
          </>
        ) : null}
        <div className="mt-1 border-t-2 px-1 pt-1">
          <Button
            className="w-full justify-start"
            onClick={actions.toggleHidden}
            size="sm"
            title={withShortcut(hideLabel, SHORTCUT_HINTS.toggleClips)}
            variant="ghost"
          >
            {desk.isHidden ? <EyeIcon /> : <EyeOffIcon />}
            {hideLabel}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
