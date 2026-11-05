import { type RefObject, useEffect, useRef } from "react";

/**
 * Hears a color input only when its picker is done. React's change event fires
 * for every color passed over on the way, which would each be an undo step.
 */
export function useColorInputPick(
  inputRef: RefObject<HTMLInputElement | null>,
  onPick: (color: string) => void
): void {
  const onPickRef = useRef(onPick);
  onPickRef.current = onPick;

  useEffect(() => {
    const input = inputRef.current;
    if (!input) {
      return;
    }
    const handleChange = () => onPickRef.current(input.value);
    input.addEventListener("change", handleChange);
    return () => input.removeEventListener("change", handleChange);
  }, [inputRef]);
}
