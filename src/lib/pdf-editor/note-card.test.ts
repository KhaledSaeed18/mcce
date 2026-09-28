import { describe, expect, it } from "vitest";
import {
  NOTE_CARD_GAP,
  NOTE_CARD_HEIGHT,
  NOTE_CARD_WIDTH,
  NOTE_SIZE,
} from "@/config/pdf-editor";
import { placeNoteCard } from "./note-card";

const PAGE = { height: 800, width: 600 };

describe("placeNoteCard", () => {
  it("opens beside the icon, level with it", () => {
    expect(placeNoteCard({ x: 10, y: 40 }, PAGE, 2)).toEqual({
      x: (10 + NOTE_SIZE) * 2 + NOTE_CARD_GAP,
      y: 80,
    });
  });

  it("opens on the left when the right has no room", () => {
    const place = placeNoteCard({ x: 560, y: 40 }, PAGE, 1);

    expect(place.x).toBe(560 - NOTE_CARD_GAP - NOTE_CARD_WIDTH);
  });

  it("lifts the card off the foot of the page", () => {
    const place = placeNoteCard({ x: 10, y: 790 }, PAGE, 1);

    expect(place.y).toBe(800 - NOTE_CARD_HEIGHT);
  });
});
