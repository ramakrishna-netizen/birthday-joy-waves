import { useState } from "react";
import gift from "@/assets/gift.png";
import { celebrate } from "@/lib/celebrate";
import { StepScreen, NextButton } from "./Shell";

export function StepGift({ onNext }: { onNext: () => void }) {
  const [taps, setTaps] = useState(0);
  const opened = taps >= 3;

  const tap = () => {
    if (opened) return;
    const next = taps + 1;
    setTaps(next);
    if (next >= 3) celebrate();
  };

  return (
    <StepScreen>
      <p className="font-display text-4xl text-rose">One last thing…</p>
      {!opened ? (
        <>
          <button onClick={tap} aria-label="Open the gift" className="animate-wobble">
            <img
              src={gift}
              alt="Wrapped birthday gift box"
              width={1024}
              height={1024}
              loading="lazy"
              className="w-56 drop-shadow-xl"
            />
          </button>
          <p className="text-sm font-medium text-muted-foreground">
            Tap the gift to unwrap it — {3 - taps} more
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <span className="animate-pop-in text-7xl">🎁</span>
          <p className="animate-rise-in font-display text-4xl text-primary">
            It's a whole year of happiness
          </p>
          <NextButton onClick={onNext}>Next</NextButton>
        </div>
      )}
    </StepScreen>
  );
}
