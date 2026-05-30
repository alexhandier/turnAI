import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { seed } from "@/db/seed";

/**
 * POST /api/reset
 * Wipes the DB and re-seeds demo data. Auth-gated (tai_session cookie).
 * Returns { ok: true, resetAt: <ISO> } on success.
 */
export async function POST() {
  const jar = await cookies();
  const token = jar.get("tai_session")?.value;

  if (!token || !(await verifyToken(token))) {
    return Response.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  await seed();

  return Response.json({ ok: true, resetAt: new Date().toISOString() });
}
