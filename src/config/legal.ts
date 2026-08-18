import { type LucideIcon, ScaleIcon, ShieldCheckIcon } from "lucide-react";
import type { COURSE_CARD_COLORS } from "@/config/courses";
import { FOOTER_CONTACT_EMAIL, FOOTER_GITHUB_URL } from "@/config/footer";
import {
  PROGRAM_OFFICIAL_URL,
  PROGRAM_UNIVERSITY_SHORT,
  PROGRAM_UNIVERSITY_URL,
} from "@/config/site";

export interface LegalLink {
  external: boolean;
  href: string;
  label: string;
}

export interface LegalBlock {
  body: string;
  items?: string[];
  links?: LegalLink[];
  /** A closing line that qualifies the list above it. */
  note?: string;
  title: string;
}

export interface LegalSection {
  blocks: LegalBlock[];
  color: (typeof COURSE_CARD_COLORS)[number];
  icon: LucideIcon;
  label: string;
  value: string;
}

export const LEGAL_LAST_UPDATED = "18 August 2026";

const TAKEDOWN_SUBJECT = "MCCE material removal request";

export const LEGAL_TAKEDOWN_MAILTO_HREF = `mailto:${FOOTER_CONTACT_EMAIL}?subject=${encodeURIComponent(TAKEDOWN_SUBJECT)}`;

const PRIVACY_BLOCKS: LegalBlock[] = [
  {
    body: "There are no accounts and no sign-in. The things you set up as you use the site are kept by your own browser, in local storage on this device, and are never sent anywhere:",
    items: [
      "Saved files and recently viewed files",
      "Grades and course rows typed into the GPA calculator",
      "Which sections your GPA exports include",
      "Your light or dark theme choice",
    ],
    title: "What the site stores",
  },
  {
    body: "The site's own preferences live in local storage rather than cookies, and a service worker keeps a cache of pages and assets so the site still opens on a bad connection. The cookies that do get set come from three third parties:",
    items: [
      "Google Analytics sets _ga and a _ga_ cookie named after the property. They hold a randomly generated id and last two years, and they are what lets Google count a returning visitor as one person rather than two",
      "The hCaptcha widget on the contact page, which may store cookies or browser data under hcaptcha.com to tell people from bots",
      "Cloudflare, which may set a security or bot-detection cookie in front of the site",
    ],
    note: "The Google Analytics pair are analytics cookies. The other two are there to keep the site working and free of spam, not to measure you.",
    title: "Cookies",
  },
  {
    body: "Google Analytics runs on this site to answer one question: which parts of the index people actually use. It records the pages you open, roughly where you are from your IP address, your device and browser, and where you arrived from. It does not know your name, your email, or which LIU student you are, because the site never asks and never sends it. What you type into the GPA calculator and which files you save stay on your device and are never part of this.",
    items: [
      "What it is used for: seeing which courses and pages get opened, so effort goes where it helps",
      "Where the data goes: Google, as the processor, under their own privacy policy and retention settings",
      "What it is not used for: advertising, ad personalisation, or selling anything to anyone",
    ],
    links: [
      {
        external: true,
        href: "https://policies.google.com/privacy",
        label: "Google's privacy policy",
      },
    ],
    note: "Blocking it is easy and nothing on the site breaks if you do. Most content blockers stop it already, browsers can block third-party cookies outright, and Google publishes a browser add-on that opts you out of Analytics everywhere.",
    title: "Analytics",
  },
  {
    body: "The contact form sends your email address, the topic you pick, and your message through Web3Forms, which delivers it to the maintainer's inbox. An hCaptcha check runs on the same form to block spam. Both are third parties operating under their own privacy policies. Your message is used to reply to you and nothing else.",
    items: [
      "The IP address the message was sent from is logged with it, by Web3Forms and by the hCaptcha check",
      "That log exists for security: blocking spam floods, and tracing abuse of the form back to a source",
      "It is not used to work out who you are, to profile you, or for anything beyond keeping the form usable",
    ],
    note: "Email works just as well if you would rather skip the form and everything attached to it.",
    title: "The contact form",
  },
  {
    body: "Clearing site data for this domain in your browser settings removes all of it: local storage, the offline cache, and the cookies set while you were here. Saved files, recent files, and GPA entries only ever existed on your device, so clearing them is the end of them. Analytics data already sent to Google is held there under that property's retention setting and expires on its own.",
    title: "Removing what is stored",
  },
  {
    body: "The site is served from Cloudflare, which keeps standard request logs such as IP address and user agent for delivery and abuse protection. Course files themselves open on Google Drive, under your own Google account and Google's terms, so what Drive records about opening a file sits with Google.",
    title: "Hosting and file links",
  },
  {
    body: "No data is sold, no data is shared for advertising, and there are no ad networks on the site. Analytics is there to count pages, not to build a profile of you or follow you onto other sites. The site is open source, so the code behind all of this can be read directly.",
    links: [
      { external: true, href: FOOTER_GITHUB_URL, label: "Source on GitHub" },
    ],
    title: "What does not happen",
  },
];

const TERMS_BLOCKS: LegalBlock[] = [
  {
    body: `This is an independent, student-built site. It is not affiliated with, endorsed by, or an official page of ${PROGRAM_UNIVERSITY_SHORT}. For admissions, curriculum, and official program details, the university's own page is the source.`,
    links: [
      {
        external: true,
        href: PROGRAM_OFFICIAL_URL,
        label: "Official program page",
      },
      {
        external: true,
        href: PROGRAM_UNIVERSITY_URL,
        label: `${PROGRAM_UNIVERSITY_SHORT} official website`,
      },
    ],
    title: "Not an official page",
  },
  {
    body: "The site is an index of links, not a file host. Course material stays in the shared Drive folders where it was already posted, and opening a file takes you to Google Drive, where access is controlled by whoever shared it. Copyright in the material stays with its authors and instructors. It is indexed here so students in the program can find it for their own study.",
    title: "About the material",
  },
  {
    body: "If you wrote or own material that appears in the index and you want it out, send a message with a link to it and it will be removed from the index. Removal here takes the listing off the site, though the file itself lives in Drive and its sharing is controlled there by its owner.",
    links: [
      {
        external: false,
        href: LEGAL_TAKEDOWN_MAILTO_HREF,
        label: `Email ${FOOTER_CONTACT_EMAIL}`,
      },
    ],
    title: "Removing material from the index",
  },
  {
    body: "The index re-syncs from Drive once a week, so it can be incomplete or out of date. The plan of study, the prerequisite roadmap, and the GPA calculator are unofficial aids built from published program documents, and they can be wrong or fall behind a curriculum change. Check anything that affects a registration, a grade, or a graduation date against the registrar and the official documents.",
    title: "Accuracy is not guaranteed",
  },
  {
    body: "Use the site for studying the program: browse it, search it, link to it, share it with classmates. Do not scrape it in bulk, overload it, or try to break into it. The site is provided as is, with no warranty of any kind, and no liability is accepted for anything that follows from using it. The code is MIT licensed, which covers the code only, not the course material it indexes.",
    title: "Using the site",
  },
];

export const LEGAL_SECTIONS: LegalSection[] = [
  {
    blocks: PRIVACY_BLOCKS,
    color: "chart-1",
    icon: ShieldCheckIcon,
    label: "Privacy",
    value: "privacy",
  },
  {
    blocks: TERMS_BLOCKS,
    color: "chart-2",
    icon: ScaleIcon,
    label: "Terms and disclaimer",
    value: "terms",
  },
];
