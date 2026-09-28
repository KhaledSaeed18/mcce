import { useNavigate } from "@tanstack/react-router";
import { LayersIcon, SaveIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { StudySetMenuItem } from "@/components/pdf-editor/study-set-menu-item";
import { StudySetNameDialog } from "@/components/pdf-editor/study-set-name-dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  EDITOR_HEADER_ICON_BUTTON_CLASS,
  EDITOR_PATH,
  STUDY_SET_EMPTY,
  STUDY_SET_SAVE_DESCRIPTION,
  STUDY_SET_SAVE_LABEL,
  STUDY_SET_SAVE_TITLE,
  STUDY_SETS_LABEL,
} from "@/config/pdf-editor";
import { useStudySets } from "@/hooks/use-study-sets";
import { cn } from "@/lib/utils";

interface EditorStudySetMenuProps {
  canSave: boolean;
  defaultName: string;
  onSave: (name: string) => void;
}

/** The study sets saved in this browser, to open one, and the way to save
 * the open tabs as another. */
export function EditorStudySetMenu({
  canSave,
  defaultName,
  onSave,
}: EditorStudySetMenuProps) {
  const sets = useStudySets();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isNaming, setIsNaming] = useState(false);

  const handleOpenSet = useCallback(
    (id: string) => {
      setIsOpen(false);
      navigate({ search: { setId: id }, to: EDITOR_PATH });
    },
    [navigate]
  );

  const handleStartSave = useCallback(() => {
    setIsOpen(false);
    setIsNaming(true);
  }, []);

  return (
    <>
      <Popover onOpenChange={setIsOpen} open={isOpen}>
        <PopoverTrigger
          render={
            <Button
              aria-label={STUDY_SETS_LABEL}
              className={cn(EDITOR_HEADER_ICON_BUTTON_CLASS, "shrink-0")}
              size="icon"
              title={STUDY_SETS_LABEL}
              variant="outline"
            />
          }
        >
          <LayersIcon />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0">
          <Command>
            <CommandList>
              {sets.length > 0 ? (
                <CommandGroup heading={STUDY_SETS_LABEL}>
                  {sets.map((set) => (
                    <StudySetMenuItem
                      key={set.id}
                      onOpen={handleOpenSet}
                      set={set}
                    />
                  ))}
                </CommandGroup>
              ) : (
                <p className="px-3 pt-3 text-muted-foreground text-sm">
                  {STUDY_SET_EMPTY}
                </p>
              )}
              <CommandGroup>
                <CommandItem disabled={!canSave} onSelect={handleStartSave}>
                  <SaveIcon />
                  {STUDY_SET_SAVE_LABEL}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <StudySetNameDialog
        description={STUDY_SET_SAVE_DESCRIPTION}
        initialName={defaultName}
        isOpen={isNaming}
        onOpenChange={setIsNaming}
        onSubmit={onSave}
        submitLabel="Save"
        title={STUDY_SET_SAVE_TITLE}
      />
    </>
  );
}
