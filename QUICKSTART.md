# Quick Start Guide

## First Time Setup

1. **Build and start the containers**:
   ```bash
   docker-compose up --build
   ```

   This will:
   - Build the Next.js application container
   - Start PostgreSQL database
   - Install all npm dependencies
   - Run database migrations
   - Start the development server

2. **Access the application**:
   - Open your browser to `http://localhost:3000`
   - The database is accessible at `localhost:5432`

## Daily Development

```bash
# Start the environment
docker-compose up

# Stop the environment (Ctrl+C or)
docker-compose down

# View logs
docker-compose logs -f app

# Rebuild after dependency changes
docker-compose up --build
```

## Database Commands

```bash
# Run migrations
docker-compose exec app npm run db:migrate

# Push schema changes without migration
docker-compose exec app npm run db:push

# Open Prisma Studio (database GUI)
docker-compose exec app npm run db:studio

# Access PostgreSQL CLI
docker-compose exec db psql -U alamo_user -d alamo_watched
```

## Troubleshooting

### Port already in use
```bash
# Stop all containers
docker-compose down

# Check for processes on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database connection issues
```bash
# Restart just the database
docker-compose restart db

# Check database logs
docker-compose logs db
```

### Clean slate
```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild from scratch
docker-compose up --build
```

## Project Structure

```
alamo_watched/
├── src/
│   ├── app/              # Next.js pages (App Router)
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   ├── lib/             # Utilities and shared logic
│   │   ├── prisma.ts    # Database client
│   │   └── utils.ts     # Helper functions
│   └── types/           # TypeScript definitions
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
├── docker-compose.yml   # Docker orchestration
├── Dockerfile.dev       # Development container
└── Dockerfile.prod      # Production container
```
