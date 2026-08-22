const COLORS = ["#f9a8c4", "#f43f6e", "#ffd6e3", "#ffe6a7", "#fff7f2", "#f59e0b"];

export async function celebrate(origin?: { x: number; y: number }) {
  if (typeof window === "undefined") return;
  const confetti = (await import("canvas-confetti")).default;

  confetti({
    particleCount: 180,
    spread: 120,
    startVelocity: 48,
    scalar: 1,
    colors: COLORS,
    origin: origin ?? { x: 0.5, y: 0.55 },
    ticks: 220,
    gravity: 0.9,
    drift: 0.12,
    decay: 0.93,
  });

  confetti({
    particleCount: 80,
    spread: 80,
    startVelocity: 24,
    scalar: 0.75,
    colors: ["#f43f6e", "#f9a8c4", "#fff7f2"],
    origin: origin ?? { x: 0.5, y: 0.5 },
    ticks: 140,
    gravity: 0.6,
    drift: -0.2,
  });
}

export async function rain(durationMs = 3000) {
  if (typeof window === "undefined") return;
  const confetti = (await import("canvas-confetti")).default;
  const end = Date.now() + durationMs;
  const frame = () => {
    confetti({
      particleCount: 4,
      startVelocity: 0,
      ticks: 260,
      gravity: 0.5,
      scalar: 0.8,
      colors: COLORS,
      origin: { x: Math.random(), y: -0.05 },
      spread: 50,
      drift: (Math.random() - 0.5) * 0.4,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
