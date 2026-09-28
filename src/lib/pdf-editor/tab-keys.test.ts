import { describe, expect, it } from "vitest";
import { EMPTY_DESK, showFile } from "./desk";
import { closeFile } from "./desk-close";
import { resolveTabKey } from "./tab-key-result";
import { readTabKey } from "./tab-keys";
import type { OpenFile } from "./types";

const NO_MODIFIERS = {
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
};

function press(code: string, modifiers: Partial<typeof NO_MODIFIERS> = {}) {
  return readTabKey({ ...NO_MODIFIERS, altKey: true, code, ...modifiers });
}

function file(id: string): OpenFile {
  return { id, name: `${id}.pdf`, source: "drive" };
}

const desk = ["a", "b", "c"].reduce(
  (current, id) => showFile(current, file(id)),
  EMPTY_DESK
);

describe("readTabKey", () => {
  it("reads Alt with a digit as a tab, and 9 as the last one", () => {
    expect(press("Digit2")).toEqual({ index: 1, type: "go" });
    expect(press("Digit9")).toEqual({ index: "last", type: "go" });
  });

  it("reads the brackets, backquote, W, and Shift with T", () => {
    expect(press("BracketLeft")).toEqual({ step: -1, type: "step" });
    expect(press("BracketRight")).toEqual({ step: 1, type: "step" });
    expect(press("Backquote")).toEqual({ type: "back" });
    expect(press("KeyW")).toEqual({ type: "close" });
    expect(press("KeyT", { shiftKey: true })).toEqual({ type: "reopen" });
  });

  it("reads Shift with a bracket as moving the tab", () => {
    expect(press("BracketLeft", { shiftKey: true })).toEqual({
      step: -1,
      type: "move",
    });
    expect(press("BracketRight", { shiftKey: true })).toEqual({
      step: 1,
      type: "move",
    });
    expect(press("Backquote", { shiftKey: true })).toBeNull();
  });

  it("leaves keys without Alt, or with Cmd or Ctrl, to others", () => {
    expect(press("Digit1", { altKey: false })).toBeNull();
    expect(press("Digit1", { metaKey: true })).toBeNull();
    expect(press("KeyW", { ctrlKey: true })).toBeNull();
    expect(press("KeyW", { shiftKey: true })).toBeNull();
  });
});

describe("resolveTabKey", () => {
  it("goes to a tab by number, or nowhere past the last", () => {
    expect(resolveTabKey(desk, "c", { index: 0, type: "go" })).toEqual({
      file: file("a"),
      type: "show",
    });
    expect(resolveTabKey(desk, "c", { index: 5, type: "go" })).toBeNull();
  });

  it("goes back to the file shown before the one on screen", () => {
    expect(resolveTabKey(desk, "c", { type: "back" })).toEqual({
      file: file("b"),
      type: "show",
    });
  });

  it("closes the tab on screen, and reopens the one closed last", () => {
    expect(resolveTabKey(desk, "c", { type: "close" })).toEqual({
      id: "c",
      type: "close",
    });
    expect(resolveTabKey(desk, undefined, { type: "close" })).toBeNull();
    expect(
      resolveTabKey(closeFile(desk, "b"), "c", { type: "reopen" })
    ).toEqual({ file: file("b"), type: "show" });
  });

  it("moves the tab on screen one place, stopping at either end", () => {
    expect(resolveTabKey(desk, "b", { step: -1, type: "move" })).toEqual({
      from: 1,
      to: 0,
      type: "move",
    });
    expect(resolveTabKey(desk, "b", { step: 1, type: "move" })).toEqual({
      from: 1,
      to: 2,
      type: "move",
    });
    expect(resolveTabKey(desk, "a", { step: -1, type: "move" })).toBeNull();
    expect(resolveTabKey(desk, "c", { step: 1, type: "move" })).toBeNull();
    expect(
      resolveTabKey(desk, undefined, { step: 1, type: "move" })
    ).toBeNull();
  });
});
