const DRIVE_FOLDER_BASE = "https://drive.google.com/drive/folders";

export function buildDriveFolderUrl(folderId: string): string {
  return `${DRIVE_FOLDER_BASE}/${folderId}`;
}
