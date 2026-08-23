import { ContactLinkCard } from "@/components/contact/contact-link-card";
import { TUITION_SUPPORT_LINKS } from "@/config/tuition";

export function TuitionSupportLinks() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-head text-lg sm:text-xl">Numbers not matching?</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {TUITION_SUPPORT_LINKS.map((link) => (
          <ContactLinkCard key={link.value} link={link} />
        ))}
      </div>
    </section>
  );
}
