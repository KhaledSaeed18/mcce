import { useCallback } from "react";
import { SearchFilterSelect } from "@/components/drive/search-filter-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FacetOptions } from "@/lib/drive/facets";
import type {
  DriveNodeKind,
  MaterialType,
  SearchFilterValues,
} from "@/lib/drive/types";

const QUERY_INPUT_ID = "drive-search-query";

interface SearchFiltersProps {
  courseOptions: FacetOptions["courses"];
  facets: FacetOptions;
  onChange: (patch: Partial<SearchFilterValues>) => void;
  values: SearchFilterValues;
}

export function SearchFilters({
  courseOptions,
  facets,
  onChange,
  values,
}: SearchFiltersProps) {
  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ q: event.target.value }),
    [onChange]
  );

  // Courses are scoped to the chosen semester, so a stale course would filter
  // everything out.
  const handleSemesterChange = useCallback(
    (semester: string | undefined) => onChange({ course: undefined, semester }),
    [onChange]
  );

  const handleCourseChange = useCallback(
    (course: string | undefined) => onChange({ course }),
    [onChange]
  );

  const handleKindChange = useCallback(
    (kind: string | undefined) =>
      onChange({ kind: kind as DriveNodeKind | undefined }),
    [onChange]
  );

  const handleMaterialChange = useCallback(
    (material: string | undefined) =>
      onChange({ material: material as MaterialType | undefined }),
    [onChange]
  );

  return (
    <>
      <div>
        <Label className="sr-only" htmlFor={QUERY_INPUT_ID}>
          Search files and folders
        </Label>
        <Input
          id={QUERY_INPUT_ID}
          onChange={handleQueryChange}
          placeholder="Search files and folders..."
          value={values.q}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <SearchFilterSelect
          allLabel="All semesters"
          onValueChange={handleSemesterChange}
          options={facets.semesters}
          value={values.semester}
        />
        <SearchFilterSelect
          allLabel="All courses"
          onValueChange={handleCourseChange}
          options={courseOptions}
          value={values.course}
        />
        <SearchFilterSelect
          allLabel="All material"
          onValueChange={handleMaterialChange}
          options={facets.materialTypes}
          value={values.material}
        />
        <SearchFilterSelect
          allLabel="All file types"
          onValueChange={handleKindChange}
          options={facets.kinds}
          value={values.kind}
        />
      </div>
    </>
  );
}
