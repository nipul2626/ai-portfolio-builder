'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Grid3X3, Upload, Sparkles, Star } from 'lucide-react'
import type { WizardMethod } from '@/app/wizard/page'

interface ChooseMethodIslandProps {
  onMethodSelect: (method: WizardMethod) => void
}

const methods = [
  {
    id: 'template' as WizardMethod,
    title: 'Use Template',
    description: 'Choose from pre-designed templates',
    icon: Grid3X3,
    color: 'cyan',
    position: 'left'
  },
  {
    id: 'resume' as WizardMethod,
    title: 'Upload Resume',
    description: 'AI analyzes and builds your portfolio',
    icon: Upload,
    color: 'purple',
    badge: 'Most Popular',
    position: 'center'
  },
  {
    id: 'ai' as WizardMethod,
    title: 'AI Generate',
    description: 'Describe your vision, AI creates it',
    icon: Sparkles,
    color: 'magenta',
    position: 'right'
  }
]

export function ChooseMethodIsland({ onMethodSelect }: ChooseMethodIslandProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const handleCardClick = (method: WizardMethod) => {
    setSelectedCard(method)
    
    // Animate particles
    setTimeout(() => {
      onMethodSelect(method)
    }, 600)
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'cyan':
        return {
          border: 'border-cyan-500/50',
          bg: 'bg-cyan-500/10',
          text: 'text-cyan-400',
          glow: 'shadow-cyan-500/50',
          gradient: 'from-cyan-500/20 to-blue-500/20'
        }
      case 'purple':
        return {
          border: 'border-purple-500/50',
          bg: 'bg-purple-500/10',
          text: 'text-purple-400',
          glow: 'shadow-purple-500/50',
          gradient: 'from-purple-500/20 to-violet-500/20'
        }
      case 'magenta':
        return {
          border: 'border-fuchsia-500/50',
          bg: 'bg-fuchsia-500/10',
          text: 'text-fuchsia-400',
          glow: 'shadow-fuchsia-500/50',
          gradient: 'from-fuchsia-500/20 to-pink-500/20'
        }
      default:
        return {
          border: 'border-blue-500/50',
          bg: 'bg-blue-500/10',
          text: 'text-blue-400',
          glow: 'shadow-blue-500/50',
          gradient: 'from-blue-500/20 to-cyan-500/20'
        }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      {/* Island appearance animation */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-6xl"
      >
        {/* Title */}
        <motion.div className="text-center mb-16">
          <motion.h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {['How', 'would', 'you', 'like', 'to', 'start?'].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="inline-block mr-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/60 text-lg"
          >
            Select your preferred method to create your portfolio
          </motion.p>
        </motion.div>

        {/* Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {methods.map((method, index) => {
            const isHovered = hoveredCard === method.id
            const isSelected = selectedCard === method.id
            const isOtherSelected = selectedCard !== null && !isSelected
            const colors = getColorClasses(method.color)
            const Icon = method.icon

            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{
                  opacity: isOtherSelected ? 0.3 : 1,
                  y: 0,
                  rotateX: 0,
                  scale: isSelected ? 1.5 : isHovered ? 1.05 : 1,
                  z: isSelected ? 100 : isHovered ? 20 : 0
                }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 100
                }}
                onHoverStart={() => !selectedCard && setHoveredCard(method.id)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => !selectedCard && handleCardClick(method.id)}
                className={`relative cursor-pointer transform-3d ${
                  method.position === 'center' ? 'md:scale-110' : ''
                }`}
              >
                {/* Popular badge */}
                {method.badge && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -top-3 -right-3 z-10"
                  >
                    <div className="relative">
                      <Star className="w-12 h-12 fill-yellow-500 text-yellow-500" />
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-900">
                        #1
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Card */}
                <div
                  className={`relative h-full bg-slate-900/60 backdrop-blur-xl border-2 ${colors.border} rounded-3xl p-8 transition-all duration-300 ${
                    isHovered || isSelected
                      ? `shadow-2xl ${colors.glow}`
                      : 'shadow-xl'
                  }`}
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${colors.gradient} opacity-0`}
                    animate={{
                      opacity: isHovered || isSelected ? 0.3 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        rotate: isHovered ? 360 : 0,
                        scale: isHovered ? 1.2 : 1
                      }}
                      transition={{ duration: 0.6 }}
                      className={`mb-6 p-6 rounded-2xl ${colors.bg} border ${colors.border}`}
                    >
                      <Icon className={`w-12 h-12 ${colors.text}`} />
                    </motion.div>

                    {/* Title */}
                    <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>
                      {method.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 mb-6 flex-grow">
                      {method.description}
                    </p>

                    {/* Hover indicator */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10
                      }}
                      transition={{ duration: 0.2 }}
                      className={`text-sm ${colors.text} font-medium`}
                    >
                      Click to select
                    </motion.div>
                  </div>

                  {/* Particle effect on selection */}
                  {isSelected && (
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{
                            opacity: 1,
                            x: '50%',
                            y: '50%',
                            scale: 1
                          }}
                          animate={{
                            opacity: 0,
                            x: `${50 + (Math.random() - 0.5) * 200}%`,
                            y: `${50 + (Math.random() - 0.5) * 200}%`,
                            scale: 0
                          }}
                          transition={{
                            duration: 0.6,
                            ease: 'easeOut',
                            delay: i * 0.02
                          }}
                          className={`absolute w-2 h-2 rounded-full ${colors.bg}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
