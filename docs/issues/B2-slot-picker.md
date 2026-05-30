# B2 — Slot picker — only open & unbooked slots

**Phase:** Patient booking · **Priority:** P1 · **Estimate:** M · **Status:** Todo
**Dependencies:** B1, C1, C2
**Blocks:** B3

## Context

The patient sees only the times the pro has opened (and which aren't already booked). Mobile-friendly: pick a day from a horizontal scroll, then tap a time chip.

## Acceptance Criteria

- [ ] `/book/[link]/slots` renders:
  - Horizontal-scroll day strip showing the next 14 days (skip days with no open slots)
  - Below: vertical list of available time chips for the selected day ("16:00 · 50 min")
  - Tap a chip → navigates to `/book/[link]/contact?slot=<slotId>` (B3)
- [ ] Days with no open slots are not shown
- [ ] If no slots in the next 14 days at all → empty state "Sin horarios disponibles en las próximas dos semanas" + WhatsApp contact button (deep-link `https://wa.me/<pro_number>`)
- [ ] Selected day is visually highlighted; first day with availability is selected by default

## Logic (inferred — confirm or override)

1. "Available" = `slot.status === 'open'` AND no `turn` references it AND `slot.startAt > sim_clock.nowAt`.
2. Server-render the slot list. Client component only handles day-strip selection.
3. The next 14 days starts from `sim_clock.nowAt` (not real now).

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/B2-slot-picker.md` after B1 + C2 are Done
