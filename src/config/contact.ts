import {
  AtSignIcon,
  BugIcon,
  LightbulbIcon,
  type LucideIcon,
  MailIcon,
} from "lucide-react";
import type { COURSE_CARD_COLORS } from "@/config/courses";
import {
  FOOTER_BUG_REPORT_URL,
  FOOTER_CONTACT_EMAIL,
  FOOTER_FEATURE_REQUEST_URL,
} from "@/config/footer";

export interface ContactLink {
  color: (typeof COURSE_CARD_COLORS)[number];
  description: string;
  external: boolean;
  eyebrow: string;
  href: string;
  icon: LucideIcon;
  value: string;
}

const CONTACT_MATERIALS_SUBJECT = "MCCE materials to add";
const CONTACT_PERSONAL_EMAIL = "contact@khaledsaeed.tech";

export const CONTACT_MATERIALS_MAILTO_HREF = `mailto:${FOOTER_CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_MATERIALS_SUBJECT)}`;

export const CONTACT_CHANNELS: ContactLink[] = [
  {
    color: "chart-1",
    description: "Materials, corrections, and anything about the index.",
    external: false,
    eyebrow: "Materials & site",
    href: `mailto:${FOOTER_CONTACT_EMAIL}`,
    icon: MailIcon,
    value: FOOTER_CONTACT_EMAIL,
  },
  {
    color: "chart-5",
    description: "Questions, feedback, or anything else.",
    external: false,
    eyebrow: "Everything else",
    href: `mailto:${CONTACT_PERSONAL_EMAIL}`,
    icon: AtSignIcon,
    value: CONTACT_PERSONAL_EMAIL,
  },
];

export const CONTACT_SUPPORT_LINKS: ContactLink[] = [
  {
    color: "chart-2",
    description: "Broken link, wrong file, layout glitch.",
    external: true,
    eyebrow: "Something broken",
    href: FOOTER_BUG_REPORT_URL,
    icon: BugIcon,
    value: "Report a bug",
  },
  {
    color: "chart-3",
    description: "A course, a filter, an idea worth adding.",
    external: true,
    eyebrow: "Missing something",
    href: FOOTER_FEATURE_REQUEST_URL,
    icon: LightbulbIcon,
    value: "Request a feature",
  },
];

export const CONTACT_MATERIAL_ITEMS: string[] = [
  "Past exams and quizzes, with or without solutions",
  "Lecture recordings or slide decks not yet in the index",
  "Course notes, cheat sheets, or study guides",
  "A heads-up about a missing, wrong, or broken file",
];

export interface ContactFormTopic {
  label: string;
  value: string;
}

export const CONTACT_FORM_TOPICS: ContactFormTopic[] = [
  { label: "Materials to share", value: "materials" },
  { label: "Something broken", value: "bug" },
  { label: "An idea or feature", value: "feature" },
  { label: "General question", value: "general" },
  { label: "Something else", value: "other" },
];
