import { Badge } from "@/components/ui/badge";
import {
  MAINTENANCE_LABELS,
  REUSE_CLASS_EXPLANATIONS,
  REUSE_CLASS_LABELS,
} from "@/config/resources/repo-domains";
import type { MaintenanceState, ReuseClass } from "@/lib/resources/types";

interface RepoLicenseBadgeProps {
  license: string;
  maintenance: MaintenanceState;
  reuseClass: ReuseClass;
}

/** The SPDX id as text, the reuse class as the badge, and a maintenance chip only when it matters. */
export function RepoLicenseBadge({
  license,
  maintenance,
  reuseClass,
}: RepoLicenseBadgeProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Badge title={REUSE_CLASS_EXPLANATIONS[reuseClass]} variant="outline">
        {REUSE_CLASS_LABELS[reuseClass]}
      </Badge>
      <span className="font-mono text-muted-foreground text-xs">{license}</span>
      {maintenance === "active" ? null : (
        <Badge variant="secondary">{MAINTENANCE_LABELS[maintenance]}</Badge>
      )}
    </div>
  );
}
