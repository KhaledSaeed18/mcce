import type { StudentPerk } from "@/lib/student-perks/types";

export function buildStudentPerksSchema(perks: StudentPerk[], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: perks.map((perk, index) => ({
        "@type": "ListItem",
        item: {
          "@type": "SoftwareApplication",
          applicationCategory: "Student plan",
          description: perk.description,
          name: perk.name,
          offers: {
            "@type": "Offer",
            category: "Student",
            price: "0",
            priceCurrency: "USD",
          },
          url: perk.applyUrl,
        },
        position: index + 1,
      })),
      numberOfItems: perks.length,
    },
    name: "MCCE student plans",
    url,
  };
}

export function buildStudentPerkSchema(perk: StudentPerk, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...perk.faq.map((entry) => ({
        "@type": "Question",
        acceptedAnswer: { "@type": "Answer", text: entry.answer },
        name: entry.question,
      })),
      {
        "@type": "Question",
        acceptedAnswer: { "@type": "Answer", text: perk.verification },
        name: "How is student status verified?",
      },
      {
        "@type": "Question",
        acceptedAnswer: { "@type": "Answer", text: perk.renewal },
        name: "What happens at renewal?",
      },
    ],
    url,
  };
}

export function buildStudentPerkHowToSchema(perk: StudentPerk, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to claim ${perk.name}`,
    step: perk.steps.map((step, index) => ({
      "@type": "HowToStep",
      name: step.title,
      position: index + 1,
      text: step.body,
    })),
    url,
  };
}
