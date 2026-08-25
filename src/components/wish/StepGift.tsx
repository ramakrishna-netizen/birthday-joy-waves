import { useState } from "react";
import gift from "@/assets/template-icons/gift.webp";
import scarfImage from "@/assets/template-icons/scarf-image.webp";
import { celebrate } from "@/lib/celebrate";
import { StepScreen, NextButton } from "./Shell";

export function StepGift({ onNext }: { onNext: () => void }) {
  const [taps, setTaps] = useState(0);
  const [wiggleKey, setWiggleKey] = useState(0);
  const opened = taps >= 3;

  const tap = async () => {
    if (opened) return;
    const next = taps + 1;
    setTaps(next);
    setWiggleKey((key) => key + 1);
    if (next >= 3) {
      await celebrate();
    }
  };

  return (
    <StepScreen className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100/30 via-transparent to-rose-100/40" />
      <p className="relative z-10 font-display text-4xl text-rose">Surprise</p>
      {!opened ? (
        <>
          <button
            key={wiggleKey}
            onClick={tap}
            aria-label="Open the gift"
            className="relative z-10 animate-tap-wiggle"
          >
            <span className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-2xl" />
            <img
              src={gift}
              alt="Wrapped birthday gift box"
              width={1024}
              height={1024}
              loading="lazy"
              className="w-56 drop-shadow-xl transition-transform duration-200 hover:scale-105"
            />
          </button>
          <p className="relative z-10 text-sm font-medium text-muted-foreground">
            Tap the gift to unwrap it — {3 - taps} more
          </p>
        </>
      ) : (
        <div className="relative z-10 flex flex-col items-center gap-5">
          <span className="animate-pop-in text-7xl">
            <img
              src={scarfImage}
              alt="A scarf gift reveal"
              width={512}
              height={512}
              className="w-56 drop-shadow-xl"
            />
          </span>
          <p className="animate-rise-in font-display text-4xl text-primary">
            I'll Gift You when we meet...👀🤍
          </p>
          <div className="animate-rise-in" style={{ animationDelay: "0.2s" }}>
            <NextButton onClick={onNext}>Next</NextButton>
          </div>
        </div>
      )}
    </StepScreen>
  );
}
