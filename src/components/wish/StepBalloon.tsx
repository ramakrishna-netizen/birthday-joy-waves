import { useState } from "react";
import { celebrate } from "@/lib/celebrate";
import { StepScreen, NextButton } from "./Shell";

const WORDS = ["You", "are", "so", "special"];

export function StepBalloon({ onNext }: { onNext: () => void }) {
  const [popped, setPopped] = useState(false);

  const pop = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (popped) return;
    setPopped(true);
    const rect = e.currentTarget.getBoundingClientRect();
    await celebrate({
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    });
  };

  return (
    <StepScreen className="relative overflow-hidden">
      {!popped ? (
        <>
          <div className="absolute inset-x-0 top-8 h-24 bg-gradient-to-b from-pink-100/40 to-transparent" />
          <p className="z-10 text-lg font-medium text-secondary-foreground">Pop the balloon 🎈</p>
          <button
            onClick={pop}
            aria-label="Pop the balloon"
            className="animate-float-soft relative z-10 mt-6 transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 rounded-full bg-pink-200/20 blur-2xl" />
            <div className="relative h-44 w-36 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-b from-pink-400 via-primary to-pink-500 shadow-xl shadow-primary/30" />
            <div className="relative mx-auto -mt-1 h-0 w-0 border-x-8 border-t-[14px] border-x-transparent border-t-pink-400" />
            <div className="mx-auto h-20 w-px bg-foreground/40" />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="pointer-events-none absolute inset-0">
            {[...Array(18)].map((_, i) => (
              <span
                key={i}
                className="absolute inline-block h-3 w-3 rounded-full bg-primary/80 animate-drift"
                style={{
                  left: `${10 + i * 5}%`,
                  top: "52%",
                  animationDelay: `${i * 0.08}s`,
                  background: ["#f43f6e", "#f9a8c4", "#fbbf24", "#fdf2f8"][i % 4],
                  opacity: 0.8,
                  transform: `translate3d(${(i % 2 === 0 ? 1 : -1) * (i * 7)}px, 0, 0)`,
                }}
              />
            ))}
          </div>
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
