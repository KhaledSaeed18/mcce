import { motion } from "motion/react";
import { ContactLinkCard } from "@/components/contact/contact-link-card";
import { CONTACT_SUPPORT_LINKS } from "@/config/contact";

export function ContactSupport() {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay: 0.15, duration: 0.4 }}
    >
      <h2 className="font-head text-lg sm:text-xl">Something to flag?</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CONTACT_SUPPORT_LINKS.map((link) => (
          <ContactLinkCard key={link.value} link={link} />
        ))}
      </div>
    </motion.section>
  );
}
