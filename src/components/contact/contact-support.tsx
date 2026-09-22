import { m } from "motion/react";
import { ContactLinkCard } from "@/components/contact/contact-link-card";
import { CONTACT_SUPPORT_LINKS } from "@/config/contact";
import { useEntrance } from "@/hooks/use-entrance";

export function ContactSupport() {
  const entrance = useEntrance(0.15);

  return (
    <m.section className="flex flex-col gap-4" {...entrance}>
      <h2 className="font-head text-lg sm:text-xl">Something to flag?</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CONTACT_SUPPORT_LINKS.map((link) => (
          <ContactLinkCard key={link.value} link={link} />
        ))}
      </div>
    </m.section>
  );
}
