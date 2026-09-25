export type StudentPerkId =
  | "github-education"
  | "google-gemini"
  | "zed-student"
  | "perplexity-education";

export interface StudentPerkStep {
  body: string;
  title: string;
}

export interface StudentPerkHighlight {
  body: string;
  title: string;
}

export interface StudentPerkOfferGroup {
  items: string[];
  title: string;
}

export interface StudentPerkFaq {
  answer: string;
  question: string;
}

export interface StudentPerkPlan {
  after: string;
  includes: string[];
  name: string;
  price: string;
}

export interface StudentPerkAllOffers {
  href: string;
  label: string;
  note: string;
}

export interface StudentPerk {
  allOffers?: StudentPerkAllOffers;
  applyLabel: string;
  applyUrl: string;
  cardNote?: string;
  color: string;
  description: string;
  docsUrl: string;
  duration: string;
  faq: StudentPerkFaq[];
  highlights: StudentPerkHighlight[];
  id: StudentPerkId;
  name: string;
  offerGroups?: StudentPerkOfferGroup[];
  offersTitle?: string;
  plans?: StudentPerkPlan[];
  price: string;
  renewal: string;
  shortValue: string;
  steps: StudentPerkStep[];
  supportEmail?: string;
  supportUrl?: string;
  tagline: string;
  verification: string;
}
