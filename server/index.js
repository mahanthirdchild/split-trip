const path = require("path");
const express = require("express");
const cors = require("cors");
const { customAlphabet } = require("nanoid");
const {
  db,
  bumpVersion,
  getTripByCode,
  getTripById,
  getParticipantByToken,
  listParticipants,
  serializeTrip,
} = require("./db");

const PORT = Number(process.env.PORT || 8080);
const MAX_PARTICIPANTS = 10;
const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12);
const codeAlphabet = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 6);

const app = express();
app.disable("x-powered-by");
app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

function publicBase(req) {
  const proto = req.get("x-forwarded-proto") || req.protocol || "https";
  const host = req.get("x-forwarded-host") || req.get("host");
  return `${proto}://${host}`;
}

function auth(req, res, next) {
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) {
    return res.status(401).json({ error: "missing_token" });
  }
  const participant = getParticipantByToken(token);
  if (!participant) {
    return res.status(401).json({ error: "invalid_token" });
  }
  const trip = getTripById(participant.trip_id);
  if (!trip) {
    return res.status(404).json({ error: "trip_not_found" });
  }
  req.participant = participant;
  req.trip = trip;
  next();
}

function requireTripCode(req, res, next) {
  const trip = getTripByCode(req.params.code);
  if (!trip) {
    return res.status(404).json({ error: "trip_not_found" });
  }
  if (req.trip && req.trip.id !== trip.id) {
    return res.status(403).json({ error: "forbidden" });
  }
  if (req.trip && req.trip.id === trip.id) {
    return next();
  }
  // For routes with both auth and code, auth already set trip; ensure match
  req.trip = trip;
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "split-trip", maxParticipants: MAX_PARTICIPANTS });
});

app.post("/api/trips", (req, res) => {
  const tripName = String(req.body?.tripName || "").trim().slice(0, 80);
  const creatorName = String(req.body?.creatorName || "").trim().slice(0, 40) || "Person 1";
  if (!tripName) {
    return res.status(400).json({ error: "trip_name_required" });
  }

  let code = codeAlphabet();
  while (getTripByCode(code)) code = codeAlphabet();

  const tripId = nanoid();
  const token = nanoid() + nanoid();
  const participantId = nanoid();
  const now = new Date().toISOString();

  const tx = db.transaction(() => {
    db.prepare(
      `INSERT INTO trips (id, code, name, version, created_at, updated_at)
       VALUES (?, ?, ?, 1, ?, ?)`
    ).run(tripId, code, tripName, now, now);
    db.prepare(
      `INSERT INTO participants (id, trip_id, name, token, is_creator, person_index, joined_at)
       VALUES (?, ?, ?, ?, 1, 0, ?)`
    ).run(participantId, tripId, creatorName, token, now);
  });
  tx();

  const trip = serializeTrip(getTripById(tripId));
  res.status(201).json({
    token,
    isCreator: true,
    shareUrl: `${publicBase(req)}/?code=${code}`,
    joinCode: code,
    trip,
  });
});

app.post("/api/trips/join", (req, res) => {
  const code = String(req.body?.code || "").trim().toUpperCase();
  const name = String(req.body?.name || "").trim().slice(0, 40);
  if (!code || !name) {
    return res.status(400).json({ error: "code_and_name_required" });
  }
  const trip = getTripByCode(code);
  if (!trip) {
    return res.status(404).json({ error: "trip_not_found" });
  }
  const existing = listParticipants(trip.id);
  if (existing.length >= MAX_PARTICIPANTS) {
    return res.status(409).json({ error: "trip_full" });
  }

  const token = nanoid() + nanoid();
  const participantId = nanoid();
  const personIndex = existing.length;
  const now = new Date().toISOString();

  const tx = db.transaction(() => {
    db.prepare(
      `INSERT INTO participants (id, trip_id, name, token, is_creator, person_index, joined_at)
       VALUES (?, ?, ?, ?, 0, ?, ?)`
    ).run(participantId, trip.id, name, token, personIndex, now);
    bumpVersion(trip.id);
  });
  tx();

  const updated = serializeTrip(getTripById(trip.id));
  res.status(201).json({
    token,
    isCreator: false,
    shareUrl: `${publicBase(req)}/?code=${updated.code}`,
    joinCode: updated.code,
    trip: updated,
  });
});

