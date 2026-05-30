import { db } from "@/db";
import { sql } from "drizzle-orm";

/**
 * GET /api/health
 * Verifies the database connection is live.
 * Returns { ok: true, db: "1" } on success.
 */
export async function GET() {
  const result = await db.execute(sql`SELECT 1 AS ok`);
  return Response.json({ ok: true, db: result[0] });
}
