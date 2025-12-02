'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Film, Clock, MapPin, Calendar, TrendingUp, Star, Award } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { MovieAnalytics, ComparativeStats } from '@/types'

interface ResultsCarouselProps {
  analytics: MovieAnalytics
  comparativeStats: ComparativeStats
}

export default function ResultsCarousel({ analytics, comparativeStats }: ResultsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Check if user has any repeat viewings
  const hasRepeatViewings = analytics.topMovies.some(m => m.count > 1)

  // Build slides dynamically based on data
  const slides = buildSlides(analytics, comparativeStats, hasRepeatViewings)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Main Carousel */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ minHeight: '600px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="p-12 h-full flex flex-col items-center justify-center"
            >
              {slides[currentSlide]}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4 text-gray-600">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  )
}

function buildSlides(
  analytics: MovieAnalytics,
  comparativeStats: ComparativeStats,
  hasRepeatViewings: boolean
) {
  const slides: JSX.Element[] = []

  // Slide 1: Welcome
  slides.push(
    <div className="text-center">
      <Film className="w-24 h-24 text-blue-600 mx-auto mb-6" />
      <h1 className="text-6xl font-bold text-gray-900 mb-4">Your 2025</h1>
      <h2 className="text-4xl font-bold text-blue-600 mb-4">Alamo Wrapped</h2>
      <p className="text-xl text-gray-600">Let&apos;s see what you watched this year</p>
    </div>
  )

  // Slide 2: Total Movies
  slides.push(
    <div className="text-center">
      <Film className="w-20 h-20 text-blue-600 mx-auto mb-6" />
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">You watched</h2>
      <div className="text-8xl font-bold text-blue-600 mb-4">{analytics.totalMovies}</div>
      <p className="text-3xl text-gray-700">movies in 2025</p>
      <p className="text-xl text-gray-500 mt-4">{analytics.uniqueMovies} unique films</p>
    </div>
  )

  // Slide 3: Hours Watched
  slides.push(
    <div className="text-center">
      <Clock className="w-20 h-20 text-purple-600 mx-auto mb-6" />
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">That&apos;s</h2>
      <div className="text-8xl font-bold text-purple-600 mb-4">{analytics.totalHours}</div>
      <p className="text-3xl text-gray-700">hours of movies</p>
      <p className="text-xl text-gray-500 mt-4">{analytics.totalMinutes.toLocaleString()} minutes total</p>
    </div>
  )

  // Slide 4: Comparative Stats
  slides.push(
    <div className="text-center">
      <TrendingUp className="w-20 h-20 text-green-600 mx-auto mb-6" />
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">You watched more than</h2>
      <div className="text-8xl font-bold text-green-600 mb-4">{comparativeStats.percentile}%</div>
      <p className="text-3xl text-gray-700">of all users</p>
      <p className="text-xl text-gray-500 mt-6">
        Rank #{comparativeStats.rank.toLocaleString()} out of {comparativeStats.totalUsers.toLocaleString()}
      </p>
    </div>
  )

  // Slide 5: Top Market
  if (analytics.marketDistribution.length > 0) {
    const topMarket = analytics.marketDistribution[0]
    slides.push(
      <div className="text-center">
        <MapPin className="w-20 h-20 text-red-600 mx-auto mb-6" />
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Your favorite location</h2>
        <div className="text-5xl font-bold text-red-600 mb-4">{topMarket.market}</div>
        <p className="text-2xl text-gray-700">{topMarket.count} visits</p>
        <p className="text-xl text-gray-500 mt-4">{topMarket.percentage}% of your movies</p>
      </div>
    )
  }

  // Slide 6: Movies by Month Chart
  slides.push(
    <div className="w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Year in Movies</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={analytics.moviesByMonth}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="label"
            tick={{ fill: '#6b7280', fontSize: 14 }}
            tickLine={{ stroke: '#9ca3af' }}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 14 }}
            tickLine={{ stroke: '#9ca3af' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            labelStyle={{ color: '#111827', fontWeight: 600 }}
          />
          <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

  // Slide 7: Day of Week Pattern
  slides.push(
    <div className="w-full">
      <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Movie Days</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={analytics.moviesByDayOfWeek}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="label"
            tick={{ fill: '#6b7280', fontSize: 14 }}
            tickLine={{ stroke: '#9ca3af' }}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 14 }}
            tickLine={{ stroke: '#9ca3af' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            labelStyle={{ color: '#111827', fontWeight: 600 }}
          />
          <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

  // Slide 8: Time of Day
  slides.push(
    <div className="w-full">
      <Clock className="w-16 h-16 text-orange-600 mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">When You Watch</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={analytics.moviesByTimeOfDay}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="label"
            tick={{ fill: '#6b7280', fontSize: 14 }}
            tickLine={{ stroke: '#9ca3af' }}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 14 }}
            tickLine={{ stroke: '#9ca3af' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            labelStyle={{ color: '#111827', fontWeight: 600 }}
          />
          <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

  // Slide 9: Favorite Movie (only if has repeat viewings)
  if (hasRepeatViewings && analytics.favoriteMovie) {
    const fav = analytics.favoriteMovie
    slides.push(
      <div className="text-center">
        <Star className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Your most-watched film</h2>
        <div className="text-4xl font-bold text-gray-900 mb-2">{fav.title}</div>
        <p className="text-2xl text-yellow-600 mb-4">Watched {fav.viewCount} times</p>
        {fav.year && <p className="text-lg text-gray-600">{fav.year}</p>}
        {fav.director && <p className="text-lg text-gray-600">Directed by {fav.director}</p>}
      </div>
    )
  }

  // Slide 10: Top Movies (only if has repeat viewings)
  if (hasRepeatViewings && analytics.topMovies.filter(m => m.count > 1).length > 0) {
    const repeatMovies = analytics.topMovies.filter(m => m.count > 1).slice(0, 5)
    slides.push(
      <div className="w-full">
        <Award className="w-16 h-16 text-blue-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Top Rewatches</h2>
        <div className="space-y-4">
          {repeatMovies.map((movie, index) => (
            <div
              key={`${movie.title}-${index}`}
              className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-blue-600">#{index + 1}</div>
                <div>
                  <div className="font-semibold text-lg text-gray-900">{movie.title}</div>
                  {movie.year && <div className="text-sm text-gray-600">{movie.year}</div>}
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-600">{movie.count}x</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Slide 11: Top Directors
  if (analytics.topDirectors.length > 0) {
    slides.push(
      <div className="w-full">
        <Film className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Top Directors</h2>
        <div className="space-y-3">
          {analytics.topDirectors.slice(0, 5).map((director, index) => (
            <div
              key={director.director}
              className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-indigo-600">#{index + 1}</div>
                <div className="font-semibold text-lg text-gray-900">{director.director}</div>
              </div>
              <div className="text-xl font-bold text-blue-600">{director.count} films</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Final Slide: Thank You
  slides.push(
    <div className="text-center">
      <Film className="w-24 h-24 text-blue-600 mx-auto mb-6" />
      <h1 className="text-5xl font-bold text-gray-900 mb-4">That&apos;s a wrap!</h1>
      <p className="text-2xl text-gray-600 mb-8">Thanks for being an Alamo Drafthouse fan</p>
      <p className="text-xl text-gray-500">See you at the movies in 2026! 🎬</p>
    </div>
  )

  return slides
}
