import { TuitionRateField } from "@/components/tuition/tuition-rate-field";
import { TuitionToggleRow } from "@/components/tuition/tuition-toggle-row";

interface TuitionCurrencyControlsProps {
  onRateChange: (rate: number) => void;
  onShowAllInUsdChange: (checked: boolean) => void;
  showAllInUsd: boolean;
  usdToLbpRate: number;
}

export function TuitionCurrencyControls({
  onRateChange,
  onShowAllInUsdChange,
  showAllInUsd,
  usdToLbpRate,
}: TuitionCurrencyControlsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TuitionToggleRow
        checked={showAllInUsd}
        description="Converts the LBP charges and shows one total in USD."
        id="usd-only-switch"
        label="Show everything in USD"
        onCheckedChange={onShowAllInUsdChange}
      />

      {showAllInUsd ? (
        <TuitionRateField
          onRateChange={onRateChange}
          usdToLbpRate={usdToLbpRate}
        />
      ) : null}
    </div>
  );
}
