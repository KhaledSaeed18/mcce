import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { THESIS_GUIDE_PATH } from "@/config/thesis";

export function ThesisGuideLink() {
  return (
    <p className="text-sm">
      Eligibility, grading, and the template chapters are in the{" "}
      <Link
        className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-primary"
        to={THESIS_GUIDE_PATH}
      >
        thesis guide
        <ArrowRightIcon className="size-3.5" />
      </Link>
    </p>
  );
}
