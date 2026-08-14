import {
  CompassIcon,
  GraduationCapIcon,
  HelpCircleIcon,
  type LucideIcon,
  MailIcon,
} from "lucide-react";
import type { COURSE_CARD_COLORS } from "@/config/courses";

export interface PageTeaser {
  color: (typeof COURSE_CARD_COLORS)[number];
  description: string;
  icon: LucideIcon;
  label: string;
  title: string;
  to: "/plan-of-study" | "/about" | "/faq" | "/contact";
}

export const PAGE_TEASERS: PageTeaser[] = [
  {
    color: "chart-1",
    description:
      "Every course by year and semester, with credits, prerequisites, and objectives.",
    icon: GraduationCapIcon,
    label: "Plan of study",
    title: "See the full curriculum",
    to: "/plan-of-study",
  },
  {
    color: "chart-4",
    description:
      "What the MCCE program covers, and why this index exists outside the official page.",
    icon: CompassIcon,
    label: "About",
    title: "Learn about the program",
    to: "/about",
  },
  {
    color: "chart-3",
    description:
      "Answers about the program, and how syncing, search, and file access work here.",
    icon: HelpCircleIcon,
    label: "FAQ",
    title: "Get your questions answered",
    to: "/faq",
  },
  {
    color: "chart-2",
    description:
      "Report a broken link, request a course, or send materials for the archive.",
    icon: MailIcon,
    label: "Contact",
    title: "Reach the maintainer",
    to: "/contact",
  },
];
