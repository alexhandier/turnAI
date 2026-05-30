# P3 — Outstanding balances list

**Phase:** Payments & Finance · **Priority:** P2 · **Estimate:** S · **Status:** Todo
**Dependencies:** P2
**Blocks:** none

## Context

Patients who attended but whose balance wasn't yet collected (or no-shows where the deposit is owed forever, but those are closed). Useful for the pro to see who they need to follow up with.

## Acceptance Criteria

- [ ] Below "Resumen del mes" on `/app/finanzas`, a "Saldos pendientes" section
- [ ] List rows: patient name (left) · "$X.XXX pendiente" (right) · small "Cobrar" button
- [ ] Sorted by balance amount (largest first)
- [ ] Empty state: "No tenés saldos pendientes 🎉"
- [ ] Tapping "Cobrar" → server action that inserts a `payment {kind: 'balance'}` for the missing amount, refreshes the list

## Logic (inferred — confirm or override)

1. Outstanding = `turn.status = 'attended'` AND sum(payments for this turn) < `turn.sessionPriceCents`. Group by patient.
2. The "Cobrar" action assumes cash/off-system collection — just records it as paid.
3. From the F6 seed, Florencia Gómez has one outstanding balance.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/P3-outstanding-balances.md` after P2 is Done
