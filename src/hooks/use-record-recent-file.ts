import { useEffect } from "react";
import { useRecentNodes } from "@/components/providers/recent-nodes-provider";

/** Counts a file opened straight into the editor as opened, same as a preview. */
export function useRecordRecentFile(id: string | undefined) {
  const { record } = useRecentNodes();

  useEffect(() => {
    if (id) {
      record(id);
    }
  }, [id, record]);
}
