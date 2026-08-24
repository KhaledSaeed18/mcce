import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CCE_FAQ } from "@/config/cce/content";

export function CceFaqSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-head text-xl sm:text-2xl">
        Common questions about LIU CCE
      </h2>

      <Accordion multiple>
        {CCE_FAQ.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              <p>{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
