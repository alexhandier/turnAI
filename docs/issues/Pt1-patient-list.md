# Pt1 — Patients list

**Phase:** Patients · **Priority:** P1 · **Estimate:** S · **Status:** Todo
**Dependencies:** F4, F6
**Blocks:** Pt2

## Context

The Pacientes tab default view. Simple list, one row per patient, key info at a glance.

## Acceptance Criteria

- [ ] `/app/pacientes` renders a list of all patients (seed shows 5)
- [ ] Each row:
  - Avatar circle (first initial, deterministic color)
  - Name (bold)
  - Status chip (small): "Nuevo" (gray), "Activo" (green), "Inactivo" (zinc)
  - Subtitle line: "Última sesión: hace 3 días" OR "Sin sesiones aún" (for `status = 'new'`)
  - Right side: balance amount in red if outstanding, otherwise nothing
- [ ] Sorted by most recent activity (last turn date OR conversation lastMessageAt, whichever is more recent), descending
- [ ] Tap a row → navigates to `/app/pacientes/[patientId]` (Pt2)
- [ ] Header has a "+" button (top right) → opens Pt3 "Agregar paciente"

## Logic (inferred — confirm or override)

1. Server-fetch with a single query that joins patients with their most-recent turn + balance aggregate.
2. "Activo" = has had a turn in the last 60 days; "Inactivo" = no turn in 60+ days; "Nuevo" = patient.status field (only flips out of 'new' after first attended turn — handle in C4 or as a derived value).

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/Pt1-patient-list.md` after F6 is Done
