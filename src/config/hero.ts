import {
  CalculatorIcon,
  DollarSignIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  GraduationCapIcon,
  LibraryIcon,
  MapIcon,
  PresentationIcon,
  SearchIcon,
  VideoIcon,
} from "lucide-react";
import type {
  HeroLeafNode,
  HeroQuickLink,
  HeroToolNode,
} from "@/components/marketing/types";

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

/** Corners, so they never collide with the cardinal material nodes or the
 * labels those nodes carry. */
export const HERO_GRAPHIC_TOOLS: HeroToolNode[] = [
  { icon: SearchIcon, label: "Search", x: 21, y: 20 },
  { icon: MapIcon, label: "Plan", x: 79, y: 20 },
  { icon: CalculatorIcon, label: "GPA", x: 21, y: 80 },
  { icon: DollarSignIcon, label: "Fees", x: 79, y: 80 },
];

/** The pages a first-time reader would otherwise only find in the nav menu.
 * Search sits in the hero buttons instead, so it is left out here. */
export const HERO_QUICK_LINKS: HeroQuickLink[] = [
  { icon: LibraryIcon, label: "All courses", to: "/course" },
  { icon: FileTextIcon, label: "Past exams", to: "/exams" },
  { icon: MapIcon, label: "Plan of study", to: "/plan-of-study" },
  { icon: CalculatorIcon, label: "GPA calculator", to: "/gpa-calculator" },
  { icon: DollarSignIcon, label: "Tuition and fees", to: "/tuition-fees" },
  { icon: GraduationCapIcon, label: "Admissions", to: "/admissions" },
];
