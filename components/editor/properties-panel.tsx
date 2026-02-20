'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Palette, Sparkles, X } from 'lucide-react'
import type { Section } from '@/app/editor/page'

type Props = {
  selectedSection: string | null
  sections: Section[]
  onSectionUpdate: (sectionId: string, updates: any) => void
}

type Tab = 'content' | 'design' | 'ai'

export function PropertiesPanel({ selectedSection, sections, onSectionUpdate }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('content')
  const [isExpanded, setIsExpanded] = useState(true)

  const section = sections.find(s => s.id === selectedSection)

  const tabs = [
    { id: 'content' as Tab, label: 'Content', icon: Pencil },
    { id: 'design' as Tab, label: 'Design', icon: Palette },
    { id: 'ai' as Tab, label: 'AI Assistant', icon: Sparkles },
  ]

  if (!isExpanded) {
    return (
      <motion.button
        onClick={() => setIsExpanded(true)}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed right-0 top-1/2 -translate-y-1/2 p-3 bg-cyan-500 text-white rounded-l-lg shadow-lg hover:bg-cyan-600 transition-colors"
      >
        <Sparkles className="w-5 h-5" />
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-96 bg-[#1a1a24] border-l border-white/10 flex flex-col overflow-hidden"
    >
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Properties</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(false)}
            className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-cyan-500/20 rounded-md"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <tab.icon className="w-4 h-4 relative z-10" />
              <span className="text-xs font-medium relative z-10 hidden lg:inline">
                {tab.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {!section ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Pencil className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Selection</h3>
            <p className="text-sm text-slate-400">
              Select a section to edit its properties
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Section Name
                  </label>
                  <input
                    type="text"
                    defaultValue={section.name}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all"
                    placeholder="Enter section name..."
                  />
                </div>

                {section.type === 'hero' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Main Headline
                      </label>
                      <textarea
                        defaultValue="Full Stack Developer"
                        rows={2}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all resize-none"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 rounded-md text-purple-300 text-xs font-medium transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Improve
                      </motion.button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Subheadline
                      </label>
                      <textarea
                        defaultValue="Building amazing web experiences"
                        rows={2}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all resize-none"
                      />
                    </div>
                  </>
                )}

                {section.type === 'about' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Bio Text
                    </label>
                    <textarea
                      defaultValue="I'm a passionate developer..."
                      rows={5}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all resize-none"
                    />
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'design' && (
              <motion.div
                key="design"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Color Scheme
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['purple', 'blue', 'green', 'orange', 'pink', 'cyan'].map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`aspect-square rounded-lg bg-gradient-to-br from-${color}-500 to-${color}-700 shadow-lg hover:shadow-xl transition-all`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Background
                  </label>
                  <div className="space-y-2">
                    <input
                      type="color"
                      defaultValue="#667eea"
                      className="w-full h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Text Alignment
                  </label>
                  <div className="flex gap-2">
                    {['left', 'center', 'right'].map((align) => (
                      <motion.button
                        key={align}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm capitalize transition-all"
                      >
                        {align}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">
                    Get AI-powered suggestions to improve this section
                  </p>
                  
                  <div className="space-y-2">
                    {[
                      'Improve writing style',
                      'Make more professional',
                      'Add impact metrics',
                      'Optimize for SEO',
                    ].map((action) => (
                      <motion.button
                        key={action}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-left px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-slate-300 transition-all"
                      >
                        {action}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Ask AI Assistant
                  </label>
                  <textarea
                    placeholder="Ask for help or suggestions..."
                    rows={4}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all resize-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-2 w-full px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold rounded-lg shadow-lg transition-all"
                  >
                    Get AI Suggestions
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
