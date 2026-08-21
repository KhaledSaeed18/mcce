interface TuitionBreakdownRowProps {
  label: string;
  value: string;
}

export function TuitionBreakdownRow({
  label,
  value,
}: TuitionBreakdownRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
