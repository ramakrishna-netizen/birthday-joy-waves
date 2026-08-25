import { useState } from "react";
import bearPanda from "@/assets/template-icons/bears-cake.webp";
import { StepScreen, FloatingHearts, NextButton } from "./Shell";

export function StepGreeting({ name, onNext }: { name: string; onNext: () => void }) {
  const [dodge, setDodge] = useState({ x: 0, y: 0 });

  const runAway = () => {
    setDodge({
      x: (Math.random() - 0.5) * 180,
      y: (Math.random() - 0.5) * 140,
    });
  };

  return (
    <StepScreen className="relative">
      <FloatingHearts />
      <h1 className="animate-pop-in font-display text-5xl font-bold leading-tight text-primary">
        Happy Birthday,
        <br />
        {name}!
      </h1>
      <img
        src={bearPanda}
        alt={`Teddy bear and panda holding a birthday cake for ${name}`}
        width={1024}
        height={1024}
        className="animate-float-soft w-56 drop-shadow-xl"
      />
       <p className="text-lg font-medium text-secondary-foreground">
        Yes,I remembered, {name}
      </p>
      <p className="text-lg font-medium text-secondary-foreground">
        Are you excited for what's next?
      </p>
      <div className="relative flex items-center gap-4">
        <NextButton onClick={onNext}>Yes!</NextButton>
        <button
          onMouseEnter={runAway}
          onClick={runAway}
          style={{ transform: `translate(${dodge.x}px, ${dodge.y}px)` }}
          className="rounded-full border border-border bg-card px-7 py-3 text-base font-semibold text-muted-foreground transition-transform duration-200"
        >
          No
        </button>
      </div>
    </StepScreen>
  );
}
