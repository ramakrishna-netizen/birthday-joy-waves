import bouquet from "@/assets/bouquet.png";
import { StepScreen, NextButton } from "./Shell";

export function StepBouquet({ name, onNext }: { name: string; onNext: () => void }) {
  const notes = [
    "You make my world beautiful",
    "Always in my heart",
    `Happy Birthday, ${name}`,
    "Sweetest soul ever",
  ];

  return (
    <StepScreen className="relative">
      <p className="font-display text-4xl text-rose">Flowers, just for you</p>
      <div className="relative">
        <img
          src={bouquet}
          alt="Bouquet of pink and red roses"
          width={1024}
          height={1024}
          loading="lazy"
          className="animate-float-soft w-64 drop-shadow-xl"
        />
        {notes.map((note, i) => (
          <span
            key={note}
            className="animate-pop-in absolute whitespace-nowrap rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-rose shadow-md"
            style={{
              animationDelay: `${0.4 + i * 0.4}s`,
              top: `${[6, 30, 58, 80][i]}%`,
              left: i % 2 === 0 ? "-14%" : "auto",
              right: i % 2 === 0 ? "auto" : "-14%",
            }}
          >
            {note}
          </span>
        ))}
      </div>
      <NextButton onClick={onNext}>Next</NextButton>
    </StepScreen>
  );
}
