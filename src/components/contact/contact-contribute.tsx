import { CheckIcon, MailIcon } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  CONTACT_MATERIAL_ITEMS,
  CONTACT_MATERIALS_MAILTO_HREF,
} from "@/config/contact";
import { cn } from "@/lib/utils";

export function ContactContribute() {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col gap-5 rounded border-2 bg-card p-5 shadow-md sm:p-8"
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <Badge className="absolute -top-3 left-5 -rotate-3" variant="secondary">
        COMMUNITY SOURCED
      </Badge>

      <div className="flex flex-col gap-3 pt-2">
        <h2 className="font-head text-xl sm:text-2xl">Help the next cohort</h2>
        <p className="text-sm sm:text-base">
          This index is only as complete as what people are willing to share. If
          you're sitting on exam papers, a professor's slides, or a recording
          that never made it here, it's worth more in this index than in an old
          group chat.
        </p>
        <p className="text-muted-foreground text-sm sm:text-base">
          Send whatever you have, in whatever shape it's in: scanned,
          photographed, half-organized. Sorting it into the right semester and
          course is on me.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {CONTACT_MATERIAL_ITEMS.map((item) => (
          <li
            className="flex items-start gap-2 rounded border-2 bg-background p-3 text-sm"
            key={item}
          >
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>

      <a
        className={cn(buttonVariants({ size: "lg" }), "w-fit")}
        href={CONTACT_MATERIALS_MAILTO_HREF}
      >
        <MailIcon data-icon="inline-start" />
        Email your materials
      </a>
    </motion.section>
  );
}
