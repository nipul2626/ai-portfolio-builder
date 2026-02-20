'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { WizardStep } from '@/app/wizard/page'

interface ProgressConstellationProps {
  currentStep: WizardStep
  onStepClick: (step: WizardStep) => void
}

const steps = [
  { number: 1, label: 'Method' },
  { number: 2, label: 'Details' },
  { number: 3, label: 'Customize' },
  { number: 4, label: 'Review' },
  { number: 5, label: 'Deploy' }
]

export function ProgressConstellation({ currentStep, onStepClick }: ProgressConstellationProps) {
  return (
    <div className="fixed top-8 right-8 z-50">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative"
      >
        {/* Glassmorphic container */}
        <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-white/80 text-xs font-medium mb-4 tracking-wider uppercase">Progress</h3>
          
          <div className="relative">
            {/* Constellation map */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              {steps.slice(0, -1).map((step, i) => {
                const isCompleted = step.number < currentStep
                const isCurrent = step.number === currentStep
                
                return (
                  <motion.line
                    key={`line-${step.number}`}
                    x1="24"
                    y1={i * 56 + 24}
                    x2="24"
                    y2={(i + 1) * 56 + 24}
                    stroke={isCompleted ? '#10b981' : isCurrent ? '#3b82f6' : '#475569'}
                    strokeWidth="2"
                    strokeDasharray={isCompleted || isCurrent ? '0' : '4 4'}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isCompleted ? 1 : isCurrent ? 0.5 : 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                )
              })}
            </svg>

            {/* Step circles */}
            <div className="relative space-y-8">
              {steps.map((step) => {
                const isCompleted = step.number < currentStep
                const isCurrent = step.number === currentStep
                const isClickable = step.number <= currentStep

                return (
                  <motion.div
                    key={step.number}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: step.number * 0.1 }}
                  >
                    {/* Star/Circle */}
                    <button
                      onClick={() => isClickable && onStepClick(step.number as WizardStep)}
                      disabled={!isClickable}
                      className={`relative w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500/20 border-green-500 shadow-lg shadow-green-500/50'
                          : isCurrent
                          ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/50'
                          : 'bg-slate-800/40 border-slate-600'
                      } ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed'}`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <span className={`text-sm font-bold ${
                          isCurrent ? 'text-blue-400' : 'text-slate-500'
                        }`}>
                          {step.number}
                        </span>
                      )}

                      {/* Pulsing ring for current step */}
                      {isCurrent && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-blue-400"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        />
                      )}

                      {/* Glow effect for completed */}
                      {isCompleted && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-green-500/30 blur-md"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        />
                      )}
                    </button>

                    {/* Label */}
                    <div className="flex flex-col">
                      <span className={`text-sm font-medium ${
                        isCurrent ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-slate-500'
                      }`}>
                        {step.label}
                      </span>
                      {isCurrent && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-blue-400/60"
                        >
                          In Progress
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Progress percentage */}
          <motion.div
            className="mt-6 pt-4 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/60">Overall Progress</span>
              <span className="text-sm font-bold text-white">
                {Math.round(((currentStep - 1) / 4) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800/40 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
