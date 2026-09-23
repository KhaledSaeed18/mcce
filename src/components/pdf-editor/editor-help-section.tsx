import type { ReactNode } from "react";

interface EditorHelpSectionProps {
  children: ReactNode;
  title: string;
}

export function EditorHelpSection({ children, title }: EditorHelpSectionProps) {
  return (
    <section className="flex flex-col gap-1">
      <h3 className="font-head text-muted-foreground text-xs uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}
