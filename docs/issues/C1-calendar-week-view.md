# C1 — Calendar week view (mobile-first, swipeable)

**Phase:** Calendar · **Priority:** P1 · **Estimate:** M · **Status:** Todo
**Dependencies:** F4, F6
**Blocks:** C2, C3, C5, B2

## Context

The Agenda tab. Default view on entering the app. Shows the current week, hours stacked vertically, days as columns (or as a horizontal day-picker on mobile-narrow). Swipe left/right to navigate weeks.

## Acceptance Criteria

- [ ] `/app/agenda` renders a week view rooted on the current simulated week (`sim_clock.nowAt`'s Monday → Sunday)
- [ ] Day strip at top: 7 day pills showing day name + date; today is visually highlighted
- [ ] Time grid below: hours from 08:00 to 21:00, 1-hour rows
- [ ] Slot blocks render at their actual time positions, colored by status:
  - `open` → outlined / light green
  - `booked` → solid green with patient initials + name
  - `blocked` → gray crosshatch
- [ ] Horizontal swipe (or back/forward chevrons in the header) navigates to prev/next week; URL reflects the week (`?week=YYYY-MM-DD`)
- [ ] Empty grid cells (no slot) are tappable → opens the C2 "Abrir turno" flow
- [ ] On mobile narrow (<400px), the layout falls back to a single-day vertical agenda with a day-picker chip strip at the top (current day selected)

## Logic (inferred — confirm or override)

1. All times in `America/Argentina/Buenos_Aires`. Use `date-fns-tz` or `Temporal` polyfill.
2. The "current week" is computed from `sim_clock.nowAt`, not the real system clock. This matters because S1 "Simular día siguiente" advances the sim clock and the calendar should reflect it.
3. Server component fetches all `slots` + `turns` for the week range, joins, returns a normalized list. Client component handles swipe interactions.
4. Use `useSwipeable` or native pointer events for swipe.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/C1-calendar-week-view.md` after F4 + F6 are Done
