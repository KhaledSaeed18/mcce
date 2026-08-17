import { createContext, type ReactNode, useContext, useMemo } from "react";
import { SAVED_STORAGE_KEY } from "@/config/storage";
import { useStoredNodeIds } from "@/hooks/use-stored-node-ids";

interface SavedNodesValue {
  ids: string[];
  isSaved: (id: string) => boolean;
  remove: (id: string) => void;
  toggle: (id: string) => void;
}

const SavedNodesContext = createContext<SavedNodesValue | null>(null);

/** Shared rather than per-component, so a card and the saved page never disagree. */
export function SavedNodesProvider({ children }: { children: ReactNode }) {
  const { add, ids, remove } = useStoredNodeIds(SAVED_STORAGE_KEY);

  const value = useMemo<SavedNodesValue>(() => {
    const isSaved = (id: string) => ids.includes(id);
    return {
      ids,
      isSaved,
      remove,
      toggle: (id: string) => (isSaved(id) ? remove(id) : add(id)),
    };
  }, [add, ids, remove]);

  return (
    <SavedNodesContext.Provider value={value}>
      {children}
    </SavedNodesContext.Provider>
  );
}

export function useSavedNodes(): SavedNodesValue {
  const value = useContext(SavedNodesContext);
  if (!value) {
    throw new Error("useSavedNodes must be used inside SavedNodesProvider");
  }
  return value;
}
