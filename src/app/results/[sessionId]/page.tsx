import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ResultsCarousel from '@/components/ResultsCarousel'
import type { MovieAnalytics, ComparativeStats } from '@/types'

interface PageProps {
  params: {
    sessionId: string
  }
}

export default async function ResultsPage({ params }: PageProps) {
  const session = await prisma.session.findUnique({
    where: { id: params.sessionId },
    include: {
      screenings: {
        orderBy: { sessionDateTimeUtc: 'asc' },
      },
    },
  })

  if (!session) {
    notFound()
  }

  const analytics = session.analytics as unknown as MovieAnalytics

  const totalSessions = await prisma.session.count()
  const allSessionMovieCounts = await prisma.session.findMany({
    select: { movieCount: true },
    orderBy: { movieCount: 'desc' },
  })

  const rank = allSessionMovieCounts.findIndex(s => s.movieCount <= session.movieCount) + 1
  const percentile = Math.round((rank / totalSessions) * 100)
  const averageMovies = Math.round(
    allSessionMovieCounts.reduce((sum, s) => sum + s.movieCount, 0) / totalSessions
  )
  const moreMoviesThan = Math.round(((totalSessions - rank) / totalSessions) * 100)

  const comparativeStats = {
    percentile,
    averageMovies,
    totalUsers: totalSessions,
    rank,
    moreMoviesThan,
  }

  return (
    <ResultsCarousel
      analytics={analytics}
      comparativeStats={comparativeStats}
    />
  )
}
