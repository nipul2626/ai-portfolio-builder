'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Check, Copy, Share2, ExternalLink, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PortfolioData } from '@/app/wizard/page'

interface DeployIslandProps {
  portfolioData: PortfolioData
}

const deploySteps = [
  'Building your portfolio...',
  'Optimizing images...',
  'Generating SEO...',
  'Deploying to servers...',
  'Going live!'
]

export function DeployIsland({ portfolioData }: DeployIslandProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isDeployed, setIsDeployed] = useState(false)
  const [copied, setCopied] = useState(false)
  
  const portfolioUrl = 'https://yourportfolio.example.com'

  useEffect(() => {
    if (currentStep < deploySteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setIsDeployed(true)
    }
  }, [currentStep])

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      {!isDeployed ? (
        <motion.div className="text-center">
          {/* Rocket animation */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: currentStep >= deploySteps.length ? -500 : 0 }}
            transition={{ duration: 2, ease: 'easeIn' }}
            className="mb-12"
          >
            <Rocket className="w-32 h-32 text-blue-400 mx-auto" />
          </motion.div>

          {/* Countdown and steps */}
          <div className="space-y-4 max-w-md mx-auto">
            {deploySteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: i <= currentStep ? 1 : 0.3,
                  x: 0
                }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-4 text-left"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i < currentStep
                    ? 'bg-green-500/20 border-2 border-green-500'
                    : i === currentStep
                    ? 'bg-blue-500/20 border-2 border-blue-500 animate-pulse'
                    : 'bg-slate-800 border-2 border-slate-600'
                }`}>
                  {i < currentStep && <Check className="w-4 h-4 text-green-500" />}
                  {i === currentStep && <span className="text-blue-400 text-sm">{i + 1}</span>}
                </div>
                <span className={`text-lg ${
                  i <= currentStep ? 'text-white' : 'text-white/40'
                }`}>
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl"
        >
          {/* Confetti effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, x: '50vw', opacity: 1 }}
                animate={{
                  y: '100vh',
                  x: `${50 + (Math.random() - 0.5) * 100}vw`,
                  opacity: 0,
                  rotate: Math.random() * 720
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: 'easeOut',
                  delay: i * 0.02
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)]
                }}
              />
            ))}
          </div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-bold text-white mb-4"
          >
            Your Portfolio is Live!
          </motion.h1>

          {/* URL Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <input
                type="text"
                value={portfolioUrl}
                readOnly
                className="flex-1 bg-slate-800/40 border border-white/10 rounded-xl px-4 py-3 text-white"
              />
              <Button
                onClick={handleCopy}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live Portfolio
              </Button>
            </div>
          </motion.div>

          <div className="flex gap-4 justify-center">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
            <Button variant="ghost" className="text-white/60 hover:text-white">
              Create Another
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
