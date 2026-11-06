export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as
  | string
  | undefined;

export const ANALYTICS_EVENTS = {
  filePreview: "file_preview",
  openInDrive: "open_in_drive",
} as const;
