'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, Clock, X, Eye, EyeOff, Lock, Unlock, Search } from 'lucide-react'
import type { Section, HistoryEntry } from '@/app/editor/page'

type Props = {
  sections: Section[]
  selectedSection: string | null
  onSectionSelect: (id: string) => void
  history: HistoryEntry[]
  historyIndex: number
  onHistoryJump: (index: number) => void
  onClose: () => void
  onToggleVisibility: (id: string) => void
}

export function LayersHistoryPanel({
  sections,
  selectedSection,
  onSectionSelect,
  history,
  historyIndex,
  onHistoryJump,
  onClose,
  onToggleVisibility,
}: Props) {
  const [activeTab, setActiveTab] = useState<'layers' | 'history'>('layers')
  const [searchQuery, setSearchQuery] = useState('')
  const [lockedSections, setLockedSections] = useState<Set<string>>(new Set())

  const toggleLock = (id: string) => {
    setLockedSections(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filteredSections = sections.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-72 right-[360px] h-72 bg-[#1a1a24] border-t border-x border-white/10 rounded-t-2xl shadow-2xl overflow-hidden z-40"
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            {[
              { id: 'layers' as const, label: 'Layers', icon: Layers },
              { id: 'history' as const, label: 'History', icon: Clock },
            ].map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="panel-tab"
                    className="absolute inset-0 bg-cyan-500/15 rounded-lg border border-cyan-400/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <tab.icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'layers' && (
              <div className="flex items-center gap-1.5 bg-white/[0.06] rounded-lg px-2.5 py-1.5">
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Filter..."
                  className="bg-transparent text-xs text-white placeholder-slate-500 outline-none w-24"
                />
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3">
          {activeTab === 'layers' && (
            <div className="space-y-1">
              {filteredSections.map((section, index) => {
                const isSelected = selectedSection === section.id
                const isLocked = lockedSections.has(section.id)

                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => !isLocked && onSectionSelect(section.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 border border-cyan-400/30'
                        : 'bg-white/[0.02] border border-transparent hover:bg-white/[0.05]'
                    } ${!section.visible ? 'opacity-40' : ''} ${isLocked ? 'opacity-60' : ''}`}
                  >
                    {/* Type indicator */}
                    <div className={`w-7 h-7 rounded flex items-center justify-center text-xs font-mono ${
                      isSelected ? 'bg-cyan-500/25 text-cyan-400' : 'bg-white/[0.06] text-slate-500'
                    }`}>
                      {section.type[0].toUpperCase()}
                    </div>

                    {/* Name */}
                    <span className={`flex-1 text-xs font-medium ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                      {section.name}
                    </span>

                    {/* Type label */}
                    <span className="text-[10px] text-slate-600 uppercase">{section.type}</span>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); onToggleVisibility(section.id) }}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        {section.visible ? (
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                        )}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleLock(section.id) }}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        {isLocked ? (
                          <Lock className="w-3.5 h-3.5 text-orange-400" />
                        ) : (
                          <Unlock className="w-3.5 h-3.5 text-slate-600" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-1">
              {history.length === 0 ? (
                <div className="text-center py-8 text-slate-600">
                  <Clock className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-xs">No history yet</p>
                  <p className="text-[10px] text-slate-700 mt-1">Changes will appear here as you edit</p>
                </div>
              ) : (
                <>
                  {/* Timeline */}
                  <div className="relative">
                    <div className="absolute left-[13px] top-0 bottom-0 w-px bg-white/10" />
                    {history.map((entry, index) => {
                      const isCurrent = index === historyIndex
                      const isFuture = index > historyIndex

                      return (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.02 }}
                          onClick={() => onHistoryJump(index)}
                          className={`flex items-start gap-3 px-2 py-2 rounded-lg cursor-pointer transition-all ${
                            isCurrent
                              ? 'bg-cyan-500/10'
                              : isFuture
                              ? 'opacity-40 hover:opacity-60'
                              : 'hover:bg-white/[0.03]'
                          }`}
                        >
                          <div className={`w-[10px] h-[10px] rounded-full mt-0.5 flex-shrink-0 z-10 ${
                            isCurrent
                              ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                              : isFuture
                              ? 'bg-slate-600'
                              : 'bg-slate-500'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium ${isCurrent ? 'text-cyan-300' : 'text-slate-400'}`}>
                              {entry.action}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              {entry.sectionName && (
                                <span className="text-[10px] text-slate-600">{entry.sectionName}</span>
                              )}
                              <span className="text-[10px] text-slate-700">{entry.timestamp}</span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
