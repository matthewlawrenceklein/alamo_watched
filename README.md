# Alamo Watched

A web application for analyzing and visualizing your Alamo Drafthouse movie-watching history.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Visualization**: Recharts + Framer Motion
- **Styling**: TailwindCSS + shadcn/ui
- **Containerization**: Docker + Docker Compose

## Development Setup

### Prerequisites

- Docker
- Docker Compose

### Getting Started

1. Clone the repository
2. Start the development environment:
   ```bash
   docker-compose up --build
   ```
3. Access the application at `http://localhost:3000`
4. Access the database at `localhost:5432`

**See [QUICKSTART.md](./QUICKSTART.md) for detailed setup instructions.**

### Development Commands

```bash
# Start development environment
docker-compose up

# Stop environment
docker-compose down

# Rebuild containers
docker-compose up --build

# View logs
docker-compose logs -f app

# Run database migrations
docker-compose exec app npm run db:migrate

# Access database CLI
docker-compose exec db psql -U alamo_user -d alamo_watched
```

## Project Structure

```
alamo_watched/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── lib/             # Utility functions and shared logic
│   └── types/           # TypeScript type definitions
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── docker/              # Docker configuration files
├── README.md
└── decision-log.md
```

## Contributing

PRs & Issues welcome :D

## License

MIT
