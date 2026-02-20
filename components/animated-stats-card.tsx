'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface AnimatedStatsCardProps {
  title: string
  value: number
  suffix?: string
  prefix?: string
  icon: LucideIcon
  color: 'blue' | 'purple' | 'green' | 'orange'
  trend?: number
  delay?: number
}

const colorClasses = {
  blue: {
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/20'
  },
  purple: {
    gradient: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    glow: 'shadow-purple-500/20'
  },
  green: {
    gradient: 'from-green-500 to-emerald-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    glow: 'shadow-green-500/20'
  },
  orange: {
    gradient: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    glow: 'shadow-orange-500/20'
  }
}

export function AnimatedStatsCard({
  title,
  value,
  suffix = '',
  prefix = '',
  icon: Icon,
  color,
  trend,
  delay = 0
}: AnimatedStatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const hasAnimated = useRef(false)
  const colors = colorClasses[color]

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative backdrop-blur-xl bg-white/5 border ${colors.border} rounded-2xl p-6 overflow-hidden group cursor-pointer shadow-lg hover:${colors.glow} transition-all duration-300`}
    >
      {/* Animated gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${colors.gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity`}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className={`w-6 h-6 ${colors.text}`} />
            </motion.div>
          </div>

          {trend !== undefined && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.3 }}
              className={`flex items-center gap-1 text-sm font-medium ${
                trend >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              <svg
                className={`w-4 h-4 ${trend >= 0 ? '' : 'rotate-180'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              {Math.abs(trend)}%
            </motion.div>
          )}
        </div>

        {/* Value */}
        <div className="mb-2">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay + 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-white font-mono"
          >
            {prefix}
            {displayValue.toLocaleString()}
            {suffix}
          </motion.div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.4 }}
          className="text-slate-400 text-sm font-medium"
        >
          {title}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.8 }}
          className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden origin-left"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: delay + 0.7, duration: 1.5, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
          />
        </motion.div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl`}
      />
    </motion.div>
  )
}
