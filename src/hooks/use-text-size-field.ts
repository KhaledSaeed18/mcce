import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { focusTextField } from "@/lib/pdf-editor/focus-text-field";
import { clampFontSize, stepFontSize } from "@/lib/pdf-editor/text-style";

/** The size box: free to hold anything while typed in, and applied on leaving
 * it, so the text does not jump through "1" on the way to "14". */
export function useTextSizeField(
  value: number,
  onChange: (fontSize: number) => void
) {
  const [typed, setTyped] = useState(String(value));

  useEffect(() => setTyped(String(value)), [value]);

  const apply = useCallback(() => {
    const parsed = Number(typed);
    if (typed && Number.isFinite(parsed)) {
      const next = clampFontSize(parsed);
      setTyped(String(next));
      if (next !== value) {
        onChange(next);
      }
      return;
    }
    setTyped(String(value));
  }, [onChange, typed, value]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setTyped(event.target.value),
    []
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      // Both hand the focus back, and the key must not land in the text it reaches.
      if (event.key === "Enter") {
        event.preventDefault();
        apply();
        focusTextField();
      } else if (event.key === "Escape") {
        event.preventDefault();
        setTyped(String(value));
        focusTextField();
      } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        onChange(stepFontSize(value, event.key === "ArrowUp" ? 1 : -1));
      }
    },
    [apply, onChange, value]
  );

  return { handleBlur: apply, handleChange, handleKeyDown, typed };
}
