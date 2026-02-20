'use client'

import Link from 'next/link'
import { ChevronLeft, Save, Eye, MoreVertical, RotateCcw, RotateCw, ZoomIn, ZoomOut, Maximize2, Monitor, Tablet, Smartphone } from 'lucide-react'
import { useState } from 'react'

interface TopBarProps {
  templateName: string
  isEditingName: boolean
  onNameChange: (name: string) => void
  onEditName: (editing: boolean) => void
  device: 'desktop' | 'tablet' | 'mobile'
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomReset: () => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  onPreview: () => void
  templateId: string
}

export default function CustomizerTopBar({
  templateName,
  isEditingName,
  onNameChange,
  onEditName,
  device,
  onDeviceChange,
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onPreview,
  templateId,
}: TopBarProps) {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)

  return (
    <div className="h-16 glass border-b border-border flex items-center justify-between px-6 gap-8">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Link href="/templates" className="p-2 hover:bg-accent/10 rounded-lg transition-colors">
          <ChevronLeft size={20} />
        </Link>

        {isEditingName ? (
          <input
            type="text"
            value={templateName}
            onChange={(e) => onNameChange(e.target.value)}
            onBlur={() => onEditName(false)}
            onKeyDown={(e) => e.key === 'Enter' && onEditName(false)}
            autoFocus
            className="bg-transparent outline-none font-bold text-lg border-b border-accent"
          />
        ) : (
          <button
            onClick={() => onEditName(true)}
            className="font-bold text-lg hover:text-accent transition-colors"
          >
            {templateName}
          </button>
        )}
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-8">
        {/* Device Preview Toggle */}
        <div className="neu-card p-1 rounded-lg flex gap-1">
          <button
            onClick={() => onDeviceChange('desktop')}
            className={`p-2 rounded ${device === 'desktop' ? 'bg-accent/20 glow-cyan' : ''} transition-all`}
            title="Desktop (1200px)"
          >
            <Monitor size={18} />
          </button>
          <button
            onClick={() => onDeviceChange('tablet')}
            className={`p-2 rounded ${device === 'tablet' ? 'bg-accent/20 glow-cyan' : ''} transition-all`}
            title="Tablet (768px)"
          >
            <Tablet size={18} />
          </button>
          <button
            onClick={() => onDeviceChange('mobile')}
            className={`p-2 rounded ${device === 'mobile' ? 'bg-accent/20 glow-cyan' : ''} transition-all`}
            title="Mobile (375px)"
          >
            <Smartphone size={18} />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 neu-card px-3 py-2 rounded-lg">
          <button
            onClick={onZoomOut}
            className="p-1 hover:bg-accent/10 rounded transition-colors"
            title="Zoom Out (Ctrl +-)"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-xs font-medium w-10 text-center">{zoom}%</span>
          <button
            onClick={onZoomIn}
            className="p-1 hover:bg-accent/10 rounded transition-colors"
            title="Zoom In (Ctrl ++)"
          >
            <ZoomIn size={16} />
          </button>
          <div className="w-px h-4 bg-border mx-1" />
          <button
            onClick={onZoomReset}
            className="p-1 hover:bg-accent/10 rounded transition-colors"
            title="Reset Zoom"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-2 hover:bg-accent/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          title="Undo (Ctrl Z)"
        >
          <RotateCcw size={18} className="group-hover:rotate-90 transition-transform" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-2 hover:bg-accent/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          title="Redo (Ctrl Shift Z)"
        >
          <RotateCw size={18} className="group-hover:-rotate-90 transition-transform" />
        </button>

        <div className="w-px h-6 bg-border mx-2" />

        <button
          onClick={onPreview}
          className="p-2 hover:bg-accent/10 rounded-lg transition-colors flex items-center gap-2 text-sm"
        >
          <Eye size={18} />
          Preview
        </button>

        <button className="neu-card px-4 py-2 rounded-lg hover:scale-102 transition-transform flex items-center gap-2 group">
          <Save size={18} className="group-hover:rotate-12 transition-transform" />
          Save
        </button>

        <div className="relative group">
          <button
            onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
          >
            <MoreVertical size={18} />
          </button>
          {moreMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 rounded-lg neu-card p-2 z-50 animate-slideDown">
              <button className="w-full text-left px-4 py-2 hover:bg-accent/10 rounded transition-colors text-sm">
                Export Template
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-accent/10 rounded transition-colors text-sm">
                Duplicate Template
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-accent/10 rounded transition-colors text-sm">
                Template Settings
              </button>
              <div className="border-t border-border my-2" />
              <button className="w-full text-left px-4 py-2 hover:bg-destructive/10 text-destructive rounded transition-colors text-sm">
                Delete Template
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
