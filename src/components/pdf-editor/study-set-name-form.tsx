import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useId,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { STUDY_SET_NAME_LABEL } from "@/config/pdf-editor";

interface StudySetNameFormProps {
  description?: string;
  initialName: string;
  onSubmit: (name: string) => void;
  submitLabel: string;
  title: string;
}

// Selected once as it mounts, not on focus: focus can land before the
// dialog's own focus handling settles, or not fire in a background window.
function selectName(input: HTMLInputElement | null): void {
  input?.select();
}

/** The name field of the study set dialog. It mounts with each opening, so
 * it starts from the name it is given, selected so typing replaces it. */
export function StudySetNameForm({
  description,
  initialName,
  onSubmit,
  submitLabel,
  title,
}: StudySetNameFormProps) {
  const inputId = useId();
  const [name, setName] = useState(initialName);
  const trimmed = name.trim();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value),
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (trimmed) {
        onSubmit(trimmed);
      }
    },
    [onSubmit, trimmed]
  );

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description ? (
          <DialogDescription>{description}</DialogDescription>
        ) : null}
      </DialogHeader>
      <label className="flex flex-col gap-1.5 text-sm" htmlFor={inputId}>
        {STUDY_SET_NAME_LABEL}
        <Input
          autoFocus
          id={inputId}
          onChange={handleChange}
          ref={selectName}
          value={name}
        />
      </label>
      <DialogFooter>
        <Button disabled={!trimmed} type="submit">
          {submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}
