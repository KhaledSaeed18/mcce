import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_EXPORT_SECTIONS,
  GPA_EXPORT_STORAGE_KEY,
} from "@/config/gpa-export";
import type {
  GpaExportSection,
  GpaExportSections,
} from "@/lib/gpa/export/types";

function read(): GpaExportSections {
  try {
    const raw = localStorage.getItem(GPA_EXPORT_STORAGE_KEY);

    return raw
      ? { ...DEFAULT_EXPORT_SECTIONS, ...JSON.parse(raw) }
      : DEFAULT_EXPORT_SECTIONS;
  } catch {
    return DEFAULT_EXPORT_SECTIONS;
  }
}

/** Null until storage is read, so nothing is written over a saved choice. */
export function useGpaExportSections() {
  const [sections, setSections] = useState<GpaExportSections | null>(null);

  useEffect(() => setSections(read()), []);

  useEffect(() => {
    if (sections === null) {
      return;
    }
    localStorage.setItem(GPA_EXPORT_STORAGE_KEY, JSON.stringify(sections));
  }, [sections]);

  const toggleSection = useCallback(
    (id: GpaExportSection, isOn: boolean) =>
      setSections((previous) => ({
        ...(previous ?? DEFAULT_EXPORT_SECTIONS),
        [id]: isOn,
      })),
    []
  );

  return {
    sections: sections ?? DEFAULT_EXPORT_SECTIONS,
    toggleSection,
  };
}
