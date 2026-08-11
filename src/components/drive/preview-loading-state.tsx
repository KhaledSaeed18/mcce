import { LoadingMark } from "@/components/loading-mark";

export function PreviewLoadingState() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card">
      <LoadingMark className="size-16" />
      <p className="font-head text-sm">Loading preview</p>
    </div>
  );
}
