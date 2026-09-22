import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HERO_TERMINAL_TYPE_MS } from "@/config/hero-radio";

/** Types each new command out a character at a time. The first command is
 * shown whole, so the server HTML already reads as a finished prompt. */
export function useTerminalTyping(command: string): string {
  const shouldReduceMotion = useReducedMotion();
  const [length, setLength] = useState(command.length);
  const shownRef = useRef(command);

  useEffect(() => {
    if (shownRef.current === command) {
      return;
    }
    shownRef.current = command;
    if (shouldReduceMotion) {
      setLength(command.length);
      return;
    }
    setLength(0);
    const timer = window.setInterval(() => {
      setLength((current) => Math.min(current + 1, command.length));
    }, HERO_TERMINAL_TYPE_MS);
    return () => window.clearInterval(timer);
  }, [command, shouldReduceMotion]);

  return command.slice(0, length);
}
