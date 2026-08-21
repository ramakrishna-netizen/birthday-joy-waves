# Birthday Wisher — Screen Plan

A site where you create a personalised birthday surprise, get a shareable link, and the
recipient opens it to a phone-style, tap-through animated experience (based on your video).

## Part A — Creator flow (the sender)

**A1. Landing / Create**
Soft pink hero, headline "Make their birthday unforgettable", one input: **Recipient's name**.
Optional extras revealed below: your name, and a personal letter (pre-filled with a sweet
default so it works with just the name). Button: "Create the surprise".

**A2. Link ready**
Card showing the generated link, a **Copy link** button, WhatsApp share button, a QR code,
and a **Preview** button that opens the recipient experience in a new tab.
No account needed — each wish gets a short id (e.g. `/wish/x7k2p9`) and the message is stored
in a wishes file instead of being stuffed into the link.

## Part B — Recipient experience (the link)

Rendered inside a phone frame on desktop, full-screen on mobile. Each step is tap-to-advance
with music toggle in the corner.

**B1. Envelope open** — sealed pink envelope / heart card, "Tap to open", loader "Opening…".

**B2. Greeting** — "Happy Birthday, {Name}" with the bear+panda cake illustration,
"Are you excited for what's next?" with **Yes** and a playful **No** button that runs away
from the cursor.

**B3. Pop the balloon** — one single balloon floating in the middle of the screen; tap it to pop. On pop, a confetti burst reveals the animated text "You are so special".

**B4. Blow the candle** — dark room, cake with a lit flickering candle, "Close your eyes &
make a wish". Tap (or blow into mic if allowed) puts the candle out; confetti + lights back on.

**B5. Rose bouquet** — bouquet with love-note bubbles floating in around it
("Forever yours", "You make my world beautiful", "Happy Birthday, {Name}", etc.).

**B6. Letter** — cream notepad, "A Message From My Heart", the letter typed out line by line
in handwriting font, with a heart button to replay.

**B7. One last thing — the gift** — wrapped gift that wobbles; tap it a few times (counter),
it bursts open.

**B8. Finale** — cute "HBD" sticker card, "Lots of love for you", "Once again, Happy Birthday
{Name}!", falling confetti, plus a "Create one for someone you love" button back to A1.

## Look & feel
Cute & Sweet theme: blush pinks and cream, deep rose text, handwriting display font
(Caveat / Dancing Script) with a clean serif for body, soft glows and floating hearts.
Illustrations (balloons, cake, bouquet, gift, bear & panda stickers) generated to match the
reference style — the reference site's own images are copyrighted, so we'll create lookalikes.

## Technical notes
- **Where messages live:** a `src/data/wishes.json` file in the project holds the wishes
  (`id`, name, sender, letter). Links are short and clean: `/wish/x7k2p9`.
  Newly created wishes are also kept in the browser so the creator can preview instantly,
  and I can add any wish permanently into `wishes.json` for you.
- Trade-off: since it's a file and not a database, a wish created in the browser only follows
  the link on other devices once it's saved into `wishes.json`. Flip on Lovable Cloud later and
  every created link works everywhere automatically — same screens, no redesign.
- One route for the creator, one for the experience (`/wish/$id`), each step its own component.
- Music: a short looping tune, muted until the recipient taps (browser autoplay rules).

## Scope check
Only the "Cute & Sweet" theme in the video is planned. The "Classic" theme toggle is left out
for now unless you want both.
