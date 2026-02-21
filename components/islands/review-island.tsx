'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PortfolioData } from '@/app/wizard/page'

interface ReviewIslandProps {
  portfolioData: PortfolioData
  onContinue: () => void
  onBack: () => void
}

const checklist = [
  { id: '1', label: 'Profile picture added', completed: true },
  { id: '2', label: 'Bio written', completed: true },
  { id: '3', label: 'At least 3 projects', completed: true },
  { id: '4', label: 'Skills listed', completed: true },
  { id: '5', label: 'Contact info complete', completed: true }
]

export function ReviewIsland({ portfolioData, onContinue, onBack }: ReviewIslandProps) {
  const readinessScore = 95

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-8"
    >
      <div className="w-full max-w-7xl">
        <Button variant="ghost" onClick={onBack} className="mb-8 text-white/60 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Edit
        </Button>

        <motion.h1 className="text-5xl font-bold text-center mb-12 text-white">
          Review Your Portfolio
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Preview */}
          <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="aspect-video bg-slate-800/40 rounded-2xl flex items-center justify-center">
              <span className="text-white/40">Full Portfolio Preview</span>
            </div>
          </div>

          {/* Checklist & Score */}
          <div className="space-y-6">
            {/* Readiness Score */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h3 className="text-white font-semibold mb-4">Portfolio Readiness</h3>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="60" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="60"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: readinessScore / 100 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    style={{ strokeDasharray: '377' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-400">{readinessScore}%</span>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h3 className="text-white font-semibold mb-4">Checklist</h3>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      item.completed ? 'bg-green-500/20 border-2 border-green-500' : 'bg-slate-800 border-2 border-slate-600'
                    }`}>
                      {item.completed && <Check className="w-4 h-4 text-green-500" />}
                    </div>
                    <span className={item.completed ? 'text-white' : 'text-white/40'}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={onContinue}
              className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              Deploy Portfolio
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
