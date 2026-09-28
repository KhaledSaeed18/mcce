import { Link } from "@tanstack/react-router";
import { CheckIcon, Columns2Icon, LinkIcon, PencilIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { DeleteStudySetButton } from "@/components/pdf-editor/delete-study-set-button";
import { StudySetNameDialog } from "@/components/pdf-editor/study-set-name-dialog";
import {
  EDITOR_PATH,
  ROW_ACTION_CLASS,
  STUDY_SET_COPIED,
  STUDY_SET_COPY_FAILED,
  STUDY_SET_COPY_LABEL,
  STUDY_SET_RENAME_LABEL,
  STUDY_SET_RENAME_TITLE,
} from "@/config/pdf-editor";
import { useStudySetActions } from "@/hooks/use-study-set-actions";
import {
  describeLeftOut,
  describeStudySet,
} from "@/lib/pdf-editor/study-set-summary";
import type { StudySet } from "@/lib/pdf-editor/types";

interface StudySetRowProps {
  set: StudySet;
}

/** One saved set on the blank editor: open it, copy its link, rename it, or
 * delete it. */
export function StudySetRow({ set }: StudySetRowProps) {
  const { copyLink, hasFailed, isCopied, leftOut, remove, rename } =
    useStudySetActions(set);
  const [isRenaming, setIsRenaming] = useState(false);
  const handleRename = useCallback(() => setIsRenaming(true), []);
  const copyNote = isCopied ? [STUDY_SET_COPIED, describeLeftOut(leftOut)] : [];

  return (
    <li className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <Link
          className="flex min-w-0 flex-1 items-center gap-2 rounded border-2 bg-card px-3 py-2 text-sm shadow-sm transition duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-md"
          search={{ setId: set.id }}
          to={EDITOR_PATH}
        >
          {set.besideId ? <Columns2Icon className="size-4 shrink-0" /> : null}
          <span className="truncate font-medium">{set.name}</span>
          <span className="ml-auto shrink-0 text-xs opacity-70">
            {describeStudySet(set)}
          </span>
        </Link>
        <button
          aria-label={`${STUDY_SET_COPY_LABEL}: ${set.name}`}
          className={ROW_ACTION_CLASS}
          onClick={copyLink}
          title={STUDY_SET_COPY_LABEL}
          type="button"
        >
          {isCopied ? (
            <CheckIcon className="size-3.5" />
          ) : (
            <LinkIcon className="size-3.5" />
          )}
        </button>
        <button
          aria-label={`${STUDY_SET_RENAME_LABEL}: ${set.name}`}
          className={ROW_ACTION_CLASS}
          onClick={handleRename}
          title={STUDY_SET_RENAME_LABEL}
          type="button"
        >
          <PencilIcon className="size-3.5" />
        </button>
        <DeleteStudySetButton name={set.name} onDelete={remove} />
      </div>
      <p aria-live="polite" className="px-1 text-muted-foreground text-xs">
        {hasFailed ? STUDY_SET_COPY_FAILED : copyNote.join(". ").trim()}
      </p>
      <StudySetNameDialog
        initialName={set.name}
        isOpen={isRenaming}
        onOpenChange={setIsRenaming}
        onSubmit={rename}
        submitLabel={STUDY_SET_RENAME_LABEL}
        title={STUDY_SET_RENAME_TITLE}
      />
    </li>
  );
}
