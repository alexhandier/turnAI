# F6 — Demo content: 5 seeded conversations + patients + history

**Phase:** Foundation · **Priority:** P1 · **Estimate:** M · **Status:** Todo
**Dependencies:** F5
**Blocks:** I1, I2, Pt1, Pt2, P2

## Context

The seed is what makes the demo *feel real*. Alex's directive: "everything has to feel as real as possible, and in Spanish." Bad seed = bad demo. Take this seriously — write it in Argentine voseo, with realistic patient stories.

## Acceptance Criteria

- [ ] Seeded pro: **Lic. Sofía García — Psicóloga** (use a placeholder portrait stand-in URL — Karpathy can pick a public CC0 image or AI-generated face)
- [ ] Seeded pricing: `sessionPriceCents = 2_500_000` (25.000 ARS), `depositCents = 750_000` (7.500 ARS)
- [ ] Exactly **5 conversations**, each with 1 patient and a thread of messages:
  1. **María Fernández** — *new lead*, just messaged today asking for a first consult. Conversation has only 1–2 inbound messages, no booking yet. `patient.status = 'new'`. **This is the lead Benja demos.**
  2. **Lucas Rodríguez** — *mid-conversation*, asked yesterday about scheduling, pro replied with availability, patient hasn't picked yet. 4–5 messages.
  3. **Camila Pérez** — *returning patient*, has 4 past attended sessions with notes, has an upcoming turn tomorrow. Conversation has reminders + short check-ins. `status = 'active'`.
  4. **Tomás Álvarez** — *recent no-show*, missed his turn last week (deposit retained), conversation has the missed reminder + pro's follow-up. `status = 'active'`.
  5. **Florencia Gómez** — *long-time patient*, 8+ past sessions, currently has a balance owed (last attended session, balance not yet collected — useful for the dashboard). `status = 'active'`.
- [ ] Each patient has realistic Argentine details: full name, WhatsApp like `+54 9 11 5XXX-XXXX`, email like `nombre.apellido@gmail.com`
- [ ] Messages use voseo: "vos podés", "te quedo", "dale", "buenísimo", "¿qué tal?"
- [ ] Past turns spread over the last 6 weeks for the returning patients; one turn tomorrow (Camila); turns this week and next two weeks for variety
- [ ] At least 10 **open** slots in the next 14 days (so booking via `/book/[link]` works immediately) — Mon–Fri, 14:00–20:00 hourly
- [ ] Realistic per-session notes on the past attended turns (2–4 sentences each, clinical-sounding but generic)
- [ ] Some payments seeded: deposits + balances for attended turns, deposit-only for the no-show
- [ ] After seeding, the dashboard math comes out to: ~6 sessions attended this month, ~5 turns upcoming, 1 outstanding balance (Florencia)

## Logic (inferred — confirm or override)

1. Write the seed as a single TypeScript module that constructs the data programmatically (don't use a JSON dump). Easier to edit, version-control, and tweak realism.
2. All timestamps are computed from `sim_clock.nowAt` (the fixed anchor in F5).
3. Karpathy: write the message content yourself. Read the spec for the demo flow narrative, then write conversations that sell that narrative. If you want me to write the actual message text, ask Alex.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/F6-seed-content.md` after F5 is Done
