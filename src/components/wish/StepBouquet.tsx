import bouquet from "@/assets/template-icons/rose-bouquet.webp";
import { StepScreen, NextButton } from "./Shell";

export function StepBouquet({ name, onNext }: { name: string; onNext: () => void }) {
  const notes = [
    "You make my world beautiful",
    "Always in my heart",
    `Happy Birthday, ${name}`,
    "Sweetest soul ever",
  ];

  return (
    <StepScreen className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pink-100/40 via-transparent to-rose-100/60" />
      <p className="relative z-10 font-display text-4xl text-rose">Flowers, just for you</p>
      <div className="relative z-10">
        <img
          src={bouquet}
          alt="Bouquet of pink and red roses"
          width={1024}
          height={1024}
          loading="lazy"
          className="animate-sway w-64 drop-shadow-xl"
        />
        {notes.map((note, i) => (
          <span
            key={note}
            className="animate-pop-in absolute whitespace-nowrap rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold text-rose shadow-md backdrop-blur-sm"
            style={{
              animationDelay: `${0.4 + i * 0.4}s`,
              top: `${[6, 30, 58, 80][i]}%`,
              left: i % 2 === 0 ? "-14%" : "auto",
              right: i % 2 === 0 ? "auto" : "-14%",
              transform: `rotate(${i % 2 === 0 ? -8 : 8}deg)`,
            }}
          >
            {note}
          </span>
        ))}
      </div>
      <div className="relative z-10 animate-rise-in">
        <NextButton onClick={onNext}>Next</NextButton>
      </div>
    </StepScreen>
  );
}
