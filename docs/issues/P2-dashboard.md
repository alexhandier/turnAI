# P2 — Dashboard — "Cobrado este mes" + "Proyectado este mes"

**Phase:** Payments & Finance · **Priority:** P1 · **Estimate:** M · **Status:** Todo
**Dependencies:** P1, F6, C4
**Blocks:** demo flow step 4 (showing the deposit landed) and step 6 (showing the balance landed)

## Context

The Finanzas tab's main visual. Two big numbers + a small breakdown. This is what makes a psychologist say "wait, I can see all my income at a glance?"

## Acceptance Criteria

- [ ] Below the "Mis tarifas" section, render a "Resumen del mes" section
- [ ] Two side-by-side stat cards (stack vertically on narrow):
  - **Cobrado este mes** — sum of all `payments` this calendar month where `kind IN ('deposit', 'balance')`, displayed as `$XX.XXX`
  - **Proyectado este mes** — sum of `(sessionPriceCents - already_paid)` for all `turns` this calendar month with `status IN ('reserved', 'attended')`, displayed as `$XX.XXX`
- [ ] Below the cards, a small breakdown line: "X sesiones cobradas · Y reservadas · Z proyectadas"
- [ ] Numbers update live (refresh) when the user returns to the page after a booking/attendance action
- [ ] "Este mes" is the calendar month containing `sim_clock.nowAt`

## Logic (inferred — confirm or override)

1. Aggregate in a single server function `getFinanceSummary()` returning `{ cobradoCents, proyectadoCents, sessionsCobradas, sessionsReservadas }`. Call from the page server component.
2. `proyectado` = expected total income for the month minus what's been paid:
   ```
   for each turn this month with status in ('reserved', 'attended'):
     expected += turn.sessionPriceCents
     paid     += sum(payments for this turn)
   proyectado = expected - paid
   ```
   For `attended` turns where the balance was already collected, contribution is 0.
3. Format with `Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })`.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/P2-dashboard.md` after P1 + F6 are Done
