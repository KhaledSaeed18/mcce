import { ContactMail } from "@/components/contact/contact-mail";
import { ContactMailDark } from "@/components/contact/contact-mail-dark";
import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroDecoration } from "@/components/marketing/page-hero-decoration";

export function ContactHero() {
  return (
    <PageHero
      badge="GET IN TOUCH"
      decoration={
        <PageHeroDecoration
          dark={<ContactMailDark />}
          light={<ContactMail />}
          width="w-32"
        />
      }
      description="Reach out about anything related to the index, from broken links to missing materials."
      highlight="or files to add."
      title="Questions, corrections,"
    />
  );
}
