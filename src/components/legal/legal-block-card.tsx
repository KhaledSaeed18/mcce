import { ArrowUpRightIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LegalBlock } from "@/config/legal";

interface LegalBlockCardProps {
  block: LegalBlock;
}

export function LegalBlockCard({ block }: LegalBlockCardProps) {
  const { body, items, links, note, title } = block;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 text-muted-foreground text-sm">
        <p className="text-pretty">{body}</p>

        {items ? (
          <ul className="flex list-disc flex-col gap-1 pl-5">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {note ? <p className="text-pretty">{note}</p> : null}

        {links ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {links.map((link) => (
              <a
                className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-2 hover:text-primary"
                href={link.href}
                key={link.href}
                rel={link.external ? "noopener" : undefined}
                target={link.external ? "_blank" : undefined}
              >
                {link.label}
                {link.external ? (
                  <ArrowUpRightIcon className="size-3.5" />
                ) : null}
              </a>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
