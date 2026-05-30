# F7 — Design tokens: WhatsApp + Mercado Pago palettes & shadcn theme

**Phase:** Foundation · **Priority:** P1 · **Estimate:** S · **Status:** Todo
**Dependencies:** F1
**Blocks:** F4, I2, B4

## Context

Visual fidelity to WhatsApp and Mercado Pago is non-negotiable for the demo. Get the palettes, shapes, and shadow treatments into Tailwind tokens once so every later issue uses them consistently. (Recognizable, but no logos or names from those brands — we don't want a takedown.)

## Acceptance Criteria

- [ ] `tailwind.config.ts` extends theme with:
  ```ts
  colors: {
    wa: {
      primary:  '#25D366',  // WhatsApp green
      header:   '#075E54',  // dark teal
      bubbleIn: '#FFFFFF',  // inbound bubble
      bubbleOut:'#DCF8C6',  // outbound bubble (pale green)
      bg:       '#ECE5DD',  // chat background
      tick:     '#34B7F1',  // double-tick blue
    },
    mp: {
      primary:  '#009EE3',  // Mercado Pago blue
      primaryDark: '#0070C0',
      accent:   '#FFE600',  // yellow accent
      bg:       '#F5F5F5',  // checkout background
    },
    brand: {
      primary:  '#25D366',  // TurnAI uses WA green as its own brand
      ink:      '#0F172A',  // primary text
    }
  }
  ```
- [ ] shadcn theme `globals.css` CSS variables use a warm neutral palette (zinc/stone) with `--primary` mapped to `#25D366`
- [ ] A reference page at `/dev/tokens` (only mounted in dev) renders every token visually so we can eyeball them
- [ ] A reference page at `/dev/wa-preview` renders a fake WhatsApp screen using the tokens — chat list + thread + reply box — to lock in visual fidelity before I2 is implemented
- [ ] A reference page at `/dev/mp-preview` renders a fake Mercado Pago checkout — same purpose for B4
- [ ] Both reference pages are linked from the home page in dev mode only

## Logic (inferred — confirm or override)

1. Reference these mockups from real WhatsApp screenshots and Mercado Pago checkout screenshots — Karpathy should look up current screenshots on Google Images / their own phone for accuracy.
2. The `/dev/*` reference routes are throwaway scaffolding. They exist solely so Alex can approve the visual before the real components ship.
3. Bubble shapes: rounded `rounded-lg` with a small "tail" notch via `::before` pseudo-element on the talker's side. (Or use a SVG-based bubble background.)
4. Use the system font stack — WhatsApp web uses Helvetica Neue / Roboto; Mercado Pago uses Proxima Soft. Stick with system fonts; the *layout* and *color* do 90% of the recognition work, not the typeface.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/F7-design-tokens.md` after F1 is Done
