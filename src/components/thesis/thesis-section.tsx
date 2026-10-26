import type { ReactNode } from "react";

interface ThesisSectionProps {
  children: ReactNode;
  description?: string;
  id: string;
  title: string;
}

export function ThesisSection({
  children,
  description,
  id,
  title,
}: ThesisSectionProps) {
  return (
    <section className="flex scroll-mt-20 flex-col gap-4" id={id}>
      <div className="flex flex-col gap-1 border-b-2 pb-3">
        <h2 className="font-head text-lg sm:text-xl">{title}</h2>
        {description ? (
          <p className="max-w-3xl text-muted-foreground text-sm">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
