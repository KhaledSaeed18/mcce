import { ThesisCodeBlock } from "@/components/thesis/thesis-code-block";
import { ThesisTipList } from "@/components/thesis/thesis-tip-list";
import { THESIS_AI_PROMPT, THESIS_AI_WARNING } from "@/config/thesis";
import {
  THESIS_AI_TIPS,
  THESIS_PRESSURE_TEST_PROMPT,
} from "@/config/thesis-topic";

const IDEA_PROMPT_LINES = [THESIS_AI_PROMPT];
const PRESSURE_TEST_LINES = [THESIS_PRESSURE_TEST_PROMPT];

export function ThesisAiBrainstorm() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-head text-base">
        Step 2, brainstorm with AI, then decide yourself
      </h3>
      <ThesisCodeBlock
        label="Prompt 1, generate ideas"
        lines={IDEA_PROMPT_LINES}
      />
      <p className="text-muted-foreground text-sm">{THESIS_AI_WARNING}</p>
      <ThesisCodeBlock
        label="Prompt 2, pressure-test one candidate"
        lines={PRESSURE_TEST_LINES}
      />
      <ThesisTipList tips={THESIS_AI_TIPS} title="Getting better answers" />
    </div>
  );
}
