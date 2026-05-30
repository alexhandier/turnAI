# F4 — Mobile-first app shell + bottom tab bar + Spanish locale

**Phase:** Foundation · **Priority:** P1 · **Estimate:** M · **Status:** Todo
**Dependencies:** F1, F3
**Blocks:** all `/app/*` module issues

## Context

This is the visual chassis Benja shows on his phone. Bottom tabs = 4 modules. Header carries pro name + a "..." menu for Ajustes / logout. Empty screens are fine — they'll be filled by later issues.

## Acceptance Criteria

- [ ] `/app/layout.tsx` provides a mobile-first shell: header (top) + content (middle) + bottom tab bar (bottom)
- [ ] Bottom tab bar has 4 tabs in this order with these labels and icons:
  - **Inbox** (`/app/inbox`) — chat bubble icon
  - **Pacientes** (`/app/pacientes`) — people icon
  - **Finanzas** (`/app/finanzas`) — wallet/chart icon
  - **Agenda** (`/app/agenda`) — calendar icon
- [ ] Active tab is visually distinguished (filled icon + accent color)
- [ ] Header shows pro photo + name + a "..." overflow that opens a sheet with "Ajustes" and "Cerrar sesión"
- [ ] All routes exist with empty placeholder content (`"Próximamente"`)
- [ ] On desktop viewport (≥ 1024px), the shell centers a max-width 420px frame on a neutral gray background (so demos on a laptop still look like a phone)
- [ ] All text in Spanish (Argentine voseo where it sounds natural)

## Logic (inferred — confirm or override)

1. Use shadcn `Tabs` only as a primitive; the bottom bar is a custom component (`<BottomTabBar />`) since it needs a fixed position + safe-area-inset padding for iOS.
2. The 4 tab routes are all under `app/(tabs)/` so they share the layout. Settings (`/app/ajustes`) is a sibling route that uses the same shell but hides the bottom bar.
3. Icons from `lucide-react` (`Inbox`, `Users`, `Wallet`, `Calendar`).
4. The desktop "phone frame" treatment uses a centered `<div class="max-w-[420px] mx-auto min-h-dvh shadow-2xl">`. Background outside the frame is `bg-zinc-100`.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/F4-app-shell.md` after F3 + F7 are Done
