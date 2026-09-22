import {
  HERO_RADIO_CAPTURE_RANGE,
  HERO_RADIO_DIAL_INSET_PERCENT,
} from "@/config/hero-radio";

/** The dial position is measured in stations: 2.5 is halfway between the
 * third and fourth station. */
export function clampPosition(position: number, count: number): number {
  return Math.min(Math.max(position, 0), Math.max(count - 1, 0));
}

export function nearestStation(position: number, count: number): number {
  return Math.round(clampPosition(position, count));
}

/** 1 on a station, falling to 0 at the edge of its capture range. */
export function signalStrength(position: number): number {
  const offset = Math.abs(position - Math.round(position));
  return Math.max(0, 1 - offset / HERO_RADIO_CAPTURE_RANGE) ** 2;
}

/** The frequency the needle points at, read between the two stations around it. */
export function frequencyAt(position: number, frequencies: number[]): number {
  const clamped = clampPosition(position, frequencies.length);
  const low = Math.floor(clamped);
  const high = Math.min(low + 1, frequencies.length - 1);
  const fraction = clamped - low;
  return frequencies[low] + (frequencies[high] - frequencies[low]) * fraction;
}

const DIAL_SPAN_PERCENT = 100 - HERO_RADIO_DIAL_INSET_PERCENT * 2;

export function dialPercent(position: number, count: number): number {
  const steps = Math.max(count - 1, 1);
  return HERO_RADIO_DIAL_INSET_PERCENT + (position / steps) * DIAL_SPAN_PERCENT;
}

export function positionFromDialPercent(
  percent: number,
  count: number
): number {
  const steps = Math.max(count - 1, 1);
  const position =
    ((percent - HERO_RADIO_DIAL_INSET_PERCENT) / DIAL_SPAN_PERCENT) * steps;
  return clampPosition(position, count);
}
