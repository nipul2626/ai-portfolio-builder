'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, Clock, X } from 'lucide-react'
import type { Section } from '@/app/editor/page'

type Props = {
  sections: Section[]
  history: any[]
  historyIndex: number
  onClose: () => void
}

export function LayersHistoryPanel({ sections, history, historyIndex, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'layers' | 'history'>('layers')

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      className="fixed bottom-0 left-80 right-96 h-80 bg-[#1a1a24] border-t border-x border-white/10 rounded-t-2xl shadow-2xl overflow-hidden z-40"
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('layers')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'layers'
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4 inline mr-2" />
              Layers
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              History
            </button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/10 text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {activeTab === 'layers' && (
            <div className="space-y-2">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="flex items-center gap-3 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                    <span className="text-xs font-mono text-purple-400">{section.type[0].toUpperCase()}</span>
                  </div>
                  <span className="flex-1 text-sm text-white">{section.name}</span>
                  <span className="text-xs text-slate-500">{section.visible ? 'Visible' : 'Hidden'}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-2">
              {history.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No history yet</p>
                </div>
              ) : (
                history.map((item, index) => (
                  <div
                    key={index}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      index === historyIndex
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-sm">{item.action}</div>
                    <div className="text-xs text-slate-500">{item.timestamp}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
