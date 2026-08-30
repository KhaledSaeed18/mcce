import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EDITOR_CONTROL_HEIGHT_CLASS } from "@/config/pdf-editor";
import { usePageJump } from "@/hooks/use-page-jump";
import type { PageNavigation } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

export function PageControls({
  activeIndex,
  goToPage,
  pageCount,
}: PageNavigation) {
  const jump = usePageJump({ activeIndex, onGoToPage: goToPage, pageCount });

  const handlePrevious = useCallback(
    () => goToPage(activeIndex - 1),
    [activeIndex, goToPage]
  );

  const handleNext = useCallback(
    () => goToPage(activeIndex + 1),
    [activeIndex, goToPage]
  );

  return (
    <div className="flex items-center gap-1">
      <Button
        aria-label="Previous page"
        disabled={activeIndex === 0}
        onClick={handlePrevious}
        size="icon"
        variant="outline"
      >
        <ChevronUpIcon />
      </Button>
      <Input
        aria-label="Page number"
        className={cn("w-14 text-center", EDITOR_CONTROL_HEIGHT_CLASS)}
        inputMode="numeric"
        onBlur={jump.commit}
        onChange={jump.handleChange}
        onKeyDown={jump.handleKeyDown}
        value={jump.value}
      />
      <span className="whitespace-nowrap font-head text-sm tabular-nums">
        of {pageCount}
      </span>
      <Button
        aria-label="Next page"
        disabled={activeIndex >= pageCount - 1}
        onClick={handleNext}
        size="icon"
        variant="outline"
      >
        <ChevronDownIcon />
      </Button>
    </div>
  );
}
