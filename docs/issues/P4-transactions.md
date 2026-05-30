# P4 — Recent transactions list

**Phase:** Payments & Finance · **Priority:** P2 · **Estimate:** S · **Status:** Todo
**Dependencies:** P2
**Blocks:** none

## Context

Chronological log of all payments. Proves "you have a record of every peso in." Small but high-trust feature.

## Acceptance Criteria

- [ ] Below "Saldos pendientes" on `/app/finanzas`, a "Movimientos recientes" section
- [ ] List rows: date (left) · patient name + kind ("Depósito" / "Saldo") · amount (right, in green)
- [ ] Most recent 10 items
- [ ] Sorted descending by `paidAt`
- [ ] "Ver todos" link at the bottom → expands or navigates to a full list (full list is stretch, just show 10 for v1)

## Logic (inferred — confirm or override)

1. Server-render the top 10 from `payments` joined with `patients`.
2. Date format: "Hoy", "Ayer", otherwise "3 de jun" (no year unless > 1 month ago).

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/P4-transactions.md` after P2 is Done
