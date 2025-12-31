import type {
  AlامoPurchase,
  MovieAnalytics,
  MonthCount,
  DayCount,
  TimeCount,
  MovieCount,
  MarketCount,
  CinemaCount,
  RatingCount,
  YearCount,
  DirectorCount,
  MovieDetails,
  SeasonPassStats,
} from '@/types'

export function analyzePurchaseHistory(purchases: AlامoPurchase[]): MovieAnalytics {
  // Filter for non-refunded purchases from 2025 only
  const validPurchases = purchases.filter(p => {
    if (p.isRefunded) return false
    const purchaseDate = new Date(p.sessionDateTimeUtc)
    return purchaseDate.getFullYear() === 2025
  })

  const totalMovies = validPurchases.length
  const uniqueMovies = new Set(validPurchases.map(p => p.film.slug)).size
  const totalMinutes = validPurchases.reduce((sum, p) => sum + (p.film.runtimeMinutes || 0), 0)
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10
  const averageRuntime = Math.round(totalMinutes / totalMovies)

  const moviesByMonth = calculateMoviesByMonth(validPurchases)
  const moviesByDayOfWeek = calculateMoviesByDayOfWeek(validPurchases)
  const moviesByTimeOfDay = calculateMoviesByTimeOfDay(validPurchases)
  const topMovies = calculateTopMovies(validPurchases)
  const marketDistribution = calculateMarketDistribution(validPurchases)
  const cinemaDistribution = calculateCinemaDistribution(validPurchases)
  const ratingDistribution = calculateRatingDistribution(validPurchases)
  const yearDistribution = calculateYearDistribution(validPurchases)
  const topDirectors = calculateTopDirectors(validPurchases)
  const seasonPassStats = calculateSeasonPassStats(validPurchases)

  const favoriteMovie = findFavoriteMovie(validPurchases)
  const longestMovie = findLongestMovie(validPurchases)
  const oldestMovie = findOldestMovie(validPurchases)
  const newestMovie = findNewestMovie(validPurchases)

  return {
    totalMovies,
    uniqueMovies,
    totalMinutes,
    totalHours,
    averageRuntime,
    moviesByMonth,
    moviesByDayOfWeek,
    moviesByTimeOfDay,
    topMovies,
    marketDistribution,
    cinemaDistribution,
    ratingDistribution,
    yearDistribution,
    topDirectors,
    favoriteMovie,
    longestMovie,
    oldestMovie,
    newestMovie,
    seasonPassStats,
  }
}

function calculateMoviesByMonth(purchases: AlامoPurchase[]): MonthCount[] {
  const monthCounts: Record<string, number> = {}
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  purchases.forEach(p => {
    const date = new Date(p.sessionDateTimeUtc)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1
  })

  return Object.entries(monthCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => {
      const [year, monthNum] = month.split('-')
      return {
        month,
        count,
        label: `${monthNames[parseInt(monthNum) - 1]} ${year}`,
      }
    })
}

function calculateMoviesByDayOfWeek(purchases: AlامoPurchase[]): DayCount[] {
  const dayCounts: Record<number, number> = {}
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  purchases.forEach(p => {
    const date = new Date(p.sessionDateTimeUtc)
    const day = date.getDay()
    dayCounts[day] = (dayCounts[day] || 0) + 1
  })

  return dayNames.map((label, index) => ({
    day: String(index),
    count: dayCounts[index] || 0,
    label,
  }))
}

function calculateMoviesByTimeOfDay(purchases: AlامoPurchase[]): TimeCount[] {
  const timeCounts: Record<string, number> = {
    morning: 0,
    afternoon: 0,
    evening: 0,
    lateNight: 0,
  }

  purchases.forEach(p => {
    // Use sessionDateTimeClt (Cinema Local Time) which is already in local time
    // If not available, fall back to UTC (though this shouldn't happen)
    const dateString = p.sessionDateTimeClt || p.sessionDateTimeUtc
    
    // Parse the date string - it's in ISO format but represents local time
    // We need to extract just the hour portion without timezone conversion
    const timePart = dateString.split('T')[1] // Gets "HH:MM:SS" or "HH:MM:SS.sssZ"
    const hour = parseInt(timePart.split(':')[0], 10)

    if (hour >= 5 && hour < 12) {
      timeCounts.morning++
    } else if (hour >= 12 && hour < 17) {
      timeCounts.afternoon++
    } else if (hour >= 17 && hour < 22) {
      timeCounts.evening++
    } else {
      timeCounts.lateNight++
    }
  })

  return [
    { timeSlot: 'morning', count: timeCounts.morning, label: 'Morning (5am-12pm)' },
    { timeSlot: 'afternoon', count: timeCounts.afternoon, label: 'Afternoon (12pm-5pm)' },
    { timeSlot: 'evening', count: timeCounts.evening, label: 'Evening (5pm-10pm)' },
    { timeSlot: 'lateNight', count: timeCounts.lateNight, label: 'Late Night (10pm-5am)' },
  ]
}

