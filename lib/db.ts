import { createClient, type Client, type Row } from "@libsql/client";
import { mkdirSync } from "fs";
import { join } from "path";

export type Rsvp = {
  id: string;
  locale: string;
  name: string;
  phone: string | null;
  attending: boolean;
  adults: number;
  children: number;
  note: string | null;
  createdAt: string;
};

let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

function getClient() {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  if (process.env.VERCEL && !url) {
    throw new Error(
      "Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN so RSVPs persist on Vercel.",
    );
  }
  if (url) {
    client = createClient({
      url,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    return client;
  }

  const file = join(process.cwd(), "data", "rsvps.db");
  mkdirSync(join(process.cwd(), "data"), { recursive: true });
  client = createClient({ url: `file:${file}` });
  return client;
}

async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = getClient()
      .execute(
        `CREATE TABLE IF NOT EXISTS rsvps (
          id TEXT PRIMARY KEY,
          locale TEXT NOT NULL,
          name TEXT NOT NULL,
          phone TEXT,
          attending INTEGER NOT NULL,
          adults INTEGER NOT NULL DEFAULT 0,
          children INTEGER NOT NULL DEFAULT 0,
          note TEXT,
          created_at TEXT NOT NULL
        )`,
      )
      .then(() => undefined);
  }
  await schemaReady;
}

function mapRow(row: Row): Rsvp {
  return {
    id: String(row.id),
    locale: String(row.locale),
    name: String(row.name),
    phone: row.phone == null ? null : String(row.phone),
    attending: Number(row.attending) === 1,
    adults: Number(row.adults),
    children: Number(row.children),
    note: row.note == null ? null : String(row.note),
    createdAt: String(row.created_at),
  };
}

export async function createRsvp(input: {
  locale: string;
  name: string;
  phone?: string;
  attending: boolean;
  adults: number;
  children: number;
  note?: string;
}) {
  await ensureSchema();
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  await getClient().execute({
    sql: `INSERT INTO rsvps (id, locale, name, phone, attending, adults, children, note, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      input.locale,
      input.name,
      input.phone || null,
      input.attending ? 1 : 0,
      input.adults,
      input.children,
      input.note || null,
      createdAt,
    ],
  });
  return id;
}

export async function listRsvps(): Promise<Rsvp[]> {
  await ensureSchema();
  const result = await getClient().execute(
    "SELECT * FROM rsvps ORDER BY created_at DESC",
  );
  return result.rows.map(mapRow);
}

export function summarize(rsvps: Rsvp[]) {
  const attending = rsvps.filter((row) => row.attending);
  const declined = rsvps.filter((row) => !row.attending);
  return {
    responses: rsvps.length,
    attendingParties: attending.length,
    declinedParties: declined.length,
    adults: attending.reduce((sum, row) => sum + row.adults, 0),
    children: attending.reduce((sum, row) => sum + row.children, 0),
    headcount: attending.reduce(
      (sum, row) => sum + row.adults + row.children,
      0,
    ),
  };
}
