import { useState } from "react";
import heartTree from "@/assets/template-icons/heart-tree-2.webp";
import { StepScreen, NextButton } from "./Shell";

const plans = ["Chicken Biryani date 🍗", "Movie night 🎬", "Coffee & walk ☕", " You decide"];

export function StepPlans({ onNext }: { onNext: () => void }) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <StepScreen className="reference-plans relative overflow-hidden bg-[#f48bb8] px-5 py-8 sm:px-7">
      <div className="reference-pixel-sky pointer-events-none absolute inset-0" />
      <div className="reference-pixel-clouds pointer-events-none absolute inset-x-0 bottom-0 h-28" />
      <div className="relative z-10 flex w-full max-w-[390px] flex-col items-center">
        <div className="reference-pixel-icon mb-5 flex h-28 w-28 items-center justify-center rounded-[1.25rem] border-4 border-[#fff4f4] bg-[#ffeef5] shadow-[0_5px_0_#d83c76]">
          <img
            src={heartTree}
            alt="Tree covered in pink hearts"
            width={512}
            height={512}
            className="w-24"
          />
        </div>
        <h1 className="reference-pixel-title text-center text-3xl uppercase leading-tight text-[#fff8fc] sm:text-4xl">
          What would you like to do when we meet?
        </h1>
        <div className="mt-7 grid w-full grid-cols-2 gap-3">
          {plans.map((plan) => {
            const selected = selectedPlan === plan;
            return (
              <button
                key={plan}
                type="button"
                onClick={() => setSelectedPlan(plan)}
                aria-pressed={selected}
                className={`reference-pixel-button min-h-14 border-4 px-2 py-3 text-xs uppercase transition-transform active:translate-y-1 sm:text-sm ${
                  selected
                    ? "border-[#fff8fc] bg-[#ffd9e8] text-[#be245b] shadow-[0_4px_0_#fff8fc]"
                    : "border-[#d92769] bg-[#fff5f5] text-[#a72c58] shadow-[0_4px_0_#c52d64] hover:-translate-y-1"
                }`}
              >
                {plan}
              </button>
            );
          })}
        </div>
        <div className="mt-7">
          <NextButton onClick={() => selectedPlan && onNext()}>
            {selectedPlan ? "Lock it in 🔒" : "Choose one"}
          </NextButton>
        </div>
      </div>
    </StepScreen>
  );
}
