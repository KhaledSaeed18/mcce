import { useCallback } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface ShareTarget {
  title: string;
  url: string;
}

/** The native sheet where the device has one, otherwise the clipboard. Closing
 * the sheet rejects with AbortError, and that is the user's choice, not a
 * reason to copy anyway. */
export function useLinksShare({ title, url }: ShareTarget) {
  const { copy, hasFailed, isCopied } = useCopyToClipboard();

  const share = useCallback(async () => {
    if (typeof navigator.share !== "function") {
      await copy(url);
      return;
    }

    try {
      await navigator.share({ title, url });
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        await copy(url);
      }
    }
  }, [copy, title, url]);

  return { hasFailed, isCopied, share };
}
