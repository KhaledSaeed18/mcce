const WORDMARK_LETTERS = [
  { char: "M", token: "chart-1" },
  { char: "C", token: "chart-2" },
  { char: "C", token: "chart-3" },
  { char: "E", token: "chart-4" },
] as const;

export function FooterWordmark() {
  return (
    <div
      aria-hidden="true"
      className="relative left-1/2 w-screen -translate-x-1/2 border-y-2 bg-secondary text-secondary-foreground"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {WORDMARK_LETTERS.map((letter) => (
            <span
              className="flex size-16 items-center justify-center rounded border-2 border-black font-head text-4xl text-black shadow-md transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg active:translate-x-0.5 active:translate-y-0.5 sm:size-20 sm:text-5xl"
              key={letter.char}
              style={{ backgroundColor: `var(--${letter.token})` }}
            >
              {letter.char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
