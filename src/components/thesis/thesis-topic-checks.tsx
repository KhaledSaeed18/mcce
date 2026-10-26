import { CircleCheckIcon, TriangleAlertIcon } from "lucide-react";
import { ThesisTopicFormula } from "@/components/thesis/thesis-topic-formula";
import { THESIS_TOPIC_CHECKS } from "@/config/thesis";
import { THESIS_TOPIC_RED_FLAGS } from "@/config/thesis-topic";

export function ThesisTopicChecks() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-head text-base">
        Step 5, a good topic passes five checks
      </h3>
      <ThesisTopicFormula />
      <div className="grid gap-4 md:grid-cols-2">
        <ul className="flex flex-col gap-2">
          {THESIS_TOPIC_CHECKS.map((check) => (
            <li
              className="flex items-center gap-2 rounded border-2 bg-card px-3 py-2 text-sm"
              key={check}
            >
              <CircleCheckIcon className="size-4 shrink-0 text-primary" />
              {check}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 rounded border-2 border-dashed p-3">
          <h4 className="inline-flex items-center gap-1.5 font-head text-sm">
            <TriangleAlertIcon className="size-4 text-destructive" />
            Red flags
          </h4>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
            {THESIS_TOPIC_RED_FLAGS.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
