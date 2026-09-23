import { Trash2Icon, XIcon } from "lucide-react";
import { useCallback, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  LOCAL_PDF_REMOVE_DESCRIPTION,
  LOCAL_PDF_REMOVE_TITLE,
} from "@/config/pdf-editor";

interface RemoveLocalPdfButtonProps {
  id: string;
  name: string;
  onRemove: (id: string) => void;
}

export function RemoveLocalPdfButton({
  id,
  name,
  onRemove,
}: RemoveLocalPdfButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = useCallback(() => {
    onRemove(id);
    setIsOpen(false);
  }, [id, onRemove]);

  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger
        aria-label={`${LOCAL_PDF_REMOVE_TITLE}: ${name}`}
        className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded border-2 border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground"
        title={LOCAL_PDF_REMOVE_TITLE}
      >
        <XIcon className="size-3.5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{LOCAL_PDF_REMOVE_TITLE}</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-head text-foreground">{name}</span>.{" "}
            {LOCAL_PDF_REMOVE_DESCRIPTION}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} variant="destructive">
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
