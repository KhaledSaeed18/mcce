import type { StudentPerk, StudentPerkId } from "@/lib/student-perks/types";

export const STUDENT_HERO = {
  badge: "STUDENT PLANS",
  highlight: "start with these three.",
  title: "Student plans, free while enrolled,",
} as const;

export const STUDENT_PERKS: StudentPerk[] = [
  {
    allOffers: {
      href: "https://education.github.com/pack",
      label: "Browse all pack offers",
      note: "The full list of included tools and benefits, with what each one gives.",
    },
    applyLabel: "Apply for the pack",
    applyUrl: "https://education.github.com/pack/join",
    cardRequired: false,
    color: "chart-1",
    description:
      "One student check that opens GitHub Pro, Copilot Student, cloud credits, domains, and courses. Revalidate every two years.",
    docsUrl:
      "https://docs.github.com/en/education/about-github-education/github-education-for-students/apply-to-github-education-as-a-student",
    duration: "While enrolled, recheck every 2 years",
    faq: [
      {
        answer:
          "Students 13 or older in a degree or diploma course, including LIU MCCE. Teachers and staff use a separate GitHub education discount and cannot claim the pack.",
        question: "Who can claim the pack?",
      },
      {
        answer:
          "Two years from approval. Revalidate with a fresh proof before it lapses, or partner offers stop one by one.",
        question: "How long does verification last?",
      },
      {
        answer:
          "One redemption per person per offer. A new account or a fresh verification does not reset a time limited offer, and some partners block stacking with a past trial.",
        question: "Can an offer be claimed twice?",
      },
      {
        answer:
          "Partners can change or end an offer. GitHub posts changes in the pack changelog. Check the pack page before you plan a project around one credit.",
        question: "Do offers change?",
      },
    ],
    highlights: [
      {
        body: "Pro repositories, Pages hosting, Codespaces Pro access, and Copilot Student with completions plus AI credits.",
        title: "Code and AI",
      },
      {
        body: "Azure with 25 plus services and 100 USD credit and no card, Heroku monthly credit for 24 months, MongoDB Atlas credit plus a free certification.",
        title: "Cloud and data",
      },
      {
        body: "JetBrains IDEs for one year, Termius team features, 1Password for one year, Sentry team plan for one year.",
        title: "Daily tools",
      },
      {
        body: "DataCamp for 3 months, Boot.dev for 3 months, Educative for 6 months, FrontendMasters for 6 months.",
        title: "Courses",
      },
      {
        body: "A .me domain for one year plus SSL, a .TECH domain for one year, and a Name.com domain from student extensions.",
        title: "Domains",
      },
    ],
    id: "github-education",
    name: "GitHub Student Developer Pack",
    offerGroups: [
      {
        items: [
          "GitHub Pro while a student",
          "Copilot Student with completions and AI credits",
          "Codespaces Pro access",
          "JetBrains IDEs, annual renewal",
        ],
        title: "Code",
      },
      {
        items: [
          "Azure, 25 plus services and 100 USD credit, no card",
          "Heroku, 13 USD per month for 24 months",
          "MongoDB Atlas, 50 USD credit plus certification",
          "Appwrite Education plan for the student period",
        ],
        title: "Cloud",
      },
      {
        items: [
          "Namecheap .me domain for 1 year plus 1 year SSL",
          ".TECH domain for 1 year",
          "Name.com domain from student extensions",
        ],
        title: "Domains",
      },
      {
        items: [
          "DataCamp, 3 months",
          "Boot.dev, 3 months",
          "Educative, 6 months plus 30 percent off",
          "FrontendMasters, 6 months",
        ],
        title: "Learn",
      },
    ],
    price: "Free",
    renewal: "Free while verified, recheck every 2 years",
    shortValue: "80 plus tools with one check",
    steps: [
      {
        body: "Use a personal account you will keep. Link a university email in the account settings.",
        title: "Create a GitHub account",
      },
      {
        body: "Start at the pack join page and open the student application from your profile.",
        title: "Open the student application",
      },
      {
        body: "School ID with a current date, class schedule, transcript, or an enrollment letter. A dated paper or invoice with your name, the university name, and a fresh date also works.",
        title: "Upload a proof of enrollment",
      },
      {
        body: "Review takes a few days. Keep the proof readable and the names matching.",
        title: "Wait for review",
      },
      {
        body: "Open the pack page and claim each partner offer inside its own account before the dates pass.",
        title: "Claim offers one by one",
      },
    ],
    supportUrl: "https://support.github.com",
    tagline: "One check, 80 plus tools.",
    verification: "University email plus dated proof",
  },
  {
    applyLabel: "Claim on Google One",
    applyUrl: "https://one.google.com/ai-student",
    cardRequired: true,
    color: "chart-2",
    description:
      "Google AI Plus free for 12 months for verified students, with paid Pro tiers at student rates. A card is required and a small hold may appear.",
    docsUrl: "https://one.google.com/offer/studentoffer8",
    duration: "12 months free, redeem by Dec 31 2026",
    faq: [
      {
        answer:
          "Students 18 or older at a higher education institution, with a personal Google account. The free tier name depends on the country of the school.",
        question: "Who can claim the free year?",
      },
      {
        answer:
          "The free year ends as a paid plan at the price shown at signup unless cancelled. Set a reminder two weeks before the end date and confirm the price on the offer page.",
        question: "What happens after 12 months?",
      },
      {
        answer:
          "A qualifying card is required at signup. Some regions show a temporary 1 USD hold for verification. It drops off and is not a charge.",
        question: "Why is a card required for a free plan?",
      },
      {
        answer:
          "The US offer is AI Pro free for 12 months with 5 TB. Most other markets get AI Plus free for 12 months with 400 GB. Confirm the plan name on the page before you start SheerID.",
        question: "Pro or Plus, which one applies?",
      },
    ],
    highlights: [
      {
        body: "Gemini and Notebook study tools with higher limits, plus drafts, arguments, and idea passes for writing and career prep.",
        title: "Study and writing",
      },
      {
        body: "400 GB across Photos, Drive, and Gmail on the free Plus tier, 5 TB on paid Pro tiers.",
        title: "Storage",
      },
      {
        body: "Omni Flash and Nano Banana for images and video on Plus, with Pro and Pro versions on paid tiers.",
        title: "Media",
      },
      {
        body: "Expanded Antigravity, Jules, and developer program access on Pro tiers for code and projects.",
        title: "Code on Pro",
      },
    ],
    id: "google-gemini",
    name: "Google AI student plans",
    plans: [
      {
        after: "4.99 USD per month after",
        includes: [
          "400 GB across Photos, Drive, Gmail",
          "Gemini and Notebook, up to 200 pages of notes",
          "Drafts, arguments, and idea passes",
          "Omni Flash and Nano Banana media",
        ],
        name: "AI Plus",
        price: "0 USD per month for 12 months",
      },
      {
        after: "4.99 USD per month for up to 4 years",
        includes: [
          "5 TB across Photos, Drive, Gmail",
          "Gemini and Notebook, up to 1500 pages",
          "Higher limits for writing and media Pro",
          "Antigravity, Jules, developer premium",
        ],
        name: "AI Pro",
        price: "75 percent off the 19.99 USD standard",
      },
      {
        after: "8.49 USD per month for up to 4 years",
        includes: [
          "All AI Pro benefits",
          "YouTube Premium with offline and background",
          "YouTube Music without ads",
        ],
        name: "AI Pro with YouTube Premium",
        price: "68 percent off the 26.98 USD standard",
      },
    ],
    price: "Free for 12 months on Plus",
    renewal: "Paid renewal unless cancelled",
    shortValue: "12 months free, then student rates",
    steps: [
      {
        body: "Use the personal account you want to keep. Supervised, family group, and third party billed accounts do not qualify.",
        title: "Sign in with a personal account",
      },
      {
        body: "The page must show the plan name, 12 months, trial end, and renewal price for your market before you continue.",
        title: "Confirm the plan and the renewal price",
      },
      {
        body: "Complete SheerID with a valid school email and current enrollment facts. Add a document when asked.",
        title: "Verify with SheerID",
      },
      {
        body: "A qualifying payment method is required. A temporary 1 USD hold may show during verification.",
        title: "Add a payment method",
      },
      {
        body: "Set a reminder before month 12. Cancel from Google One if the paid tier is not needed.",
        title: "Set a renewal reminder",
      },
    ],
    supportUrl: "https://support.google.com/one",
    tagline: "One free year, then student rates.",
    verification: "SheerID plus school email",
  },
  {
    applyLabel: "Apply for Zed Student",
    applyUrl: "https://dashboard.zed.dev/education/apply",
    cardRequired: false,
    color: "chart-4",
    description:
      "Zed Pro free for one year for verified university students. No card, stays active for the year even after graduation.",
    docsUrl: "https://zed.dev/education",
    duration: "12 months, then Free plan",
    faq: [
      {
        answer:
          "Students at accredited universities, 18 or older, with a GitHub account older than 30 days and a current university email.",
        question: "Who can claim Zed Student?",
      },
      {
        answer:
          "The plan stays active for the full year from approval, then moves to the Free plan. Upgrade to Pro only when needed.",
        question: "What if graduation falls inside the year?",
      },
      {
        answer:
          "Zed checks the domain against a university list and the applicant can add a missing domain. International students are accepted.",
        question: "How does verification work?",
      },
      {
        answer:
          "Write to education@zed.dev. Replies arrive within 72 hours. Include the GitHub username and the university email used.",
        question: "Where to ask for help?",
      },
    ],
    highlights: [
      {
        body: "Full Pro set for 12 months, including hosted models except Claude Opus class models.",
        title: "All Pro features",
      },
      {
        body: "10 USD per month in token credits, capped with no spend limit control on the student plan.",
        title: "AI credits",
      },
      {
        body: "Unlimited edit predictions that complete code as it is typed.",
        title: "Predictions",
      },
      {
        body: "Shared files, shared terminals, multi cursor, and voice chat inside the editor for groups and hackathons.",
        title: "Real time groups",
      },
    ],
    id: "zed-student",
    name: "Zed Student plan",
    price: "Free",
    renewal: "Moves to Free after 12 months",
    shortValue: "Pro editor free for one year",
    steps: [
      {
        body: "Zed sign in runs through GitHub. The account must be older than 30 days at application time.",
        title: "Keep a GitHub account older than 30 days",
      },
      {
        body: "Install Zed on the machine used for coursework, then sign in with that GitHub account.",
        title: "Install Zed and sign in",
      },
      {
        body: "Apply from the education dashboard and share a valid, current university email address.",
        title: "Apply with a university email",
      },
      {
        body: "Domains come from a shared university list. Add a missing domain so later students pass faster.",
        title: "Pass domain verification",
      },
    ],
    supportEmail: "education@zed.dev",
    supportUrl: "https://zed.dev/education",
    tagline: "Pro editor free for one year.",
    verification: "GitHub plus university email",
  },
];

export const STUDENT_PERK_BY_ID: ReadonlyMap<StudentPerkId, StudentPerk> =
  new Map(STUDENT_PERKS.map((perk) => [perk.id, perk]));

export const STUDENT_COMPARE_ROWS = [
  {
    label: "Free span",
    values: [
      "While enrolled, recheck every 2 years",
      "12 months free on Plus",
      "12 months, then Free plan",
    ],
  },
  {
    label: "Card at signup",
    values: ["No", "Yes, hold may show", "No"],
  },
  {
    label: "Verification",
    values: [
      "University email plus dated proof",
      "SheerID plus school email",
      "GitHub plus university email",
    ],
  },
] as const;
