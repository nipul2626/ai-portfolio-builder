'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/store/ui-store'

export function WelcomeModal() {
  const { tutorialCompleted, startTutorial } = useUIStore()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show modal on first visit
    if (!tutorialCompleted) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [tutorialCompleted])

  const handleStartTutorial = () => {
    setIsOpen(false)
    startTutorial()
  }

  const handleSkip = () => {
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSkip}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl"
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl border border-cyan-500/20">
              {/* Close Button */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="text-center">
                {/* Animated Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 mb-6"
                >
                  <Play className="w-10 h-10 text-white" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-white mb-4"
                >
                  Welcome to Template Customizer
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed"
                >
                  Create stunning portfolio templates with our intuitive drag-and-drop builder. Let us show you around!
                </motion.p>

                {/* Preview Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative h-48 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl mb-8 overflow-hidden border border-gray-700/50"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Animated Components */}
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="w-32 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-lg border border-cyan-500/30 absolute -left-20 -top-10"
                      />
                      <motion.div
                        animate={{
                          y: [0, 10, 0],
                          rotate: [0, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.5,
                        }}
                        className="w-32 h-20 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-lg border border-purple-500/30 absolute -right-20 top-0"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 1,
                        }}
                        className="w-40 h-24 bg-gradient-to-br from-cyan-500/30 to-purple-600/30 rounded-lg border-2 border-cyan-500/50"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-4"
                >
                  <Button
                    onClick={handleStartTutorial}
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-cyan-500/20"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="flex items-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      Start Tutorial
                    </motion.div>
                  </Button>

                  <Button
                    onClick={handleSkip}
                    size="lg"
                    variant="ghost"
                    className="text-gray-400 hover:text-white px-8 py-6 text-lg"
                  >
                    Skip for now
                  </Button>
                </motion.div>

                {/* Features Preview */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-8 grid grid-cols-3 gap-4 text-left"
                >
                  {[
                    { icon: '🎨', text: 'Drag & Drop' },
                    { icon: '✨', text: 'Animations' },
                    { icon: '💾', text: 'Auto-Save' },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <span className="text-2xl">{feature.icon}</span>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
