import { useState } from "react";
import bunny from "@/assets/template-icons/bunny-pic.png";
import { StepScreen, FloatingHearts } from "./Shell";

export function StepEnvelope({ name, onNext }: { name: string; onNext: () => void }) {
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onNext, 1200);
  };

  return (
    <StepScreen className="reference-opening relative overflow-hidden bg-[#f9dce0] px-4 py-8 sm:px-6">
      <FloatingHearts />
      <div className="reference-plaid absolute inset-0 opacity-80" />
      <div
        className={`reference-note relative z-10 flex min-h-[560px] w-full max-w-[370px] flex-col items-center px-7 pb-2 pt-12 transition-all duration-700 sm:min-h-[650px] sm:max-w-[390px] ${
          opening ? "scale-[0.98] -translate-y-3 opacity-0" : "animate-rise-in"
        }`}
      >
        <p className="reference-script relative z-10 max-w-[290px] text-center text-5xl leading-[0.95] text-[#8f4b58] sm:text-6xl">
          I made
          <br />
          something for
          <br />
          you
        </p>
        <div className="relative mt-auto flex w-full flex-col items-center">
          <img
            src={bunny}
            alt={`A cute bunny has a birthday surprise for ${name}`}
            width={512}
            height={512}
            className="reference-bunny w-48 sm:w-56"
          />
          <button
            onClick={open}
            aria-label="See the surprise"
            className="reference-what relative -mt-8 rounded-2xl border-2 border-[#6f514e] bg-[#fff6f1]/90 px-7 py-2 text-2xl font-medium text-[#483b3b] underline decoration-[#e1b14c] decoration-4 underline-offset-4 shadow-sm transition-transform hover:scale-105 active:scale-95"
          >
            {opening ? "Opening…" : "what?"}
          </button>
        </div>
      </div>
    </StepScreen>
  );
}
