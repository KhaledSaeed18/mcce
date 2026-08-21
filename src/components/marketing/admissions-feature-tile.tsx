import { Link } from "@tanstack/react-router";
import { GraduationCapIcon } from "lucide-react";
import { FeatureTile } from "@/components/marketing/feature-tile";
import { Badge } from "@/components/ui/badge";
import { ADMISSIONS_TRACKS } from "@/config/admissions";
import { ADMISSIONS_PREVIEW_STEPS } from "@/config/features";

export function AdmissionsFeatureTile() {
  return (
    <Link className="block h-full" to="/admissions">
      <FeatureTile
        color="chart-2"
        description="Required documents, the GPA bar, and the steps a file goes through, split by where your bachelor came from."
        icon={GraduationCapIcon}
        interactive
        linkLabel="Read the guide"
        title="Getting into the program"
      >
        <ol className="flex flex-col gap-2">
          {ADMISSIONS_PREVIEW_STEPS.map((step, index) => (
            <li className="flex items-center gap-2" key={step}>
              <span className="flex size-5 shrink-0 items-center justify-center rounded border-2 font-head text-[10px] tabular-nums">
                {index + 1}
              </span>
              <span className="text-xs leading-tight">{step}</span>
            </li>
          ))}
        </ol>

        <ul className="flex flex-wrap gap-2">
          {ADMISSIONS_TRACKS.map((track) => (
            <li key={track.id}>
              <Badge variant="outline">{track.shortLabel}</Badge>
            </li>
          ))}
        </ul>
      </FeatureTile>
    </Link>
  );
}
