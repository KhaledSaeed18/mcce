import type {
  MaintenanceState,
  RepoDomainGroupId,
  RepoDomainId,
  ReuseClass,
} from "@/lib/resources/types";

export interface RepoDomain {
  group: RepoDomainGroupId;
  id: RepoDomainId;
  label: string;
  tagline: string;
}

export const REPO_DOMAINS: RepoDomain[] = [
  {
    group: "backbone",
    id: "writing",
    label: "Writing and typesetting",
    tagline: "Compilers, editors, and slide tools.",
  },
  {
    group: "backbone",
    id: "templates",
    label: "Thesis templates",
    tagline: "Scaffolds to adapt once the LIU format is known.",
  },
  {
    group: "backbone",
    id: "references",
    label: "References and BibTeX",
    tagline: "Managers, plugins, and citation processors.",
  },
  {
    group: "backbone",
    id: "review",
    label: "Review method and screening",
    tagline: "Active learning, PRISMA, and bibliometrics.",
  },
  {
    group: "backbone",
    id: "scholarly-apis",
    label: "Scholarly graphs and paper tooling",
    tagline: "API clients and curated paper lists.",
  },
  {
    group: "backbone",
    id: "reading",
    label: "PDF extraction and reading",
    tagline: "Turn a folder of papers into structured text.",
  },
  {
    group: "backbone",
    id: "rag-agents",
    label: "Local document QA and research agents",
    tagline: "Keep the PDFs local, rewrite every drafted line.",
  },
  {
    group: "backbone",
    id: "reproducibility",
    label: "Reproducibility and pipelines",
    tagline: "Environments, tracking, and rerunnable pipelines.",
  },
  {
    group: "backbone",
    id: "integrity",
    label: "Integrity and preservation",
    tagline: "Similarity checks, DOIs, and FAIR scores.",
  },
  {
    group: "backbone",
    id: "collaboration",
    label: "Collaboration and project tracking",
    tagline: "Self-hosted boards, forges, and shared notes.",
  },
  {
    group: "backbone",
    id: "analysis",
    label: "Data analysis and plotting",
    tagline: "The scientific Python stack and its GUI peers.",
  },
  {
    group: "track",
    id: "ml",
    label: "Machine learning",
    tagline: "Frameworks, tracking, and explainability.",
  },
  {
    group: "track",
    id: "data-mining",
    label: "Data mining",
    tagline: "Dataframes, mining toolkits, and data quality.",
  },
  {
    group: "track",
    id: "vision",
    label: "Vision and imaging",
    tagline: "Libraries, annotation, and detection models.",
  },
  {
    group: "track",
    id: "dsp",
    label: "DSP and SDR",
    tagline: "Signal chains, receivers, and audio analysis.",
  },
  {
    group: "track",
    id: "wireless",
    label: "Communications and wireless",
    tagline: "Link-level simulation, coding, and channels.",
  },
  {
    group: "track",
    id: "mobile-core",
    label: "Mobile core and radio stacks",
    tagline: "4G and 5G stacks on commodity hardware.",
  },
  {
    group: "track",
    id: "networking",
    label: "Networking and multimedia",
    tagline: "Simulators, emulators, routing, and media.",
  },
  {
    group: "track",
    id: "embedded",
    label: "Embedded and RTOS",
    tagline: "Kernels, toolchains, emulators, and debug.",
  },
  {
    group: "track",
    id: "satellite",
    label: "Satellite and space",
    tagline: "Propagators, decoders, and flight software.",
  },
  {
    group: "track",
    id: "security",
    label: "Security and cryptography",
    tagline: "Primitives, scanners, and monitors.",
  },
  {
    group: "track",
    id: "math",
    label: "Math, graphs, and optimisation",
    tagline: "Solvers, graph libraries, and algebra.",
  },
];

export const REPO_DOMAIN_BY_ID: ReadonlyMap<RepoDomainId, RepoDomain> = new Map(
  REPO_DOMAINS.map((domain) => [domain.id, domain])
);

export const REUSE_CLASS_LABELS: Record<ReuseClass, string> = {
  check: "Check the licence",
  copyleft: "Copyleft",
  permissive: "Permissive",
  "weak-copyleft": "Weak copyleft",
};

/** What each class means for code that ends up in a thesis artifact. */
export const REUSE_CLASS_EXPLANATIONS: Record<ReuseClass, string> = {
  check: "Custom, dual, or unclear. Read LICENSE before depending on it.",
  copyleft: "Distributed derivatives must carry the same licence.",
  permissive: "Use and modify, keep the notice, cite the project.",
  "weak-copyleft": "Link freely; changes to the library itself stay open.",
};

export const REUSE_CLASSES: ReuseClass[] = [
  "permissive",
  "weak-copyleft",
  "copyleft",
  "check",
];

export const MAINTENANCE_LABELS: Record<MaintenanceState, string> = {
  active: "Active",
  archived: "Archived",
  dormant: "Dormant",
  steady: "Steady",
  unverified: "Unverified",
};

export const MAINTENANCE_STATES: MaintenanceState[] = [
  "active",
  "steady",
  "dormant",
  "archived",
  "unverified",
];

export const REPO_CHECKLIST = [
  "Read the licence file first and place it in a reuse class.",
  "Check the last commit date and whether open issues get answers.",
  "Look for a tagged release, not only a rolling main branch.",
  "Confirm the README reaches a working example in under thirty minutes.",
  "Fork it, pin the commit, and cite the repository and its paper together.",
];
