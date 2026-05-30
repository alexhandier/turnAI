# F6 — Demo content: 5 seeded conversations + patients + history

**Phase:** Foundation · **Priority:** P1 · **Estimate:** M · **Status:** In Review
**Dependencies:** F5
**Blocks:** I1, I2, Pt1, Pt2, P2

## Context

The seed is what makes the demo *feel real*. Alex's directive: "everything has to feel as real as possible, and in Spanish." Bad seed = bad demo. Take this seriously — write it in Argentine voseo, with realistic patient stories.

## Acceptance Criteria

- [x] Seeded pro: **Lic. Sofía García — Psicóloga** (placeholder portrait via pravatar.cc)
- [x] Seeded pricing: `sessionPriceCents = 2_500_000` (25.000 ARS), `depositCents = 750_000` (7.500 ARS)
- [x] Exactly **5 conversations**, each with 1 patient and a thread of messages:
  1. **María Fernández** — *new lead*, 2 inbound messages today. `status = 'new'`.
  2. **Lucas Rodríguez** — *mid-conversation*, 5 messages. `status = 'new'`.
  3. **Camila Pérez** — *returning patient*, 6 attended turns, upcoming Jun 16 + Jun 23. `status = 'active'`.
  4. **Tomás Álvarez** — *recent no-show* Jun 11, deposit retained, follow-up in conversation. `status = 'active'`.
  5. **Florencia Gómez** — 11 attended sessions (10 fully paid, Jun 15 balance outstanding). `status = 'active'`.
- [x] Each patient has realistic Argentine details: full name, WhatsApp `+54 9 11 XXXX-XXXX`, email `nombre@gmail.com`
- [x] Messages use voseo: "dale", "buenísimo", "te recuerdo", "¿podés esperarme?"
- [x] Past turns spread over last 6+ weeks; upcoming turns in next 2 weeks
- [x] 34+ open slots in next 14 days, Mon–Fri 14:00–19:00 hourly
- [x] Realistic clinical notes on all attended turns (2–4 sentences each)
- [x] 34 payments: deposits + balances for attended turns, deposit-only for no-show
- [x] Dashboard math: 6 sessions attended in June (Jun 2, 3, 9, 10, 12, 15), 5 upcoming turns, 1 outstanding balance (Florencia Jun 15)

## Logic (inferred — confirm or override)

1. Write the seed as a single TypeScript module that constructs the data programmatically (don't use a JSON dump). Easier to edit, version-control, and tweak realism.
2. All timestamps are computed from `sim_clock.nowAt` (the fixed anchor in F5).
3. Karpathy: write the message content yourself. Read the spec for the demo flow narrative, then write conversations that sell that narrative. If you want me to write the actual message text, ask Alex.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/F6-seed-content.md` after F5 is Done
