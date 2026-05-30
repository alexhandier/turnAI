# St1 — Reset Demo button in Ajustes

**Phase:** Settings · **Priority:** P1 · **Estimate:** XS · **Status:** Todo
**Dependencies:** F5
**Blocks:** Benja's ability to pitch repeatedly

## Context

The button that lets Benja start every pitch with a clean, predictable demo state. Lives in Ajustes alongside "Simular día siguiente". Both are dev-style affordances exposed in the UI so Benja can use them mid-pitch.

## Acceptance Criteria

- [ ] `/app/ajustes` page exists with:
  - Header "Ajustes"
  - Section "Demo" containing:
    - **Reiniciar demo** (button, danger style — red outline): "Volver al estado inicial. Borra cualquier turno o paciente nuevo."
    - **Simular día siguiente** (button, neutral): handled by S1
- [ ] Tap "Reiniciar demo" → confirmation dialog "¿Reiniciar la demo? Esta acción no se puede deshacer." → "Sí, reiniciar" or "Cancelar"
- [ ] On confirm: `POST /api/reset` → spinner → toast "Demo reiniciada" → redirect to `/app/agenda` (fresh start)
- [ ] Below those two buttons, a small read-only "Versión: <git-sha>" line for support

## Logic (inferred — confirm or override)

1. The route is server-action-based, not a bare fetch — gives us better error handling + auto-revalidation.
2. After reset, revalidate the entire `/app/*` cache before redirecting.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/St1-reset-button.md` after F5 is Done
