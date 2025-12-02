'use client'

import { motion } from 'framer-motion'

interface AnimatedShapesProps {
  currentSlide: number
}

export default function AnimatedShapes({ currentSlide }: AnimatedShapesProps) {
  return (
    <>
      {/* Circles */}
      <motion.div
        key={`circle-1-${currentSlide}`}
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: [0, 1.2, 0.9, 1.3, 1],
          rotate: [0, 180, 270, 360, 540],
          x: [0, 100, 50, -50, 0],
          y: [0, -100, -50, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-32 h-32 rounded-full border-4 border-white/20"
      />

      <motion.div
        key={`circle-2-${currentSlide}`}
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: [0, 1, 1.2, 0.8, 1],
          rotate: [0, -90, -180, -270, -360],
          x: [0, -80, -120, -80, 0],
          y: [0, 80, 40, -40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-24 w-40 h-40 rounded-full border-3 border-white/15"
      />

      <motion.div
        key={`circle-3-${currentSlide}`}
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: [0, 1.1, 1, 1.2, 0.95],
          rotate: [0, 120, 240, 360, 480],
          x: [0, 70, 110, 50, 0],
          y: [0, -70, -110, -50, 0],
        }}
        transition={{
          duration: 11.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 left-1/2 w-36 h-36 rounded-full border-3 border-white/18"
      />

      <motion.div
        key={`circle-4-${currentSlide}`}
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: [0, 0.9, 1.1, 0.85, 1],
          rotate: [0, -150, -300, -450, -600],
          x: [0, -90, -60, 90, 0],
          y: [0, 90, 60, -90, 0],
        }}
        transition={{
          duration: 9.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/3 w-28 h-28 rounded-full border-4 border-white/17"
      />

      {/* Squares */}
      <motion.div
        key={`square-1-${currentSlide}`}
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: [0, 1, 0.8, 1.1, 0.9],
          rotate: [0, 90, 180, 270, 360],
          x: [0, -80, -40, 80, 0],
          y: [0, 80, 120, 60, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-32 right-32 w-24 h-24 border-4 border-white/20"
      />

      <motion.div
        key={`square-2-${currentSlide}`}
        initial={{ scale: 0, rotate: 45 }}
        animate={{
          scale: [0, 1.1, 0.9, 1.2, 1],
          rotate: [45, 135, 225, 315, 405],
          x: [0, 60, 100, 60, 0],
          y: [0, -60, -100, -60, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-40 left-1/4 w-28 h-28 border-3 border-white/15"
      />

      <motion.div
        key={`square-3-${currentSlide}`}
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: [0, 1.2, 0.85, 1.05, 1],
          rotate: [0, -90, -180, -270, -360],
          x: [0, 85, 50, -50, 0],
          y: [0, -85, -50, 50, 0],
        }}
        transition={{
          duration: 10.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-2/3 right-1/4 w-30 h-30 border-4 border-white/19"
      />

      <motion.div
        key={`square-4-${currentSlide}`}
        initial={{ scale: 0, rotate: 30 }}
        animate={{
          scale: [0, 0.95, 1.15, 0.9, 1],
          rotate: [30, 120, 210, 300, 390],
          x: [0, -75, -110, -60, 0],
          y: [0, 75, 40, -40, 0],
        }}
        transition={{
          duration: 12.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/3 left-1/4 w-26 h-26 border-3 border-white/16"
      />

      {/* Triangles */}
      <motion.div
        key={`triangle-1-${currentSlide}`}
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: [0, 1.1, 0.9, 1.2, 1],
          rotate: [0, -120, -240, -360, -480],
          x: [0, 60, 90, 30, 0],
          y: [0, -60, -30, 60, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 right-20 w-28 h-28"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          border: '4px solid rgba(255, 255, 255, 0.2)',
        }}
      />

      <motion.div
        key={`triangle-2-${currentSlide}`}
        initial={{ scale: 0, rotate: 180 }}
        animate={{
          scale: [0, 1, 1.1, 0.9, 1],
          rotate: [180, 240, 300, 360, 420],
          x: [0, -70, -100, -50, 0],
          y: [0, 70, 40, -40, 0],
        }}
        transition={{
          duration: 9.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 left-20 w-32 h-32"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          border: '3px solid rgba(255, 255, 255, 0.15)',
        }}
      />

      <motion.div
        key={`triangle-3-${currentSlide}`}
        initial={{ scale: 0, rotate: 90 }}
        animate={{
          scale: [0, 1.15, 0.95, 1.1, 1],
          rotate: [90, 180, 270, 360, 450],
          x: [0, 80, 120, 70, 0],
          y: [0, -80, -50, 50, 0],
        }}
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 left-1/2 w-30 h-30"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          border: '4px solid rgba(255, 255, 255, 0.18)',
        }}
      />

      <motion.div
        key={`triangle-4-${currentSlide}`}
        initial={{ scale: 0, rotate: -45 }}
        animate={{
          scale: [0, 1, 1.2, 0.85, 1.05],
          rotate: [-45, -135, -225, -315, -405],
          x: [0, -65, -95, -55, 0],
          y: [0, 65, 95, 55, 0],
        }}
        transition={{
          duration: 11.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-2/3 right-1/3 w-26 h-26"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          border: '3px solid rgba(255, 255, 255, 0.17)',
        }}
      />

      {/* Hexagons */}
      <motion.div
        key={`hexagon-1-${currentSlide}`}
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: [0, 1, 1.1, 0.9, 1.05],
          rotate: [0, 60, 120, 180, 240],
          x: [0, -60, -90, -60, 0],
          y: [0, 60, 30, -30, 0],
        }}
        transition={{
          duration: 10.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-1/3 w-20 h-20"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          border: '3px solid rgba(255, 255, 255, 0.2)',
        }}
      />

      <motion.div
        key={`hexagon-2-${currentSlide}`}
        initial={{ scale: 0, rotate: 30 }}
        animate={{
          scale: [0, 1.2, 1, 1.1, 1],
          rotate: [30, 90, 150, 210, 270],
          x: [0, 80, 120, 60, 0],
          y: [0, -80, -40, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/3 w-24 h-24"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          border: '4px solid rgba(255, 255, 255, 0.18)',
        }}
      />

      <motion.div
        key={`hexagon-3-${currentSlide}`}
        initial={{ scale: 0, rotate: 15 }}
        animate={{
          scale: [0, 1.1, 0.95, 1.15, 1],
          rotate: [15, 75, 135, 195, 255],
          x: [0, 70, 100, 50, 0],
          y: [0, 70, 100, 50, 0],
        }}
        transition={{
          duration: 13.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/4 w-22 h-22"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          border: '3px solid rgba(255, 255, 255, 0.16)',
        }}
      />

      <motion.div
        key={`hexagon-4-${currentSlide}`}
        initial={{ scale: 0, rotate: -20 }}
        animate={{
          scale: [0, 0.9, 1.1, 0.95, 1],
          rotate: [-20, 40, 100, 160, 220],
          x: [0, -70, -100, -70, 0],
          y: [0, -70, -40, 40, 0],
        }}
        transition={{
          duration: 9.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/2 right-1/4 w-26 h-26"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          border: '4px solid rgba(255, 255, 255, 0.19)',
        }}
      />

      {/* Stars */}
      <motion.div
        key={`star-1-${currentSlide}`}
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: [0, 1.3, 0.8, 1.1, 1],
          rotate: [0, 72, 144, 216, 288],
          x: [0, 50, 80, 40, 0],
          y: [0, -50, -80, -40, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/3 right-1/4 w-28 h-28"
        style={{
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          border: '3px solid rgba(255, 255, 255, 0.2)',
        }}
      />

      <motion.div
        key={`star-2-${currentSlide}`}
        initial={{ scale: 0, rotate: 36 }}
        animate={{
          scale: [0, 1.1, 0.9, 1.2, 1],
          rotate: [36, 108, 180, 252, 324],
          x: [0, -55, -85, -45, 0],
          y: [0, 55, 85, 45, 0],
        }}
        transition={{
          duration: 14.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 left-1/3 w-26 h-26"
        style={{
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          border: '4px solid rgba(255, 255, 255, 0.17)',
        }}
      />

      {/* Diamonds */}
      <motion.div
        key={`diamond-1-${currentSlide}`}
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: [0, 1, 1.2, 0.9, 1.1],
          rotate: [0, 90, 180, 270, 360],
          x: [0, -70, -100, -70, 0],
          y: [0, -70, -40, 40, 0],
        }}
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-2/3 left-1/4 w-26 h-26"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          border: '4px solid rgba(255, 255, 255, 0.2)',
        }}
      />

      <motion.div
        key={`diamond-2-${currentSlide}`}
        initial={{ scale: 0, rotate: 45 }}
        animate={{
          scale: [0, 1.15, 0.85, 1.05, 1],
          rotate: [45, 135, 225, 315, 405],
          x: [0, 65, 95, 55, 0],
          y: [0, -65, -95, -55, 0],
        }}
        transition={{
          duration: 10.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/2 right-1/3 w-24 h-24"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          border: '3px solid rgba(255, 255, 255, 0.18)',
        }}
      />

      <motion.div
        key={`diamond-3-${currentSlide}`}
        initial={{ scale: 0, rotate: -30 }}
        animate={{
          scale: [0, 1, 1.1, 0.95, 1.05],
          rotate: [-30, 60, 150, 240, 330],
          x: [0, 75, 110, 65, 0],
          y: [0, 75, 45, -45, 0],
        }}
        transition={{
          duration: 11.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 right-1/2 w-28 h-28"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          border: '4px solid rgba(255, 255, 255, 0.16)',
        }}
      />

      <motion.div
        key={`diamond-4-${currentSlide}`}
        initial={{ scale: 0, rotate: 20 }}
        animate={{
          scale: [0, 0.9, 1.2, 0.85, 1],
          rotate: [20, 110, 200, 290, 380],
          x: [0, -80, -115, -70, 0],
          y: [0, 80, 50, -50, 0],
        }}
        transition={{
          duration: 9.3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 left-1/2 w-30 h-30"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          border: '3px solid rgba(255, 255, 255, 0.19)',
        }}
      />
    </>
  )
}
