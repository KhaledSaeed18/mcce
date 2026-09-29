import { CLIP_OPEN_SOURCE_LABEL } from "@/config/pdf-editor";
import { useClipPicture } from "@/hooks/use-clip-picture";

interface ClipCardPictureProps {
  alt: string;
  /** The size it shows at, in CSS pixels. */
  height: number;
  id: string;
  onOpen: () => void;
  version: number;
  width: number;
}

/** The clipped part of the page. A click opens the page it came from. */
export function ClipCardPicture({
  alt,
  height,
  id,
  onOpen,
  version,
  width,
}: ClipCardPictureProps) {
  const url = useClipPicture(id, version);

  return (
    <button
      aria-label={CLIP_OPEN_SOURCE_LABEL}
      className="block min-h-0 flex-1 cursor-pointer bg-white"
      onClick={onOpen}
      title={CLIP_OPEN_SOURCE_LABEL}
      type="button"
    >
      {url ? (
        <img
          alt={alt}
          className="block size-full select-none"
          draggable={false}
          height={Math.round(height)}
          src={url}
          width={Math.round(width)}
        />
      ) : null}
    </button>
  );
}
