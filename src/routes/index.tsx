import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Check, Eye, MessageCircle } from "lucide-react";
import bearPanda from "@/assets/bear-panda-cake.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FloatingHearts } from "@/components/wish/Shell";
import { defaultLetter, newWishId, saveWish, type Wish } from "@/lib/wishes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Birthday Wisher — Send a birthday surprise link" },
      {
        name: "description",
        content:
          "Create a cute animated birthday surprise in seconds and share it as a link: balloons, candles, roses and a handwritten letter.",
      },
      { property: "og:title", content: "Birthday Wisher — Send a birthday surprise link" },
      {
        property: "og:description",
        content:
          "Create a cute animated birthday surprise in seconds and share it as a link.",
      },
    ],
  }),
  component: CreatePage,
});

function CreatePage() {
  const [name, setName] = useState("");
  const [sender, setSender] = useState("");
  const [letter, setLetter] = useState("");
  const [wish, setWish] = useState<Wish | null>(null);
  const [copied, setCopied] = useState(false);

  const link = wish
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/wish/${wish.id}`
    : "";

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setWish(
      saveWish({
        id: newWishId(),
        name: trimmed,
        sender: sender.trim() || undefined,
        letter: letter.trim() || defaultLetter(trimmed),
      }),
    );
  };

  const copy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-blush/40 px-5 py-14">
      <FloatingHearts />
      <div className="relative mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
        <img
          src={bearPanda}
          alt="Teddy bear and panda with a birthday cake"
          width={1024}
          height={1024}
          className="animate-float-soft w-40 drop-shadow-xl"
        />
        <h1 className="font-display text-5xl font-bold leading-tight text-primary">
          Make their birthday unforgettable
        </h1>
        <p className="max-w-sm text-base text-muted-foreground">
          Write their name, get a link, and let them tap through a little surprise made
          just for them.
        </p>

        {!wish ? (
          <form
            onSubmit={create}
            className="w-full space-y-4 rounded-3xl bg-card p-6 text-left shadow-xl"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Who's the birthday star?</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anjali"
                className="rounded-2xl"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sender">Your name (optional)</Label>
              <Input
                id="sender"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="e.g. Vignesh"
                className="rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="letter">A personal note (optional)</Label>
              <Textarea
                id="letter"
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
                rows={4}
                placeholder="Leave empty and we'll write something sweet for you."
                className="rounded-2xl"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-95"
            >
              Create the surprise
            </button>
          </form>
        ) : (
          <div className="w-full space-y-4 rounded-3xl bg-card p-6 shadow-xl">
            <h2 className="font-display text-3xl text-rose">Your link is ready!</h2>
            <p className="break-all rounded-2xl bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground">
              {link}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy link"}
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`A birthday surprise for you 🎂 ${link}`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-secondary-foreground"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <Link
                to="/wish/$id"
                params={{ id: wish.id }}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-secondary-foreground"
              >
                <Eye className="h-4 w-4" /> Preview
              </Link>
            </div>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(link)}`}
              alt="QR code for the birthday surprise link"
              width={180}
              height={180}
              loading="lazy"
              className="mx-auto rounded-2xl"
            />
            <button
              onClick={() => setWish(null)}
              className="text-sm font-medium text-muted-foreground underline"
            >
              Create another one
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
