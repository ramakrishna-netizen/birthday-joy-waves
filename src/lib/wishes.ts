import wishesFile from "@/data/wishes.json";
import { supabase } from "@/lib/supabase";

export type Wish = {
  id: string;
  name: string;
  sender?: string | undefined;
  letter: string;
};

export const defaultLetter = (name: string) =>
  `Happy birthday, ${name}! I hope today is as warm and lovely as you are. ` +
  `Thank you for being such a beautiful part of my life. Here's to another year of ` +
  `laughter, tiny joys and big dreams coming true.`;

/** Wishes saved in the project file — these work on every device. */
const fileWishes = wishesFile as Record<string, Wish>;

export async function getWish(id: string): Promise<Wish | null> {
  if (!supabase) return fileWishes[id] ?? null;

  const { data, error } = await supabase
    .from("wishes")
    .select("id, name, sender, letter")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function saveWish(wish: Wish): Promise<Wish> {
  if (!supabase) return wish;

  const { data, error } = await supabase
    .from("wishes")
    .insert(wish)
    .select("id, name, sender, letter")
    .single();

  if (error) throw error;
  return data;
}

export function newWishId(): string {
  return Math.random().toString(36).slice(2, 8);
}
