import type { IconDescriptor } from "./types";

export const RESOURCE_ICON_DIR = "/resources/icons";

const MONOGRAM_LENGTH = 2;

/**
 * Brand file first, the category icon otherwise; tools never need a monogram.
 * The card tile is white in both themes, so only the light file is kept.
 */
export function resolveToolIcon(
  id: string,
  hasBrandFile: boolean
): IconDescriptor {
  if (!hasBrandFile) {
    return { kind: "category" };
  }
  return { kind: "brand", light: `${RESOURCE_ICON_DIR}/${id}.svg` };
}

/** A repository borrows its tool's brand icon when it has one, else shows the owner's initials. */
export function resolveRepoIcon(
  owner: string,
  toolIcon: IconDescriptor | undefined
): IconDescriptor {
  if (toolIcon?.kind === "brand") {
    return toolIcon;
  }
  return { kind: "monogram", text: toMonogram(owner) };
}

export function toMonogram(name: string): string {
  return name
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, MONOGRAM_LENGTH)
    .toUpperCase();
}
