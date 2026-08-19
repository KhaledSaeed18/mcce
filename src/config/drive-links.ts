import { DRIVE_SOURCES } from "@/config/sources";
import { buildDriveFolderUrl } from "@/lib/drive/urls";

export interface DriveDirectLink {
  color: string;
  /** Name of the folder as it reads inside Drive. */
  driveLabel: string;
  href: string;
  id: string;
  label: string;
}

export const DRIVE_DIRECT_LINKS: DriveDirectLink[] = DRIVE_SOURCES.map(
  (source) => ({
    color: source.color,
    driveLabel: source.driveLabel,
    href: buildDriveFolderUrl(source.rootFolderId),
    id: source.id,
    label: source.label,
  })
);

export const DRIVE_DIRECT_TITLE = "Open the Drive folders directly";

export const DRIVE_DIRECT_SUBTITLE =
  "Skip the index and land in the shared Google Drive folder, with every semester and course inside it.";

export const DRIVE_DIRECT_NOTE = "The same folders this site reads from.";

export const DRIVE_DIRECT_ACTION = "Open in Drive";

export function findDriveDirectLinkForYear(
  yearNumber: number
): DriveDirectLink | undefined {
  return DRIVE_DIRECT_LINKS.find((link) => link.id === `year${yearNumber}`);
}
