import type { OutlineEntry, OutlineNode } from "./types";

/** Works out which page of the file an outline entry points at. */
export type ResolveDestination = (dest: unknown) => Promise<number | null>;

/** The outline tree laid out as the list it is read as, top to bottom, each
 * entry carrying how deep it sits and the page it goes to. */
export async function flattenOutline(
  nodes: readonly OutlineNode[],
  resolve: ResolveDestination,
  parentId = ""
): Promise<OutlineEntry[]> {
  const depth = parentId ? parentId.split(".").length : 0;
  const branches = await Promise.all(
    nodes.map(async (node, index) => {
      const id = parentId ? `${parentId}.${index}` : String(index);
      const [sourceIndex, children] = await Promise.all([
        resolve(node.dest),
        flattenOutline(node.items, resolve, id),
      ]);
      const entry: OutlineEntry = {
        depth,
        id,
        sourceIndex,
        title: node.title.trim(),
      };
      return [entry, ...children];
    })
  );
  return branches.flat();
}
