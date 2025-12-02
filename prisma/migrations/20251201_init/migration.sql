-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "movieCount" INTEGER NOT NULL,
    "totalMinutes" INTEGER NOT NULL,
    "uniqueMovies" INTEGER NOT NULL,
    "topMarket" TEXT,
    "topCinema" TEXT,
    "analytics" JSONB NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "filmSlug" TEXT NOT NULL,
    "year" TEXT,
    "runtimeMinutes" INTEGER,
    "rating" TEXT,
    "director" TEXT,
    "cast" TEXT,
    "posterImage" TEXT,
    "totalViews" INTEGER NOT NULL DEFAULT 0,
    "firstSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeen" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Screening" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "marketName" TEXT NOT NULL,
    "cinemaName" TEXT NOT NULL,
    "sessionDateTimeUtc" TIMESTAMP(3) NOT NULL,
    "filmSlug" TEXT NOT NULL,
    "filmTitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Screening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalSessions" INTEGER NOT NULL DEFAULT 0,
    "totalMoviesWatched" INTEGER NOT NULL DEFAULT 0,
    "uniqueMoviesWatched" INTEGER NOT NULL DEFAULT 0,
    "avgMoviesPerSession" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "topMarkets" JSONB NOT NULL DEFAULT '[]',
    "topCinemas" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Session_createdAt_idx" ON "Session"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_filmSlug_key" ON "Movie"("filmSlug");

-- CreateIndex
CREATE INDEX "Movie_totalViews_idx" ON "Movie"("totalViews");

-- CreateIndex
CREATE INDEX "Movie_filmSlug_idx" ON "Movie"("filmSlug");

-- CreateIndex
CREATE INDEX "Movie_title_idx" ON "Movie"("title");

-- CreateIndex
CREATE INDEX "Screening_sessionId_idx" ON "Screening"("sessionId");

-- CreateIndex
CREATE INDEX "Screening_marketName_idx" ON "Screening"("marketName");

-- CreateIndex
CREATE INDEX "Screening_cinemaName_idx" ON "Screening"("cinemaName");

-- CreateIndex
CREATE INDEX "Screening_sessionDateTimeUtc_idx" ON "Screening"("sessionDateTimeUtc");

-- CreateIndex
CREATE INDEX "Analytics_date_idx" ON "Analytics"("date");

-- AddForeignKey
ALTER TABLE "Screening" ADD CONSTRAINT "Screening_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
