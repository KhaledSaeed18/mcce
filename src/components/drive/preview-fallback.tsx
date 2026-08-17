interface PreviewFallbackProps {
  /** A slow embed may still arrive; an unsupported one never will. */
  slow: boolean;
}

export function PreviewFallback({ slow }: PreviewFallbackProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-card p-6 text-center text-muted-foreground text-sm">
      <p>
        {slow
          ? "Preview is taking a while to load."
          : "This file type can't be previewed here."}
      </p>
      <p>Open it in Google Drive instead.</p>
    </div>
  );
}
