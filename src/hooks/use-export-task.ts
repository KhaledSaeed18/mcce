import { useCallback, useState } from "react";

const EXPORT_ERROR_MESSAGE = "That export did not finish. Try again.";

export function useExportTask<TAction extends string>() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<TAction | null>(null);

  const run = useCallback(
    async (action: TAction, task: () => Promise<void> | void) => {
      setError(null);
      setPending(action);
      try {
        await task();
      } catch (cause) {
        if (!(cause instanceof DOMException && cause.name === "AbortError")) {
          setError(EXPORT_ERROR_MESSAGE);
        }
      } finally {
        setPending(null);
      }
    },
    []
  );

  return { error, pending, run };
}
