export interface ReadmeDoc {
  /** Undefined until a doc exists in the folder; such docs are reported, not written. */
  docId: string | undefined;
  folderId: string;
  html: string;
  name: string;
}
