import { Switch } from "@/components/ui/switch";

interface TuitionToggleRowProps {
  checked: boolean;
  description: string;
  id: string;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}

export function TuitionToggleRow({
  checked,
  description,
  id,
  label,
  onCheckedChange,
}: TuitionToggleRowProps) {
  return (
    <div className="bg-card flex items-start justify-between gap-3 rounded border-2 p-3">
      <label className="flex flex-col" htmlFor={id}>
        <span className="text-sm font-medium">{label}</span>
        <span className="text-muted-foreground text-xs">{description}</span>
      </label>
      <Switch
        checked={checked}
        id={id}
        onCheckedChange={onCheckedChange}
        size="sm"
      />
    </div>
  );
}
