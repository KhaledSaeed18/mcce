import { ThesisTipText } from "@/components/thesis/thesis-tip-text";
import { Card, CardContent } from "@/components/ui/card";
import { THESIS_DATA_SOURCES, THESIS_GAP_SOURCES } from "@/config/thesis-topic";

export function ThesisGapFinding() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card size="sm">
        <CardContent className="flex flex-col gap-2">
          <h4 className="font-head text-sm">Where the gaps are</h4>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
            {THESIS_GAP_SOURCES.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card size="sm">
        <CardContent className="flex flex-col gap-2">
          <h4 className="font-head text-sm">Where the data is</h4>
          <p className="text-sm">
            <ThesisTipText tip={THESIS_DATA_SOURCES} />
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
