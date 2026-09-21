import { useCallback } from "react";
import { SearchFilterSelect } from "@/components/drive/search-filter-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RESOURCES_EMPTY_ACTION } from "@/config/resources/copy";
import {
  MAINTENANCE_LABELS,
  MAINTENANCE_STATES,
  REPO_DOMAINS,
  REUSE_CLASS_LABELS,
  REUSE_CLASSES,
} from "@/config/resources/repo-domains";
import type {
  MaintenanceState,
  RepoDomainId,
  RepoFilterValues,
  ReuseClass,
} from "@/lib/resources/types";

const QUERY_INPUT_ID = "repo-search-query";

const DOMAIN_OPTIONS = REPO_DOMAINS.map((domain) => ({
  label: domain.label,
  value: domain.id,
}));
const LICENSE_OPTIONS = REUSE_CLASSES.map((reuseClass) => ({
  label: REUSE_CLASS_LABELS[reuseClass],
  value: reuseClass,
}));
const MAINTENANCE_OPTIONS = MAINTENANCE_STATES.map((state) => ({
  label: MAINTENANCE_LABELS[state],
  value: state,
}));

interface RepoFiltersProps {
  hasCriteria: boolean;
  onChange: (patch: Partial<RepoFilterValues>) => void;
  onClear: () => void;
  resultCount: number;
  values: RepoFilterValues;
}

export function RepoFilters({
  hasCriteria,
  onChange,
  onClear,
  resultCount,
  values,
}: RepoFiltersProps) {
  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ q: event.target.value || undefined }),
    [onChange]
  );
  const handleDomainChange = useCallback(
    (domain: string | undefined) =>
      onChange({ domain: domain as RepoDomainId | undefined }),
    [onChange]
  );
  const handleLicenseChange = useCallback(
    (license: string | undefined) =>
      onChange({ license: license as ReuseClass | undefined }),
    [onChange]
  );
  const handleMaintenanceChange = useCallback(
    (maintenance: string | undefined) =>
      onChange({ maintenance: maintenance as MaintenanceState | undefined }),
    [onChange]
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <div className="min-w-56 flex-1">
          <Label className="sr-only" htmlFor={QUERY_INPUT_ID}>
            Search repositories
          </Label>
          <Input
            id={QUERY_INPUT_ID}
            onChange={handleQueryChange}
            placeholder="Search repositories..."
            value={values.q ?? ""}
          />
        </div>
        <SearchFilterSelect
          allLabel="All domains"
          label="Domain"
          onValueChange={handleDomainChange}
          options={DOMAIN_OPTIONS}
          value={values.domain}
        />
        <SearchFilterSelect
          allLabel="Any licence"
          label="Licence class"
          onValueChange={handleLicenseChange}
          options={LICENSE_OPTIONS}
          value={values.license}
        />
        <SearchFilterSelect
          allLabel="Any maintenance"
          label="Maintenance"
          onValueChange={handleMaintenanceChange}
          options={MAINTENANCE_OPTIONS}
          value={values.maintenance}
        />
      </div>

      <p
        aria-live="polite"
        className="flex items-center gap-3 text-muted-foreground text-sm"
      >
        <span>{resultCount} repositories</span>
        {hasCriteria ? (
          <button
            className="underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            onClick={onClear}
            type="button"
          >
            {RESOURCES_EMPTY_ACTION}
          </button>
        ) : null}
      </p>
    </div>
  );
}
