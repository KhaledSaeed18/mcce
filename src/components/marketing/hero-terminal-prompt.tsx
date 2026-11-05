import {
  HERO_TERMINAL_PROMPT,
  HERO_TERMINAL_SCAN_COMMAND,
} from "@/config/hero-radio";
import { useTerminalTyping } from "@/hooks/use-terminal-typing";

interface HeroTerminalPromptProps {
  code: string;
  isLocked: boolean;
}

export function HeroTerminalPrompt({
  code,
  isLocked,
}: HeroTerminalPromptProps) {
  const typed = useTerminalTyping(
    isLocked ? `cd ${code}` : HERO_TERMINAL_SCAN_COMMAND
  );

  return (
    <p className="text-chart-4 flex items-center gap-1.5 truncate border-t border-white/10 pt-1.5 font-mono text-[10px]">
      <span className="text-chart-4/60">{HERO_TERMINAL_PROMPT}</span>
      <span>{typed}</span>
      <span
        aria-hidden="true"
        className="bg-chart-4 inline-block h-3 w-1.5 animate-pulse motion-reduce:animate-none"
      />
    </p>
  );
}
