'use client'

import { Film, Clock, TrendingUp, Star } from 'lucide-react'
import type { MovieAnalytics, ComparativeStats } from '@/types'

interface ShareCardProps {
  analytics: MovieAnalytics
  comparativeStats: ComparativeStats
}

export default function ShareCard({ analytics, comparativeStats }: ShareCardProps) {
  const hasRepeatViewings = analytics.topMovies.some(m => m.count > 1)
  const favoriteMovie = hasRepeatViewings ? analytics.favoriteMovie : null

  return (
    <div
      id="share-card"
      className="w-[1080px] h-[1080px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-16 flex flex-col justify-between relative overflow-hidden"
      style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
    >
      {/* Decorative shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <Film className="w-16 h-16 text-white" />
          <div>
            <h1 className="text-5xl font-bold text-white">My 2025</h1>
            <h2 className="text-4xl font-bold text-white/90">Alamo Wrapped</h2>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mt-12">
          {/* Total Movies */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
            <Film className="w-12 h-12 text-white mb-4" />
            <div className="text-6xl font-bold text-white mb-2">{analytics.totalMovies}</div>
            <div className="text-2xl text-white/90">Movies Watched</div>
          </div>

          {/* Hours */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
            <Clock className="w-12 h-12 text-white mb-4" />
            <div className="text-6xl font-bold text-white mb-2">{analytics.totalHours}</div>
            <div className="text-2xl text-white/90">Hours of Movies</div>
          </div>

          {/* Percentile */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
            <TrendingUp className="w-12 h-12 text-white mb-4" />
            <div className="text-6xl font-bold text-white leading-tight mb-2">Top {comparativeStats.percentile}%</div>
            <div className="text-2xl text-white/90">of Moviegoers</div>
          </div>

          {/* Favorite Movie or Top Market */}
          {favoriteMovie ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
              <Star className="w-12 h-12 text-white mb-4" />
              <div className="text-3xl font-bold text-white mb-2 line-clamp-2">{favoriteMovie.title}</div>
              <div className="text-2xl text-white/90">{favoriteMovie.viewCount}x watched</div>
            </div>
          ) : (
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
              <Film className="w-12 h-12 text-white mb-4" />
              <div className="text-4xl font-bold text-white mb-2">{analytics.marketDistribution[0]?.market || 'N/A'}</div>
              <div className="text-2xl text-white/90">Top Market</div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center">
        <div className="text-3xl font-bold text-white mb-2">alamowrapped.com</div>
        <div className="text-xl text-white/80">Track your movie-watching journey</div>
      </div>
    </div>
  )
}
