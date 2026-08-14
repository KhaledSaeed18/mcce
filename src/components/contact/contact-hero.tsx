import type { MotionProps } from "motion/react";
import { motion } from "motion/react";
import { ContactMail } from "@/components/contact/contact-mail";
import { ContactMailDark } from "@/components/contact/contact-mail-dark";
import { Badge } from "@/components/ui/badge";

const LEAF_DRIFT: MotionProps = {
  animate: { rotate: [0, 5, -3, 0], y: [0, -8, 0] },
  transition: {
    duration: 7,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  },
};

export function ContactHero() {
  return (
    <div className="relative">
      <motion.div
        {...LEAF_DRIFT}
        className="absolute -top-4 right-6 hidden w-32 lg:block dark:hidden"
      >
        <ContactMail />
      </motion.div>
      <motion.div
        {...LEAF_DRIFT}
        className="absolute -top-4 right-6 hidden w-32 lg:dark:block"
      >
        <ContactMailDark />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4 }}
      >
        <Badge className="w-fit gap-1.5" variant="outline">
          <span className="size-1.5 rounded-full bg-primary" />
          GET IN TOUCH
        </Badge>

        <h1 className="max-w-3xl font-head text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
          Questions, corrections,
          <br />
          <span className="text-primary">or files to add.</span>
        </h1>

        <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
          Reach out about anything related to the index, from broken links to
          missing materials.
        </p>
      </motion.div>
    </div>
  );
}
