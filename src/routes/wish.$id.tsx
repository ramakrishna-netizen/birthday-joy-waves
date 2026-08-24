import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame, StepScreen } from "@/components/wish/Shell";
import { StepEnvelope } from "@/components/wish/StepEnvelope";
import { StepGreeting } from "@/components/wish/StepGreeting";
import { StepCandle } from "@/components/wish/StepCandle";
import { StepLetter } from "@/components/wish/StepLetter";
import { StepCompliments } from "@/components/wish/StepCompliments";
import { StepPlans } from "@/components/wish/StepPlans";
import { StepGift } from "@/components/wish/StepGift";
import { StepFinale } from "@/components/wish/StepFinale";
import { getWish, type Wish } from "@/lib/wishes";

export const Route = createFileRoute("/wish/$id")({
  head: () => ({
    meta: [
      { title: "A birthday surprise for you 🎂" },
      {
        name: "description",
        content: "Someone made you a little birthday surprise — tap to open it.",
      },
      { property: "og:title", content: "A birthday surprise for you 🎂" },
      {
        property: "og:description",
        content: "Someone made you a little birthday surprise — tap to open it.",
      },
    ],
  }),
  component: WishPage,
});

function WishPage() {
  const { id } = Route.useParams();
  const [wish, setWish] = useState<Wish | null>(null);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(0);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let active = true;
    getWish(id)
      .then((foundWish) => {
        if (active) setWish(foundWish);
      })
      .catch(() => {
        if (active) setWish(null);
      })
      .finally(() => {
        if (active) setReady(true);
      });

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    setDark(step === 2);
  }, [step]);

  const next = () => setStep((s) => s + 1);

  if (!ready) {
    return (
      <PhoneFrame>
        <StepScreen>
          <p className="font-display text-3xl text-rose">Loading…</p>
        </StepScreen>
      </PhoneFrame>
    );
  }

  if (!wish) {
    return (
      <PhoneFrame>
        <StepScreen>
          <p className="text-6xl">🎈</p>
          <h1 className="font-display text-4xl text-primary">This surprise isn't here</h1>
          <p className="text-sm text-muted-foreground">
            The link may have expired or was created on another device.
          </p>
          <Link
            to="/"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Make your own
          </Link>
        </StepScreen>
      </PhoneFrame>
    );
  }

  const steps = [
    <StepEnvelope key="envelope" name={wish.name} onNext={next} />,
    <StepGreeting key="greeting" name={wish.name} onNext={next} />,
    <StepCandle key="candle" onNext={next} onDark={setDark} />,
    <StepLetter key="letter" letter={wish.letter} sender={wish.sender} onNext={next} />,
    <StepCompliments key="compliments" onNext={next} />,
    <StepPlans key="plans" onNext={next} />,
    <StepGift key="gift" onNext={next} />,
    <StepFinale key="finale" name={wish.name} sender={wish.sender} />,
  ];

  return <PhoneFrame dark={dark}>{steps[Math.min(step, steps.length - 1)]}</PhoneFrame>;
}
