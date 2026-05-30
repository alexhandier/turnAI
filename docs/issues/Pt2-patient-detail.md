# Pt2 — Patient detail (contact + session history)

**Phase:** Patients · **Priority:** P2 · **Estimate:** M · **Status:** Todo
**Dependencies:** Pt1
**Blocks:** Pt4, Pt5

## Context

Drill-in view for one patient. Contact info at the top, then a timeline of their turns (past + upcoming) with status + paid amounts + note previews.

## Acceptance Criteria

- [ ] `/app/pacientes/[id]` renders:
  - Header card: avatar · name · status chip · "Editar" button (top right, links to Pt4)
  - Contact block: WhatsApp (with deep-link icon `wa.me/...`) · email
  - "Ir a conversación" button → navigates to the patient's conversation in Inbox
  - Section "Historial de sesiones":
    - List of turns (newest first)
    - Each row: date + time · status chip (Reservado / Asistió / Ausente) · paid amount on the right · note preview (1 line)
    - Tap a row → expands inline to show the full notes field (editable, autosave per Pt5)
  - Footer stat: "Total cobrado: $XXX.XXX · Sesiones asistidas: N"

## Logic (inferred — confirm or override)

1. Notes editing inside the expandable rows uses the same server action as C3 (`updateTurnNotes`).
2. "Total cobrado" sums all `payments` for this patient.
3. Upcoming turns appear at the top of the history (chronological grouping: "Próximas" then "Pasadas").

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/Pt2-patient-detail.md` after Pt1 is Done
