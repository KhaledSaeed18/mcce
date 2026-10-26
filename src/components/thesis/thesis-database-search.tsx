import { ThesisCodeBlock } from "@/components/thesis/thesis-code-block";
import { ThesisGapFinding } from "@/components/thesis/thesis-gap-finding";
import { ThesisTipList } from "@/components/thesis/thesis-tip-list";
import { Card, CardContent } from "@/components/ui/card";
import {
  THESIS_FILTER_STEPS,
  THESIS_READING_NOTE,
  THESIS_READING_ORDER,
  THESIS_SEARCH_NOTE,
  THESIS_SEARCH_STRING,
} from "@/config/thesis";
import { THESIS_SEARCH_TIPS } from "@/config/thesis-topic";

export function ThesisDatabaseSearch() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-head text-base">
        Steps 3 and 4, search, filter, and rank
      </h3>
      <ThesisCodeBlock
        label="Example search string"
        lines={THESIS_SEARCH_STRING}
      />
      <p className="text-muted-foreground text-sm">{THESIS_SEARCH_NOTE}</p>
      <ThesisTipList tips={THESIS_SEARCH_TIPS} title="Sharper searches" />
      <div className="grid gap-4 md:grid-cols-2">
        <Card size="sm">
          <CardContent className="flex flex-col gap-2">
            <h4 className="font-head text-sm">Filter the results</h4>
            <ol className="flex list-decimal flex-col gap-1 pl-5 text-sm">
              {THESIS_FILTER_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="flex flex-col gap-2">
            <h4 className="font-head text-sm">Read in this order</h4>
            <ol className="flex list-decimal flex-col gap-1 pl-5 text-sm">
              {THESIS_READING_ORDER.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="text-muted-foreground text-sm">
              {THESIS_READING_NOTE}
            </p>
          </CardContent>
        </Card>
      </div>
      <ThesisGapFinding />
    </div>
  );
}
