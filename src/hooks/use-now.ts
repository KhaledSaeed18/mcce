import { useEffect, useState } from "react";

/** The time, brought up to date every tick for as long as it is asked to. */
export function useNow(isTicking: boolean, tickMs: number): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!isTicking) {
      return;
    }
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), tickMs);
    return () => window.clearInterval(timer);
  }, [isTicking, tickMs]);

  return now;
}
