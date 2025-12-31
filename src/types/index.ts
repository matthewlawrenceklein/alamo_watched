export interface AlامoPurchase {
  vistaTransactionId: number
  loyaltyTransactionId: number
  transactionDateTimeUtc: string
  sessionDateTimeUtc: string
  sessionDateTimeClt: string
  marketId: string
  marketSlug: string
  marketName: string
  cinemaId: string
  cinemaName: string
  cinemaTimeZone: string
  bookingId: string
  isRefunded: boolean
  filmName: string
  filmHoCode: string
  filmSlug: string
  film: AlamoFilm
  lineItems: LineItem[]
  isSubscriptionPurchase: boolean
}

export interface AlamoFilm {
  headOfficeCode: string
  slug: string
  title: string
  year: string
  runtimeMinutes: number
  rating: string
  director: string
  cast: string
  posterImage: string
  landscapeHeroImage?: string
  portraitHeroImage?: string
  headline?: string
  description?: string
}

export interface LineItem {
  name: string
  quantity: number
  isTicket: boolean
}

export interface AlامoPurchaseHistory {
  data: {
    purchaseHistory: {
      purchases: AlامoPurchase[]
    }
  }
}

export interface MovieAnalytics {
  totalMovies: number
  uniqueMovies: number
  totalMinutes: number
  totalHours: number
  averageRuntime: number
  moviesByMonth: MonthCount[]
  moviesByDayOfWeek: DayCount[]
  moviesByTimeOfDay: TimeCount[]
  topMovies: MovieCount[]
  marketDistribution: MarketCount[]
  cinemaDistribution: CinemaCount[]
  ratingDistribution: RatingCount[]
  yearDistribution: YearCount[]
  topDirectors: DirectorCount[]
  favoriteMovie?: MovieDetails
  longestMovie?: MovieDetails
  oldestMovie?: MovieDetails
  newestMovie?: MovieDetails
  seasonPassStats: SeasonPassStats
}

export interface MonthCount {
  month: string
  count: number
  label: string
}

export interface DayCount {
  day: string
  count: number
  label: string
}

export interface TimeCount {
  timeSlot: string
  count: number
  label: string
}

export interface MovieCount {
  title: string
  count: number
  year?: string
  posterImage?: string
}

export interface MarketCount {
  market: string
  count: number
  percentage: number
}

export interface CinemaCount {
  cinema: string
  market: string
  count: number
  percentage: number
}

export interface RatingCount {
  rating: string
  count: number
  percentage: number
}

export interface YearCount {
  year: string
  count: number
}

export interface DirectorCount {
  director: string
  count: number
  movies: string[]
}

export interface MovieDetails {
  title: string
  year: string
  runtime: number
  director: string
  posterImage?: string
  viewCount: number
}

export interface ComparativeStats {
  percentile: number
  averageMovies: number
  totalUsers: number
  rank: number
  moreMoviesThan: number
}

export interface SeasonPassStats {
  totalTickets: number
  seasonPassTickets: number
  regularTickets: number
  seasonPassPercentage: number
  regularPercentage: number
}
