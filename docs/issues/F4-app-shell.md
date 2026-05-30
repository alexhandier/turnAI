# F4 — Mobile-first app shell + bottom tab bar + Spanish locale

**Phase:** Foundation · **Priority:** P1 · **Estimate:** M · **Status:** In Review
**Dependencies:** F1, F3
**Blocks:** all `/app/*` module issues

## Context

This is the visual chassis Benja shows on his phone. Bottom tabs = 4 modules. Header carries pro name + a "..." menu for Ajustes / logout. Empty screens are fine — they'll be filled by later issues.

## Acceptance Criteria

- [x] `/app/layout.tsx` provides a mobile-first shell: header (top) + content (middle) + bottom tab bar (bottom)
- [x] Bottom tab bar has 4 tabs in this order with these labels and icons:
  - **Inbox** (`/app/inbox`) — MessageCircle icon
  - **Pacientes** (`/app/pacientes`) — Users icon
  - **Finanzas** (`/app/finanzas`) — Wallet icon
  - **Agenda** (`/app/agenda`) — Calendar icon
- [x] Active tab is visually distinguished (green-500 + bolder stroke)
- [x] Header shows pro initials avatar + name + "..." that opens a sheet with "Ajustes" and "Cerrar sesión"
- [x] All routes exist with placeholder content ("próximamente")
- [x] Desktop: max-w-[420px] centered on bg-zinc-100 with shadow-2xl
- [x] All text in Spanish

## Logic (inferred — confirm or override)

1. Use shadcn `Tabs` only as a primitive; the bottom bar is a custom component (`<BottomTabBar />`) since it needs a fixed position + safe-area-inset padding for iOS.
2. The 4 tab routes are all under `app/(tabs)/` so they share the layout. Settings (`/app/ajustes`) is a sibling route that uses the same shell but hides the bottom bar.
3. Icons from `lucide-react` (`Inbox`, `Users`, `Wallet`, `Calendar`).
4. The desktop "phone frame" treatment uses a centered `<div class="max-w-[420px] mx-auto min-h-dvh shadow-2xl">`. Background outside the frame is `bg-zinc-100`.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/F4-app-shell.md` after F3 + F7 are Done
