# Jensen — L1 Active (TurnAI)

## Current Sprint

**Sprint 0 — Demo skeleton.** Goal: Benja can perform the canonical demo flow end-to-end on his phone.

## Killer Path (25 issues, ship first)

F1, F2, F3, F4, F5, F6, F7, C1, C2, C3, C4, B1, B2, B3, B4, B5, P1, P2, I1, I2, I3, I4, Pt1, S1, S2, St1

## Full Backlog

**36 issues across 8 phases** — see `docs/issues/README.md` for the index.

- Foundation (F1–F7): 7
- Calendar (C1–C6): 6
- Patient booking (B1–B6): 6
- Finance (P1–P4): 4
- Inbox (I1–I5): 5
- Patients (Pt1–Pt5): 5
- Reminders (S1–S2): 2
- Settings (St1): 1

## Status

All 36 issues: **Todo**. Nothing started.

## Next Action for Alex

Summon @Karpathy in this repo on `docs/issues/F1-init-nextjs.md` to start Phase 0.

## Open Questions / Risks

- **Visual fidelity sign-off:** F7 ships `/dev/wa-preview` and `/dev/mp-preview` reference pages — Alex must eyeball + approve before I2 and B4 ship to production routes.
- **Slot duration:** hardcoded 50 min. May need to flex for first-consult vs follow-up.
- **Sim clock:** S1's "Simular día siguiente" depends on `sim_clock` table being honored by all "now" queries — easy to forget. Karpathy must use the `getNow()` helper exclusively, never `new Date()`.
