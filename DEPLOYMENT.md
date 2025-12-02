# Deployment Guide

## Production Docker Build

### Building the Production Image

```bash
docker build -f Dockerfile.prod -t alamo-watched:latest .
```

### Running in Production

```bash
docker run -d \
  --name alamo-watched \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:password@host:5432/alamo_watched" \
  alamo-watched:latest
```

### Using Docker Compose for Production

Create a `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://alamo_user:alamo_pass@db:5432/alamo_watched
      - NEXT_PUBLIC_APP_URL=https://yourdomain.com
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=alamo_user
      - POSTGRES_PASSWORD=alamo_pass
      - POSTGRES_DB=alamo_watched
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Cloudflare Tunnel Setup

### Prerequisites

1. Cloudflare account
2. Domain managed by Cloudflare
3. `cloudflared` installed on your server

### Installation

**macOS:**
```bash
brew install cloudflare/cloudflare/cloudflared
```

**Linux:**
```bash
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

### Setup Steps

1. **Authenticate with Cloudflare:**
```bash
cloudflared tunnel login
```

2. **Create a tunnel:**
```bash
cloudflared tunnel create alamo-watched
```

This creates a tunnel and saves credentials to `~/.cloudflared/`

3. **Create a configuration file** at `~/.cloudflared/config.yml`:

```yaml
tunnel: <TUNNEL-ID>
credentials-file: /home/user/.cloudflared/<TUNNEL-ID>.json

ingress:
  - hostname: alamo.yourdomain.com
    service: http://localhost:3000
  - service: http_status:404
```

4. **Route your tunnel:**
```bash
cloudflared tunnel route dns alamo-watched alamo.yourdomain.com
```

5. **Run the tunnel:**
```bash
cloudflared tunnel run alamo-watched
```

### Running as a Service

**Linux (systemd):**

Create `/etc/systemd/system/cloudflared.service`:

```ini
[Unit]
Description=Cloudflare Tunnel
After=network.target

[Service]
Type=simple
User=your-user
ExecStart=/usr/local/bin/cloudflared tunnel run alamo-watched
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
sudo systemctl status cloudflared
```

**macOS (launchd):**

Create `~/Library/LaunchAgents/com.cloudflare.cloudflared.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.cloudflare.cloudflared</string>
    <key>ProgramArguments</key>
    <array>
        <string>/opt/homebrew/bin/cloudflared</string>
        <string>tunnel</string>
        <string>run</string>
        <string>alamo-watched</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
```

Load and start:
```bash
launchctl load ~/Library/LaunchAgents/com.cloudflare.cloudflared.plist
```

## Environment Variables

### Required Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_APP_URL`: Public URL of your application

### Optional Variables

- `NODE_ENV`: Set to `production` for production builds

## Database Migrations

Before deploying, ensure database is migrated:

```bash
# In development
docker-compose exec app npm run db:migrate

# In production (one-time)
docker exec alamo-watched npx prisma migrate deploy
```

## Health Checks

Check if the application is running:

```bash
curl http://localhost:3000
```

Check database connectivity:

```bash
docker-compose exec app npx prisma db pull
```

## Monitoring

### Logs

**Development:**
```bash
docker-compose logs -f app
```

**Production:**
```bash
docker logs -f alamo-watched
```

### Database Backup

```bash
docker-compose exec db pg_dump -U alamo_user alamo_watched > backup.sql
```

### Database Restore

```bash
docker-compose exec -T db psql -U alamo_user alamo_watched < backup.sql
```

## Security Considerations

1. **Change default database credentials** in production
2. **Use strong passwords** for PostgreSQL
3. **Enable HTTPS** via Cloudflare (automatic with tunnel)
4. **Regular backups** of the database
5. **Keep Docker images updated**

## Troubleshooting

### Container won't start

```bash
docker logs alamo-watched
docker-compose logs app
```

### Database connection issues

Check `DATABASE_URL` environment variable and ensure PostgreSQL is running:

```bash
docker-compose ps
```

### Cloudflare Tunnel not connecting

Check tunnel status:
```bash
cloudflared tunnel info alamo-watched
```

View tunnel logs:
```bash
journalctl -u cloudflared -f  # Linux
tail -f /var/log/cloudflared.log  # macOS
```

## Updating the Application

1. Pull latest changes
2. Rebuild Docker image
3. Restart containers

```bash
git pull
docker-compose -f docker-compose.prod.yml up -d --build
```

## Scaling Considerations

For high traffic:

1. **Use external PostgreSQL** (managed service)
2. **Add Redis** for session caching
3. **Multiple app instances** behind a load balancer
4. **CDN** for static assets (Cloudflare handles this)
