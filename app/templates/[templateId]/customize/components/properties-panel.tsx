'use client'

import { useState } from 'react'
import { Palette, Layout, Settings, Zap } from 'lucide-react'

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

interface PropertiesPanelProps {
  selectedElement: CanvasElement | null | undefined
  onUpdateElement?: (updates: Partial<CanvasElement>) => void
}

export default function PropertiesPanel({ selectedElement, onUpdateElement }: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'settings'>('content')

  if (!selectedElement || !onUpdateElement) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-center p-6">
        <Layout size={32} className="text-muted-foreground mb-3 opacity-50" />
        <p className="text-sm text-muted-foreground">Select an element to edit properties</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-border p-4 gap-2 flex-shrink-0">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            activeTab === 'content' ? 'bg-accent/20 text-accent border-b-2 border-accent' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Content
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'style' ? 'bg-accent/20 text-accent border-b-2 border-accent' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Palette size={16} />
          Style
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'settings' ? 'bg-accent/20 text-accent border-b-2 border-accent' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Settings size={16} />
          Settings
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">Element Name</label>
              <input
                type="text"
                value={selectedElement.name}
                onChange={(e) => onUpdateElement({ name: e.target.value })}
                className="w-full neu-card-inset px-3 py-2 rounded bg-background border-0 outline-none text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">Content</label>
              <textarea
                value={selectedElement.content || ''}
                onChange={(e) => onUpdateElement({ content: e.target.value })}
                className="w-full neu-card-inset px-3 py-2 rounded bg-background border-0 outline-none text-sm h-24 resize-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedElement.styles.backgroundColor || '#1a1a24'}
                  onChange={(e) =>
                    onUpdateElement({
                      styles: { ...selectedElement.styles, backgroundColor: e.target.value },
                    })
                  }
                  className="w-12 h-10 rounded cursor-pointer neu-card border-0"
                />
                <input
                  type="text"
                  value={selectedElement.styles.backgroundColor || '#1a1a24'}
                  onChange={(e) =>
                    onUpdateElement({
                      styles: { ...selectedElement.styles, backgroundColor: e.target.value },
                    })
                  }
                  className="flex-1 neu-card-inset px-3 py-2 rounded bg-background border-0 outline-none text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">Padding</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Top (px)"
                  defaultValue="24"
                  className="neu-card-inset px-3 py-2 rounded bg-background border-0 outline-none text-xs"
                />
                <input
                  type="number"
                  placeholder="Right (px)"
                  defaultValue="24"
                  className="neu-card-inset px-3 py-2 rounded bg-background border-0 outline-none text-xs"
                />
                <input
                  type="number"
                  placeholder="Bottom (px)"
                  defaultValue="24"
                  className="neu-card-inset px-3 py-2 rounded bg-background border-0 outline-none text-xs"
                />
                <input
                  type="number"
                  placeholder="Left (px)"
                  defaultValue="24"
                  className="neu-card-inset px-3 py-2 rounded bg-background border-0 outline-none text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">Border Radius</label>
              <input
                type="number"
                placeholder="Border radius (px)"
                defaultValue="8"
                className="w-full neu-card-inset px-3 py-2 rounded bg-background border-0 outline-none text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">Shadow</label>
              <select className="w-full neu-card px-3 py-2 rounded bg-background border-0 outline-none text-xs">
                <option>None</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                <option>Neumorphic</option>
                <option>Glow</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">Opacity</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="100"
                className="w-full h-2 bg-card rounded-lg cursor-pointer"
              />
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">Element ID</label>
              <input
                type="text"
                value={selectedElement.id}
                readOnly
                className="w-full neu-card-inset px-3 py-2 rounded bg-background border-0 outline-none text-xs"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Lock element</span>
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Hide on desktop</span>
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Hide on tablet</span>
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Hide on mobile</span>
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">Z-Index</label>
              <input
                type="number"
                placeholder="0"
                className="w-full neu-card-inset px-3 py-2 rounded bg-background border-0 outline-none text-xs"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
