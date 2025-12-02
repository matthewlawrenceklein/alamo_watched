import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { analyzePurchaseHistory } from '@/lib/analyzer'
import type { AlامoPurchaseHistory } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: AlامoPurchaseHistory = await request.json()

    if (!body.data?.purchaseHistory?.purchases) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      )
    }

    const purchases = body.data.purchaseHistory.purchases
    
    if (purchases.length === 0) {
      return NextResponse.json(
        { error: 'No purchases found' },
        { status: 400 }
      )
    }

    const analytics = analyzePurchaseHistory(purchases)

    const session = await prisma.session.create({
      data: {
        movieCount: analytics.totalMovies,
        totalMinutes: analytics.totalMinutes,
        uniqueMovies: analytics.uniqueMovies,
        topMarket: analytics.marketDistribution[0]?.market || null,
        topCinema: analytics.cinemaDistribution[0]?.cinema || null,
        analytics: analytics as any,
        screenings: {
          create: purchases
            .filter(p => !p.isRefunded)
            .map(purchase => ({
              marketName: purchase.marketName,
              cinemaName: purchase.cinemaName,
              sessionDateTimeUtc: new Date(purchase.sessionDateTimeUtc),
              filmSlug: purchase.film.slug,
              filmTitle: purchase.film.title,
            })),
        },
      },
    })

    await Promise.all(
      Object.values(
        purchases
          .filter(p => !p.isRefunded)
          .reduce((acc, purchase) => {
            const slug = purchase.film.slug
            if (!acc[slug]) {
              acc[slug] = {
                slug,
                film: purchase.film,
                count: 0,
              }
            }
            acc[slug].count++
            return acc
          }, {} as Record<string, { slug: string; film: any; count: number }>)
      ).map(async ({ slug, film, count }) => {
        await prisma.movie.upsert({
          where: { filmSlug: slug },
          update: {
            totalViews: { increment: count },
            lastSeen: new Date(),
          },
          create: {
            title: film.title,
            filmSlug: slug,
            year: film.year || null,
            runtimeMinutes: film.runtimeMinutes || null,
            rating: film.rating || null,
            director: film.director || null,
            cast: film.cast || null,
            posterImage: film.posterImage || null,
            totalViews: count,
          },
        })
      })
    )

    const totalSessions = await prisma.session.count()
    const totalMoviesWatched = await prisma.screening.count()
    const uniqueMovies = await prisma.movie.count()

    await prisma.analytics.create({
      data: {
        totalSessions,
        totalMoviesWatched,
        uniqueMoviesWatched: uniqueMovies,
        avgMoviesPerSession: totalMoviesWatched / totalSessions,
        topMarkets: [],
        topCinemas: [],
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      analytics,
    })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze data' },
      { status: 500 }
    )
  }
}
