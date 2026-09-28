/** The canvas as an image file, as a promise. */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("The canvas gave no image")),
      type
    );
  });
}
