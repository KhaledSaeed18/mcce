export type ResourceGroupId = "everyday" | "coursework" | "research";

export type ResourceCategoryId =
  | "ai-assistants"
  | "file-utilities"
  | "diagramming"
  | "presentations"
  | "productivity"
  | "dev"
  | "learning"
  | "math"
  | "data-analysis"
  | "dsp"
  | "wireless"
  | "satellite"
  | "networking"
  | "multimedia"
  | "ml"
  | "data-mining"
  | "vision"
  | "security"
  | "embedded"
  | "literature"
  | "references"
  | "writing"
  | "review"
  | "thesis-archives"
  | "integrity-archiving";

/** What a student pays. Open source is a separate flag, not a cost. */
export type AccessBadge = "free" | "freemium" | "trial" | "paid" | "student";

/** The seven values the badge filter accepts; "open-source" filters on the flag. */
export type BadgeFilter = AccessBadge | "open-source";

export type VerificationState = "verified" | "pending";

export type ResourceStatus = "recommended" | "experimental";

export type ThesisStageId =
  | "frame"
  | "search"
  | "map"
  | "retrieve"
  | "screen"
  | "cite"
  | "prior-theses"
  | "experiment"
  | "analyse"
  | "write"
  | "integrity"
  | "defend";

export type ThesisTerm = "A" | "B";

export type Platform =
  | "web"
  | "desktop"
  | "cli"
  | "library"
  | "dataset"
  | "service"
  | "reference";

export interface Resource {
  access: AccessBadge;
  aliases?: string[];
  /** Title as listed on svgl.app; absent means the category icon is used. */
  brandIcon?: string;
  category: ResourceCategoryId;
  /** Course codes from CURRICULUM. Authored now, not shown until course strips ship. */
  courses?: string[];
  /** One plain sentence, under 140 characters. */
  description: string;
  /** Sorts first in its category and marks the start-here pick on the thesis page. */
  featured?: boolean;
  /** Stable forever: it names the icon file and appears in URLs. */
  id: string;
  isOpenSource: boolean;
  name: string;
  /** Licensing, hardware, or setup caveat. */
  note?: string;
  platform: Platform[];
  /** Cloud and AI tools: what not to upload. */
  privacyNote?: string;
  repoId?: string;
  requiresAccount?: boolean;
  status?: ResourceStatus;
  tags?: string[];
  thesisStages?: ThesisStageId[];
  /** Official page, https, no query string, no trailing slash. */
  url: string;
  verification?: VerificationState;
  /** Last date a human checked the badge and the URL. */
  verifiedOn: string;
}

export type RepoDomainId =
  | "writing"
  | "templates"
  | "references"
  | "review"
  | "scholarly-apis"
  | "reading"
  | "rag-agents"
  | "reproducibility"
  | "integrity"
  | "collaboration"
  | "analysis"
  | "ml"
  | "data-mining"
  | "vision"
  | "dsp"
  | "wireless"
  | "mobile-core"
  | "networking"
  | "embedded"
  | "satellite"
  | "security"
  | "math";

export type RepoDomainGroupId = "backbone" | "track";

export type ReuseClass = "permissive" | "weak-copyleft" | "copyleft" | "check";

export type MaintenanceState =
  | "active"
  | "steady"
  | "dormant"
  | "archived"
  | "unverified";

export interface Repository {
  courses?: string[];
  description: string;
  domain: RepoDomainId;
  /** Kebab slug of "owner-name". */
  id: string;
  languages?: string[];
  /** SPDX id where one applies, otherwise "custom" or "none". */
  license: string;
  maintenance: MaintenanceState;
  name: string;
  note?: string;
  owner: string;
  resourceId?: string;
  reuseClass: ReuseClass;
  verifiedOn: string;
}

export type IconDescriptor =
  | { kind: "brand"; light: string }
  | { kind: "category" }
  | { kind: "monogram"; text: string };

export type LinkStatus = "ok" | "redirect" | "broken" | "unchecked";

export interface ResourceEntry extends Resource {
  /** Lowercased name, aliases, tags, and description, joined for search. */
  haystack: string;
  icon: IconDescriptor;
  linkStatus: LinkStatus;
}

export interface RepoEntry extends Repository {
  haystack: string;
  icon: IconDescriptor;
  linkStatus: LinkStatus;
  url: string;
}

export interface ResourcesIndexMeta {
  countsByBadge: Record<string, number>;
  countsByCategory: Record<string, number>;
  countsByDomain: Record<string, number>;
  countsByStage: Record<string, number>;
  generatedAt: string;
  repoCount: number;
  toolCount: number;
}

export interface ResourcesIndex {
  meta: ResourcesIndexMeta;
  repos: RepoEntry[];
  tools: ResourceEntry[];
}

export interface ResourceFilterValues {
  badge?: BadgeFilter[];
  category?: ResourceCategoryId;
  q?: string;
}

export interface RepoFilterValues {
  domain?: RepoDomainId;
  license?: ReuseClass;
  maintenance?: MaintenanceState;
  q?: string;
}
