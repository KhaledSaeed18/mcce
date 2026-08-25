import { ContactConversationMark } from "@/components/contact/contact-conversation-mark";
import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroMotion } from "@/components/marketing/page-hero-motion";

export function ContactHero() {
  return (
    <PageHero
      badge="GET IN TOUCH"
      decoration={
        <PageHeroMotion width="w-32">
          <ContactConversationMark />
        </PageHeroMotion>
      }
      description="Reach out about anything related to the index, from broken links to missing materials."
      highlight="or files to add."
      title="Questions, corrections,"
    />
  );
}
