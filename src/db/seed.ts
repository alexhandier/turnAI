/**
 * Seed — full demo state for TurnAI.
 *
 * Sim clock anchor: 2026-06-15 10:00 ART (Monday, mid-month).
 * All timestamps are computed relative to this anchor.
 *
 * Dashboard targets (after seed):
 *   ~6 sessions attended this month (June)
 *   ~5 turns upcoming
 *   1 outstanding balance (Florencia Jun 15 session)
 */

import { db } from "./index";
import {
  conversations,
  messages,
  patients,
  payments,
  pricing,
  pros,
  simClock,
  slots,
  turns,
} from "./schema";

// ─── Stable IDs ───────────────────────────────────────────────────────────────
// Fixed UUIDs so re-seeding is idempotent (no orphaned rows from stale refs).

const PRO_ID = "00000000-0000-0000-0000-000000000001";

const PATIENT = {
  maria: "10000000-0000-0000-0000-000000000001",
  lucas: "10000000-0000-0000-0000-000000000002",
  camila: "10000000-0000-0000-0000-000000000003",
  tomas: "10000000-0000-0000-0000-000000000004",
  florencia: "10000000-0000-0000-0000-000000000005",
};

const CONV = {
  maria: "20000000-0000-0000-0000-000000000001",
  lucas: "20000000-0000-0000-0000-000000000002",
  camila: "20000000-0000-0000-0000-000000000003",
  tomas: "20000000-0000-0000-0000-000000000004",
  florencia: "20000000-0000-0000-0000-000000000005",
};

// ─── Time helpers ─────────────────────────────────────────────────────────────

/** Creates a Date at the given local Buenos Aires time (ART = UTC-3). */
function ba(yyyymmdd: string, hour: number, minute = 0): Date {
  return new Date(
    `${yyyymmdd}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00-03:00`
  );
}

// Sim clock anchor
const ANCHOR = ba("2026-06-15", 10);

// Relative helpers
function daysAgo(n: number, hour = 10, minute = 0): Date {
  const d = new Date(ANCHOR);
  d.setUTCDate(d.getUTCDate() - n);
  d.setUTCHours(hour + 3, minute, 0, 0);
  return d;
}

// ─── Pricing constants ────────────────────────────────────────────────────────

const SESSION_PRICE = 2_500_000; // 25.000 ARS in cents
const DEPOSIT = 750_000; // 7.500 ARS in cents

// ─── Main ─────────────────────────────────────────────────────────────────────

