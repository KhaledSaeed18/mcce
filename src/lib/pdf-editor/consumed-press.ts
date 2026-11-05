const consumedPresses = new WeakSet<Event>();

/** Marks a press as spent on finishing the text being typed, so the page it
 * landed on does not also open a new box. */
export function consumePress(event: Event): void {
  consumedPresses.add(event);
}

export function isPressConsumed(event: Event): boolean {
  return consumedPresses.has(event);
}
