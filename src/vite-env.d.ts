/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface FileSystemAcceptsType {
  accept: Record<string, string[]>;
  description?: string;
}

interface ShowSaveFilePickerOptions {
  suggestedName?: string;
  types?: FileSystemAcceptsType[];
}

interface FileSystemFileHandle {
  createWritable: () => Promise<FileSystemWritableFileStream>;
}

interface FileSystemWritableFileStream extends WritableStream {
  close: () => Promise<void>;
  write: (data: BufferSource | Blob | string) => Promise<void>;
}

interface Window {
  showSaveFilePicker?: (
    options?: ShowSaveFilePickerOptions
  ) => Promise<FileSystemFileHandle>;
}
