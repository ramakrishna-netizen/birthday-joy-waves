import { useEffect } from "react";
import hbd from "@/assets/template-icons/final.gif";
import { rain } from "@/lib/celebrate";
import { StepScreen, FloatingHearts } from "./Shell";

export function StepFinale({ name, sender }: { name: string; sender?: string | undefined }) {
  useEffect(() => {
    rain(5000);
  }, []);

  return (
    <StepScreen className="relative overflow-hidden">
      <FloatingHearts />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pink-50 via-transparent to-rose-100/60" />
      <img
        src={hbd}
        alt="Bunny and bear hugging under the letters HBD"
        width={1024}
        height={1024}
        loading="lazy"
        className="animate-pop-in relative z-10 w-64 drop-shadow-xl"
      />
      <p className="relative z-10 font-display text-3xl text-rose">Lots of love for you</p>
      <h2 className="relative z-10 font-display text-4xl font-bold text-primary">
        Once again, Happy Birthday {name}!
      </h2>
      {sender && (
        <p className="relative z-10 text-base font-medium text-muted-foreground">— from {sender}</p>
      )}
    </StepScreen>
  );
}
