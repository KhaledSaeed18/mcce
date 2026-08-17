import { createContext, type ReactNode, useContext, useMemo } from "react";
import { RECENT_LIMIT, RECENT_STORAGE_KEY } from "@/config/storage";
import { useStoredNodeIds } from "@/hooks/use-stored-node-ids";

interface RecentNodesValue {
  ids: string[];
  record: (id: string) => void;
}

const RecentNodesContext = createContext<RecentNodesValue | null>(null);

/** Shared so the palette lists a file the moment it is opened, not on the next page load. */
export function RecentNodesProvider({ children }: { children: ReactNode }) {
  const { add, ids } = useStoredNodeIds(RECENT_STORAGE_KEY, RECENT_LIMIT);

  const value = useMemo<RecentNodesValue>(
    () => ({ ids, record: add }),
    [add, ids]
  );

  return (
    <RecentNodesContext.Provider value={value}>
      {children}
    </RecentNodesContext.Provider>
  );
}

export function useRecentNodes(): RecentNodesValue {
  const value = useContext(RecentNodesContext);
  if (!value) {
    throw new Error("useRecentNodes must be used inside RecentNodesProvider");
  }
  return value;
}
