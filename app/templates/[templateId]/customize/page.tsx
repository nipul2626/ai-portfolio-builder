'use client'

import { useState, useCallback, use } from 'react'
import { ChevronLeft, Save, Eye, MoreVertical, RotateCcw, RotateCw, ZoomIn, ZoomOut, Maximize2, Monitor, Tablet, Smartphone, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import CustomizerTopBar from './components/customizer-top-bar'
import ComponentLibrary from './components/component-library'
import Canvas from './components/canvas'
import PropertiesPanel from './components/properties-panel'
import LayersPanel from './components/layers-panel'
import { WelcomeModal } from '@/components/tutorial/welcome-modal'
import { TutorialOverlay } from '@/components/tutorial/tutorial-overlay'
import { VersionHistoryPanel } from '@/components/customizer/version-history-panel'
import { AchievementNotification, AchievementProgress } from '@/components/customizer/achievement-notification'
import { CodeExportPanel } from '@/components/customizer/code-export-panel'
import { WhatsThisMode } from '@/components/customizer/whats-this-mode'
import { AIAssistant } from '@/components/customizer/ai-assistant'
import { CollaborationPanel } from '@/components/customizer/collaboration-panel'
import { SettingsPanel } from '@/components/customizer/settings-panel'
import { KeyboardShortcuts } from '@/components/customizer/keyboard-shortcuts'
import { ResponsivePreviewModal } from '@/components/customizer/responsive-preview-modal'
import { useUIStore } from '@/store/ui-store'
import { Button } from '@/components/ui/button'

interface CanvasElement {
  id: string
  type: string
  name: string
  content?: string
  styles: Record<string, any>
  children?: CanvasElement[]
  locked?: boolean
  hidden?: boolean
}

interface HistoryAction {
  id: string
  description: string
  timestamp: Date
}

type DeviceType = 'desktop' | 'tablet' | 'mobile'

export default function TemplateCustomizerPage({
                                                 params,
                                               }: {
  params: Promise<{ templateId: string }>
}) {
  const { templateId } = use(params)
  const { toggleWhatsThisMode } = useUIStore()
  const [templateName, setTemplateName] = useState('My Custom Template')
  const [isEditingName, setIsEditingName] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [device, setDevice] = useState<DeviceType>('desktop')
  const [versions, setVersions] = useState([
    {
      id: '1',
      timestamp: new Date(Date.now() - 3600000),
      description: 'Initial template',
      isAutoSave: false,
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 1800000),
      description: 'Added hero section',
      isAutoSave: true,
    },
  ])
  const [elements, setElements] = useState<CanvasElement[]>([
    {
      id: '1',
      type: 'section',
      name: 'Hero Section',
      content: 'Welcome to my portfolio',
      styles: {
        padding: '48px',
        background: 'linear-gradient(135deg, #00f0ff, #ff00ff)',
        minHeight: '600px',
      },
    },
  ])
  const [selectedElement, setSelectedElement] = useState<string | null>('1')
  const [history, setHistory] = useState<HistoryAction[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [bottomPanelOpen, setBottomPanelOpen] = useState(true)
  const [previewOpen, setPreviewOpen] = useState(false)

  const getDeviceWidth = () => {
    switch (device) {
      case 'mobile':
        return 375
      case 'tablet':
        return 768
      default:
        return 1200
    }
  }

  const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 200))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 50))
  const handleZoomReset = () => setZoom(100)

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

  const handleAddElement = (element: CanvasElement) => {
    const newElements = [...elements, { ...element, id: Date.now().toString() }]
    setElements(newElements)
    setSelectedElement(newElements[newElements.length - 1].id)
  }

  const handleDeleteElement = (id: string) => {
    setElements(elements.filter((e) => e.id !== id))
    setSelectedElement(null)
  }

  const handleUpdateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(elements.map((e) => (e.id === id ? { ...e, ...updates } : e)))
  }

  return (
    <div className="h-screen bg-background overflow-hidden flex flex-col">
      {/* Tutorial & Notifications */}
      <WelcomeModal />
      <TutorialOverlay />
      <AchievementNotification />
      <AchievementProgress />
      <WhatsThisMode />
      <AIAssistant />
      <ResponsivePreviewModal 
        isOpen={previewOpen} 
        onClose={() => setPreviewOpen(false)}
        templateId={templateId}
      />

      {/* Top Action Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card" data-tutorial="save-button">
        <div className="flex items-center gap-3">
          <Link href="/templates">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </Link>
          {isEditingName ? (
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              className="text-lg font-semibold bg-transparent border-b border-cyan-500 outline-none"
              autoFocus
            />
          ) : (
            <h1
              onClick={() => setIsEditingName(true)}
              className="text-lg font-semibold cursor-pointer hover:text-cyan-500 transition-colors"
            >
              {templateName}
            </h1>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg border border-border" data-tutorial="device-toggle">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded ${device === 'desktop' ? 'bg-cyan-500 text-white' : 'hover:bg-accent'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded ${device === 'tablet' ? 'bg-cyan-500 text-white' : 'hover:bg-accent'}`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded ${device === 'mobile' ? 'bg-cyan-500 text-white' : 'hover:bg-accent'}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 rounded-lg border border-border" data-tutorial="zoom-controls">
            <button onClick={handleZoomOut} className="p-1.5 rounded hover:bg-accent">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm px-2">{zoom}%</span>
            <button onClick={handleZoomIn} className="p-1.5 rounded hover:bg-accent">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1" data-tutorial="undo-redo">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 rounded hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 rounded hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          <KeyboardShortcuts />

          <button
            onClick={toggleWhatsThisMode}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          <CollaborationPanel />

          <SettingsPanel />

          <CodeExportPanel />

          <Button onClick={() => setPreviewOpen(true)} variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>

          <Button className="bg-gradient-to-r from-cyan-500 to-purple-600">
            <Save className="w-4 h-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      {/* Original Top Bar - Commented out since we replaced it */}
      {/* <CustomizerTopBar
        templateName={templateName}
        isEditingName={isEditingName}
        onNameChange={setTemplateName}
        onEditName={setIsEditingName}
        device={device}
        onDeviceChange={setDevice}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onPreview={() => setPreviewOpen(true)}
        templateId={templateId}
      />

      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Left Sidebar - Component Library */}
        <div className="w-80 flex flex-col bg-card rounded-lg border border-border overflow-hidden">
          <ComponentLibrary onComponentAdd={handleAddElement} />
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col bg-card rounded-lg border border-border overflow-hidden">
          <div className="flex-1 overflow-auto flex items-center justify-center bg-gradient-to-br from-background/50 to-background/30">
            <div
              style={{
                width: `${getDeviceWidth()}px`,
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center',
              }}
              className="bg-white rounded-lg shadow-2xl overflow-hidden"
            >
              <Canvas
                elements={elements}
                selectedId={selectedElement}
                onSelectElement={setSelectedElement}
                onDeleteElement={handleDeleteElement}
                onUpdateElement={handleUpdateElement}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties Panel */}
        <div className="w-96 flex flex-col bg-card rounded-lg border border-border overflow-hidden">
          <PropertiesPanel
            selectedElement={selectedElement ? elements.find((e) => e.id === selectedElement) : null}
            onUpdateElement={selectedElement ? (updates) => handleUpdateElement(selectedElement, updates) : undefined}
          />
        </div>
      </div>

      {/* Bottom Panel - Version History */}
      {bottomPanelOpen && (
        <div className="h-80">
          <VersionHistoryPanel
            versions={versions}
            currentVersionId="2"
            onRestore={(id) => console.log('[v0] Restoring version:', id)}
            onBranch={(id) => console.log('[v0] Branching from version:', id)}
            onDelete={(id) => setVersions(versions.filter((v) => v.id !== id))}
          />
        </div>
      )}
    </div>
  )
}
