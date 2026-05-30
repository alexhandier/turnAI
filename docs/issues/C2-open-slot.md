# C2 — Manual slot creation — tap empty time → "Abrir turno"

**Phase:** Calendar · **Priority:** P1 · **Estimate:** S · **Status:** Todo
**Dependencies:** C1
**Blocks:** B2

## Context

The pro manually opens slots they're willing to take bookings on. No fancy recurrence — one tap = one slot. Granularity: 50-minute sessions (standard psychologist session length).

## Acceptance Criteria

- [ ] Tapping an empty time cell in the calendar opens a confirmation sheet: "¿Abrir turno el [día] [fecha] a las [hora]?" with "Abrir turno" + "Cancelar"
- [ ] Confirm → inserts a `slot` row with `status: 'open'`, `startAt`, `endAt = startAt + 50min`
- [ ] Slot immediately appears in the grid as an outlined block
- [ ] If the tapped time conflicts with an existing slot or turn → sheet shows error "Ya hay un turno o un horario abierto en ese momento"
- [ ] Long-press on an existing `open` slot → bottom sheet with "Cerrar turno" → deletes the slot (only allowed if not yet booked)

## Logic (inferred — confirm or override)

1. Slot duration is hardcoded to 50 minutes for v1. If Alex wants configurable later → add to pricing settings.
2. Slots can be opened in the past (no validation against `sim_clock.nowAt`) — useful for retroactive bookkeeping demos. (Reconsider if it looks weird.)
3. Use a server action `openSlot(startAt)` that does the conflict check inside a transaction.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/C2-open-slot.md` after C1 is Done
