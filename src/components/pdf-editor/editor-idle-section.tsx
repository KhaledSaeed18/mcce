import type { ReactNode } from "react";

interface EditorIdleSectionProps {
  children: ReactNode;
  title: string;
}

export function EditorIdleSection({ children, title }: EditorIdleSectionProps) {
  return (
    <section className="flex w-full flex-col gap-2.5">
      <h3 className="font-head text-muted-foreground text-[0.65rem] tracking-[0.18em] uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}