function calculateTopMovies(purchases: AlامoPurchase[]): MovieCount[] {
  const movieCounts: Record<string, { title: string; count: number; year?: string; posterImage?: string }> = {}

  purchases.forEach(p => {
    const slug = p.film.slug
    if (!movieCounts[slug]) {
      movieCounts[slug] = {
        title: p.film.title,
        count: 0,
        year: p.film.year,
        posterImage: p.film.posterImage,
      }
    }
    movieCounts[slug].count++
  })

  return Object.values(movieCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

function calculateMarketDistribution(purchases: AlامoPurchase[]): MarketCount[] {
  const marketCounts: Record<string, number> = {}

  purchases.forEach(p => {
    marketCounts[p.marketName] = (marketCounts[p.marketName] || 0) + 1
  })

  const total = purchases.length

  return Object.entries(marketCounts)
    .map(([market, count]) => ({
      market,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
}

function calculateCinemaDistribution(purchases: AlامoPurchase[]): CinemaCount[] {
  const cinemaCounts: Record<string, { market: string; count: number }> = {}

  purchases.forEach(p => {
    const key = `${p.cinemaName}|${p.marketName}`
    if (!cinemaCounts[key]) {
      cinemaCounts[key] = { market: p.marketName, count: 0 }
    }
    cinemaCounts[key].count++
  })

  const total = purchases.length

  return Object.entries(cinemaCounts)
    .map(([key, data]) => ({
      cinema: key.split('|')[0],
      market: data.market,
      count: data.count,
      percentage: Math.round((data.count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
}

function calculateRatingDistribution(purchases: AlامoPurchase[]): RatingCount[] {
  const ratingCounts: Record<string, number> = {}

  purchases.forEach(p => {
    const rating = p.film.rating || 'Not Rated'
    ratingCounts[rating] = (ratingCounts[rating] || 0) + 1
  })

  const total = purchases.length

  return Object.entries(ratingCounts)
    .map(([rating, count]) => ({
      rating,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
}

function calculateYearDistribution(purchases: AlامoPurchase[]): YearCount[] {
  const yearCounts: Record<string, number> = {}

  purchases.forEach(p => {
    const year = p.film.year || 'Unknown'
    yearCounts[year] = (yearCounts[year] || 0) + 1
  })

  return Object.entries(yearCounts)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year.localeCompare(b.year))
}

function calculateTopDirectors(purchases: AlامoPurchase[]): DirectorCount[] {
  const directorCounts: Record<string, { count: number; movies: Set<string> }> = {}

  purchases.forEach(p => {
    const director = p.film.director || 'Unknown'
    if (!directorCounts[director]) {
      directorCounts[director] = { count: 0, movies: new Set() }
    }
    directorCounts[director].count++
    directorCounts[director].movies.add(p.film.title)
  })

  return Object.entries(directorCounts)
    .map(([director, data]) => ({
      director,
      count: data.count,
      movies: Array.from(data.movies),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

function findFavoriteMovie(purchases: AlامoPurchase[]): MovieDetails | undefined {
  const topMovie = calculateTopMovies(purchases)[0]
  if (!topMovie) return undefined

  const purchase = purchases.find(p => p.film.title === topMovie.title)
  if (!purchase) return undefined

  return {
    title: purchase.film.title,
    year: purchase.film.year || 'Unknown',
    runtime: purchase.film.runtimeMinutes || 0,
    director: purchase.film.director || 'Unknown',
    posterImage: purchase.film.posterImage,
    viewCount: topMovie.count,
  }
}

function findLongestMovie(purchases: AlامoPurchase[]): MovieDetails | undefined {
  const longest = purchases.reduce((max, p) => {
    return (p.film.runtimeMinutes || 0) > (max.film.runtimeMinutes || 0) ? p : max
  }, purchases[0])

  if (!longest) return undefined

  return {
    title: longest.film.title,
    year: longest.film.year || 'Unknown',
    runtime: longest.film.runtimeMinutes || 0,
    director: longest.film.director || 'Unknown',
    posterImage: longest.film.posterImage,
    viewCount: purchases.filter(p => p.film.slug === longest.film.slug).length,
  }
}

function findOldestMovie(purchases: AlامoPurchase[]): MovieDetails | undefined {
  const oldest = purchases.reduce((min, p) => {
    const pYear = parseInt(p.film.year || '9999')
    const minYear = parseInt(min.film.year || '9999')
    return pYear < minYear ? p : min
  }, purchases[0])

  if (!oldest) return undefined

  return {
    title: oldest.film.title,
    year: oldest.film.year || 'Unknown',
    runtime: oldest.film.runtimeMinutes || 0,
    director: oldest.film.director || 'Unknown',
    posterImage: oldest.film.posterImage,
    viewCount: purchases.filter(p => p.film.slug === oldest.film.slug).length,
  }
}

function findNewestMovie(purchases: AlامoPurchase[]): MovieDetails | undefined {
  const newest = purchases.reduce((max, p) => {
    const pYear = parseInt(p.film.year || '0')
    const maxYear = parseInt(max.film.year || '0')
    return pYear > maxYear ? p : max
  }, purchases[0])

  if (!newest) return undefined

  return {
    title: newest.film.title,
    year: newest.film.year || 'Unknown',
    runtime: newest.film.runtimeMinutes || 0,
    director: newest.film.director || 'Unknown',
    posterImage: newest.film.posterImage,
    viewCount: purchases.filter(p => p.film.slug === newest.film.slug).length,
  }
}

function calculateSeasonPassStats(purchases: AlامoPurchase[]): SeasonPassStats {
  let totalTickets = 0
  let seasonPassTickets = 0

  purchases.forEach(p => {
    p.lineItems.forEach(item => {
      if (item.isTicket) {
        totalTickets += item.quantity
        
        if (item.name.includes('Season Pass') || p.isSubscriptionPurchase) {
          seasonPassTickets += item.quantity
        }
      }
    })
  })

  const regularTickets = totalTickets - seasonPassTickets
  const seasonPassPercentage = totalTickets > 0 ? Math.round((seasonPassTickets / totalTickets) * 100) : 0
  const regularPercentage = totalTickets > 0 ? Math.round((regularTickets / totalTickets) * 100) : 0

  return {
    totalTickets,
    seasonPassTickets,
    regularTickets,
    seasonPassPercentage,
    regularPercentage,
  }
}
