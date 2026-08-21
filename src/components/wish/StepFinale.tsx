import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import hbd from "@/assets/hbd-sticker.png";
import { rain } from "@/lib/celebrate";
import { StepScreen, FloatingHearts } from "./Shell";

export function StepFinale({ name, sender }: { name: string; sender?: string | undefined }) {
  useEffect(() => {
    rain(4000);
  }, []);

  return (
    <StepScreen className="relative">
      <FloatingHearts />
      <img
        src={hbd}
        alt="Bunny and bear hugging under the letters HBD"
        width={1024}
        height={1024}
        loading="lazy"
        className="animate-pop-in w-64 drop-shadow-xl"
      />
      <p className="font-display text-3xl text-rose">Lots of love for you</p>
      <h2 className="font-display text-4xl font-bold text-primary">
        Once again, Happy Birthday {name}!
      </h2>
      {sender && <p className="text-base font-medium text-muted-foreground">— from {sender}</p>}
      <Link
        to="/"
        className="mt-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30"
      >
        Create one for someone you love
      </Link>
    </StepScreen>
  );
}
