'use client'

import { useRef, useMemo, Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import type { WizardMethod } from '@/app/wizard/page'

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

interface BackgroundProps {
  currentStep: number
  method: WizardMethod
}

function BackgroundFallback({ method }: { method: WizardMethod }) {
  const getGradient = () => {
    switch (method) {
      case 'template':
        return 'from-cyan-950 via-slate-950 to-slate-900'
      case 'resume':
        return 'from-purple-950 via-slate-950 to-slate-900'
      case 'ai':
        return 'from-fuchsia-950 via-slate-950 to-slate-900'
      default:
        return 'from-blue-950 via-slate-950 to-slate-900'
    }
  }

  return (
    <div className={`fixed inset-0 -z-10 bg-gradient-to-br ${getGradient()} transition-colors duration-2000`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
    </div>
  )
}

function Starfield() {
  const starsRef = useRef<HTMLDivElement>(null)
  
  const stars = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2
    }))
  }, [])

  return (
    <div ref={starsRef} className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 1.5, star.opacity],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

function NebulaCloud({ method }: { method: WizardMethod }) {
  const getColors = () => {
    switch (method) {
      case 'template':
        return {
          from: 'from-cyan-500/20',
          via: 'via-blue-500/10',
          to: 'to-transparent'
        }
      case 'resume':
        return {
          from: 'from-purple-500/20',
          via: 'via-violet-500/10',
          to: 'to-transparent'
        }
      case 'ai':
        return {
          from: 'from-fuchsia-500/20',
          via: 'via-pink-500/10',
          to: 'to-transparent'
        }
      default:
        return {
          from: 'from-blue-500/20',
          via: 'via-cyan-500/10',
          to: 'to-transparent'
        }
    }
  }

  const colors = getColors()

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className={`absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-gradient-radial ${colors.from} ${colors.via} ${colors.to} blur-3xl`}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className={`absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial ${colors.via} ${colors.to} blur-3xl`}
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />
      <motion.div
        className={`absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial ${colors.from} ${colors.to} blur-3xl`}
        animate={{
          x: [0, 30, 0],
          y: [0, -25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      />
    </div>
  )
}

export function WizardBackground({ currentStep, method }: BackgroundProps) {
  return (
    <Suspense fallback={<BackgroundFallback method={method} />}>
      <div className="fixed inset-0 -z-10 bg-slate-950">
        {/* Starfield layer */}
        <Starfield />
        
        {/* Nebula clouds layer */}
        <motion.div
          animate={{ opacity: method ? 1 : 0.5 }}
          transition={{ duration: 2 }}
        >
          <NebulaCloud method={method} />
        </motion.div>
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950/80" />
        
        {/* Grid pattern for tech feel */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>
    </Suspense>
  )
}
