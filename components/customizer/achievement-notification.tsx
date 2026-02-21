'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy } from 'lucide-react'
import { useUIStore } from '@/store/ui-store'
import confetti from 'canvas-confetti'

export function AchievementNotification() {
  const { achievements } = useUIStore()
  const [visibleAchievement, setVisibleAchievement] = useState<any>(null)

  useEffect(() => {
    // Find newly unlocked achievement
    const newlyUnlocked = achievements.find(
      (a) => a.unlocked && a.unlockedAt && new Date(a.unlockedAt).getTime() > Date.now() - 5000
    )

    if (newlyUnlocked && !visibleAchievement) {
      setVisibleAchievement(newlyUnlocked)
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ff00ff', '#7b2ff7'],
      })

      // Auto-hide after 5 seconds
      setTimeout(() => {
        setVisibleAchievement(null)
      }, 5000)
    }
  }, [achievements, visibleAchievement])

  return (
    <AnimatePresence>
      {visibleAchievement && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-8 right-8 z-50 w-96"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl border border-cyan-500/30">
            {/* Close Button */}
            <button
              onClick={() => setVisibleAchievement(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1.1, 1.1, 1.1, 1],
                }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center"
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                  Achievement Unlocked!
                </p>
                <h3 className="text-lg font-bold text-white">{visibleAchievement.name}</h3>
              </div>
            </div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-6xl text-center mb-4"
            >
              {visibleAchievement.icon}
            </motion.div>

            {/* Description */}
            <p className="text-sm text-gray-300 text-center mb-4">
              {visibleAchievement.description}
            </p>

            {/* Progress Bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function AchievementProgress() {
  const { achievements } = useUIStore()
  const [isExpanded, setIsExpanded] = useState(false)

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalCount = achievements.length
  const progress = (unlockedCount / totalCount) * 100

  const nextAchievement = achievements.find((a) => !a.unlocked)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-20 right-4 z-40"
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-full px-4 py-2 shadow-lg border border-cyan-500/30 flex items-center gap-2"
      >
        <Trophy className="w-4 h-4 text-cyan-500" />
        <span className="text-sm font-medium text-white">
          {unlockedCount}/{totalCount}
        </span>
        <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="mt-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 shadow-xl border border-cyan-500/20 w-64"
          >
            <h4 className="text-sm font-semibold text-white mb-3">Your Achievements</h4>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-2 rounded-lg border ${
                    achievement.unlocked
                      ? 'bg-cyan-500/10 border-cyan-500/30'
                      : 'bg-gray-800/50 border-gray-700 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <Trophy className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {nextAchievement && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-xs text-muted-foreground mb-2">Next up:</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{nextAchievement.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{nextAchievement.name}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
