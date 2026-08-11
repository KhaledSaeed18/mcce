import {
  AudioWaveformIcon,
  BookOpenIcon,
  BrainCircuitIcon,
  ClapperboardIcon,
  CpuIcon,
  FlaskConicalIcon,
  type LucideIcon,
  NetworkIcon,
  RadioIcon,
  SigmaIcon,
  WifiIcon,
} from "lucide-react";

export const DEFAULT_COURSE_ICON: LucideIcon = BookOpenIcon;

export const COURSE_ICON_BY_CODE: Record<string, LucideIcon> = {
  CENG507: CpuIcon,
  CENG557: NetworkIcon,
  CENG566: BrainCircuitIcon,
  CENG566L: FlaskConicalIcon,
  CENG675: ClapperboardIcon,
  EENG527: AudioWaveformIcon,
  EENG537: RadioIcon,
  EENG587: WifiIcon,
  ENGG515: SigmaIcon,
};

export const COURSE_CARD_COLORS = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
] as const;
