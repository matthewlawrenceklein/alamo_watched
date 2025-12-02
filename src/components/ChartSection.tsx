'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartSectionProps {
  title: string
  data: any[]
  dataKey: string
  nameKey: string
  delay: number
}

export default function ChartSection({ title, data, dataKey, nameKey, delay }: ChartSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-lg shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={nameKey} angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
