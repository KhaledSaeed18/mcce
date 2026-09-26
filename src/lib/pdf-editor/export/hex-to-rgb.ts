import { type RGB, rgb } from "pdf-lib";

const HEX_PATTERN = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
const CHANNEL_MAX = 255;

export function hexToRgb(hex: string): RGB {
  const match = hex.match(HEX_PATTERN);
  if (!match) {
    return rgb(0, 0, 0);
  }
  const [red, green, blue] = match
    .slice(1)
    .map((channel) => Number.parseInt(channel, 16) / CHANNEL_MAX);
  return rgb(red, green, blue);
}
