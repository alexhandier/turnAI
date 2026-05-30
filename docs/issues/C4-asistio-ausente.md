# C4 — "Marcar asistido" / "Marcar ausente" actions

**Phase:** Calendar · **Priority:** P1 · **Estimate:** S · **Status:** Todo
**Dependencies:** C3, P1
**Blocks:** demo flow step 6

## Context

The end of the demo: pro taps "Marcar asistido" → the system records attendance, simulates charging the balance (creates a `payment` row), and updates the finance dashboard. Or pro taps "Marcar ausente" → deposit is retained (no balance charge), turn marked as no-show.

## Acceptance Criteria

- [ ] Both buttons appear in the C3 sheet only when `turn.status === 'reserved'`
- [ ] Tap **"Marcar asistido"**:
  - Confirmation toast: "¿Confirmás que el paciente asistió?" with "Sí, cobrar saldo" + "Cancelar"
  - On confirm: `turn.status = 'attended'`, insert `payment {kind: 'balance', amountCents: turn.sessionPriceCents - turn.depositCents, paidAt: now}`
  - Sheet refreshes to show "Saldo: $17.500 cobrado"
  - Toast: "Asistencia registrada · Saldo cobrado"
- [ ] Tap **"Marcar ausente"**:
  - Confirmation: "¿Marcar como ausente? Se retiene el depósito."
  - On confirm: `turn.status = 'no_show'`, no new payment row, deposit stays as the only payment for this turn
  - Toast: "Marcado como ausente · Depósito retenido"
- [ ] After either action, both buttons hide; sheet shows a status badge ("Asistió" / "No asistió")
- [ ] Finance dashboard reflects new totals on next visit (P2 handles the display)

## Logic (inferred — confirm or override)

1. Both actions are server actions inside a DB transaction (status + payment insert atomically).
2. "Now" for the `paidAt` timestamp uses `sim_clock.nowAt`, not real now — keeps the simulation consistent.
3. Idempotency: if the turn is already `attended`/`no_show`, the action returns the existing record without re-creating payments.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/C4-asistio-ausente.md` after C3 + P1 are Done
