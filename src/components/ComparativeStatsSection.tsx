'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Award } from 'lucide-react'
import type { ComparativeStats } from '@/types'

interface ComparativeStatsSectionProps {
  stats: ComparativeStats
  delay: number
}

export default function ComparativeStatsSection({ stats, delay }: ComparativeStatsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-xl p-8 mb-12 text-white"
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <TrendingUp className="w-8 h-8 mr-3" />
        How You Compare
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur rounded-lg p-6">
          <Users className="w-8 h-8 mb-3" />
          <div className="text-4xl font-bold mb-2">{stats.moreMoviesThan}%</div>
          <div className="text-blue-100">
            You watched more movies than {stats.moreMoviesThan}% of users
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-6">
          <Award className="w-8 h-8 mb-3" />
          <div className="text-4xl font-bold mb-2">#{stats.rank}</div>
          <div className="text-blue-100">
            Your rank out of {stats.totalUsers} total users
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-6">
          <TrendingUp className="w-8 h-8 mb-3" />
          <div className="text-4xl font-bold mb-2">{stats.averageMovies}</div>
          <div className="text-blue-100">
            Average movies per user
          </div>
        </div>
      </div>
    </motion.div>
  )
}
