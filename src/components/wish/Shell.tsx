import { useEffect, useRef, type ReactNode } from "react";
import music from "@/assets/audio/music.mp3";

export function PhoneFrame({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blush/40 p-3 sm:p-6">
      <div
        className={`relative w-full max-w-[420px] overflow-hidden rounded-[2rem] border-4 border-foreground/80 shadow-2xl sm:rounded-[2.5rem] sm:border-8 ${
          dark ? "bg-night" : "bg-cream"
        } min-h-screen transition-colors duration-700 sm:min-h-[780px]`}
        style={{ width: "min(100%, 420px)", maxHeight: "100vh" }}
      >
        <AutoMusic />
        {children}
      </div>
    </div>
  );
}

function AutoMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(music);
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const playAudio = () => {
      if (audio.paused) void audio.play().catch(() => undefined);
    };

    const startAfterGesture = () => {
      playAudio();
    };

    audio.load();
    playAudio();
    window.addEventListener("touchstart", startAfterGesture, { capture: true, passive: true });
    window.addEventListener("pointerdown", startAfterGesture, { capture: true });
    window.addEventListener("click", startAfterGesture, { capture: true });
    window.addEventListener("keydown", startAfterGesture, { capture: true });

    return () => {
      window.removeEventListener("touchstart", startAfterGesture, true);
      window.removeEventListener("pointerdown", startAfterGesture, true);
      window.removeEventListener("click", startAfterGesture, true);
      window.removeEventListener("keydown", startAfterGesture, true);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
}

export function StepScreen({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`animate-rise-in flex min-h-screen flex-col items-center justify-center gap-6 px-5 py-10 text-center sm:min-h-[780px] sm:px-7 sm:py-12 ${className}`}
    >
      {children}
    </div>
  );
}

export function NextButton({
  onClick,
  children = "Next",
}: {
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="animate-rise-in rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
    >
      {children}
    </button>
  );
}

export function FloatingHearts() {
  const hearts = Array.from({ length: 10 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((_, i) => (
        <span
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${(i * 11 + 4) % 96}%`,
            bottom: "-40px",
            opacity: 0.5,
            animation: `float-up ${9 + (i % 5) * 2}s linear ${i * 1.3}s infinite`,
          }}
        >
          {i % 3 === 0 ? "🌸" : i % 3 === 1 ? "💗" : "✨"}
        </span>
      ))}
    </div>
  );
}
