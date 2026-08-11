export interface SoundAsset {
  /** Original author/creator */
  author: string;
  /** Base64-encoded data URI (data:audio/mpeg;base64,...) */
  dataUri: string;
  /** Duration in seconds */
  duration: number;
  /** Audio format */
  format: "mp3" | "wav" | "ogg";
  /** License identifier */
  license: "CC0" | "OGA-BY" | "MIT";
  /** Unique identifier for the sound */
  name: string;
}

export interface UseSoundOptions {
  /** If true, calling play() stops current playback first. Default: false */
  interrupt?: boolean;
  /** Called when playback ends naturally */
  onEnd?: () => void;
  /** Called when pause() is called */
  onPause?: () => void;
  /** Called when playback starts */
  onPlay?: () => void;
  /** Called when stop() is called */
  onStop?: () => void;
  /** Playback speed multiplier. Default: 1 */
  playbackRate?: number;
  /** If false, play() does nothing. Useful for user preferences. Default: true */
  soundEnabled?: boolean;
  /** Volume level from 0 to 1. Default: 1 */
  volume?: number;
}

export type PlayFunction = (overrides?: {
  volume?: number;
  playbackRate?: number;
}) => void;

export interface SoundControls {
  duration: number | null;
  isPlaying: boolean;
  pause: () => void;
  sound: SoundAsset;
  stop: () => void;
}

export type UseSoundReturn = readonly [PlayFunction, SoundControls];
