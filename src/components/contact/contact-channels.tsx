import { m } from "motion/react";
import { ContactLinkCard } from "@/components/contact/contact-link-card";
import { CONTACT_CHANNELS } from "@/config/contact";
import { useEntrance } from "@/hooks/use-entrance";

export function ContactChannels() {
  const entrance = useEntrance(0.1);

  return (
    <m.section className="flex flex-col gap-4" {...entrance}>
      <h2 className="font-head text-lg sm:text-xl">Reach out</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CONTACT_CHANNELS.map((link) => (
          <ContactLinkCard key={link.value} link={link} />
        ))}
      </div>
    </m.section>
  );
}
