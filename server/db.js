const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const dataDir = process.env.DATA_DIR || path.join(__dirname, "..", "data");
fs.mkdirSync(dataDir, { recursive: true });

const dbPath = process.env.DATABASE_PATH || path.join(dataDir, "splittrip.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS trips (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL DEFAULT '',
    version INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS participants (
    id TEXT PRIMARY KEY,
    trip_id TEXT NOT NULL,
    name TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    is_creator INTEGER NOT NULL DEFAULT 0,
    person_index INTEGER NOT NULL,
    joined_at TEXT NOT NULL,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS expenses (
    id TEXT PRIMARY KEY,
    trip_id TEXT NOT NULL,
    amount REAL NOT NULL,
    currency TEXT NOT NULL,
    reason TEXT NOT NULL,
    mode TEXT NOT NULL,
    person_ids TEXT NOT NULL,
    paid_by INTEGER NOT NULL,
    date TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_participants_trip ON participants(trip_id);
  CREATE INDEX IF NOT EXISTS idx_participants_token ON participants(token);
  CREATE INDEX IF NOT EXISTS idx_expenses_trip ON expenses(trip_id);
  CREATE INDEX IF NOT EXISTS idx_trips_code ON trips(code);
`);

function bumpVersion(tripId) {
  const now = new Date().toISOString();
  db.prepare(
    `UPDATE trips SET version = version + 1, updated_at = ? WHERE id = ?`
  ).run(now, tripId);
}

function getTripByCode(code) {
  return db
    .prepare(`SELECT * FROM trips WHERE upper(code) = upper(?)`)
    .get(String(code || "").trim());
}

function getTripById(id) {
  return db.prepare(`SELECT * FROM trips WHERE id = ?`).get(id);
}

function getParticipantByToken(token) {
  return db.prepare(`SELECT * FROM participants WHERE token = ?`).get(token);
}

function listParticipants(tripId) {
  return db
    .prepare(
      `SELECT id, name, is_creator, person_index, joined_at
       FROM participants WHERE trip_id = ? ORDER BY person_index ASC`
    )
    .all(tripId);
}

function listExpenses(tripId) {
  return db
    .prepare(
      `SELECT id, amount, currency, reason, mode, person_ids, paid_by, date, created_at
       FROM expenses WHERE trip_id = ? ORDER BY created_at DESC`
    )
    .all(tripId)
    .map((row) => ({
      id: row.id,
      amount: row.amount,
      currency: row.currency,
      reason: row.reason,
      mode: row.mode,
      personIds: JSON.parse(row.person_ids),
      paidBy: row.paid_by,
      date: row.date,
      createdAt: row.created_at,
    }));
}

function serializeTrip(trip) {
  const participants = listParticipants(trip.id);
  const people = participants.map((p) => p.name);
  return {
    id: trip.id,
    code: trip.code,
    tripName: trip.name,
    version: trip.version,
    createdAt: trip.created_at,
    updatedAt: trip.updated_at,
    people,
    participants: participants.map((p) => ({
      id: p.id,
      name: p.name,
      isCreator: Boolean(p.is_creator),
      personIndex: p.person_index,
      joinedAt: p.joined_at,
    })),
    expenses: listExpenses(trip.id),
  };
}

module.exports = {
  db,
  dbPath,
  bumpVersion,
  getTripByCode,
  getTripById,
  getParticipantByToken,
  listParticipants,
  listExpenses,
  serializeTrip,
};
