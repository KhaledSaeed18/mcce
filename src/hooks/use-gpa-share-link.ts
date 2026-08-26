import { useCallback } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { type GpaSemester, getAllEntries } from "@/lib/gpa/entries";
import { buildShareUrl, encodeShareValue } from "@/lib/gpa/share/encode";

const BLOCKED_MESSAGE = "Copying was blocked. Copy the address bar instead.";

/** Serialises current averages on demand, so nothing is written to the URL while typing. */
export function useGpaShareLink(semesters: GpaSemester[]) {
  const { copy: copyText, hasFailed, isCopied } = useCopyToClipboard();

  const copy = useCallback(() => {
    const value = encodeShareValue(getAllEntries(semesters));

    return copyText(buildShareUrl(window.location.origin, value));
  }, [copyText, semesters]);

  return { copy, error: hasFailed ? BLOCKED_MESSAGE : null, isCopied };
}
