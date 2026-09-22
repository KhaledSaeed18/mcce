import { Link } from "@tanstack/react-router";
import { m } from "motion/react";
import { FOOTER_BUG_REPORT_URL } from "@/config/footer";
import { useEntrance } from "@/hooks/use-entrance";

export function AboutTrust() {
  const entrance = useEntrance(0.3);

  return (
    <m.div className="flex flex-col gap-4" {...entrance}>
      <h2 className="font-head text-xl sm:text-2xl">
        Staying current, reporting problems
      </h2>

      <p className="text-sm sm:text-base">
        The index resyncs from the shared Drive automatically about once a week.
        A file added today may take a few days to show up here. Nothing is
        re-hosted: files open in Google Drive, where access follows however they
        were already shared, and the PDF editor reads its copy straight from
        Drive without keeping one.
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
    </m.div>
  );
}
