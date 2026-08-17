import { BookmarkIcon } from "lucide-react";
import { useCallback } from "react";
import { useSavedNodes } from "@/components/providers/saved-nodes-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SaveNodeButtonProps {
  name: string;
  nodeId: string;
}

/**
 * Sits above the card's link rather than inside it: a button nested in an
 * anchor is invalid, and a card-wide link is what makes previews shareable.
 */
export function SaveNodeButton({ name, nodeId }: SaveNodeButtonProps) {
  const { isSaved, toggle } = useSavedNodes();
  const saved = isSaved(nodeId);
  const handleClick = useCallback(() => toggle(nodeId), [nodeId, toggle]);

  return (
    <Button
      aria-label={saved ? `Remove ${name} from saved` : `Save ${name}`}
      aria-pressed={saved}
      className="absolute top-2 right-2 z-10"
      onClick={handleClick}
      size="icon-sm"
      variant={saved ? "default" : "outline"}
    >
      <BookmarkIcon className={cn("size-4", saved && "fill-current")} />
    </Button>
  );
}
