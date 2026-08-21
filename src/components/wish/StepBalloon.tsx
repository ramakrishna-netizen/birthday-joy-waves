import { useState } from "react";
import { celebrate } from "@/lib/celebrate";
import { StepScreen, NextButton } from "./Shell";

const WORDS = ["You", "are", "so", "special"];

export function StepBalloon({ onNext }: { onNext: () => void }) {
  const [popped, setPopped] = useState(false);

  const pop = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (popped) return;
    setPopped(true);
    const rect = e.currentTarget.getBoundingClientRect();
    celebrate({
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    });
  };

  return (
    <StepScreen className="relative">
      {!popped ? (
        <>
          <p className="text-lg font-medium text-secondary-foreground">Pop the balloon 🎈</p>
          <button
            onClick={pop}
            aria-label="Pop the balloon"
            className="animate-float-soft relative mt-6 transition-transform hover:scale-105 active:scale-95"
          >
            <div className="h-44 w-36 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-primary shadow-xl shadow-primary/30" />
            <div className="mx-auto h-0 w-0 border-x-8 border-t-[14px] border-x-transparent border-t-primary" />
            <div className="mx-auto h-20 w-px bg-foreground/40" />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-3">
            {WORDS.map((w, i) => (
              <span
                key={w}
                className="animate-pop-in font-display text-5xl font-bold text-primary"
                style={{ animationDelay: `${i * 0.18}s` }}
              >
                {w}
              </span>
            ))}
          </div>
          <div style={{ animationDelay: "0.9s" }} className="animate-rise-in">
            <NextButton onClick={onNext}>Next</NextButton>
          </div>
        </div>
      )}
    </StepScreen>
  );
}
