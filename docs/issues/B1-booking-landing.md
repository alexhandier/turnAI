# B1 — `/book/[link]` branded landing page

**Phase:** Patient booking · **Priority:** P1 · **Estimate:** S · **Status:** Todo
**Dependencies:** F1, F7
**Blocks:** B2

## Context

When the patient (or Benja in the second tab) opens the booking link, the first impression has to feel like a clean, mobile-first booking microsite — like Calendly but warmer and Argentine. Branded header with pro identity.

## Acceptance Criteria

- [ ] `/book/[link]` is a public route (no auth)
- [ ] The `[link]` param is a stable slug for the pro (e.g., `lic-sofia-garcia`) — for v1, accept any value and always resolve to the seeded pro
- [ ] Page renders:
  - Pro avatar (circular, large)
  - Name + specialty ("Lic. Sofía García · Psicóloga")
  - One-line tagline ("Reservá tu turno en menos de 1 minuto")
  - Primary CTA "Reservar turno" → routes to `/book/[link]/slots` (B2)
- [ ] Mobile-first layout; on desktop, centered max-width 420px frame on neutral background (consistent with the pro app shell)
- [ ] Footer line: "Powered by TurnAI" (small, gray)
- [ ] No bottom tab bar (this is patient-facing)

## Logic (inferred — confirm or override)

1. For v1, slug resolution is hardcoded: any `[link]` returns the single seeded pro. Future: store `pros.slug` and look it up.
2. Render fully on the server (no client interactivity needed on this screen).
3. Use the same shadcn theme as the pro app, but suppress the bottom tab bar.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/B1-booking-landing.md` after F1 + F7 are Done
