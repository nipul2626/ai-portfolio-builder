'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/store/ui-store'

interface TutorialStep {
  id: number
  title: string
  description: string
  targetSelector: string
  position: 'top' | 'bottom' | 'left' | 'right'
  action?: string
  videoUrl?: string
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 0,
    title: 'Component Library',
    description: 'This is your component library. Drag components onto the canvas to build your template.',
    targetSelector: '[data-tutorial="component-library"]',
    position: 'right',
  },
  {
    id: 1,
    title: 'Canvas Area',
    description: 'Your template appears here. Click to add sections and customize them.',
    targetSelector: '[data-tutorial="canvas"]',
    position: 'top',
    action: 'Click to add a hero section',
  },
  {
    id: 2,
    title: 'Properties Panel',
    description: 'Edit component properties here. Change colors, fonts, spacing, and more.',
    targetSelector: '[data-tutorial="properties"]',
    position: 'left',
  },
  {
    id: 3,
    title: 'Save Your Work',
    description: 'Always save your progress. Your template will be stored safely in your account.',
    targetSelector: '[data-tutorial="save-button"]',
    position: 'bottom',
  },
]

export function TutorialOverlay() {
  const {
    tutorialActive,
    tutorialStep,
    nextTutorialStep,
    previousTutorialStep,
    skipTutorial,
    completeTutorial,
  } = useUIStore()

  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const currentStep = tutorialSteps[tutorialStep]

  useEffect(() => {
    if (!tutorialActive || !currentStep) return

    const element = document.querySelector(currentStep.targetSelector)
    if (element) {
      const rect = element.getBoundingClientRect()
      setTargetRect(rect)
      
      // Scroll element into view
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [tutorialActive, tutorialStep, currentStep])

  const handleNext = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      nextTutorialStep()
    } else {
      completeTutorial()
    }
  }

  const handlePrevious = () => {
    if (tutorialStep > 0) {
      previousTutorialStep()
    }
  }

  const getTooltipPosition = () => {
    if (!targetRect) return {}

    const padding = 20
    const tooltipWidth = 320

    switch (currentStep.position) {
      case 'right':
        return {
          left: targetRect.right + padding,
          top: targetRect.top + targetRect.height / 2,
          transform: 'translateY(-50%)',
        }
      case 'left':
        return {
          left: targetRect.left - tooltipWidth - padding,
          top: targetRect.top + targetRect.height / 2,
          transform: 'translateY(-50%)',
        }
      case 'top':
        return {
          left: targetRect.left + targetRect.width / 2,
          top: targetRect.top - padding,
          transform: 'translate(-50%, -100%)',
        }
      case 'bottom':
        return {
          left: targetRect.left + targetRect.width / 2,
          top: targetRect.bottom + padding,
          transform: 'translateX(-50%)',
        }
      default:
        return {}
    }
  }

  if (!tutorialActive || !currentStep) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 pointer-events-none"
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Spotlight Cutout */}
        {targetRect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute pointer-events-auto"
            style={{
              left: targetRect.left - 8,
              top: targetRect.top - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.8), 0 0 30px 10px rgba(0, 240, 255, 0.5)',
              borderRadius: '12px',
              border: '2px solid rgba(0, 240, 255, 0.8)',
            }}
          />
        )}

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="absolute pointer-events-auto"
          style={getTooltipPosition()}
        >
          <div className="w-80 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-cyan-500/20">
            {/* Step Counter */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-cyan-400">
                Step {tutorialStep + 1} of {tutorialSteps.length}
              </span>
              <button
                onClick={skipTutorial}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-2">{currentStep.title}</h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {currentStep.description}
            </p>

            {currentStep.action && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mb-4">
                <p className="text-cyan-300 text-sm font-medium flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  {currentStep.action}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3">
              <Button
                onClick={handlePrevious}
                disabled={tutorialStep === 0}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === tutorialStep
                        ? 'bg-cyan-500 w-6'
                        : index < tutorialStep
                        ? 'bg-cyan-500/50'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                size="sm"
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600"
              >
                {tutorialStep < tutorialSteps.length - 1 ? 'Next' : 'Finish'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Animated Pointer */}
        {targetRect && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: targetRect.left + targetRect.width / 2,
              top: targetRect.top - 40,
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-8 h-8 text-cyan-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L12 20M12 20L6 14M12 20L18 14" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
