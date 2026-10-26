import { ThesisCodeBlock } from "@/components/thesis/thesis-code-block";
import {
  THESIS_TOPIC_FORMULA,
  THESIS_TOPIC_FORMULA_EXAMPLE,
  THESIS_TOPIC_FORMULA_NOTE,
} from "@/config/thesis-topic";

const FORMULA_LINES = [THESIS_TOPIC_FORMULA];

export function ThesisTopicFormula() {
  return (
    <div className="flex flex-col gap-2">
      <ThesisCodeBlock
        label="Write the topic in one sentence"
        lines={FORMULA_LINES}
      />
      <p className="text-sm">
        <span className="font-medium">Example: </span>
        {THESIS_TOPIC_FORMULA_EXAMPLE}
      </p>
      <p className="text-muted-foreground text-sm">
        {THESIS_TOPIC_FORMULA_NOTE}
      </p>
    </div>
  );
}
