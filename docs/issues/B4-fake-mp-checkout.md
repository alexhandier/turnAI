# B4 — Fake Mercado Pago checkout screen

**Phase:** Patient booking · **Priority:** P1 · **Estimate:** S · **Status:** Todo
**Dependencies:** B3, F7
**Blocks:** B5

## Context

The visual centerpiece of the deposit moment. Must look unmistakably like Mercado Pago at first glance (color, layout, typography hierarchy) without using their logo or brand name. **Reference the `/dev/mp-preview` page from F7 before building.**

## Acceptance Criteria

- [ ] `/book/[link]/pago?slot=<id>&name=...&...` renders an MP-styled checkout:
  - Top header bar: `mp.primary` blue background, "Pago seguro" text (no MP logo, no MP name)
  - Card showing "Reserva de turno con Lic. Sofía García"
  - Big amount: "$7.500 ARS" (the deposit, formatted with Argentine separators)
  - Payment method selector (visual only, all "selected" by default): a credit card icon row showing Visa/Mastercard/Amex-style generic icons
  - Disclaimer line below: "El saldo de $17.500 se cobra después de la sesión"
  - Primary CTA bottom: full-width "Pagar $7.500" button in `mp.primary`
- [ ] Tapping "Pagar" shows a 1.5s loading state ("Procesando pago...") then redirects to `/book/[link]/confirmado?turn=<id>` (B5)
- [ ] Loading state uses an MP-style blue spinner
- [ ] If user navigates back, the form remains; pressing pay always succeeds (this is a demo)

## Logic (inferred — confirm or override)

1. The fake "processing" delay is hardcoded 1500ms — enough to feel real, not enough to bore the demo audience.
2. Actual booking write happens here (or in B5) — when "Pagar" is tapped, the server action atomically: creates the `patient` (or matches existing by email/WhatsApp), creates the `turn`, marks the `slot.status = 'booked'`, creates the `payment {kind: 'deposit'}`. Then redirects to B5 with the new `turn.id`.
3. Race condition: if the slot was booked between B3 and B4, fail gracefully → redirect back to B2 with toast.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/B4-fake-mp-checkout.md` after B3 + F7 are Done. Review `/dev/mp-preview` with Alex before finalizing visuals.
