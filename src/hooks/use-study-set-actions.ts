import { useRouter } from "@tanstack/react-router";
import { useCallback } from "react";
import { EDITOR_PATH } from "@/config/pdf-editor";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { buildStudySetSearch } from "@/lib/pdf-editor/study-set-link";
import { removeStudySet, renameStudySet } from "@/lib/pdf-editor/study-sets";
import type { StudySet } from "@/lib/pdf-editor/types";

/** What can be done to one saved set from the list: rename it, delete it,
 * or copy a link another reader can open it from. */
export function useStudySetActions(set: StudySet) {
  const router = useRouter();
  const { copy, hasFailed, isCopied } = useCopyToClipboard();
  const { leftOut, search } = buildStudySetSearch(set);

  const rename = useCallback(
    (name: string) => renameStudySet(set.id, name),
    [set.id]
  );
  const remove = useCallback(() => removeStudySet(set.id), [set.id]);
  const copyLink = useCallback(() => {
    const { href } = router.buildLocation({ search, to: EDITOR_PATH });
    copy(new URL(href, window.location.origin).toString());
  }, [copy, router, search]);

  return { copyLink, hasFailed, isCopied, leftOut, remove, rename };
}
