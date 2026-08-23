import { TuitionAidExample } from "@/components/tuition/tuition-aid-example";
import { TuitionCreditSplitBar } from "@/components/tuition/tuition-credit-split-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TUITION_AID_SPILLOVER_NOTE,
  TUITION_UNITS_PER_CREDIT,
} from "@/config/tuition";
import { buildAidExample } from "@/lib/tuition/aid-example";

export function TuitionAidExplainer() {
  const example = buildAidExample();

  return (
    <Card>
      <CardHeader className="border-b-2 pb-3">
        <CardTitle>
          <h2>How financial aid is billed</h2>
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          The percent is not taken off each currency. One credit is priced at{" "}
          {TUITION_UNITS_PER_CREDIT}, split across the two currencies, and the
          whole discount lands on the LBP side.
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <h3 className="font-head text-sm">
            One credit, {TUITION_UNITS_PER_CREDIT}
          </h3>
          <TuitionCreditSplitBar />
        </div>

        <TuitionAidExample example={example} />

        <div className="space-y-1 text-muted-foreground text-sm">
          <p>{TUITION_AID_SPILLOVER_NOTE}</p>
          <p>
            Registration and NSSF are outside tuition, so no percent covers
            them.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