app.get("/api/trips/:code", auth, (req, res) => {
  const trip = getTripByCode(req.params.code);
  if (!trip || trip.id !== req.trip.id) {
    return res.status(404).json({ error: "trip_not_found" });
  }
  res.json({
    trip: serializeTrip(trip),
    isCreator: Boolean(req.participant.is_creator),
    personIndex: req.participant.person_index,
  });
});

app.get("/api/trips/:code/sync", auth, (req, res) => {
  const trip = getTripByCode(req.params.code);
  if (!trip || trip.id !== req.trip.id) {
    return res.status(404).json({ error: "trip_not_found" });
  }
  const since = Number(req.query.since || 0);
  if (trip.version === since) {
    return res.json({ changed: false, version: trip.version });
  }
  res.json({
    changed: true,
    version: trip.version,
    trip: serializeTrip(trip),
    isCreator: Boolean(req.participant.is_creator),
    personIndex: req.participant.person_index,
  });
});

app.put("/api/trips/:code", auth, (req, res) => {
  const trip = getTripByCode(req.params.code);
  if (!trip || trip.id !== req.trip.id) {
    return res.status(404).json({ error: "trip_not_found" });
  }

  const clientVersion = Number(req.body?.version);
  if (Number.isFinite(clientVersion) && clientVersion !== trip.version) {
    return res.status(409).json({
      error: "version_conflict",
      trip: serializeTrip(trip),
    });
  }

  const tripName =
    req.body?.tripName !== undefined
      ? String(req.body.tripName || "").trim().slice(0, 80)
      : trip.name;
  const people = Array.isArray(req.body?.people) ? req.body.people : null;
  const expenses = Array.isArray(req.body?.expenses) ? req.body.expenses : null;

  const participants = listParticipants(trip.id);

  const tx = db.transaction(() => {
    db.prepare(`UPDATE trips SET name = ? WHERE id = ?`).run(tripName || trip.name, trip.id);

    if (people) {
      const limited = people.slice(0, MAX_PARTICIPANTS);
      limited.forEach((name, index) => {
        const p = participants.find((row) => row.person_index === index);
        if (p) {
          db.prepare(`UPDATE participants SET name = ? WHERE id = ?`).run(
            String(name || "").trim().slice(0, 40) || `Person ${index + 1}`,
            p.id
          );
        }
      });
    }

    if (expenses) {
      db.prepare(`DELETE FROM expenses WHERE trip_id = ?`).run(trip.id);
      const insert = db.prepare(
        `INSERT INTO expenses
          (id, trip_id, amount, currency, reason, mode, person_ids, paid_by, date, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );
      for (const exp of expenses) {
        const amount = Number(exp.amount);
        if (!(amount > 0) || !exp.reason || !exp.currency) continue;
        insert.run(
          String(exp.id || nanoid()),
          trip.id,
          amount,
          String(exp.currency).slice(0, 8),
          String(exp.reason).trim().slice(0, 120),
          exp.mode === "shared" ? "shared" : "personal",
          JSON.stringify(Array.isArray(exp.personIds) ? exp.personIds : []),
          Number(exp.paidBy) || 0,
          String(exp.date || new Date().toISOString().slice(0, 10)),
          Number(exp.createdAt) || Date.now()
        );
      }
    }

    bumpVersion(trip.id);
  });
  tx();

  res.json({
    trip: serializeTrip(getTripById(trip.id)),
    isCreator: Boolean(req.participant.is_creator),
    personIndex: req.participant.person_index,
  });
});

app.post("/api/trips/:code/reset", auth, (req, res) => {
  if (!req.participant.is_creator) {
    return res.status(403).json({ error: "creator_only" });
  }
  const trip = getTripByCode(req.params.code);
  if (!trip || trip.id !== req.trip.id) {
    return res.status(404).json({ error: "trip_not_found" });
  }
  db.prepare(`DELETE FROM trips WHERE id = ?`).run(trip.id);
  res.json({ ok: true, reset: true });
});

// Static frontend
const root = path.join(__dirname, "..");
app.use(express.static(root, { extensions: ["html"] }));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(root, "index.html"));
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "server_error" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SplitTrip listening on ${PORT}`);
});
