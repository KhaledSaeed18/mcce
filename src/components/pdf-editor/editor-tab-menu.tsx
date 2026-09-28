import { ChevronDownIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { EditorTabMenuItem } from "@/components/pdf-editor/editor-tab-menu-item";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CLOSED_FILES_LABEL,
  EDITOR_HEADER_ICON_BUTTON_CLASS,
  OPEN_FILES_FILTER_EMPTY,
  OPEN_FILES_FILTER_PLACEHOLDER,
  OPEN_FILES_LABEL,
} from "@/config/pdf-editor";
import { filterByKeywords } from "@/lib/pdf-editor/command-filter";
import type { OpenFile, TabLabel } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface EditorTabMenuProps {
  activeId: string | undefined;
  closed: OpenFile[];
  closedLabels: TabLabel[];
  files: OpenFile[];
  /** Tabs scrolled out of sight, which the button counts. */
  hiddenCount: number;
  labels: TabLabel[];
  onShow: (file: OpenFile) => void;
}

/** Every open file in one list, for when the strip is too narrow to show them
 * all, with the files closed recently below. */
export function EditorTabMenu({
  activeId,
  closed,
  closedLabels,
  files,
  hiddenCount,
  labels,
  onShow,
}: EditorTabMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleShow = useCallback(
    (file: OpenFile) => {
      setIsOpen(false);
      onShow(file);
    },
    [onShow]
  );

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger
        render={
          <Button
            aria-label={OPEN_FILES_LABEL}
            className={cn(
              EDITOR_HEADER_ICON_BUTTON_CLASS,
              "shrink-0",
              hiddenCount > 0 && "w-auto px-2"
            )}
            size="icon"
            title={OPEN_FILES_LABEL}
            variant="outline"
          />
        }
      >
        {hiddenCount > 0 ? (
          <span className="font-head text-xs">+{hiddenCount}</span>
        ) : (
          <ChevronDownIcon />
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <Command filter={filterByKeywords}>
          <CommandInput placeholder={OPEN_FILES_FILTER_PLACEHOLDER} />
          <CommandList>
            <CommandEmpty>{OPEN_FILES_FILTER_EMPTY}</CommandEmpty>
            <CommandGroup heading={OPEN_FILES_LABEL}>
              {files.map((file, index) => (
                <EditorTabMenuItem
                  file={file}
                  isActive={file.id === activeId}
                  key={file.id}
                  label={labels[index]}
                  onSelect={handleShow}
                />
              ))}
            </CommandGroup>
            {closed.length > 0 ? (
              <CommandGroup heading={CLOSED_FILES_LABEL}>
                {closed.map((file, index) => (
                  <EditorTabMenuItem
                    file={file}
                    isActive={false}
                    key={file.id}
                    label={closedLabels[index]}
                    onSelect={handleShow}
                  />
                ))}
              </CommandGroup>
            ) : null}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
