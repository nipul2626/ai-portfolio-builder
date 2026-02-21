'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, X } from 'lucide-react'
import { useUIStore } from '@/store/ui-store'

interface TooltipData {
  title: string
  description: string
  example?: string
}

const elementExplanations: Record<string, TooltipData> = {
  'component-library': {
    title: 'Component Library',
    description: 'Drag and drop pre-built components onto your canvas. Each component is fully customizable.',
    example: 'Try dragging a Hero Section to get started!',
  },
  'canvas': {
    title: 'Canvas',
    description: 'This is where your template comes to life. Click on any element to edit its properties.',
    example: 'Double-click to edit text directly.',
  },
  'properties': {
    title: 'Properties Panel',
    description: 'Customize every aspect of your selected component - colors, fonts, spacing, animations, and more.',
    example: 'Select an element to see its properties here.',
  },
  'save-button': {
    title: 'Save Template',
    description: 'Save your work to the cloud. Your templates are auto-saved every 5 minutes.',
    example: 'Click to manually save your progress.',
  },
  'zoom-controls': {
    title: 'Zoom Controls',
    description: 'Zoom in and out to see details or get an overview of your entire template.',
    example: 'Use Ctrl+Scroll to zoom with your mouse.',
  },
  'device-toggle': {
    title: 'Device Preview',
    description: 'Switch between desktop, tablet, and mobile views to ensure your template looks great everywhere.',
    example: 'Your changes adapt automatically to each device.',
  },
  'undo-redo': {
    title: 'Undo/Redo',
    description: 'Step backward or forward through your editing history.',
    example: 'Keyboard shortcuts: Ctrl+Z (undo), Ctrl+Shift+Z (redo)',
  },
}

export function WhatsThisMode() {
  const { whatsThisMode, toggleWhatsThisMode } = useUIStore()
  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: TooltipData } | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!whatsThisMode) {
      setTooltip(null)
      return
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Find the nearest element with a data-tutorial attribute
      let element: HTMLElement | null = target
      while (element && !element.dataset.tutorial) {
        element = element.parentElement
      }

      if (element?.dataset.tutorial) {
        const explanation = elementExplanations[element.dataset.tutorial]
        if (explanation) {
          setTooltip({
            x: e.clientX,
            y: e.clientY,
            data: explanation,
          })
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleWhatsThisMode()
      }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [whatsThisMode, toggleWhatsThisMode])

  if (!whatsThisMode) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40 pointer-events-none" />

      {/* Custom Cursor */}
      <motion.div
        className="fixed z-50 pointer-events-none"
        animate={{
          x: cursorPos.x - 16,
          y: cursorPos.y - 16,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg">
          <HelpCircle className="w-5 h-5 text-white" />
        </div>
      </motion.div>

      {/* Exit Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full px-6 py-3 shadow-lg flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-white" />
          <span className="text-white font-medium">What's This? Mode</span>
          <span className="text-white/80 text-sm">Click anywhere to learn more</span>
          <button
            onClick={toggleWhatsThisMode}
            className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltip.x + 20,
              top: tooltip.y + 20,
            }}
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 shadow-2xl border border-cyan-500/30 max-w-xs">
              <button
                onClick={() => setTooltip(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors pointer-events-auto"
              >
                <X className="w-4 h-4" />
              </button>

              <h4 className="text-sm font-bold text-white mb-2 pr-6">{tooltip.data.title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                {tooltip.data.description}
              </p>
              
              {tooltip.data.example && (
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-2">
                  <p className="text-xs text-cyan-300 flex items-start gap-2">
                    <span className="text-base">💡</span>
                    <span>{tooltip.data.example}</span>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
