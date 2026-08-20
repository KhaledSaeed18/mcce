import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FOOTER_BUG_REPORT_URL } from "@/config/footer";

export function AboutTrust() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <h2 className="font-head text-xl sm:text-2xl">
        Staying current, reporting problems
      </h2>

      <p className="text-sm sm:text-base">
        The index resyncs from the shared Drive automatically about once a week.
        A file added today may take a few days to show up here. Nothing is
        re-hosted: every link opens the file in Google Drive, where access
        follows however it was already shared there.
      </p>

      <p className="text-sm sm:text-base">
        Found a broken link, a file filed under the wrong course, or have
        material to add? Send it through the{" "}
        <Link
          className="underline underline-offset-2 hover:text-foreground"
          to="/contact"
        >
          contact page
        </Link>
        , or{" "}
        <a
          className="underline underline-offset-2 hover:text-foreground"
          href={FOOTER_BUG_REPORT_URL}
          rel="noopener"
          target="_blank"
        >
          open an issue on GitHub
        </a>
        .
      </p>
    </motion.div>
  );
}
