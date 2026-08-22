import type { ReactNode } from "react";

interface TuitionCardFooterProps {
  children: ReactNode;
}

export function TuitionCardFooter({ children }: TuitionCardFooterProps) {
  return (
    <div className="mt-3 border-t-2 pt-3">
      <dl className="space-y-2 text-sm">{children}</dl>
    </div>
  );
}

interface TuitionCardTotalProps {
  label: string;
  value: string;
}

export function TuitionCardTotal({ label, value }: TuitionCardTotalProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="font-head text-sm">{label}</dt>
      <dd className="font-head text-base text-primary">{value}</dd>
    </div>
  );
}
