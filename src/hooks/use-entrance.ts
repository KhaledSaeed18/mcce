import type { MotionProps } from "motion/react";
import {
  ENTRANCE_HIDDEN,
  ENTRANCE_TRANSITION,
  ENTRANCE_VISIBLE,
} from "@/config/motion";
import { useIsServerRendered } from "@/hooks/use-is-server-rendered";

/** Fades an element up into place when it mounts on the client. Server
 * rendered elements start in place, see `useIsServerRendered`. */
export function useEntrance(delay = 0): MotionProps {
  const isServerRendered = useIsServerRendered();

  return {
    animate: ENTRANCE_VISIBLE,
    initial: isServerRendered ? false : ENTRANCE_HIDDEN,
    transition: { ...ENTRANCE_TRANSITION, delay },
  };
}
