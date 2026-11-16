# SplitTrip

Private shared trip expenses across **EUR / GBP / USD / IRT (Toman)**, with English/فارسی UI, reports, PDF export, and live sync between phones.

## Modes

- **Shared trip (server):** create a trip, share the link/join code, up to **10** people. Expenses sync through the API.
- **Local-only:** works without the server (e.g. GitHub Pages). Data stays in the browser.

## Run locally

```bash
npm install
DATA_DIR=./data npm start
```

Open http://127.0.0.1:8080

## DigitalOcean App Platform

See `.do/app.yaml` and `Dockerfile`.

**Estimated monthly cost (DigitalOcean, as of late 2026 — confirm in their UI):**

| Resource | Approx. |
| --- | --- |
| App Platform basic service (`basic-xxs`) | ~**$5 / month** |
| Managed PostgreSQL (optional) | ~**$15 / month** |
| Block storage volume for durable SQLite (optional) | ~**$1–2 / month** per GB |

This app uses **SQLite in the container** by default (no managed DB fee). Without a paid volume, data can reset when the app is redeployed or moved.

Do **not** create paid DO resources until the account owner approves the cost.

## GitHub Pages

Static hosting of the frontend remains at:

https://mahanthirdchild.github.io/split-trip/

Shared sync requires the App Platform (or local) API.
