interface EditorPlaceholderLineProps {
  width: string;
}

export function EditorPlaceholderLine({ width }: EditorPlaceholderLineProps) {
  return <span className="h-1.5 rounded-full bg-black/10" style={{ width }} />;
}
