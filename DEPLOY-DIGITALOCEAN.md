# Deploy SplitTrip on DigitalOcean

Static site (HTML/CSS/JS). No backend required.

## Option A — App Platform (recommended)

Needs a DigitalOcean account and either GitHub connected **or** a container image.

### From this folder with `doctl` + Docker

```bash
export DIGITALOCEAN_ACCESS_TOKEN=...   # write-scoped personal access token
doctl auth init -t "$DIGITALOCEAN_ACCESS_TOKEN"

# Build and push to DigitalOcean Container Registry
doctl registry create splittrip --subscription-tier starter   # once
doctl registry login
docker build -t registry.digitalocean.com/splittrip/web:latest .
docker push registry.digitalocean.com/splittrip/web:latest
```

Then create an app that serves the image on port 80 (or use the dashboard: Create → App → Container Image).

### Spec file

See `.do/app.yaml` for a static-site style spec (best when the folder is connected via Git).

## Option B — Droplet + nginx

1. Create a basic Droplet (Ubuntu)
2. Install nginx
3. Copy `index.html`, `styles.css`, `app.js`, `icon.svg`, `manifest.webmanifest` into `/var/www/html/`

## Option C — Spaces static website

Upload the static files to a Space with static website hosting enabled; point a CDN/custom domain if you want.
