import {
  FileArchiveIcon,
  FileCodeIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FolderIcon,
  ImageIcon,
  MusicIcon,
  PresentationIcon,
  VideoIcon,
} from "lucide-react";
import type { ComponentProps } from "react";
import type { DriveNodeKind } from "@/lib/drive/types";

const ICON_BY_KIND: Record<DriveNodeKind, typeof FileIcon> = {
  archive: FileArchiveIcon,
  audio: MusicIcon,
  doc: FileTextIcon,
  folder: FolderIcon,
  image: ImageIcon,
  other: FileIcon,
  pdf: FileTextIcon,
  sheet: FileSpreadsheetIcon,
  slides: PresentationIcon,
  text: FileCodeIcon,
  video: VideoIcon,
};

export function KindIcon({
  kind,
  ...props
}: { kind: DriveNodeKind } & ComponentProps<typeof FileIcon>) {
  const Icon = ICON_BY_KIND[kind];
  return <Icon {...props} />;
}
