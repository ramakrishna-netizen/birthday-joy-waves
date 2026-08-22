import { useEffect, useState } from "react";
import candleCake from "@/assets/candle-cake.png";
import { celebrate } from "@/lib/celebrate";
import { StepScreen, NextButton } from "./Shell";

export function StepCandle({ onNext, onDark }: { onNext: () => void; onDark: (v: boolean) => void }) {
  const [blown, setBlown] = useState(false);

  useEffect(() => {
    onDark(true);
    return () => onDark(false);
  }, [onDark]);

  const blow = async () => {
    if (blown) return;
    setBlown(true);
    onDark(false);
    await celebrate();
  };

  return (
    <StepScreen className={`${blown ? "" : "text-cream"} relative overflow-hidden`}>
      {!blown && <div className="absolute inset-0 bg-[#171327] opacity-80" />}
      {blown && <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-pink-50 to-cream opacity-90" />}

      <p
        className={`relative z-10 text-lg font-medium ${blown ? "text-secondary-foreground" : "text-cream/80"}`}
      >
        {blown ? "Your wish is on its way ✨" : "Close your eyes & make a wish"}
      </p>

      <button onClick={blow} aria-label="Blow out the candle" className="relative z-10">
        {!blown && (
          <span className="animate-flicker absolute left-1/2 top-[12%] h-8 w-8 -translate-x-1/2 rounded-full bg-gold blur-md" />
        )}
        <img
          src={candleCake}
          alt="Birthday cake with a candle"
          width={1024}
          height={1024}
          loading="lazy"
          className={`w-60 transition-all duration-700 ${blown ? "scale-105 brightness-110" : "brightness-75"}`}
        />
      </button>

      {blown ? (
        <div className="relative z-10 animate-rise-in">
          <NextButton onClick={onNext}>Next</NextButton>
        </div>
      ) : (
        <p className="relative z-10 text-sm text-cream/60">Tap the candle to blow it out</p>
      )}
    </StepScreen>
  );
}
