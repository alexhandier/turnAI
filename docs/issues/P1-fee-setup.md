# P1 — Fee setup — per-session price + flat deposit

**Phase:** Payments & Finance · **Priority:** P1 · **Estimate:** S · **Status:** Todo
**Dependencies:** F4, F6
**Blocks:** B4 (uses these values), C4

## Context

Pro configures their pricing. Two numbers: the full session price and the deposit charged at booking. Everything downstream (patient checkout, dashboard projections, balance charges) reads from this row.

## Acceptance Criteria

- [ ] `/app/finanzas` page has a top section "Mis tarifas" with two editable fields:
  - **Precio de sesión** — number input, formatted in ARS with thousand separators ("$25.000")
  - **Depósito** — number input, formatted in ARS ("$7.500")
- [ ] Both inputs autosave on blur (server action `updatePricing`)
- [ ] A "saved" check icon appears briefly on successful save
- [ ] Validation: depósito must be > 0 and ≤ precio_sesion; on violation, revert + toast
- [ ] Below the fields, a small calculated helper line: "Saldo después de asistir: $17.500"
- [ ] These values are used by B4 (checkout amount) and C4 (balance charge amount)

## Logic (inferred — confirm or override)

1. Values stored as cents (integer) in `pricing.sessionPriceCents` and `pricing.depositCents`.
2. Number input UX: user types `25000`, blur formats to `$25.000`. Use a controlled input with masking (`react-number-format`) or roll your own.
3. The "Saldo después de asistir" helper updates live as the user types (before save).

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/P1-fee-setup.md` after F4 + F6 are Done
