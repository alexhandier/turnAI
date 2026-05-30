import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const patientStatusEnum = pgEnum("patient_status", [
  "new",
  "active",
  "churned",
]);

export const messageDirectionEnum = pgEnum("message_direction", [
  "inbound",
  "outbound",
]);

export const messageKindEnum = pgEnum("message_kind", [
  "text",
  "booking_link",
  "reminder",
]);

export const slotStatusEnum = pgEnum("slot_status", [
  "open",
  "booked",
  "blocked",
]);

export const turnStatusEnum = pgEnum("turn_status", [
  "reserved",
  "attended",
  "no_show",
  "canceled",
]);

export const paymentKindEnum = pgEnum("payment_kind", [
  "deposit",
  "balance",
  "refund",
]);

// ─── Tables ───────────────────────────────────────────────────────────────────

/** Single pro — hardcoded. One row in production. */
export const pros = pgTable("pros", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  photoUrl: text("photo_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** Per-pro pricing config. One row per pro. */
export const pricing = pgTable("pricing", {
  proId: uuid("pro_id")
    .primaryKey()
    .references(() => pros.id),
  sessionPriceCents: integer("session_price_cents").notNull(),
  depositCents: integer("deposit_cents").notNull(),
  /** ISO 4217 currency code, e.g. "ARS" */
  currency: text("currency").notNull().default("ARS"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** Patients managed by the pro. */
export const patients = pgTable("patients", {
  id: uuid("id").primaryKey().defaultRandom(),
  proId: uuid("pro_id")
    .notNull()
    .references(() => pros.id),
  name: text("name").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  email: text("email"),
  status: patientStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** One inbox conversation per patient or unmatched lead. */
export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  proId: uuid("pro_id")
    .notNull()
    .references(() => pros.id),
  /** Null when the contact hasn't been converted to a patient yet. */
  patientId: uuid("patient_id").references(() => patients.id),
  contactName: text("contact_name").notNull(),
  contactWhatsapp: text("contact_whatsapp").notNull(),
  lastMessageAt: timestamp("last_message_at", { withTimezone: true }),
  unreadCount: integer("unread_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** Individual messages within a conversation. */
export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => conversations.id),
  direction: messageDirectionEnum("direction").notNull(),
  body: text("body").notNull(),
  sentAt: timestamp("sent_at", { withTimezone: true }).notNull().defaultNow(),
  kind: messageKindEnum("kind").notNull().default("text"),
});

/** Calendar slots. Open = available for booking. */
export const slots = pgTable("slots", {
  id: uuid("id").primaryKey().defaultRandom(),
  proId: uuid("pro_id")
    .notNull()
    .references(() => pros.id),
  startAt: timestamp("start_at", { withTimezone: true }).notNull(),
  endAt: timestamp("end_at", { withTimezone: true }).notNull(),
  status: slotStatusEnum("status").notNull().default("open"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** Booked appointments. A turn is created when a patient books a slot. */
export const turns = pgTable("turns", {
  id: uuid("id").primaryKey().defaultRandom(),
  proId: uuid("pro_id")
    .notNull()
    .references(() => pros.id),
  slotId: uuid("slot_id")
    .notNull()
    .references(() => slots.id),
  patientId: uuid("patient_id")
    .notNull()
    .references(() => patients.id),
  startAt: timestamp("start_at", { withTimezone: true }).notNull(),
  endAt: timestamp("end_at", { withTimezone: true }).notNull(),
  /** Snapshot of the price at booking time — not derived from pricing table. */
  sessionPriceCents: integer("session_price_cents").notNull(),
  depositCents: integer("deposit_cents").notNull(),
  status: turnStatusEnum("status").notNull().default("reserved"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** Payment records — deposits at booking, balance charges after attendance. */
export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  proId: uuid("pro_id")
    .notNull()
    .references(() => pros.id),
  turnId: uuid("turn_id")
    .notNull()
    .references(() => turns.id),
  patientId: uuid("patient_id")
    .notNull()
    .references(() => patients.id),
  /** Amount in cents. Always positive; kind determines meaning. */
  amountCents: integer("amount_cents").notNull(),
  kind: paymentKindEnum("kind").notNull(),
  paidAt: timestamp("paid_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/**
 * Simulated clock — always exactly one row (id = 1).
 * All "what time is it now?" queries read this instead of calling new Date().
 * S1 ("Simular día siguiente") increments nowAt by 24h.
 */
export const simClock = pgTable("sim_clock", {
  id: integer("id").primaryKey().default(1),
  nowAt: timestamp("now_at", { withTimezone: true }).notNull(),
});
