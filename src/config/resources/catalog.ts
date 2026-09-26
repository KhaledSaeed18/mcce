import { AI_ASSISTANTS } from "@/config/resources/catalog/ai-assistants";
import { DATA_ANALYSIS } from "@/config/resources/catalog/data-analysis";
import { DATA_MINING } from "@/config/resources/catalog/data-mining";
import { DEV } from "@/config/resources/catalog/dev";
import { DIAGRAMMING } from "@/config/resources/catalog/diagramming";
import { DSP } from "@/config/resources/catalog/dsp";
import { EMBEDDED } from "@/config/resources/catalog/embedded";
import { FILE_UTILITIES } from "@/config/resources/catalog/file-utilities";
import { INTEGRITY_ARCHIVING } from "@/config/resources/catalog/integrity-archiving";
import { LEARNING } from "@/config/resources/catalog/learning";
import { LITERATURE } from "@/config/resources/catalog/literature";
import { MATH } from "@/config/resources/catalog/math";
import { ML } from "@/config/resources/catalog/ml";
import { MULTIMEDIA } from "@/config/resources/catalog/multimedia";
import { NETWORKING } from "@/config/resources/catalog/networking";
import { PRESENTATIONS } from "@/config/resources/catalog/presentations";
import { PRODUCTIVITY } from "@/config/resources/catalog/productivity";
import { REFERENCES } from "@/config/resources/catalog/references";
import { REVIEW } from "@/config/resources/catalog/review";
import { SATELLITE } from "@/config/resources/catalog/satellite";
import { SECURITY } from "@/config/resources/catalog/security";
import { THESIS_ARCHIVES } from "@/config/resources/catalog/thesis-archives";
import { VISION } from "@/config/resources/catalog/vision";
import { WIRELESS } from "@/config/resources/catalog/wireless";
import { WRITING } from "@/config/resources/catalog/writing";
import { ANALYSIS_REPOS } from "@/config/resources/repos/analysis";
import { COLLABORATION_REPOS } from "@/config/resources/repos/collaboration";
import { DATA_MINING_REPOS } from "@/config/resources/repos/data-mining";
import { DSP_REPOS } from "@/config/resources/repos/dsp";
import { EMBEDDED_REPOS } from "@/config/resources/repos/embedded";
import { INTEGRITY_REPOS } from "@/config/resources/repos/integrity";
import { MATH_REPOS } from "@/config/resources/repos/math";
import { ML_REPOS } from "@/config/resources/repos/ml";
import { MOBILE_CORE_REPOS } from "@/config/resources/repos/mobile-core";
import { NETWORKING_REPOS } from "@/config/resources/repos/networking";
import { RAG_AGENT_REPOS } from "@/config/resources/repos/rag-agents";
import { READING_REPOS } from "@/config/resources/repos/reading";
import { REFERENCE_REPOS } from "@/config/resources/repos/references";
import { REPRODUCIBILITY_REPOS } from "@/config/resources/repos/reproducibility";
import { REVIEW_REPOS } from "@/config/resources/repos/review";
import { SATELLITE_REPOS } from "@/config/resources/repos/satellite";
import { SCHOLARLY_API_REPOS } from "@/config/resources/repos/scholarly-apis";
import { SECURITY_REPOS } from "@/config/resources/repos/security";
import { TEMPLATE_REPOS } from "@/config/resources/repos/templates";
import { VISION_REPOS } from "@/config/resources/repos/vision";
import { WIRELESS_REPOS } from "@/config/resources/repos/wireless";
import { WRITING_REPOS } from "@/config/resources/repos/writing";
import type { Repository, Resource } from "@/lib/resources/types";

/** Authoring order is category order; the build sorts within a category. */
export const RESOURCE_CATALOG: Resource[] = [
  ...AI_ASSISTANTS,
  ...FILE_UTILITIES,
  ...DIAGRAMMING,
  ...PRESENTATIONS,
  ...PRODUCTIVITY,
  ...DEV,
  ...LEARNING,
  ...MATH,
  ...DATA_ANALYSIS,
  ...DSP,
  ...WIRELESS,
  ...SATELLITE,
  ...NETWORKING,
  ...MULTIMEDIA,
  ...ML,
  ...DATA_MINING,
  ...VISION,
  ...SECURITY,
  ...EMBEDDED,
  ...LITERATURE,
  ...REFERENCES,
  ...WRITING,
  ...REVIEW,
  ...THESIS_ARCHIVES,
  ...INTEGRITY_ARCHIVING,
];

export const REPO_CATALOG: Repository[] = [
  ...WRITING_REPOS,
  ...TEMPLATE_REPOS,
  ...REFERENCE_REPOS,
  ...REVIEW_REPOS,
  ...SCHOLARLY_API_REPOS,
  ...READING_REPOS,
  ...RAG_AGENT_REPOS,
  ...REPRODUCIBILITY_REPOS,
  ...INTEGRITY_REPOS,
  ...COLLABORATION_REPOS,
  ...ANALYSIS_REPOS,
  ...ML_REPOS,
  ...DATA_MINING_REPOS,
  ...VISION_REPOS,
  ...DSP_REPOS,
  ...WIRELESS_REPOS,
  ...MOBILE_CORE_REPOS,
  ...NETWORKING_REPOS,
  ...EMBEDDED_REPOS,
  ...SATELLITE_REPOS,
  ...SECURITY_REPOS,
  ...MATH_REPOS,
];
