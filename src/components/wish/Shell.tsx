import type { ReactNode } from "react";

export function PhoneFrame({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blush/40 p-0 sm:p-6">
      <div
        className={`relative w-full max-w-[420px] overflow-hidden sm:rounded-[2.5rem] sm:border-8 sm:border-foreground/80 sm:shadow-2xl ${
          dark ? "bg-night" : "bg-cream"
        } min-h-screen transition-colors duration-700 sm:min-h-[780px]`}
      >
        {children}
      </div>
    </div>
  );
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
      className={`flex min-h-screen flex-col items-center justify-center gap-6 px-7 py-12 text-center sm:min-h-[780px] ${className}`}
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
