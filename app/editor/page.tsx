'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EditorActionBar } from '@/components/editor/editor-action-bar'
import { SectionsPanel } from '@/components/editor/sections-panel'
import { LivePreviewCanvas } from '@/components/editor/live-preview-canvas'
import { PropertiesPanel } from '@/components/editor/properties-panel'
import { LayersHistoryPanel } from '@/components/editor/layers-history-panel'

export type DeviceMode = 'desktop' | 'tablet' | 'mobile'
export type EditorMode = 'edit' | 'preview'
export type Section = {
  id: string
  type: string
  name: string
  visible: boolean
  order: number
  content: any
}

export default function EditorPage() {
  const [portfolioName, setPortfolioName] = useState('My Portfolio')
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [editorMode, setEditorMode] = useState<EditorMode>('edit')
  const [zoom, setZoom] = useState(100)
  const [sections, setSections] = useState<Section[]>([
    { id: '1', type: 'hero', name: 'Hero', visible: true, order: 0, content: {} },
    { id: '2', type: 'about', name: 'About', visible: true, order: 1, content: {} },
    { id: '3', type: 'experience', name: 'Experience', visible: true, order: 2, content: {} },
    { id: '4', type: 'projects', name: 'Projects', visible: true, order: 3, content: {} },
    { id: '5', type: 'skills', name: 'Skills', visible: true, order: 4, content: {} },
  ])
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [history, setHistory] = useState<any[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showLayersPanel, setShowLayersPanel] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
    }
  }, [historyIndex])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
    }
  }, [historyIndex, history.length])

  const handleSectionReorder = useCallback((newSections: Section[]) => {
    setSections(newSections)
    setSaveStatus('unsaved')
  }, [])

  const handleSectionToggleVisibility = useCallback((sectionId: string) => {
    setSections(sections.map(s =>
      s.id === sectionId ? { ...s, visible: !s.visible } : s
    ))
    setSaveStatus('unsaved')
  }, [sections])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault()
        if (e.shiftKey) {
          handleRedo()
        } else {
          handleUndo()
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        setSaveStatus('saving')
        setTimeout(() => setSaveStatus('saved'), 1000)
      }
      if (e.key === 'Escape') {
        setSelectedSection(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleUndo, handleRedo])

  return (
    <div className="h-screen w-full flex flex-col bg-[#12121a] overflow-hidden">
      <EditorActionBar
        portfolioName={portfolioName}
        onPortfolioNameChange={setPortfolioName}
        deviceMode={deviceMode}
        onDeviceModeChange={setDeviceMode}
        zoom={zoom}
        onZoomChange={setZoom}
        editorMode={editorMode}
        onEditorModeChange={setEditorMode}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        saveStatus={saveStatus}
      />

      <div className="flex-1 flex overflow-hidden">
        <SectionsPanel
          sections={sections}
          selectedSection={selectedSection}
          onSectionSelect={setSelectedSection}
          onSectionReorder={handleSectionReorder}
          onSectionToggleVisibility={handleSectionToggleVisibility}
        />

        <LivePreviewCanvas
          sections={sections}
          selectedSection={selectedSection}
          onSectionSelect={setSelectedSection}
          deviceMode={deviceMode}
          zoom={zoom}
          editorMode={editorMode}
        />

        <PropertiesPanel
          selectedSection={selectedSection}
          sections={sections}
          onSectionUpdate={(sectionId, updates) => {
            setSections(sections.map(s =>
              s.id === sectionId ? { ...s, ...updates } : s
            ))
            setSaveStatus('unsaved')
          }}
        />
      </div>

      <AnimatePresence>
        {showLayersPanel && (
          <LayersHistoryPanel
            sections={sections}
            history={history}
            historyIndex={historyIndex}
            onClose={() => setShowLayersPanel(false)}
          />
        )}
      </AnimatePresence>

      <button
        onClick={() => setShowLayersPanel(!showLayersPanel)}
        className="fixed bottom-4 right-4 p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-sm transition-all z-50"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </button>
    </div>
  )
}
