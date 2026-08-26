import { useCallback, useEffect, useState } from "react";
import { COPY_FEEDBACK_MS } from "@/config/clipboard";

type CopyStatus = "idle" | "copied" | "failed";

/**
 * Reading `navigator.clipboard` throws outside a secure context rather than
 * rejecting, so the property access sits inside the try alongside the write.
 * A failure stays on screen until the next attempt succeeds: there is nothing
 * the user can retry into, so hiding it would just look like nothing happened.
 */
export function useCopyToClipboard() {
  const [status, setStatus] = useState<CopyStatus>("idle");

  useEffect(() => {
    if (status !== "copied") {
      return;
    }
    const timer = setTimeout(() => setStatus("idle"), COPY_FEEDBACK_MS);

    return () => clearTimeout(timer);
  }, [status]);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }, []);

  return {
    copy,
    hasFailed: status === "failed",
    isCopied: status === "copied",
  };
}
