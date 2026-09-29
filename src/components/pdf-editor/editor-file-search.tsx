import { FileSearchFooter } from "@/components/pdf-editor/file-search-footer";
import { FileSearchGroup } from "@/components/pdf-editor/file-search-group";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  FILE_SEARCH_DESCRIPTION,
  FILE_SEARCH_EMPTY,
  FILE_SEARCH_LABEL,
  FILE_SEARCH_PLACEHOLDER,
} from "@/config/pdf-editor";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import { useFileSearch } from "@/hooks/use-file-search";
import type { FileSearchDialog } from "@/hooks/use-file-search-dialog";
import { useFileSearchPicker } from "@/hooks/use-file-search-picker";
import { useSearchHandoff } from "@/hooks/use-search-handoff";
import type { EditorTreeNode, OpenFile } from "@/lib/pdf-editor/types";

const NO_PAGES: string[] = [];

interface EditorFileSearchProps {
  dialog: FileSearchDialog;
  files: OpenFile[];
  nodes: EditorTreeNode[];
  onOpenBeside: (file: OpenFile) => void;
  onShow: (file: OpenFile) => void;
  panes: EditorPaneView[];
}

/** Search every open tab at once, from Cmd/Ctrl+Shift+F. A pick opens in a
 * pane, whose own search bar then steps on through that file. */
export function EditorFileSearch({
  dialog,
  files,
  nodes,
  onOpenBeside,
  onShow,
  panes,
}: EditorFileSearchProps) {
  const { groups, labels, progress, texts } = useFileSearch({
    files,
    isOpen: dialog.isOpen,
    nodes,
    panes,
    query: dialog.query,
  });
  const onPick = useSearchHandoff({ onOpenBeside, onShow, panes });
  const picker = useFileSearchPicker({
    groups,
    onClose: dialog.close,
    onPick,
    query: dialog.query,
  });
  const queryLength = dialog.query.trim().length;

  return (
    <CommandDialog
      className="sm:max-w-2xl"
      description={FILE_SEARCH_DESCRIPTION}
      onOpenChange={dialog.setIsOpen}
      open={dialog.isOpen}
      title={FILE_SEARCH_LABEL}
    >
      <Command
        onKeyDown={picker.handleKeyDown}
        onValueChange={picker.setValue}
        shouldFilter={false}
        value={picker.value}
      >
        <CommandInput
          onValueChange={dialog.setQuery}
          placeholder={FILE_SEARCH_PLACEHOLDER}
          value={dialog.query}
        />
        <CommandList className="max-h-[28rem]">
          {queryLength > 0 && !progress ? (
            <CommandEmpty>{FILE_SEARCH_EMPTY}</CommandEmpty>
          ) : null}
          {groups.map((group) => (
            <FileSearchGroup
              group={group}
              isExpanded={picker.expanded.has(group.file.id)}
              key={group.file.id}
              label={labels.get(group.file.id)}
              onSelect={picker.handleSelect}
              pages={texts.get(group.file.id)?.pages ?? NO_PAGES}
              queryLength={queryLength}
            />
          ))}
        </CommandList>
        <FileSearchFooter progress={progress} />
      </Command>
    </CommandDialog>
  );
}
