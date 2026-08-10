import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// Smooth, premium easing for the open/close — fast out of the gate, gentle
// settle. Shared by the panel height and the chevron so they move in lockstep.
const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      className={cn("flex w-full flex-col gap-3", className)}
      data-slot="accordion"
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "overflow-hidden rounded border-2 bg-background text-foreground shadow-md transition-shadow duration-200 hover:shadow-sm data-[open]:shadow-sm",
        className
      )}
      data-slot="accordion-item"
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex" data-slot="accordion-header">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left font-head transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 data-[open]:bg-muted/40 [&[data-open]>svg]:rotate-180",
          className
        )}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            EASE
          )}
          data-slot="accordion-trigger-icon"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      // Base UI publishes the measured panel height as `--accordion-panel-height`
      // and flags the entering/leaving frames with `data-starting-style` /
      // `data-ending-style`. Transitioning `height` between that var and 0 gives a
      // real slide open/close.
      className={cn(
        "group/panel h-[var(--accordion-panel-height)] overflow-hidden bg-card font-body text-muted-foreground text-sm",
        "transition-[height] duration-300",
        EASE,
        "data-[ending-style]:h-0 data-[starting-style]:h-0"
      )}
      data-slot="accordion-content"
      {...props}
    >
      <div
        className={cn(
          "px-4 pt-2 pb-4 transition-[opacity,transform] duration-300 ease-out",
          // Fade + nudge the content as the panel opens/closes, synced to the slide.
          "group-data-[starting-style]/panel:-translate-y-1 group-data-[starting-style]/panel:opacity-0",
          "group-data-[ending-style]/panel:-translate-y-1 group-data-[ending-style]/panel:opacity-0",
          "[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
