# Decision Log

This document tracks major architectural and implementation decisions made during the development of Alamo Watched.

## Format
Each entry includes:
- **Date**: When the decision was made
- **Decision**: What was decided
- **Rationale**: Why this decision was made
- **Alternatives Considered**: Other options that were evaluated

---

## 2024-12-01 15:23 PST - Initial Framework Selection

**Decision**: Use Next.js 14+ with App Router as the primary framework

**Rationale**:
- Integrated backend via API routes eliminates need for separate server
- Rich React ecosystem for data visualization libraries
- Excellent Docker support and self-hosting capabilities
- Built-in TypeScript support and modern developer experience
- Perfect balance of frontend interactivity and backend functionality

**Alternatives Considered**:
- **SvelteKit**: Great performance but smaller ecosystem for data viz
- **Astro**: Better for static sites, less suitable for dynamic visualizations

---

## 2024-12-01 15:23 PST - Database Selection

**Decision**: Use PostgreSQL with Prisma ORM

**Rationale**:
- Robust relational database suitable for analytics and aggregations
- Prisma provides type-safe database access with excellent TypeScript integration
- Easy to containerize and manage in Docker
- Good performance for comparative analytics queries

**Alternatives Considered**:
- **SQLite**: Simpler but less suitable for concurrent users in production
- **MongoDB**: NoSQL approach less optimal for relational analytics data

---

## 2024-12-01 15:23 PST - Development Approach

**Decision**: Fully dockerized development with no local dependencies

**Rationale**:
- Ensures consistent development environment across machines
- Simplifies deployment pipeline (dev → prod uses same containers)
- Eliminates "works on my machine" issues
- Aligns with self-hosting goals

**Alternatives Considered**:
- **Local Node.js**: Traditional approach but requires version management and local setup

---

## 2024-12-01 15:29 PST - Database Schema Update Based on Actual Data

**Decision**: Updated database schema to match actual Alamo Drafthouse purchase history JSON structure

**Rationale**:
- Received actual JSON data structure from Alamo Drafthouse API
- Schema now captures all relevant fields: market, cinema, screening times, film metadata
- Added `Screening` model to track individual movie viewings per session
- Movie model now includes: title, year, runtime, rating, director, cast, poster image
- Removed genre assumptions - will analyze based on actual available data
- Added market and cinema tracking for location-based analytics

**Key Schema Changes**:
- **Session**: Added `topMarket` and `topCinema` fields, removed `topGenre`
- **Movie**: Changed `slug` to `filmSlug`, added `year`, `runtimeMinutes`, `rating`, `director`, `cast`, `posterImage`
- **Screening**: New model to track individual viewings with market, cinema, and session time
- **Analytics**: Added `topMarkets` and `topCinemas` JSON fields for aggregated data

**Data Fields Captured**:
- Market name and cinema name
- Session date/time (UTC)
- Film: title, year, runtime, rating, director, cast, poster image

---
