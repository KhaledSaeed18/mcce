import { MCCE_DEGREE_CREDITS } from "@/config/gpa";

interface GpaCreditMeterProps {
  credits: number;
}

export function GpaCreditMeter({ credits }: GpaCreditMeterProps) {
  const share = Math.min((credits / MCCE_DEGREE_CREDITS) * 100, 100);

  return (
    <div className="flex flex-col gap-1">
      <div
        aria-label="Credits graded"
        aria-valuemax={MCCE_DEGREE_CREDITS}
        aria-valuemin={0}
        aria-valuenow={credits}
        className="h-2 overflow-hidden rounded-full border-2 bg-muted"
        role="progressbar"
      >
        <div
          className="h-full bg-(--gpa-semester)"
          style={{ width: `${share}%` }}
        />
      </div>
      <p className="text-muted-foreground text-xs">
        {Math.round(share)}% of the degree graded
      </p>
    </div>
  );
}
