import { queryOptions } from "@tanstack/react-query";
import { getEditorFile } from "./editor-file";
import { getEditorTree } from "./editor-tree";

export const editorTreeQueryOptions = queryOptions({
  queryFn: () => getEditorTree(),
  queryKey: ["editor-tree"],
  staleTime: Number.POSITIVE_INFINITY,
});

export const editorFileQueryOptions = (fileId: string | undefined) =>
  queryOptions({
    queryFn: () =>
      fileId ? getEditorFile({ data: { fileId } }) : Promise.resolve(null),
    queryKey: ["editor-file", fileId ?? null],
    staleTime: Number.POSITIVE_INFINITY,
  });
