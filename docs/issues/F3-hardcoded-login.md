# F3 — Hardcoded `benja` login + protect `/app/*` routes

**Phase:** Foundation · **Priority:** P1 · **Estimate:** XS · **Status:** Todo
**Dependencies:** F1
**Blocks:** all `/app/*` issues

## Context

Benja needs to log in to demo the app. No real auth. One account, hardcoded credentials, cookie-based session. Patient `/book/[link]` URLs are public.

## Acceptance Criteria

- [ ] Visiting `/app/*` while unauthenticated redirects to `/login`
- [ ] `/login` shows a minimal form: usuario + contraseña + "Ingresar" button
- [ ] Submitting `benja` / `turnai2026` (or chosen password — document in `README.md`) sets a signed httpOnly cookie and redirects to `/app/agenda`
- [ ] Wrong credentials show "Credenciales incorrectas"
- [ ] Logged-in user header link "Cerrar sesión" clears the cookie and returns to `/login`
- [ ] `/book/[link]` is publicly accessible (no auth check)

## Logic (inferred — confirm or override)

1. Use a Next.js `middleware.ts` that runs on `/app/:path*`. If the `tai_session` cookie is missing or invalid, redirect to `/login`.
2. The cookie value is a signed JWT (HMAC SHA-256, secret in env var `AUTH_SECRET`) with payload `{ user: 'benja' }`. No DB lookup needed.
3. Credentials live in env vars: `DEMO_USER=benja`, `DEMO_PASSWORD=<secret>`.
4. Login is a server action that compares submitted creds to env, sets the cookie, redirects.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/F3-hardcoded-login.md` after F1 is Done
