import { useCallback, useEffect, useState } from "react";
import { COPY_FEEDBACK_MS } from "@/config/gpa";
import { type GpaSemester, getAllEntries } from "@/lib/gpa/entries";
import { buildShareUrl, encodeShareValue } from "@/lib/gpa/share/encode";

/** Serialises current averages on demand, so nothing is written to the URL while typing. */
export function useGpaShareLink(semesters: GpaSemester[]) {
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }
    const timer = setTimeout(() => setIsCopied(false), COPY_FEEDBACK_MS);

    return () => clearTimeout(timer);
  }, [isCopied]);

  const copy = useCallback(async () => {
    const value = encodeShareValue(getAllEntries(semesters));

    try {
      await navigator.clipboard.writeText(
        buildShareUrl(window.location.origin, value)
      );
      setError(null);
      setIsCopied(true);
    } catch {
      // Denied permission or an insecure context, neither of which we can fix.
      setError("Copying was blocked. Copy the address bar instead.");
    }
  }, [semesters]);

  return { copy, error, isCopied };
}
