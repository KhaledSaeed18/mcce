interface TuitionTotalRowProps {
  label: string;
  value: string;
}

export function TuitionTotalRow({ label, value }: TuitionTotalRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-t-2 pt-3">
      <dt className="font-head text-sm">{label}</dt>
      <dd className="font-head text-base text-primary">{value}</dd>
    </div>
  );
}
