# C5 — "Reservar para paciente existente" from Calendar

**Phase:** Calendar · **Priority:** P2 · **Estimate:** S · **Status:** Todo
**Dependencies:** C2
**Blocks:** none

## Context

Returning patients don't need to go through `/book/[link]`. Pro can just open a slot and assign it to an existing patient directly. Optional: also fires a confirmation message into their inbox conversation.

## Acceptance Criteria

- [ ] In the C2 "Abrir turno" confirmation sheet, add a second primary action: **"Reservar para paciente"**
- [ ] Tapping it opens a patient picker (list of all `patients` with search-by-name)
- [ ] Selecting a patient → creates the slot (status `booked`) + a `turn` (status `reserved`) + a `payment {kind: 'deposit', amountCents: pricing.depositCents}` (we assume the deposit was collected in cash / off-system for returning patients)
- [ ] The turn immediately appears as booked on the grid
- [ ] Optional toggle in the picker: "Enviar confirmación por WhatsApp" (default ON) → inserts an outbound `message` in the patient's conversation: "¡Listo! Te reservé el turno para el [fecha] a las [hora]. Te espero. 💚"

## Logic (inferred — confirm or override)

1. Deposit is auto-recorded so the dashboard math stays sensible. If Alex wants to track "cash" vs "MP" payment methods, add a `payments.method` enum later.
2. Picker uses shadcn `Command` for fuzzy search.
3. If no existing patients exist (edge case), show empty state with link to Pt3 "Agregar paciente".

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/C5-reservar-existente.md` after C2 is Done
