import { Card, CardContent } from "@/components/ui/card";

export function GpaStorageNote() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <h2 className="font-head text-base">Where your grades are stored</h2>

        <p className="text-muted-foreground text-sm">
          Everything you type here is saved in this browser's local storage and
          nowhere else. Nothing is sent to a server, there is no account, and no
          database holds any of it. That also means it does not follow you
          around: another browser, another device, or a private window will show
          an empty calculator, and clearing your browsing data erases what you
          entered. Use "Clear all" to remove it yourself at any time.
        </p>
      </CardContent>
    </Card>
  );
}
