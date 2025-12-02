# Alamo Watched

A web application for analyzing and visualizing your Alamo Drafthouse movie-watching history.

## Overview

Alamo Watched allows users to paste their Alamo Drafthouse viewing data in JSON format and receive detailed analytics and visualizations about their movie-watching habits, including comparative statistics against other users.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Visualization**: Recharts + Framer Motion
- **Styling**: TailwindCSS + shadcn/ui
- **Containerization**: Docker + Docker Compose
- **Deployment**: Self-hosted + Cloudflare Tunnel

## Development Setup

### Prerequisites

- Docker
- Docker Compose

**No local Node.js or npm installation required!**

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

## Features

### Current Features
- [x] JSON input form with validation
- [x] Movie data parsing and analysis
- [x] Interactive data visualizations
- [x] Comparative analytics (percentile rankings)
- [x] Session-based tracking
- [x] Anonymous usage statistics
- [x] Real-time JSON validation
- [x] Animated dashboard with charts
- [x] Top movies and directors analysis
- [x] Market and cinema distribution
- [x] Time-based viewing patterns

### Planned Features
- [ ] Export results as image/PDF
- [ ] Year-over-year comparisons
- [ ] Social sharing capabilities
- [ ] Advanced filtering and sorting
- [ ] User accounts (optional)

## Database Schema

### Tables
- **sessions**: Anonymous user session tracking
- **movies**: Aggregated movie viewing data
- **user_analytics**: Computed metrics per session

## Deployment

### Production Build

```bash
docker build -f Dockerfile.prod -t alamo-watched:latest .
docker run -p 3000:3000 alamo-watched:latest
```

### Cloudflare Tunnel Setup

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions including:
- Production Docker configuration
- Cloudflare Tunnel setup
- Environment variables
- Database migrations
- Monitoring and backups

## Contributing

This is a personal project, but suggestions and feedback are welcome.

## License

MIT
