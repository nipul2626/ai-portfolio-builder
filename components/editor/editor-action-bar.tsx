'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeft, Monitor, Tablet, Smartphone, ZoomIn, ZoomOut,
  Undo2, Redo2, Eye, Edit3, Rocket, MoreVertical, Cloud,
  Check, ChevronDown, Save, Copy, Download, Settings, Trash2
} from 'lucide-react'
import type { DeviceMode, EditorMode } from '@/app/editor/page'

type Props = {
  portfolioName: string
  onPortfolioNameChange: (name: string) => void
  deviceMode: DeviceMode
  onDeviceModeChange: (mode: DeviceMode) => void
  zoom: number
  onZoomChange: (zoom: number) => void
  editorMode: EditorMode
  onEditorModeChange: (mode: EditorMode) => void
  canUndo: boolean
  canRedo: boolean
  onUndo: () => void
  onRedo: () => void
  saveStatus: 'saved' | 'saving' | 'unsaved'
}

const zoomLevels = [50, 75, 100, 125, 150, 200]

export function EditorActionBar({
  portfolioName,
  onPortfolioNameChange,
  deviceMode,
  onDeviceModeChange,
  zoom,
  onZoomChange,
  editorMode,
  onEditorModeChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  saveStatus,
}: Props) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(portfolioName)
  const [showZoomDropdown, setShowZoomDropdown] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus()
      nameInputRef.current.select()
    }
  }, [isEditingName])

  const handleNameSave = () => {
    if (tempName.trim()) {
      onPortfolioNameChange(tempName.trim())
    } else {
      setTempName(portfolioName)
    }
    setIsEditingName(false)
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-[#1a1a24] border-b border-white/10 backdrop-blur-xl flex items-center justify-between px-6 relative z-50 shadow-lg"
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all group"
          >
            <motion.div
              className="group-hover:animate-slideInFromLeft"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            <span className="font-medium">Dashboard</span>
          </motion.button>
        </Link>

        <div className="h-8 w-px bg-white/10" />

        <div className="flex items-center gap-3">
          {isEditingName ? (
            <input
              ref={nameInputRef}
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNameSave()
                if (e.key === 'Escape') {
                  setTempName(portfolioName)
                  setIsEditingName(false)
                }
              }}
              className="bg-white/10 border border-cyan-400 rounded-lg px-3 py-1.5 text-white text-lg font-semibold outline-none w-64"
            />
          ) : (
            <motion.button
              onClick={() => setIsEditingName(true)}
              whileHover={{ scale: 1.02 }}
              className="text-lg font-semibold text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition-all cursor-pointer"
            >
              {portfolioName}
            </motion.button>
          )}

          <motion.div
            animate={{
              scale: saveStatus === 'saving' ? [1, 1.2, 1] : 1,
              rotate: saveStatus === 'saving' ? 360 : 0,
            }}
            transition={{ duration: 1, repeat: saveStatus === 'saving' ? Infinity : 0 }}
            className="flex items-center gap-1.5 text-xs text-slate-400"
          >
            {saveStatus === 'saved' && (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Saved</span>
              </>
            )}
            {saveStatus === 'saving' && (
              <>
                <Cloud className="w-3.5 h-3.5" />
                <span>Saving...</span>
              </>
            )}
            {saveStatus === 'unsaved' && (
              <>
                <Cloud className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-orange-400">Unsaved</span>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
          {[
            { mode: 'desktop' as DeviceMode, icon: Monitor, label: 'Desktop' },
            { mode: 'tablet' as DeviceMode, icon: Tablet, label: 'Tablet' },
            { mode: 'mobile' as DeviceMode, icon: Smartphone, label: 'Mobile' },
          ].map(({ mode, icon: Icon, label }) => (
            <motion.button
              key={mode}
              onClick={() => onDeviceModeChange(mode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 rounded-md transition-all ${
                deviceMode === mode
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {deviceMode === mode && (
                <motion.div
                  layoutId="device-indicator"
                  className="absolute inset-0 bg-cyan-500/20 rounded-md border border-cyan-400/50"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
            </motion.button>
          ))}
        </div>

        <div className="relative">
          <motion.button
            onClick={() => setShowZoomDropdown(!showZoomDropdown)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all"
          >
            <span className="font-medium">{zoom}%</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showZoomDropdown ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {showZoomDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full mt-2 bg-[#1a1a24] border border-white/10 rounded-lg shadow-2xl overflow-hidden min-w-[120px]"
              >
                {zoomLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      onZoomChange(level)
                      setShowZoomDropdown(false)
                    }}
                    className={`w-full px-4 py-2 text-left transition-colors ${
                      zoom === level
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {level}%
                  </button>
                ))}
                <div className="border-t border-white/10" />
                <button
                  onClick={() => {
                    onZoomChange(100)
                    setShowZoomDropdown(false)
                  }}
                  className="w-full px-4 py-2 text-left text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Fit to Screen
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <motion.button
            onClick={onUndo}
            disabled={!canUndo}
            whileHover={{ scale: canUndo ? 1.1 : 1, rotate: canUndo ? 360 : 0 }}
            whileTap={{ scale: canUndo ? 0.9 : 1, rotate: canUndo ? -360 : 0 }}
            className={`p-2 rounded-full transition-all ${
              canUndo
                ? 'bg-white/5 hover:bg-white/10 text-white'
                : 'bg-white/5 text-slate-600 cursor-not-allowed'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={onRedo}
            disabled={!canRedo}
            whileHover={{ scale: canRedo ? 1.1 : 1, rotate: canRedo ? 360 : 0 }}
            whileTap={{ scale: canRedo ? 0.9 : 1, rotate: canRedo ? -360 : 0 }}
            className={`p-2 rounded-full transition-all ${
              canRedo
                ? 'bg-white/5 hover:bg-white/10 text-white'
                : 'bg-white/5 text-slate-600 cursor-not-allowed'
            }`}
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="h-8 w-px bg-white/10" />

        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
          {[
            { mode: 'edit' as EditorMode, icon: Edit3, label: 'Edit' },
            { mode: 'preview' as EditorMode, icon: Eye, label: 'Preview' },
          ].map(({ mode, icon: Icon, label }) => (
            <motion.button
              key={mode}
              onClick={() => onEditorModeChange(mode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 rounded-md transition-all ${
                editorMode === mode
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {editorMode === mode && (
                <motion.div
                  layoutId="mode-indicator"
                  className="absolute inset-0 bg-cyan-500/20 rounded-md"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <div className="flex items-center gap-2 relative z-10">
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 transition-all overflow-hidden group"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white/20 rounded-lg"
          />
          <div className="flex items-center gap-2 relative z-10">
            <Rocket className="w-5 h-5" />
            <span>Publish</span>
          </div>
        </motion.button>

        <div className="relative">
          <motion.button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
          >
            <MoreVertical className="w-5 h-5" />
          </motion.button>

          <AnimatePresence>
            {showMoreMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 bg-[#1a1a24]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden min-w-[200px]"
              >
                {[
                  { icon: Save, label: 'Save as Template', action: () => console.log('[v0] Save as template') },
                  { icon: Copy, label: 'Duplicate Portfolio', action: () => console.log('[v0] Duplicate') },
                  { icon: Download, label: 'Export HTML', action: () => console.log('[v0] Export HTML') },
                  { icon: Download, label: 'Export PDF', action: () => console.log('[v0] Export PDF') },
                  { icon: Settings, label: 'Settings', action: () => console.log('[v0] Settings') },
                  { icon: Trash2, label: 'Delete', action: () => console.log('[v0] Delete'), danger: true },
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      item.action()
                      setShowMoreMenu(false)
                    }}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors group ${
                      item.danger
                        ? 'text-red-400 hover:bg-red-500/10'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
