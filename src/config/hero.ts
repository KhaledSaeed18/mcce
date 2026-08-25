import {
  CalculatorIcon,
  DollarSignIcon,
  FileTextIcon,
  GraduationCapIcon,
  LibraryIcon,
  MapIcon,
  SearchIcon,
} from "lucide-react";
import type { HeroQuickLink } from "@/components/marketing/types";

/** The pages a first-time reader would otherwise only find in the nav menu. */
export const HERO_QUICK_LINKS: HeroQuickLink[] = [
  { icon: SearchIcon, label: "Search", to: "/search" },
  { icon: LibraryIcon, label: "All courses", to: "/course" },
  { icon: FileTextIcon, label: "Past exams", to: "/exams" },
  { icon: MapIcon, label: "Plan of study", to: "/plan-of-study" },
  { icon: CalculatorIcon, label: "GPA calculator", to: "/gpa-calculator" },
  { icon: DollarSignIcon, label: "Tuition and fees", to: "/tuition-fees" },
  { icon: GraduationCapIcon, label: "Admissions", to: "/admissions" },
];
