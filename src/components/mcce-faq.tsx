import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PROGRAM_FAQ } from "@/config/faq";

export function McceFaq() {
  return (
    <section className="flex scroll-mt-20 flex-col gap-4" id="faq">
      <h2 className="font-head text-xl sm:text-2xl">
        Frequently asked questions
      </h2>

      <Accordion multiple>
        {PROGRAM_FAQ.map((item) => (
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
