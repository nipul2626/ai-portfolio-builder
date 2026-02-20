'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Palette, Type, Layout } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PortfolioData } from '@/app/wizard/page'

interface CustomizeIslandProps {
  portfolioData: PortfolioData
  onCustomize: (customization: any) => void
  onBack: () => void
}

export function CustomizeIsland({ portfolioData, onCustomize, onBack }: CustomizeIslandProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'settings'>('content')

  const handleContinue = () => {
    onCustomize({ colors: {}, typography: {}, sections: {} })
  }

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
          Back
        </Button>

        <motion.h1 className="text-5xl font-bold text-center mb-12 text-white">
          Customize Your Portfolio
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Panel */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Live Preview</h3>
            <div className="aspect-video bg-slate-800/40 rounded-2xl flex items-center justify-center">
              <span className="text-white/40">Portfolio Preview</span>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            {/* Tabs */}
            <div className="flex gap-4 mb-6">
              {[
                { id: 'content' as const, label: 'Content', icon: Layout },
                { id: 'design' as const, label: 'Design', icon: Palette },
                { id: 'settings' as const, label: 'Settings', icon: Type }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Edit Your Content</h4>
                  <p className="text-white/60 text-sm">Manage your profile, projects, and experience</p>
                </div>
              )}
              {activeTab === 'design' && (
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Design Options</h4>
                  <p className="text-white/60 text-sm">Customize colors, fonts, and layout</p>
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Advanced Settings</h4>
                  <p className="text-white/60 text-sm">Configure SEO, analytics, and more</p>
                </div>
              )}
            </div>

            <Button
              onClick={handleContinue}
              className="w-full mt-8 h-12 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Continue to Review
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
