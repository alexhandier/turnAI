# Pt4 — Edit patient

**Phase:** Patients · **Priority:** P3 · **Estimate:** XS · **Status:** Todo
**Dependencies:** Pt2
**Blocks:** none

## Context

Pro can correct a typo in a patient's contact info. Same sheet UX as Pt3, pre-filled.

## Acceptance Criteria

- [ ] The "Editar" button in Pt2's header opens a bottom sheet with the patient's current name, WhatsApp, email pre-filled
- [ ] Submit updates the patient row; sheet closes; Pt2 re-renders with new values
- [ ] "Eliminar paciente" is **not** included in v1 (too destructive for a demo; would orphan turns/payments)

## Logic (inferred — confirm or override)

1. Reuse the Pt3 form component with a `mode: 'create' | 'edit'` prop.
2. Validate that the new WhatsApp doesn't collide with another patient.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/Pt4-edit-patient.md` after Pt2 + Pt3 are Done
