import { useEffect, useState } from "react";
import { readClipPicture } from "@/lib/pdf-editor/clips/clip-picture-store";

/** A clip's picture as an address an image can show, read from this
 * browser, and read again when the picture is redrawn. */
export function useClipPicture(id: string, version: number): string | null {
  const [picture, setPicture] = useState<{ key: string; url: string } | null>(
    null
  );
  const key = `${id}:${version}`;

  useEffect(() => {
    let url: string | null = null;
    let isCancelled = false;
    readClipPicture(id)
      .then((blob) => {
        if (blob && !isCancelled) {
          url = URL.createObjectURL(blob);
          setPicture({ key, url });
        }
      })
      .catch(() => undefined);
    return () => {
      isCancelled = true;
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [id, key]);

  return picture?.key === key ? picture.url : null;
}
