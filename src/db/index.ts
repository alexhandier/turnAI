import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// In serverless environments, cap at 1 connection per function instance.
// Neon's connection pooler handles the actual pool on their side.
const client = postgres(process.env.DATABASE_URL!, { max: 1 });

export const db = drizzle(client, { schema });

/**
 * Returns the current "simulated now" from the sim_clock table.
 * All time-sensitive queries MUST use this — never new Date() or Date.now().
 * S1 ("Simular día siguiente") increments this by 24h to simulate the next day.
 */
export async function getNow(): Promise<Date> {
  const rows = await db.select().from(schema.simClock).limit(1);
  if (rows.length === 0) {
    throw new Error(
      "sim_clock is empty — run the seed script first (POST /api/reset)"
    );
  }
  return rows[0].nowAt;
}
