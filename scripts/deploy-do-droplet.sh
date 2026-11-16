#!/usr/bin/env bash
# Deploy SplitTrip to a DigitalOcean Droplet (nginx).
# Requires: DIGITALOCEAN_ACCESS_TOKEN in the environment. Never echo the token.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REGION="${DO_REGION:-fra1}"
SIZE="${DO_SIZE:-s-1vcpu-512mb-10gb}"
NAME="${DO_DROPLET_NAME:-splittrip}"
SSH_DIR="${HOME}/.ssh/splittrip-do"
KEY_PATH="${SSH_DIR}/id_ed25519"

if [[ -z "${DIGITALOCEAN_ACCESS_TOKEN:-}" ]]; then
  echo "DIGITALOCEAN_ACCESS_TOKEN is not set in this environment." >&2
  exit 1
fi

export DIGITALOCEAN_ACCESS_TOKEN
doctl auth init -t "$DIGITALOCEAN_ACCESS_TOKEN" >/dev/null

mkdir -p "$SSH_DIR"
chmod 700 "$SSH_DIR"
if [[ ! -f "$KEY_PATH" ]]; then
  ssh-keygen -t ed25519 -N "" -f "$KEY_PATH" -C "splittrip-deploy" >/dev/null
fi

PUB="$(cat "${KEY_PATH}.pub")"
# Import key if missing
if ! doctl compute ssh-key list --format FingerPrint --no-header 2>/dev/null | grep -q .; then
  doctl compute ssh-key import splittrip-deploy --public-key-file "${KEY_PATH}.pub" >/dev/null || true
fi
# Prefer fingerprint of our key
FPR="$(ssh-keygen -lf "$KEY_PATH" -E md5 | awk '{print $2}' | sed 's/MD5://')"
KEY_ID="$(doctl compute ssh-key list --format ID,FingerPrint --no-header | awk -v f="$FPR" '$2==f {print $1; exit}')"
if [[ -z "$KEY_ID" ]]; then
  doctl compute ssh-key import "splittrip-deploy-$(date +%s)" --public-key-file "${KEY_PATH}.pub" >/dev/null
  KEY_ID="$(doctl compute ssh-key list --format ID,FingerPrint --no-header | awk -v f="$FPR" '$2==f {print $1; exit}')"
fi

EXISTING="$(doctl compute droplet list --format ID,Name --no-header | awk -v n="$NAME" '$2==n {print $1; exit}')"
if [[ -n "$EXISTING" ]]; then
  DROPLET_ID="$EXISTING"
  echo "Reusing droplet $NAME ($DROPLET_ID)"
else
  echo "Creating droplet $NAME in $REGION..."
  DROPLET_ID="$(doctl compute droplet create "$NAME" \
    --region "$REGION" \
    --image ubuntu-24-04-x64 \
    --size "$SIZE" \
    --ssh-keys "$KEY_ID" \
    --wait \
    --format ID \
    --no-header)"
fi

IP=""
for _ in $(seq 1 60); do
  IP="$(doctl compute droplet get "$DROPLET_ID" --format PublicIPv4 --no-header)"
  [[ -n "$IP" && "$IP" != "0.0.0.0" ]] && break
  sleep 2
done
if [[ -z "$IP" ]]; then
  echo "Could not get droplet IP" >&2
  exit 1
fi
echo "Droplet IP: $IP"

SSH=(ssh -i "$KEY_PATH" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ConnectTimeout=10 root@"$IP")
SCP=(scp -i "$KEY_PATH" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null)

echo "Waiting for SSH..."
for _ in $(seq 1 60); do
  if "${SSH[@]}" "true" 2>/dev/null; then
    break
  fi
  sleep 3
done

"${SSH[@]}" 'export DEBIAN_FRONTEND=noninteractive; apt-get update -qq; apt-get install -y -qq nginx >/dev/null'
"${SSH[@]}" 'mkdir -p /var/www/splittrip'
"${SCP[@]}" \
  "$ROOT/index.html" \
  "$ROOT/styles.css" \
  "$ROOT/app.js" \
  "$ROOT/icon.svg" \
  "$ROOT/manifest.webmanifest" \
  "$ROOT/SplitTrip-mobile.html" \
  root@"$IP":/var/www/splittrip/

"${SSH[@]}" "cat > /etc/nginx/sites-available/splittrip <<'EOF'
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name _;
  root /var/www/splittrip;
  index index.html;
  location / {
    try_files \$uri \$uri/ /index.html;
  }
}
EOF
ln -sfn /etc/nginx/sites-available/splittrip /etc/nginx/sites-enabled/splittrip
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx"

echo "LIVE_URL=http://$IP"
echo "Done."
