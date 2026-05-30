# C6 — Day view toggle (stretch)

**Phase:** Calendar · **Priority:** P3 (stretch) · **Estimate:** S · **Status:** Todo
**Dependencies:** C1
**Blocks:** none

## Context

Some psychologists will think week view is too dense on mobile. Day view = one column, more breathing room, easier to tap. Toggle in the calendar header.

## Acceptance Criteria

- [ ] Calendar header has a "Semana | Día" segmented control
- [ ] Day view shows a single-day vertical timeline with the same slot/turn rendering as week view
- [ ] Tapping a day pill at the top while in day view changes the displayed day
- [ ] URL reflects view mode (`?view=day&date=YYYY-MM-DD`)
- [ ] Toggle preference is remembered in localStorage

## Logic (inferred — confirm or override)

1. Day view shares the same slot-fetching server function as C1, just with a 1-day range.
2. On viewports <400px wide the mobile fallback from C1 is already day-view-like, so this toggle becomes redundant on small phones. Hide the toggle below 400px.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Stretch — only build if all P1/P2 are Done. Summon @Karpathy on `docs/issues/C6-day-view.md`
