import type {
  HeroStation,
  HeroStationMaterial,
} from "@/components/marketing/types";
import {
  HERO_RADIO_LAB_OFFSET,
  HERO_RADIO_MATERIAL_LIMIT,
  HERO_RADIO_OTHER_MATERIAL,
} from "@/config/hero-radio";
import type { DriveNode } from "./types";

const COURSE_NUMBER_PATTERN = /(\d+)(L?)$/i;

interface StationDraft {
  counts: Map<string, number>;
  station: HeroStation;
}

/** "EENG537" -> 537, "CENG566L" -> 566.5. */
export function stationFrequency(code: string): number {
  const match = COURSE_NUMBER_PATTERN.exec(code);
  if (!match) {
    return 0;
  }
  return Number(match[1]) + (match[2] ? HERO_RADIO_LAB_OFFSET : 0);
}

function toMaterials(counts: Map<string, number>): HeroStationMaterial[] {
  const sorted = [...counts]
    .map(([type, count]) => ({ count, type }))
    .sort((a, b) => b.count - a.count);
  const head = sorted.slice(0, HERO_RADIO_MATERIAL_LIMIT);
  const rest = sorted
    .slice(HERO_RADIO_MATERIAL_LIMIT)
    .reduce((sum, material) => sum + material.count, 0);

  return rest > 0
    ? [...head, { count: rest, type: HERO_RADIO_OTHER_MATERIAL }]
    : head;
}

/** One station per indexed course, in order along the dial. */
export function buildHeroStations(nodes: DriveNode[]): HeroStation[] {
  const drafts = new Map<string, StationDraft>();

  for (const node of nodes) {
    if (node.kind === "folder" || !(node.courseCode && node.courseName)) {
      continue;
    }
    const draft = drafts.get(node.courseCode) ?? {
      counts: new Map<string, number>(),
      station: {
        code: node.courseCode,
        fileCount: 0,
        frequency: stationFrequency(node.courseCode),
        label: COURSE_NUMBER_PATTERN.exec(node.courseCode)?.[0] ?? "",
        materials: [],
        name: node.courseName,
        semester: node.semester ?? "",
      },
    };
    draft.station.fileCount += 1;
    draft.counts.set(
      node.materialType,
      (draft.counts.get(node.materialType) ?? 0) + 1
    );
    drafts.set(node.courseCode, draft);
  }

  return [...drafts.values()]
    .map(({ counts, station }) => ({
      ...station,
      materials: toMaterials(counts),
    }))
    .sort((a, b) => a.frequency - b.frequency || a.code.localeCompare(b.code));
}
