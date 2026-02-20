'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Eye, Check, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TemplateIslandProps {
  onTemplateSelect: (templateId: string) => void
  onBack: () => void
}

const templates = [
  { id: '1', name: 'Modern Developer', category: 'Developer', preview: '/templates/modern-dev.jpg' },
  { id: '2', name: 'Creative Designer', category: 'Designer', preview: '/templates/creative-design.jpg' },
  { id: '3', name: 'Minimalist Portfolio', category: 'General', preview: '/templates/minimal.jpg' },
  { id: '4', name: 'Bold Showcase', category: 'Creative', preview: '/templates/bold.jpg' },
  { id: '5', name: 'Tech Startup', category: 'Developer', preview: '/templates/tech.jpg' },
  { id: '6', name: 'Elegant Personal', category: 'Designer', preview: '/templates/elegant.jpg' },
  { id: '7', name: 'Dark Mode Pro', category: 'Developer', preview: '/templates/dark.jpg' },
  { id: '8', name: 'Colorful Creator', category: 'Creative', preview: '/templates/colorful.jpg' }
]

export function TemplateIsland({ onTemplateSelect, onBack }: TemplateIslandProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))]
  
  const filteredTemplates = selectedFilter === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedFilter)

  const currentTemplate = filteredTemplates[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTemplates.length) % filteredTemplates.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTemplates.length)
  }

  const handleSelect = () => {
    onTemplateSelect(currentTemplate.id)
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
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl"
      >
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-white/60 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Title */}
        <motion.h1 className="text-5xl font-bold text-center mb-4">
          {['Choose', 'Your', 'Template'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="inline-block mr-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Category filters */}
        <div className="flex justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setSelectedFilter(category)
                setCurrentIndex(0)
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedFilter === category
                  ? 'bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500/50'
                  : 'bg-slate-800/40 text-white/60 border-2 border-transparent hover:border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* 3D Carousel */}
        <div className="relative perspective-1000">
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Side templates (preview only) */}
            {[-2, -1, 1, 2].map((offset) => {
              const index = (currentIndex + offset + filteredTemplates.length) % filteredTemplates.length
              const template = filteredTemplates[index]
              
              return (
                <motion.div
                  key={`${template.id}-${offset}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: Math.abs(offset) === 1 ? 0.6 : 0.3,
                    scale: Math.abs(offset) === 1 ? 0.7 : 0.5,
                    x: offset * 280,
                    z: -Math.abs(offset) * 100,
                    rotateY: offset * 15
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute w-80 h-96 rounded-2xl overflow-hidden border-2 border-white/10 transform-3d"
                >
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <span className="text-white/40 text-sm">{template.name}</span>
                  </div>
                </motion.div>
              )
            })}

            {/* Center template (interactive) */}
            <motion.div
              key={currentTemplate.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, z: 50 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-96 h-[450px] rounded-3xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 transform-3d"
            >
              {/* Template preview */}
              <div className="w-full h-full bg-gradient-to-br from-cyan-900/20 via-slate-900 to-blue-900/20 flex flex-col items-center justify-center p-8">
                <div className="w-full h-full bg-slate-800/40 rounded-2xl border border-white/10 flex items-center justify-center mb-6">
                  <span className="text-white/60">Template Preview</span>
                </div>
                
                {/* Template info */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{currentTemplate.name}</h3>
                  <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                    {currentTemplate.category}
                  </span>
                </div>
              </div>

              {/* Actions overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
              >
                <Button
                  onClick={() => setIsExpanded(true)}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Full
                </Button>
                <Button
                  onClick={handleSelect}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Select Template
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <Button
            onClick={handlePrevious}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-slate-800/60 backdrop-blur-xl border-2 border-white/10 hover:border-cyan-500/50 hover:bg-slate-800/80"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </Button>
          <Button
            onClick={handleNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-slate-800/60 backdrop-blur-xl border-2 border-white/10 hover:border-cyan-500/50 hover:bg-slate-800/80"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </Button>
        </div>

        {/* Keyboard hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-white/40 text-sm mt-8"
        >
          Use arrow keys to navigate
        </motion.p>
      </motion.div>

      {/* Full preview modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-8"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl h-[80vh] bg-slate-900 rounded-3xl border-2 border-cyan-500/30 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white/60 text-lg">Full template preview</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
