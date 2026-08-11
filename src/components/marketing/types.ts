import type { LucideIcon } from "lucide-react";

export interface HeroLeafNode {
  color: string;
  icon: LucideIcon;
  label: string;
  labelClassName: string;
  x: number;
  y: number;
}

export interface HeroStatsData {
  fileCount: number;
  folderCount: number;
  generatedAt: string;
  sourceCount: number;
}
