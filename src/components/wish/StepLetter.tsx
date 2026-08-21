import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { StepScreen, NextButton } from "./Shell";

export function StepLetter({
  letter,
  sender,
  onNext,
}: {
  letter: string;
  sender?: string | undefined;
  onNext: () => void;
}) {
  const [shown, setShown] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    setShown(0);
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= letter.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 28);
    return () => clearInterval(id);
  }, [letter, run]);

  const done = shown >= letter.length;

  return (
    <StepScreen>
      <p className="font-display text-4xl text-rose">A Message From My Heart</p>
      <div className="min-h-[260px] w-full rounded-3xl bg-card p-6 text-left shadow-lg">
        <p className="font-display text-2xl leading-relaxed text-foreground">
          {letter.slice(0, shown)}
          {!done && <span className="opacity-40">|</span>}
        </p>
        {done && sender && (
          <p className="mt-4 text-right font-display text-2xl text-primary">— {sender}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setRun((r) => r + 1)}
          aria-label="Replay the message"
          className="rounded-full border border-border bg-card p-3 text-primary shadow-sm transition-transform hover:scale-110"
        >
          <Heart className="h-5 w-5 fill-primary" />
        </button>
        {done && <NextButton onClick={onNext}>Next</NextButton>}
      </div>
    </StepScreen>
  );
}
