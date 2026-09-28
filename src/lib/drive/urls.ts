const DRIVE_FOLDER_BASE = "https://drive.google.com/drive/folders";

export function buildDriveFolderUrl(folderId: string): string {
  return `${DRIVE_FOLDER_BASE}/${folderId}`;
}

const DRIVE_FILE_BASE = "https://drive.google.com/file/d";

export function buildDriveFileUrl(fileId: string): string {
  return `${DRIVE_FILE_BASE}/${fileId}/view`;
}
