import { TuitionBreakdownRow } from "@/components/tuition/tuition-breakdown-row";
import { TUITION_PROGRAM_LABEL } from "@/config/tuition";
import { TUITION_REFERENCE_FACTS } from "@/lib/tuition/reference";

/** The narrow screen reading of the reference table, which would otherwise scroll sideways. */
export function TuitionReferenceCard() {
  return (
    <div className="rounded border-2 bg-background p-4">
      <h3 className="font-head text-sm">{TUITION_PROGRAM_LABEL}</h3>

      <dl className="mt-3 space-y-2 text-sm">
        {TUITION_REFERENCE_FACTS.map((fact) => (
          <TuitionBreakdownRow
            key={fact.label}
            label={fact.label}
            value={fact.value}
          />
        ))}
      </dl>
    </div>
  );
}
