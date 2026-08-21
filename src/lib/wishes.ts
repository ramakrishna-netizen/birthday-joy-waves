import wishesFile from "@/data/wishes.json";

export type Wish = {
  id: string;
  name: string;
  sender?: string | undefined;
  letter: string;
};

const STORAGE_KEY = "birthday-wishes";

export const defaultLetter = (name: string) =>
  `Happy birthday, ${name}! I hope today is as warm and lovely as you are. ` +
  `Thank you for being such a beautiful part of my life. Here's to another year of ` +
  `laughter, tiny joys and big dreams coming true.`;

/** Wishes saved in the project file — these work on every device. */
const fileWishes = wishesFile as Record<string, Wish>;

function readLocal(): Record<string, Wish> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function getWish(id: string): Wish | null {
  return fileWishes[id] ?? readLocal()[id] ?? null;
}

export function saveWish(wish: Wish): Wish {
  if (typeof window !== "undefined") {
    const all = readLocal();
    all[wish.id] = wish;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
  return wish;
}

export function newWishId(): string {
  return Math.random().toString(36).slice(2, 8);
}
