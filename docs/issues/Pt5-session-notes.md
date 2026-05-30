# Pt5 — Per-session notes editing

**Phase:** Patients · **Priority:** P2 · **Estimate:** S · **Status:** Todo
**Dependencies:** Pt2, C3
**Blocks:** none

## Context

Notes are per-turn, editable from both the Calendar turn detail panel (C3) and the Patient detail's session history (Pt2). Same data, two surfaces, same server action.

## Acceptance Criteria

- [ ] In Pt2, tapping a turn row expands inline to show a multi-line textarea pre-filled with `turn.notes`
- [ ] Edits autosave on blur (debounced 800ms while typing for the "saved" indicator)
- [ ] The same data shows up in C3's notes textarea
- [ ] Both surfaces call the same `updateTurnNotes(turnId, notes)` server action defined in C3
- [ ] An optional "Guardar" button is shown but most pros will just navigate away (autosave handles it)

## Logic (inferred — confirm or override)

1. Same backend mutation as C3. Just two UIs reading and writing the same column.
2. Optimistic UI: text persists in the textarea immediately; save indicator shows "Guardando..." → "Guardado" briefly.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/Pt5-session-notes.md` after Pt2 + C3 are Done
