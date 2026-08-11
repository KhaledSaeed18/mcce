import {
  FileSpreadsheetIcon,
  FileTextIcon,
  PresentationIcon,
  VideoIcon,
} from "lucide-react";
import type { HeroLeafNode } from "@/components/marketing/types";

export const HERO_GRAPHIC_HUB = { x: 50, y: 50 };

export const HERO_GRAPHIC_LEAVES: HeroLeafNode[] = [
  {
    color: "chart-2",
    icon: FileTextIcon,
    label: "Past exams",
    labelClassName: "-top-6 left-1/2 -translate-x-1/2",
    x: 50,
    y: 15,
  },
  {
    color: "chart-3",
    icon: PresentationIcon,
    label: "Lecture slides",
    labelClassName: "top-full left-1/2 mt-1.5 -translate-x-1/2",
    x: 80,
    y: 50,
  },
  {
    color: "chart-4",
    icon: FileSpreadsheetIcon,
    label: "Problem sets",
    labelClassName: "-bottom-6 left-1/2 -translate-x-1/2",
    x: 50,
    y: 85,
  },
  {
    color: "chart-5",
    icon: VideoIcon,
    label: "Recordings",
    labelClassName: "top-full left-1/2 mt-1.5 -translate-x-1/2",
    x: 20,
    y: 50,
  },
];
