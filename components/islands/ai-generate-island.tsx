'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface AIGenerateIslandProps {
  onGenerate: (prompt: string) => void
  onBack: () => void
}

const examplePrompts = [
  'Create a dark portfolio for a backend developer specializing in distributed systems',
  'Build a colorful portfolio for a UI/UX designer with playful animations',
  'Design a minimal researcher portfolio with focus on publications'
]

const generationPhases = [
  { label: 'Understanding your vision...', duration: 2000 },
  { label: 'Generating layout...', duration: 2000 },
  { label: 'Applying design...', duration: 2000 },
  { label: 'Adding finishing touches...', duration: 2000 }
]

export function AIGenerateIsland({ onGenerate, onBack }: AIGenerateIslandProps) {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [progress, setProgress] = useState(0)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setProgress(0)

    for (let i = 0; i < generationPhases.length; i++) {
      setCurrentPhase(i)
      const phase = generationPhases[i]
      
      const steps = 20
      for (let j = 0; j <= steps; j++) {
        await new Promise(resolve => setTimeout(resolve, phase.duration / steps))
        setProgress((i * 100 + (j / steps) * 100) / generationPhases.length)
      }
    }

    onGenerate(prompt)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-white/60 hover:text-white"
          disabled={isGenerating}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <motion.h1 className="text-5xl font-bold text-center mb-12">
          {['Describe', 'Your', 'Dream', 'Portfolio'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="inline-block mr-3 bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {!isGenerating ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Create a dark portfolio for a backend developer..."
                className="min-h-[200px] bg-slate-900/60 backdrop-blur-xl border-2 border-fuchsia-500/30 rounded-2xl p-6 text-white text-lg focus:border-fuchsia-500 resize-none"
                maxLength={500}
              />
              <div className="absolute bottom-4 right-4 text-white/40 text-sm">
                {prompt.length}/500
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {examplePrompts.map((example, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onClick={() => setPrompt(example)}
                  className="px-4 py-2 rounded-full bg-slate-800/60 border border-fuchsia-500/30 text-white/80 text-sm hover:bg-fuchsia-500/10 hover:border-fuchsia-500/60 transition-all"
                >
                  {example.substring(0, 40)}...
                </motion.button>
              ))}
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              className="w-full h-16 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white text-lg font-semibold rounded-2xl"
            >
              <Sparkles className="w-6 h-6 mr-2 animate-pulse" />
              Generate with AI
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Neural network visualization */}
            <div className="relative h-64 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full">
                {Array.from({ length: 30 }).map((_, i) => {
                  const x1 = Math.random() * 100
                  const y1 = Math.random() * 100
                  const x2 = Math.random() * 100
                  const y2 = Math.random() * 100
                  
                  return (
                    <motion.line
                      key={i}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="rgba(217, 70, 239, 0.2)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: i * 0.05, repeat: Infinity }}
                    />
                  )
                })}
              </svg>

              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 1, 0],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.15,
                    repeat: Infinity
                  }}
                  className="absolute w-3 h-3 rounded-full bg-fuchsia-500"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>

            {/* Current phase */}
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="text-2xl text-white font-medium mb-4">
                {generationPhases[currentPhase].label}
              </p>
              
              {/* Circular progress */}
              <div className="relative mx-auto w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="60"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 100 }}
                    style={{
                      pathLength: progress / 100,
                      strokeDasharray: '377',
                      strokeDashoffset: 377 - (377 * progress) / 100
                    }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#d946ef" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{Math.round(progress)}%</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
