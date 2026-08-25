import { useEffect, useState } from "react";
import { StepScreen, NextButton } from "./Shell";

const compliments = [
  "There are a few things about you that I genuinely love. ❤️",
  "First... your smile. 🫠\nEspecially that little overlap of your teeth - I don't know why, but it makes your smile even cuter. Please don't ever feel insecure about it. ❤️",
  "And your dance... 💃✨\nI really loved it.",
  "You have this confidence and energy when you dance that is honestly so beautiful to watch.",
  "You were the one who sent me that video, and I still remember it. 😭❤️\nI actually watch it once in a while because your energy in that video always makes me smile.",
  "And honestly... I really want to see you dance in real someday. 🫠💃❤️\nI feel like seeing that energy in person would be even more special.",
  "You have this really special energy about you... and I hope you never lose it. ✨",
];

export function StepCompliments({ onNext }: { onNext: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= compliments.length) return;

    const timer = window.setTimeout(() => {
      setVisibleCount((count) => count + 1);
    }, visibleCount === 0 ? 900 : 2800);

    return () => window.clearTimeout(timer);
  }, [visibleCount]);

  return (
    <StepScreen className="relative overflow-hidden bg-[#fff4f1] px-5 py-8 sm:px-7">
      <div className="pointer-events-none absolute -left-12 top-14 h-40 w-40 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-20 h-48 w-48 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="relative z-10 flex max-h-[calc(100vh-4rem)] w-full max-w-[390px] flex-col overflow-y-auto rounded-[2rem] border border-rose-200/70 bg-[#fffaf7]/90 px-5 py-7 text-left shadow-xl backdrop-blur-sm sm:max-h-[700px] sm:px-7">
        <p className="reference-script text-center text-4xl leading-tight text-[#8f4b58] sm:text-5xl">
          Things I Like About You
        </p>
        <div className="mt-6 space-y-4">
          {compliments.slice(0, visibleCount).map((compliment, index) => (
            <p
              key={compliment}
              className="animate-soft-fade whitespace-pre-line text-base leading-relaxed text-[#624950] sm:text-lg"
              style={{ animationDelay: `${index === visibleCount - 1 ? 0 : 0.05}s` }}
            >
              {compliment}
            </p>
          ))}
        </div>
        {visibleCount === compliments.length && (
          <div className="mt-7 self-center animate-rise-in">
            <NextButton onClick={onNext}>Continue →</NextButton>
          </div>
        )}
      </div>
    </StepScreen>
  );
}
