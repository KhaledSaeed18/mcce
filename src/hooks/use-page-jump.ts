import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useState,
} from "react";
import { readPageIndex } from "@/lib/pdf-editor/page-number";

interface PageJumpOptions {
  activeIndex: number;
  onGoToPage: (index: number) => void;
  pageCount: number;
}

/** The page number field: it reports where you are until you type where to go. */
export function usePageJump({
  activeIndex,
  onGoToPage,
  pageCount,
}: PageJumpOptions) {
  const [typed, setTyped] = useState<string | null>(null);

  const commit = useCallback(() => {
    const index = readPageIndex(typed ?? "", pageCount);
    setTyped(null);
    if (index !== null) {
      onGoToPage(index);
    }
  }, [onGoToPage, pageCount, typed]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setTyped(event.target.value),
    []
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        commit();
      }
      if (event.key === "Escape") {
        setTyped(null);
      }
    },
    [commit]
  );

  return {
    commit,
    handleChange,
    handleKeyDown,
    value: typed ?? String(activeIndex + 1),
  };
}
