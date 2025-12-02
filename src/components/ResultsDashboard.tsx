'use client'

import { motion } from 'framer-motion'
import { Film, TrendingUp, MapPin, Calendar, Clock, Star } from 'lucide-react'
import type { MovieAnalytics, ComparativeStats } from '@/types'
import StatsCard from './StatsCard'
import ChartSection from './ChartSection'
import TopMovies from './TopMovies'
import ComparativeStatsSection from './ComparativeStatsSection'

interface ResultsDashboardProps {
  analytics: MovieAnalytics
  comparativeStats: ComparativeStats
  sessionId: string
}

export default function ResultsDashboard({
  analytics,
  comparativeStats,
  sessionId,
}: ResultsDashboardProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Film className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Your Alamo Drafthouse Year
          </h1>
          <p className="text-xl text-gray-600">
            Here's what your movie-watching journey looked like
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            icon={Film}
            label="Total Movies"
            value={analytics.totalMovies}
            subtitle={`${analytics.uniqueMovies} unique films`}
            delay={0.1}
          />
          <StatsCard
            icon={Clock}
            label="Hours Watched"
            value={analytics.totalHours}
            subtitle={`${analytics.totalMinutes.toLocaleString()} minutes`}
            delay={0.2}
          />
          <StatsCard
            icon={MapPin}
            label="Top Market"
            value={analytics.marketDistribution[0]?.market || 'N/A'}
            subtitle={`${analytics.marketDistribution[0]?.count || 0} visits`}
            delay={0.3}
          />
          <StatsCard
            icon={Calendar}
            label="Avg Runtime"
            value={`${analytics.averageRuntime}m`}
            subtitle="per movie"
            delay={0.4}
          />
        </div>

        <ComparativeStatsSection stats={comparativeStats} delay={0.5} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartSection
            title="Movies by Month"
            data={analytics.moviesByMonth}
            dataKey="count"
            nameKey="label"
            delay={0.6}
          />
          <ChartSection
            title="Movies by Day of Week"
            data={analytics.moviesByDayOfWeek}
            dataKey="count"
            nameKey="label"
            delay={0.7}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartSection
            title="Movies by Time of Day"
            data={analytics.moviesByTimeOfDay}
            dataKey="count"
            nameKey="label"
            delay={0.8}
          />
          <ChartSection
            title="Rating Distribution"
            data={analytics.ratingDistribution}
            dataKey="count"
            nameKey="rating"
            delay={0.9}
          />
        </div>

        <TopMovies movies={analytics.topMovies} delay={1.0} />

        {analytics.favoriteMovie && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-500" />
              Your Favorite Movie
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              {analytics.favoriteMovie.posterImage && (
                <img
                  src={analytics.favoriteMovie.posterImage}
                  alt={analytics.favoriteMovie.title}
                  className="w-full md:w-48 h-auto rounded-lg shadow-md"
                />
              )}
              <div>
                <h3 className="text-3xl font-bold mb-2">{analytics.favoriteMovie.title}</h3>
                <p className="text-gray-600 mb-4">
                  {analytics.favoriteMovie.year} • {analytics.favoriteMovie.runtime} min • Directed by {analytics.favoriteMovie.director}
                </p>
                <p className="text-lg text-blue-600 font-semibold">
                  Watched {analytics.favoriteMovie.viewCount} {analytics.favoriteMovie.viewCount === 1 ? 'time' : 'times'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Analyze Another Year
          </a>
        </motion.div>
      </div>
    </main>
  )
}
