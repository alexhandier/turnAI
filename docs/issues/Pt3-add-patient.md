# Pt3 — Add patient form

**Phase:** Patients · **Priority:** P2 · **Estimate:** S · **Status:** Todo
**Dependencies:** Pt1
**Blocks:** none

## Context

Manual patient onboarding from the Pacientes list. Simple 3-field form in a bottom sheet.

## Acceptance Criteria

- [ ] The "+" button in the Pacientes header opens a bottom sheet titled "Agregar paciente"
- [ ] Fields: Nombre y apellido (required) · WhatsApp (required, normalized E.164) · Email (optional)
- [ ] "Guardar" button at the bottom (disabled until required fields valid)
- [ ] Submit creates a `patient` row with `status = 'active'` (since manually added by pro, not a new lead) + redirects to the patient's Pt2 detail page
- [ ] "Cancelar" closes the sheet without saving

## Logic (inferred — confirm or override)

1. If a patient with the same normalized WhatsApp already exists, show a confirmation "Ya existe un paciente con ese WhatsApp ([Nombre]). ¿Crear de todos modos?"
2. No conversation is created — those are inbox-side. If the pro wants to message a new patient, they can start the conversation manually (not in v1 scope).

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/Pt3-add-patient.md` after Pt1 is Done
