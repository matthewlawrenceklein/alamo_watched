'use client'

import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import type { MovieCount } from '@/types'

interface TopMoviesProps {
  movies: MovieCount[]
  delay: number
}

export default function TopMovies({ movies, delay }: TopMoviesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-lg shadow-xl p-8 mb-8"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
        Your Top Movies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {movies.map((movie, index) => (
          <div
            key={movie.title}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{movie.title}</h3>
              <p className="text-sm text-gray-600">
                {movie.year && `${movie.year} • `}
                Watched {movie.count} {movie.count === 1 ? 'time' : 'times'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
