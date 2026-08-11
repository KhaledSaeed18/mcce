import { useCallback, useEffect, useRef, useState } from "react";

const MIN_LOADING_MS = 700;
const LOAD_TIMEOUT_MS = 6000;

export type PreviewStatus = "loading" | "loaded" | "timed-out" | "unsupported";

export function usePreviewLoadState(open: boolean, previewUrl: string | null) {
  const [status, setStatus] = useState<PreviewStatus>("loading");
  const openedAtRef = useRef(0);
  const loadTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    if (!open) {
      setStatus("loading");
      clearTimeout(loadTimerRef.current);
      return;
    }

    openedAtRef.current = Date.now();
    setStatus("loading");

    if (!previewUrl) {
      const timer = setTimeout(() => setStatus("unsupported"), MIN_LOADING_MS);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setStatus((current) => (current === "loading" ? "timed-out" : current));
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [open, previewUrl]);

  const handleLoad = useCallback(() => {
    const remaining = MIN_LOADING_MS - (Date.now() - openedAtRef.current);
    if (remaining <= 0) {
      setStatus("loaded");
      return;
    }
    loadTimerRef.current = setTimeout(() => setStatus("loaded"), remaining);
  }, []);

  return { handleLoad, status };
}
