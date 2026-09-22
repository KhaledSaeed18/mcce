import type { LucideIcon } from "lucide-react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/config/faq";
import { useIsServerRendered } from "@/hooks/use-is-server-rendered";
import { cn } from "@/lib/utils";

const ITEM_STAGGER_MS = 60;

interface FaqCategoryProps {
  color: string;
  icon: LucideIcon;
  items: FaqItem[];
  label: string;
}

export function FaqCategory({
  color,
  icon: Icon,
  items,
  label,
}: FaqCategoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasEnteredView = useInView(containerRef, {
    margin: "-40px",
    once: true,
  });
  const isServerRendered = useIsServerRendered();
  const isRevealed = isServerRendered || hasEnteredView;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 transition-all duration-500",
        isRevealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
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

      <Accordion multiple>
        {items.map((item, index) => (
          <AccordionItem
            className={
              isRevealed
                ? "fade-in slide-in-from-bottom-2 animate-in fill-mode-backwards"
                : "opacity-0"
            }
            key={item.question}
            style={
              isRevealed
                ? { animationDelay: `${index * ITEM_STAGGER_MS}ms` }
                : undefined
            }
            value={item.question}
          >
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              <p>{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
