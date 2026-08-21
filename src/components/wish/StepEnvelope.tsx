import { useState } from "react";
import { StepScreen, FloatingHearts } from "./Shell";

export function StepEnvelope({ name, onNext }: { name: string; onNext: () => void }) {
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onNext, 1200);
  };

  return (
    <StepScreen className="relative">
      <FloatingHearts />
      <p className="font-display text-3xl text-rose">A little something for you,</p>
      <h1 className="font-display text-5xl font-bold text-primary">{name}</h1>

      <button
        onClick={open}
        aria-label="Open the envelope"
        className={`relative mt-4 h-44 w-64 transition-transform duration-700 ${
          opening ? "scale-110 -translate-y-4 opacity-0" : "animate-float-soft hover:scale-105"
        }`}
      >
        <div className="absolute inset-0 rounded-xl bg-blush shadow-xl" />
        <div
          className="absolute inset-x-0 top-0 h-24 origin-top rounded-t-xl bg-primary/80"
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
        />
        <span className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 text-4xl">
          💌
        </span>
      </button>

      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        {opening ? "Opening…" : "Tap to open"}
      </p>
    </StepScreen>
  );
}
