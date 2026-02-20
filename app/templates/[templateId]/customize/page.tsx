'use client'

import { useState, useCallback } from 'react'
import { ChevronLeft, Save, Eye, MoreVertical, RotateCcw, RotateCw, ZoomIn, ZoomOut, Maximize2, Monitor, Tablet, Smartphone } from 'lucide-react'
import Link from 'next/link'
import CustomizerTopBar from './components/customizer-top-bar'
import ComponentLibrary from './components/component-library'
import Canvas from './components/canvas'
import PropertiesPanel from './components/properties-panel'
import LayersPanel from './components/layers-panel'

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

export default function TemplateCustomizerPage({ params }: { params: { templateId: string } }) {
  const [templateName, setTemplateName] = useState('My Custom Template')
  const [isEditingName, setIsEditingName] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [device, setDevice] = useState<DeviceType>('desktop')
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
      {/* Top Action Bar */}
      <CustomizerTopBar
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
        templateId={params.templateId}
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

      {/* Bottom Panel - Layers & History */}
      {bottomPanelOpen && (
        <div className="h-72 bg-card border-t border-border flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="font-semibold">Layers</h3>
            <button
              onClick={() => setBottomPanelOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <LayersPanel elements={elements} selectedId={selectedElement} onSelectElement={setSelectedElement} />
          </div>
        </div>
      )}
    </div>
  )
}
