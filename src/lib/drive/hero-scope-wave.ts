import {
  HERO_SCOPE_AMPLITUDE,
  HERO_SCOPE_FILES_PER_CYCLE,
  HERO_SCOPE_HEIGHT,
  HERO_SCOPE_MIN_CYCLES,
  HERO_SCOPE_SAMPLES,
  HERO_SCOPE_WIDTH,
} from "@/config/hero-radio";

const TAU = Math.PI * 2;
const ENVELOPE_DEPTH = 0.3;
const ENVELOPE_DRIFT = 0.15;

interface WaveInput {
  cycles: number;
  /** Returns a value in [-1, 1] per sample; the static between stations. */
  noise: () => number;
  phase: number;
  strength: number;
}

export function waveCycles(fileCount: number): number {
  return HERO_SCOPE_MIN_CYCLES + fileCount / HERO_SCOPE_FILES_PER_CYCLE;
}

export const silentNoise = () => 0;
export const whiteNoise = () => Math.random() * 2 - 1;

/** A carrier with a slow amplitude envelope, drowned in static as the signal fades. */
export function buildWavePath({
  cycles,
  noise,
  phase,
  strength,
}: WaveInput): string {
  const middle = HERO_SCOPE_HEIGHT / 2;
  const points: string[] = [];

  for (let sample = 0; sample <= HERO_SCOPE_SAMPLES; sample += 1) {
    const t = sample / HERO_SCOPE_SAMPLES;
    const envelope =
      1 -
      ENVELOPE_DEPTH +
      ENVELOPE_DEPTH * Math.sin(TAU * t + phase * ENVELOPE_DRIFT);
    const carrier = Math.sin(TAU * cycles * t + phase) * envelope * strength;
    const hiss = noise() * (1 - strength);
    const y = middle - (carrier + hiss) * HERO_SCOPE_AMPLITUDE;
    points.push(`${(t * HERO_SCOPE_WIDTH).toFixed(1)} ${y.toFixed(1)}`);
  }

  return `M${points.join("L")}`;
}
