import { Card, CardContent } from "@/components/ui/card";
import type { ThesisNamedItem } from "@/lib/thesis/types";

interface ThesisNamedCardProps {
  item: ThesisNamedItem;
}

export function ThesisNamedCard({ item }: ThesisNamedCardProps) {
  return (
    <Card size="sm">
      <CardContent className="flex flex-col gap-1">
        <h3 className="font-head text-sm">{item.title}</h3>
        <p className="text-muted-foreground text-sm">{item.detail}</p>
      </CardContent>
    </Card>
  );
}
