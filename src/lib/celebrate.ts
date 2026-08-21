const COLORS = ["#f9a8c4", "#f43f6e", "#ffd6e3", "#ffe6a7", "#fff7f2"];

export async function celebrate(origin?: { x: number; y: number }) {
  if (typeof window === "undefined") return;
  const confetti = (await import("canvas-confetti")).default;
  confetti({
    particleCount: 120,
    spread: 80,
    startVelocity: 42,
    scalar: 0.9,
    colors: COLORS,
    origin: origin ?? { x: 0.5, y: 0.55 },
  });
}

export async function rain(durationMs = 3000) {
  if (typeof window === "undefined") return;
  const confetti = (await import("canvas-confetti")).default;
  const end = Date.now() + durationMs;
  const frame = () => {
    confetti({
      particleCount: 3,
      startVelocity: 0,
      ticks: 220,
      gravity: 0.5,
      scalar: 0.8,
      colors: COLORS,
      origin: { x: Math.random(), y: -0.05 },
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