export async function seed() {
  console.log("🌱 Seeding database…");

  // 1. Wipe in reverse FK dependency order
  await db.delete(payments);
  await db.delete(turns);
  await db.delete(slots);
  await db.delete(messages);
  await db.delete(conversations);
  await db.delete(patients);
  await db.delete(pricing);
  await db.delete(pros);
  await db.delete(simClock);

  console.log("  ✓ Tables cleared");

  // 2. Simulated clock
  await db.insert(simClock).values({ id: 1, nowAt: ANCHOR });

  // 3. Pro
  await db.insert(pros).values({
    id: PRO_ID,
    name: "Lic. Sofía García",
    specialty: "Psicóloga",
    photoUrl: "https://i.pravatar.cc/150?u=sofia-garcia-turnai",
    createdAt: ba("2026-01-10", 9),
  });

  // 4. Pricing
  await db.insert(pricing).values({
    proId: PRO_ID,
    sessionPriceCents: SESSION_PRICE,
    depositCents: DEPOSIT,
    currency: "ARS",
    updatedAt: ba("2026-03-01", 9),
  });

  // 5. Patients
  await db.insert(patients).values([
    {
      id: PATIENT.maria,
      proId: PRO_ID,
      name: "María Fernández",
      whatsappNumber: "+54 9 11 5234-6789",
      email: "maria.fernandez89@gmail.com",
      status: "new",
      createdAt: daysAgo(0, 9, 15),
      updatedAt: daysAgo(0, 9, 15),
    },
    {
      id: PATIENT.lucas,
      proId: PRO_ID,
      name: "Lucas Rodríguez",
      whatsappNumber: "+54 9 11 4871-3320",
      email: "lucas.rodriguez.arg@gmail.com",
      status: "new",
      createdAt: daysAgo(1, 15, 0),
      updatedAt: daysAgo(1, 15, 0),
    },
    {
      id: PATIENT.camila,
      proId: PRO_ID,
      name: "Camila Pérez",
      whatsappNumber: "+54 9 11 6053-1247",
      email: "camila.perez94@gmail.com",
      status: "active",
      createdAt: ba("2026-04-28", 10),
      updatedAt: daysAgo(6, 17),
    },
    {
      id: PATIENT.tomas,
      proId: PRO_ID,
      name: "Tomás Álvarez",
      whatsappNumber: "+54 9 11 3987-5601",
      email: "tomasalvarez91@gmail.com",
      status: "active",
      createdAt: ba("2026-03-15", 11),
      updatedAt: daysAgo(4, 10),
    },
    {
      id: PATIENT.florencia,
      proId: PRO_ID,
      name: "Florencia Gómez",
      whatsappNumber: "+54 9 11 7124-8830",
      email: "flor.gomez.bsas@gmail.com",
      status: "active",
      createdAt: ba("2026-01-20", 9),
      updatedAt: daysAgo(0, 9),
    },
  ]);

  // 6. Conversations
  await db.insert(conversations).values([
    {
      id: CONV.maria,
      proId: PRO_ID,
      patientId: PATIENT.maria,
      contactName: "María Fernández",
      contactWhatsapp: "+54 9 11 5234-6789",
      lastMessageAt: daysAgo(0, 9, 15),
      unreadCount: 2,
      createdAt: daysAgo(0, 9, 15),
    },
    {
      id: CONV.lucas,
      proId: PRO_ID,
      patientId: PATIENT.lucas,
      contactName: "Lucas Rodríguez",
      contactWhatsapp: "+54 9 11 4871-3320",
      lastMessageAt: daysAgo(0, 10, 30),
      unreadCount: 1,
      createdAt: daysAgo(1, 15, 0),
    },
    {
      id: CONV.camila,
      proId: PRO_ID,
      patientId: PATIENT.camila,
      contactName: "Camila Pérez",
      contactWhatsapp: "+54 9 11 6053-1247",
      lastMessageAt: daysAgo(6, 17, 10),
      unreadCount: 0,
      createdAt: ba("2026-04-28", 10),
    },
    {
      id: CONV.tomas,
      proId: PRO_ID,
      patientId: PATIENT.tomas,
      contactName: "Tomás Álvarez",
      contactWhatsapp: "+54 9 11 3987-5601",
      lastMessageAt: daysAgo(4, 11, 20),
      unreadCount: 0,
      createdAt: ba("2026-03-15", 11),
    },
    {
      id: CONV.florencia,
      proId: PRO_ID,
      patientId: PATIENT.florencia,
      contactName: "Florencia Gómez",
      contactWhatsapp: "+54 9 11 7124-8830",
      lastMessageAt: daysAgo(0, 9, 45),
      unreadCount: 0,
      createdAt: ba("2026-01-20", 9),
    },
  ]);

  // 7. Messages
  await db.insert(messages).values([
    // ── María: new lead, 2 inbound messages ──────────────────────────────────
    {
      conversationId: CONV.maria,
      direction: "inbound",
      body: "Hola! Vi tu perfil en Instagram y me interesa sacar turno para una primera consulta. ¿Tenés disponibilidad esta semana?",
      sentAt: daysAgo(0, 9, 10),
      kind: "text",
    },
    {
      conversationId: CONV.maria,
      direction: "inbound",
      body: "Me recomendaste una amiga que es paciente tuya. Soy de Palermo, así que me queda bien la zona.",
      sentAt: daysAgo(0, 9, 15),
      kind: "text",
    },

    // ── Lucas: mid-conversation, 5 messages ──────────────────────────────────
    {
      conversationId: CONV.lucas,
      direction: "inbound",
      body: "Buenas tardes, Sofía. Quería consultar si tenés turnos disponibles para la semana que viene.",
      sentAt: daysAgo(1, 15, 0),
      kind: "text",
    },
    {
      conversationId: CONV.lucas,
      direction: "outbound",
      body: "Hola Lucas, ¡buen día! Sí, tengo disponibilidad. ¿Qué días te quedan mejor?",
      sentAt: daysAgo(1, 15, 45),
      kind: "text",
    },
    {
      conversationId: CONV.lucas,
      direction: "inbound",
      body: "Me vendrían bien los martes o jueves, preferentemente después de las 18.",
      sentAt: daysAgo(1, 16, 20),
      kind: "text",
    },
    {
      conversationId: CONV.lucas,
      direction: "outbound",
      body: "Perfecto, tengo el martes 16 a las 18:00 o el jueves 18 a las 19:00. ¿Cuál te viene mejor?",
      sentAt: daysAgo(1, 17, 5),
      kind: "text",
    },
    {
      conversationId: CONV.lucas,
      direction: "inbound",
      body: "Dale, te confirmo mañana a la mañana si podés esperarme.",
      sentAt: daysAgo(0, 10, 30),
      kind: "text",
    },

    // ── Camila: returning patient, 8 messages ────────────────────────────────
    {
      conversationId: CONV.camila,
      direction: "outbound",
      body: "¡Hola Camila! Te recuerdo que mañana tenés turno a las 17:00. ¡Hasta mañana! 😊",
      sentAt: daysAgo(40, 10),
      kind: "reminder",
    },
    {
      conversationId: CONV.camila,
      direction: "inbound",
      body: "Dale, ahí estaré. ¡Gracias por el aviso!",
      sentAt: daysAgo(40, 10, 30),
      kind: "text",
    },
    {
      conversationId: CONV.camila,
      direction: "outbound",
      body: "¡Hola Camila! Recordatorio de tu sesión mañana a las 17:00. ¿Todo bien?",
      sentAt: daysAgo(26, 10),
      kind: "reminder",
    },
    {
      conversationId: CONV.camila,
      direction: "inbound",
      body: "Sí, perfecta. Tengo ganas de hablar sobre lo de la semana, estuvo movida.",
      sentAt: daysAgo(26, 10, 15),
      kind: "text",
    },
    {
      conversationId: CONV.camila,
      direction: "outbound",
      body: "¡Hola Cami! Tu turno de mañana sigue confirmado, a las 17:00. ¡Nos vemos!",
      sentAt: daysAgo(13, 10),
      kind: "reminder",
    },
    {
      conversationId: CONV.camila,
      direction: "outbound",
      body: "¡Hola Camila! Recordatorio para mañana a las 17:00. 😊",
      sentAt: daysAgo(6, 10),
      kind: "reminder",
    },
    {
      conversationId: CONV.camila,
      direction: "inbound",
      body: "¡Anotada! Oye, ¿puedo traer algo escrito esta vez? Quiero contarte sobre un sueño recurrente que tuve.",
      sentAt: daysAgo(6, 17, 0),
      kind: "text",
    },
    {
      conversationId: CONV.camila,
      direction: "outbound",
      body: "¡Claro que sí! Todo lo que quieras traer es bienvenido. ¡Hasta mañana!",
      sentAt: daysAgo(6, 17, 10),
      kind: "text",
    },

    // ── Tomás: no-show, 5 messages ───────────────────────────────────────────
    {
      conversationId: CONV.tomas,
      direction: "outbound",
      body: "Hola Tomás! Te recuerdo que mañana a las 17:00 tenés tu sesión. ¡Nos vemos!",
      sentAt: daysAgo(5, 10),
      kind: "reminder",
    },
    {
      conversationId: CONV.tomas,
      direction: "outbound",
      body: "Hola Tomás, noté que hoy no pudiste venir. Espero que estés bien. Si querés, coordinamos un nuevo turno cuando puedas.",
      sentAt: daysAgo(4, 18),
      kind: "text",
    },
    {
      conversationId: CONV.tomas,
      direction: "inbound",
      body: "Perdón Sofía, se me fue completamente de la cabeza. ¿Puedo recuperar el turno?",
      sentAt: daysAgo(4, 18, 30),
      kind: "text",
    },
    {
      conversationId: CONV.tomas,
      direction: "outbound",
      body: "Entiendo, pasa. Como está en las condiciones que acordamos, el depósito queda retenido. Cuando quieras nos volvemos a coordinar, ¡no hay apuro!",
      sentAt: daysAgo(4, 18, 45),
      kind: "text",
    },
    {
      conversationId: CONV.tomas,
      direction: "inbound",
      body: "Dale, sí. Gracias por la buena onda. Te escribo esta semana para ver días.",
      sentAt: daysAgo(4, 11, 20),
      kind: "text",
    },

    // ── Florencia: long-time patient, 6 messages ─────────────────────────────
    {
      conversationId: CONV.florencia,
      direction: "outbound",
      body: "¡Hola Flor! Recordatorio de tu sesión de mañana a las 9:00. 😊",
      sentAt: daysAgo(22, 10),
      kind: "reminder",
    },
    {
      conversationId: CONV.florencia,
      direction: "inbound",
      body: "¡Anotada! Che, ¿podemos hablar un poco sobre lo que trabajamos la última vez? Tuve una semana rara.",
      sentAt: daysAgo(22, 10, 20),
      kind: "text",
    },
    {
      conversationId: CONV.florencia,
      direction: "outbound",
      body: "¡Por supuesto! Para eso estamos. Te espero mañana.",
      sentAt: daysAgo(22, 10, 35),
      kind: "text",
    },
    {
      conversationId: CONV.florencia,
      direction: "outbound",
      body: "¡Hola Florencia! Te recuerdo tu sesión de hoy a las 9:00. ¡Buena semana! 🌱",
      sentAt: daysAgo(0, 8),
      kind: "reminder",
    },
    {
      conversationId: CONV.florencia,
      direction: "inbound",
      body: "¡Ya estoy lista! Buenísimo empezar la semana con la sesión.",
      sentAt: daysAgo(0, 8, 15),
      kind: "text",
    },
    {
      conversationId: CONV.florencia,
      direction: "outbound",
      body: "¡Excelente! Nos vemos en un rato. ☀️",
      sentAt: daysAgo(0, 8, 30),
      kind: "text",
    },
  ]);

  console.log("  ✓ Patients, conversations, messages inserted");

  // 8. Slots
  // ─ Camila's past turns (Tuesdays 17:00) + future (marked booked separately)
  // ─ Florencia's past turns (Tuesdays 9:00) + future
  // ─ Tomás's no-show (Thursday 17:00)
  // ─ 10+ open slots next 14 days (Mon–Fri 14–20)

  const slotRows: {
    id: string;
    proId: string;
    startAt: Date;
    endAt: Date;
    status: "open" | "booked" | "blocked";
    createdAt: Date;
  }[] = [];

  // Helper to add a slot
  let slotSeq = 0;
  function mkSlot(
    yyyymmdd: string,
    startHour: number,
    status: "open" | "booked" | "blocked" = "open"
  ): string {
    slotSeq++;
    const id = `30000000-0000-0000-0000-${String(slotSeq).padStart(12, "0")}`;
    slotRows.push({
      id,
      proId: PRO_ID,
      startAt: ba(yyyymmdd, startHour),
      endAt: ba(yyyymmdd, startHour + 1, 40), // 100-min slots (therapy hour = 50 min, but slot blocks the hour+)
      status,
      createdAt: ba("2026-01-10", 9),
    });
    return id;
  }

  // Past booked slots — Camila Tuesdays 17:00
  const slotCamila1 = mkSlot("2026-05-06", 17, "booked");
  const slotCamila2 = mkSlot("2026-05-13", 17, "booked");
  const slotCamila3 = mkSlot("2026-05-20", 17, "booked");
  const slotCamila4 = mkSlot("2026-05-27", 17, "booked");
  const slotCamila5 = mkSlot("2026-06-03", 17, "booked");
  const slotCamila6 = mkSlot("2026-06-10", 17, "booked");
  // Upcoming — Camila
  const slotCamilaU1 = mkSlot("2026-06-16", 17, "booked"); // tomorrow
  const slotCamilaU2 = mkSlot("2026-06-23", 17, "booked");

  // Past booked slots — Florencia Tuesdays 9:00
  const slotFlor1 = mkSlot("2026-04-07", 9, "booked");
  const slotFlor2 = mkSlot("2026-04-14", 9, "booked");
  const slotFlor3 = mkSlot("2026-04-21", 9, "booked");
  const slotFlor4 = mkSlot("2026-04-28", 9, "booked");
  const slotFlor5 = mkSlot("2026-05-05", 9, "booked");
  const slotFlor6 = mkSlot("2026-05-12", 9, "booked");
  const slotFlor7 = mkSlot("2026-05-19", 9, "booked");
  const slotFlor8 = mkSlot("2026-05-26", 9, "booked");
  const slotFlor9 = mkSlot("2026-06-02", 9, "booked");
  const slotFlor10 = mkSlot("2026-06-09", 9, "booked");
  const slotFlor11 = mkSlot("2026-06-15", 9, "booked"); // TODAY — attended, outstanding balance
  // Upcoming — Florencia
  const slotFlorU1 = mkSlot("2026-06-16", 9, "booked"); // tomorrow
  const slotFlorU2 = mkSlot("2026-06-23", 9, "booked");
  const slotFlorU3 = mkSlot("2026-06-30", 9, "booked");

  // Past booked slot — Tomás no-show (last Thursday)
  const slotTomas1 = mkSlot("2026-06-11", 17, "booked");

  // 10+ open slots next 14 days (Mon–Fri, 14:00–19:00)
  // Week 1: Jun 16 (Tue) – Jun 19 (Fri) — Jun 15 Mon is mostly taken
  // Jun 16 Tue: 14,15,16,18,19 open (17 is Camila's, 9 is Florencia's)
  mkSlot("2026-06-16", 14);
  mkSlot("2026-06-16", 15);
  mkSlot("2026-06-16", 16);
  mkSlot("2026-06-16", 18);
  mkSlot("2026-06-16", 19);
  // Jun 17 Wed
  mkSlot("2026-06-17", 14);
  mkSlot("2026-06-17", 15);
  mkSlot("2026-06-17", 16);
  mkSlot("2026-06-17", 17);
  mkSlot("2026-06-17", 18);
  mkSlot("2026-06-17", 19);
  // Jun 18 Thu
  mkSlot("2026-06-18", 14);
  mkSlot("2026-06-18", 15);
  mkSlot("2026-06-18", 16);
  mkSlot("2026-06-18", 17);
  mkSlot("2026-06-18", 18);
  mkSlot("2026-06-18", 19);
  // Jun 19 Fri
  mkSlot("2026-06-19", 14);
  mkSlot("2026-06-19", 15);
  mkSlot("2026-06-19", 16);
  mkSlot("2026-06-19", 17);
  // Week 2: Jun 22–26
  mkSlot("2026-06-22", 14);
  mkSlot("2026-06-22", 15);
  mkSlot("2026-06-22", 16);
  mkSlot("2026-06-22", 17);
  mkSlot("2026-06-22", 18);
  mkSlot("2026-06-22", 19);
  mkSlot("2026-06-24", 14);
  mkSlot("2026-06-24", 15);
  mkSlot("2026-06-24", 16);
  mkSlot("2026-06-24", 17);
  mkSlot("2026-06-24", 18);
  mkSlot("2026-06-25", 14);
  mkSlot("2026-06-25", 15);
  mkSlot("2026-06-25", 17);

  await db.insert(slots).values(slotRows);
  console.log(`  ✓ ${slotRows.length} slots inserted`);

  // 9. Turns
  const turnRows: {
    id: string;
    proId: string;
    slotId: string;
    patientId: string;
    startAt: Date;
    endAt: Date;
    sessionPriceCents: number;
    depositCents: number;
    status: "reserved" | "attended" | "no_show" | "canceled";
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[] = [];

  // Helper
  let turnSeq = 0;
  function mkTurn(
    slotId: string,
    patientId: string,
    yyyymmdd: string,
    startHour: number,
    status: "reserved" | "attended" | "no_show" | "canceled",
    notes: string | null
  ): string {
    turnSeq++;
    const id = `40000000-0000-0000-0000-${String(turnSeq).padStart(12, "0")}`;
    const startAt = ba(yyyymmdd, startHour);
    const endAt = ba(yyyymmdd, startHour, 50);
    // booked ~3 days before the session
    const createdAt = new Date(startAt.getTime() - 3 * 24 * 60 * 60 * 1000);
    const updatedAt = new Date(startAt.getTime() + 60 * 60 * 1000);
    turnRows.push({
      id,
      proId: PRO_ID,
      slotId,
      patientId,
      startAt,
      endAt,
      sessionPriceCents: SESSION_PRICE,
      depositCents: DEPOSIT,
      status,
      notes,
      createdAt,
      updatedAt,
    });
    return id;
  }

  // Camila — past attended
  const turnCamila1 = mkTurn(slotCamila1, PATIENT.camila, "2026-05-06", 17, "attended",
    "Primera sesión con Camila. Refiere ansiedad relacionada con presión laboral y expectativas propias. Buen nivel de insight y disposición para el trabajo terapéutico. Se acordó trabajar técnicas de gestión del estrés.");
  const turnCamila2 = mkTurn(slotCamila2, PATIENT.camila, "2026-05-13", 17, "attended",
    "Continúa el trabajo sobre ansiedad laboral. Reporta leve mejoría en situaciones de presión. Se incorporaron estrategias de auto-observación. Tarea: registro de pensamientos automáticos durante la semana.");
  const turnCamila3 = mkTurn(slotCamila3, PATIENT.camila, "2026-05-20", 17, "attended",
    "Trae material sobre conflicto con su jefa directa. Se exploran patrones relacionales y dinámicas de autoridad. Buena conexión entre historia personal y situación actual. Aparecen temas de autoafirmación.");
  const turnCamila4 = mkTurn(slotCamila4, PATIENT.camila, "2026-05-27", 17, "attended",
    "Semana con menos carga laboral. Paciente refiere mejoría en el estado de ánimo. Se trabaja autoestima y reconocimiento de logros propios. Buena evolución general, se mantiene el encuadre.");
  const turnCamila5 = mkTurn(slotCamila5, PATIENT.camila, "2026-06-03", 17, "attended",
    "Trae un sueño recurrente con figura materna. Se inicia exploración de ese material. Aparecen temas de dependencia y necesidad de aprobación. Sesión productiva, paciente muy comprometida.");
  const turnCamila6 = mkTurn(slotCamila6, PATIENT.camila, "2026-06-10", 17, "attended",
    "Seguimiento sobre el trabajo de la sesión anterior. Paciente refiere haber podido establecer un límite en el trabajo durante la semana. Pequeño pero significativo avance. Se refuerza la capacidad de auto-cuidado.");
  // Camila — upcoming
  mkTurn(slotCamilaU1, PATIENT.camila, "2026-06-16", 17, "reserved", null);
  mkTurn(slotCamilaU2, PATIENT.camila, "2026-06-23", 17, "reserved", null);

  // Florencia — past attended
  const turnFlor1 = mkTurn(slotFlor1, PATIENT.florencia, "2026-04-07", 9, "attended",
    "Retomamos después de las vacaciones. Florencia trae reflexiones sobre un viaje familiar que removió cuestiones vinculares antiguas. Buena apertura para explorar el material. Se acuerda foco en relaciones familiares este mes.");
  const turnFlor2 = mkTurn(slotFlor2, PATIENT.florencia, "2026-04-14", 9, "attended",
    "Continúa el trabajo sobre vínculos familiares. Emerge tema de rivalidad con hermana. Paciente muestra capacidad de insight y humor para distanciarse del material. Intervenciones centradas en escucha activa.");
  const turnFlor3 = mkTurn(slotFlor3, PATIENT.florencia, "2026-04-21", 9, "attended",
    "Sesión focalizada en la relación con la pareja. Florencia describe dificultades para expresar necesidades propias en el vínculo. Se trabaja la diferencia entre pedir y exigir. Tarea: carta que no se envía.");
  const turnFlor4 = mkTurn(slotFlor4, PATIENT.florencia, "2026-04-28", 9, "attended",
    "Trajo la carta de tarea. Lectura y reflexión conjunta. Aparece mucho material sobre miedo al abandono. Se abre una línea de trabajo relevante. Paciente emocionada pero contenida.");
  const turnFlor5 = mkTurn(slotFlor5, PATIENT.florencia, "2026-05-05", 9, "attended",
    "Seguimiento sobre el trabajo de miedo al abandono. Florencia conecta este patrón con experiencias tempranas. Buena elaboración. Se propone seguir con este eje las próximas sesiones.");
  const turnFlor6 = mkTurn(slotFlor6, PATIENT.florencia, "2026-05-12", 9, "attended",
    "Sesión más tranquila. Paciente refiere semana positiva, se nota en el tono del relato. Se revisan avances desde el inicio del proceso. Florencia reconoce cambios concretos en su forma de relacionarse.");
  const turnFlor7 = mkTurn(slotFlor7, PATIENT.florencia, "2026-05-19", 9, "attended",
    "Trae situación de conflicto con compañera de trabajo. Se exploran respuestas propias y alternativas. Trabajo sobre asertividad y expresión de malestar de forma no agresiva. Intervenciones directivas.");
  const turnFlor8 = mkTurn(slotFlor8, PATIENT.florencia, "2026-05-26", 9, "attended",
    "Sesión de cierre de mes. Paciente en buen momento. Se consolida lo trabajado sobre relaciones y autoimagen. Se mantiene la frecuencia semanal por decisión de la paciente. Muy buena alianza terapéutica.");
  const turnFlor9 = mkTurn(slotFlor9, PATIENT.florencia, "2026-06-02", 9, "attended",
    "Inicio de junio. Florencia trae reflexiones sobre metas de mitad de año. Trabaja sobre la diferencia entre logros externos y bienestar interno. Sesión reflexiva y de buen tono general.");
  const turnFlor10 = mkTurn(slotFlor10, PATIENT.florencia, "2026-06-09", 9, "attended",
    "Semana con mucha carga laboral. Paciente bien regulada emocionalmente a pesar del estrés. Se refuerzan las herramientas adquiridas. Breve trabajo sobre el manejo del tiempo y las prioridades.");
  const turnFlor11 = mkTurn(slotFlor11, PATIENT.florencia, "2026-06-15", 9, "attended",
    "Sesión de hoy. Florencia trae sueño significativo sobre su madre. Se inicia exploración del material onírico. Alta implicación emocional, sesión profunda. Se acuerda continuar en el próximo encuentro.");
  // Florencia — upcoming
  mkTurn(slotFlorU1, PATIENT.florencia, "2026-06-16", 9, "reserved", null);
  mkTurn(slotFlorU2, PATIENT.florencia, "2026-06-23", 9, "reserved", null);
  mkTurn(slotFlorU3, PATIENT.florencia, "2026-06-30", 9, "reserved", null);

  // Tomás — no-show
  const turnTomas1 = mkTurn(slotTomas1, PATIENT.tomas, "2026-06-11", 17, "no_show", null);

  await db.insert(turns).values(turnRows);
  console.log(`  ✓ ${turnRows.length} turns inserted`);

  // 10. Payments
  const payRows: {
    proId: string;
    turnId: string;
    patientId: string;
    amountCents: number;
    kind: "deposit" | "balance" | "refund";
    paidAt: Date;
    createdAt: Date;
  }[] = [];

  function pay(
    turnId: string,
    patientId: string,
    yyyymmdd: string,
    kind: "deposit" | "balance",
    daysAfterSession = 0
  ) {
    const base = ba(yyyymmdd, kind === "deposit" ? 12 : 18);
    const paidAt = new Date(base.getTime() + daysAfterSession * 24 * 60 * 60 * 1000);
    payRows.push({
      proId: PRO_ID,
      turnId,
      patientId,
      amountCents: kind === "deposit" ? DEPOSIT : SESSION_PRICE - DEPOSIT,
      kind,
      paidAt,
      createdAt: paidAt,
    });
  }

  // Camila — deposit + balance for all attended turns
  pay(turnCamila1, PATIENT.camila, "2026-05-03", "deposit"); // deposit at booking
  pay(turnCamila1, PATIENT.camila, "2026-05-06", "balance"); // balance after session
  pay(turnCamila2, PATIENT.camila, "2026-05-10", "deposit");
  pay(turnCamila2, PATIENT.camila, "2026-05-13", "balance");
  pay(turnCamila3, PATIENT.camila, "2026-05-17", "deposit");
  pay(turnCamila3, PATIENT.camila, "2026-05-20", "balance");
  pay(turnCamila4, PATIENT.camila, "2026-05-24", "deposit");
  pay(turnCamila4, PATIENT.camila, "2026-05-27", "balance");
  pay(turnCamila5, PATIENT.camila, "2026-05-31", "deposit");
  pay(turnCamila5, PATIENT.camila, "2026-06-03", "balance");
  pay(turnCamila6, PATIENT.camila, "2026-06-07", "deposit");
  pay(turnCamila6, PATIENT.camila, "2026-06-10", "balance");

  // Florencia — all past sessions fully paid
  pay(turnFlor1, PATIENT.florencia, "2026-04-04", "deposit");
  pay(turnFlor1, PATIENT.florencia, "2026-04-07", "balance");
  pay(turnFlor2, PATIENT.florencia, "2026-04-11", "deposit");
  pay(turnFlor2, PATIENT.florencia, "2026-04-14", "balance");
  pay(turnFlor3, PATIENT.florencia, "2026-04-18", "deposit");
  pay(turnFlor3, PATIENT.florencia, "2026-04-21", "balance");
  pay(turnFlor4, PATIENT.florencia, "2026-04-25", "deposit");
  pay(turnFlor4, PATIENT.florencia, "2026-04-28", "balance");
  pay(turnFlor5, PATIENT.florencia, "2026-05-02", "deposit");
  pay(turnFlor5, PATIENT.florencia, "2026-05-05", "balance");
  pay(turnFlor6, PATIENT.florencia, "2026-05-09", "deposit");
  pay(turnFlor6, PATIENT.florencia, "2026-05-12", "balance");
  pay(turnFlor7, PATIENT.florencia, "2026-05-16", "deposit");
  pay(turnFlor7, PATIENT.florencia, "2026-05-19", "balance");
  pay(turnFlor8, PATIENT.florencia, "2026-05-23", "deposit");
  pay(turnFlor8, PATIENT.florencia, "2026-05-26", "balance");
  pay(turnFlor9, PATIENT.florencia, "2026-05-30", "deposit");
  pay(turnFlor9, PATIENT.florencia, "2026-06-02", "balance");
  pay(turnFlor10, PATIENT.florencia, "2026-06-06", "deposit");
  pay(turnFlor10, PATIENT.florencia, "2026-06-09", "balance");
  // Jun 15 session: deposit paid, balance NOT paid (outstanding)
  pay(turnFlor11, PATIENT.florencia, "2026-06-12", "deposit");
  // ← no balance payment for turnFlor11 → this is the outstanding balance

  // Tomás — deposit only (retained after no-show)
  pay(turnTomas1, PATIENT.tomas, "2026-06-08", "deposit");

  await db.insert(payments).values(payRows);
  console.log(`  ✓ ${payRows.length} payments inserted`);

  console.log("✅ Seed complete — sim_clock set to 2026-06-15 10:00 ART");
}
