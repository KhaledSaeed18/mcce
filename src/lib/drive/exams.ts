import { UNRECORDED_TERM_LABEL } from "@/config/exams";
import { PAPER_MATERIAL_TYPES } from "@/config/materials";
import { compareExamNodes, compareTermLabels } from "./exam-order";
import type { DriveNode, ExamCourseGroup, ExamTermGroup } from "./types";

type ExamPaper = DriveNode & { courseCode: string };

function isExamPaper(node: DriveNode): node is ExamPaper {
  return (
    node.kind !== "folder" &&
    PAPER_MATERIAL_TYPES.has(node.materialType) &&
    node.courseCode !== null
  );
}

function toTermGroups(items: DriveNode[]): ExamTermGroup[] {
  const byTerm = new Map<string, DriveNode[]>();

  for (const item of items) {
    const label = item.termLabel ?? UNRECORDED_TERM_LABEL;
    const group = byTerm.get(label) ?? [];
    group.push(item);
    byTerm.set(label, group);
  }

  return [...byTerm.entries()]
    .map(([label, group]) => ({ items: group.sort(compareExamNodes), label }))
    .sort((a, b) => compareTermLabels(a.label, b.label));
}

/** Every indexed exam paper, grouped by course and then by the term it was sat. */
export function buildExamGroups(nodes: DriveNode[]): ExamCourseGroup[] {
  const byCourse = new Map<string, ExamPaper[]>();

  for (const node of nodes) {
    if (!isExamPaper(node)) {
      continue;
    }
    const group = byCourse.get(node.courseCode) ?? [];
    group.push(node);
    byCourse.set(node.courseCode, group);
  }

  return [...byCourse.entries()]
    .map(([code, items]) => ({
      code,
      name: items[0].courseName ?? code,
      terms: toTermGroups(items),
      total: items.length,
    }))
    .sort((a, b) => a.code.localeCompare(b.code));
}
