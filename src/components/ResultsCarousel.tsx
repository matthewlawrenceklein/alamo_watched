'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Film, Clock, MapPin, Calendar, TrendingUp, Star, Award } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { MovieAnalytics, ComparativeStats } from '@/types'
import AnimatedShapes from './AnimatedShapes'

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide, slides.length])

  // Define color schemes for each slide
  const colorSchemes = [
    { from: 'from-blue-500', via: 'via-purple-500', to: 'to-pink-500' }, // Welcome
    { from: 'from-indigo-500', via: 'via-blue-500', to: 'to-cyan-500' }, // Total Movies
    { from: 'from-purple-500', via: 'via-pink-500', to: 'to-rose-500' }, // Hours
    { from: 'from-green-500', via: 'via-emerald-500', to: 'to-teal-500' }, // Comparative
    { from: 'from-red-500', via: 'via-orange-500', to: 'to-yellow-500' }, // Market
    { from: 'from-blue-600', via: 'via-indigo-600', to: 'to-purple-600' }, // Month chart
    { from: 'from-violet-500', via: 'via-purple-500', to: 'to-fuchsia-500' }, // Day chart
    { from: 'from-orange-500', via: 'via-amber-500', to: 'to-yellow-500' }, // Time chart
    { from: 'from-yellow-500', via: 'via-amber-500', to: 'to-orange-500' }, // Favorite
    { from: 'from-blue-500', via: 'via-cyan-500', to: 'to-teal-500' }, // Top movies
    { from: 'from-indigo-600', via: 'via-blue-600', to: 'to-cyan-600' }, // Directors
    { from: 'from-pink-500', via: 'via-rose-500', to: 'to-red-500' }, // Thank you
  ]

  const currentColors = colorSchemes[currentSlide % colorSchemes.length]

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background - No AnimatePresence to prevent white flash */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`
        }}
      >
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${currentColors.from} ${currentColors.via} ${currentColors.to}`}
        />

        {/* Animated Geometric Shapes */}
        <AnimatedShapes currentSlide={currentSlide} />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${currentSlide}-${i}`}
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: 0,
            }}
            animate={{
              y: [null, '-100px', '-200px'],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut"
            }}
            className="absolute w-2 h-2 bg-white/40 rounded-full"
          />
        ))}
      </motion.div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Main Carousel */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden" style={{ minHeight: '600px' }}>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white hover:scale-110 p-3 rounded-full shadow-xl transition-all backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white hover:scale-110 p-3 rounded-full shadow-xl transition-all backdrop-blur-sm"
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
                index === currentSlide
                  ? 'w-8 bg-white shadow-lg'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4 text-white font-semibold text-lg drop-shadow-lg">
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
      <p className="text-xl text-gray-500 mb-8">See you at the movies in 2026! 🎬</p>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-3">This is an open source project</p>
        <a
          href="https://github.com/matthewlawrenceklein/alamo_watched"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  )

  return slides
}
