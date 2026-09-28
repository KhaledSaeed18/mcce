import { PlusIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { QuickOpenItem } from "@/components/pdf-editor/quick-open-item";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  EDITOR_HEADER_ICON_BUTTON_CLASS,
  QUICK_OPEN_COURSE_GROUP,
  QUICK_OPEN_DESCRIPTION,
  QUICK_OPEN_EMPTY,
  QUICK_OPEN_INDEX_GROUP,
  QUICK_OPEN_LABEL,
  QUICK_OPEN_OTHERS_GROUP,
  QUICK_OPEN_PLACEHOLDER,
  SHORTCUT_HINTS,
} from "@/config/pdf-editor";
import { useQuickOpen } from "@/hooks/use-quick-open";
import { filterByKeywords } from "@/lib/pdf-editor/command-filter";
import { groupQuickOpenFiles } from "@/lib/pdf-editor/quick-open";
import { withShortcut } from "@/lib/pdf-editor/shortcut-label";
import type { EditorTreeNode, OpenFile } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface EditorQuickOpenProps {
  activeId: string | undefined;
  nodes: EditorTreeNode[];
  onShow: (file: OpenFile) => void;
}

/** Any PDF in the index, a search away, with the course being read listed
 * first. The button sits at the end of the tabs, where a new one appears. */
export function EditorQuickOpen({
  activeId,
  nodes,
  onShow,
}: EditorQuickOpenProps) {
  const { isOpen, open, setIsOpen } = useQuickOpen();
  const groups = useMemo(() => {
    const courseCode =
      nodes.find((node) => node.id === activeId)?.courseCode ?? null;
    return groupQuickOpenFiles(nodes, courseCode);
  }, [activeId, nodes]);

  const handleSelect = useCallback(
    (node: EditorTreeNode) => {
      setIsOpen(false);
      onShow({ id: node.id, name: node.name, source: "drive" });
    },
    [onShow, setIsOpen]
  );

  return (
    <>
      <Button
        aria-label={QUICK_OPEN_LABEL}
        className={cn(EDITOR_HEADER_ICON_BUTTON_CLASS, "shrink-0")}
        onClick={open}
        size="icon"
        title={withShortcut(QUICK_OPEN_LABEL, SHORTCUT_HINTS.quickOpen)}
        variant="outline"
      >
        <PlusIcon />
      </Button>
      <CommandDialog
        description={QUICK_OPEN_DESCRIPTION}
        onOpenChange={setIsOpen}
        open={isOpen}
        title={QUICK_OPEN_LABEL}
      >
        <Command filter={filterByKeywords}>
          <CommandInput placeholder={QUICK_OPEN_PLACEHOLDER} />
          <CommandList>
            <CommandEmpty>{QUICK_OPEN_EMPTY}</CommandEmpty>
            {groups.course.length > 0 ? (
              <CommandGroup heading={QUICK_OPEN_COURSE_GROUP}>
                {groups.course.map((node) => (
                  <QuickOpenItem
                    key={node.id}
                    node={node}
                    onSelect={handleSelect}
                  />
                ))}
              </CommandGroup>
            ) : null}
            <CommandGroup
              heading={
                groups.course.length > 0
                  ? QUICK_OPEN_OTHERS_GROUP
                  : QUICK_OPEN_INDEX_GROUP
              }
            >
              {groups.others.map((node) => (
                <QuickOpenItem
                  key={node.id}
                  node={node}
                  onSelect={handleSelect}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
