import {
  FolderSearchIcon,
  GraduationCapIcon,
  type LucideIcon,
  MessagesSquareIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { COURSE_CARD_COLORS } from "@/config/courses";

interface PurposeStage {
  color: (typeof COURSE_CARD_COLORS)[number];
  description: string;
  icon: LucideIcon;
  title: string;
}

const PURPOSE_STAGES: PurposeStage[] = [
  {
    color: "chart-1",
    description:
      "Instructors post content through Classroom. It is the official source, but a lot of it is slides and files without explanation, notes, past exams, or exercises.",
    icon: GraduationCapIcon,
    title: "Classroom",
  },
  {
    color: "chart-2",
    description:
      "Students fill the gaps by sharing what they have in WhatsApp groups and chats. It helps, but it is hard to search, hard to keep updated, and not available to everyone in the program.",
    icon: MessagesSquareIcon,
    title: "Group chats",
  },
  {
    color: "chart-3",
    description:
      "This site links to Drive folders organized by semester and course, built to be searched and shared rather than buried in a chat history.",
    icon: FolderSearchIcon,
    title: "This index",
  },
];

export function AboutPurpose() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <h2 className="font-head text-xl sm:text-2xl">Why this site exists</h2>

      <p className="text-sm sm:text-base">
        Course material moves through a few channels before it reaches a
        student, and each one loses something along the way.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {PURPOSE_STAGES.map((stage) => (
          <Card key={stage.title}>
            <CardHeader>
              <div
                className="flex size-10 items-center justify-center rounded border-2 border-black"
                style={{ backgroundColor: `var(--${stage.color})` }}
              >
                <stage.icon className="size-5 text-black" />
              </div>
              <CardTitle>{stage.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              {stage.description}
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-sm sm:text-base">
        The Drive folders behind this index already existed before the site did.
        They were not organized, not easy to share or maintain, and did not turn
        up in a search. This site indexes them: one place to browse, search, and
        link to material by semester and course.
      </p>
    </motion.div>
  );
}
