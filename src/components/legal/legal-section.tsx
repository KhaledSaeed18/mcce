import type { LucideIcon } from "lucide-react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { LegalBlockCard } from "@/components/legal/legal-block-card";
import type { LegalBlock } from "@/config/legal";
import { cn } from "@/lib/utils";

interface LegalSectionProps {
  blocks: LegalBlock[];
  color: string;
  icon: LucideIcon;
  label: string;
}

export function LegalSection({
  blocks,
  color,
  icon: Icon,
  label,
}: LegalSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-40px", once: true });

  return (
    <section
      className={cn(
        "flex flex-col gap-3 transition-all duration-500",
        isInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      )}
      ref={containerRef}
    >
      <div className="flex items-center gap-2">
        <span
          className="flex size-8 items-center justify-center rounded border-2 border-black"
          style={{ backgroundColor: `var(--${color})` }}
        >
          <Icon className="size-4 text-black" />
        </span>
        <h2 className="font-head text-lg sm:text-xl">{label}</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {blocks.map((block) => (
          <LegalBlockCard block={block} key={block.title} />
        ))}
      </div>
    </section>
  );
}
