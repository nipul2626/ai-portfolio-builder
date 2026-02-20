'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, Unlock, ChevronRight, Settings } from 'lucide-react'

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

interface LayersPanelProps {
  elements: CanvasElement[]
  selectedId: string | null
  onSelectElement: (id: string) => void
}

export default function LayersPanel({ elements, selectedId, onSelectElement }: LayersPanelProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  if (elements.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        <p>No layers yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {elements.map((element) => (
        <div key={element.id} className="space-y-1">
          {/* Layer item */}
          <div
            onClick={() => onSelectElement(element.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all group ${
              selectedId === element.id
                ? 'neu-card bg-accent/20 glow-cyan'
                : 'hover:bg-accent/5'
            }`}
          >
            {/* Expand toggle */}
            {element.children && element.children.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setExpanded((prev) => ({
                    ...prev,
                    [element.id]: !prev[element.id],
                  }))
                }}
                className="p-0.5 hover:bg-accent/10 rounded transition-colors"
              >
                <ChevronRight
                  size={14}
                  className={`transition-transform ${expanded[element.id] ? 'rotate-90' : ''}`}
                />
              </button>
            )}
            {!element.children && <div className="w-5" />}

            {/* Element icon and name */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs w-4 h-4 flex items-center justify-center bg-accent/20 rounded text-center font-bold">
                  {element.type.charAt(0).toUpperCase()}
                </span>
                <span className="text-xs font-medium truncate">{element.name}</span>
              </div>
            </div>

            {/* Visibility toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="p-1 hover:bg-accent/10 rounded transition-colors opacity-0 group-hover:opacity-100"
            >
              {element.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>

            {/* Lock toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="p-1 hover:bg-accent/10 rounded transition-colors opacity-0 group-hover:opacity-100"
            >
              {element.locked ? <Lock size={14} /> : <Unlock size={14} />}
            </button>
          </div>

          {/* Children layers */}
          {element.children && element.children.length > 0 && expanded[element.id] && (
            <div className="ml-4 space-y-1 border-l border-border pl-2">
              {element.children.map((child) => (
                <div
                  key={child.id}
                  onClick={() => onSelectElement(child.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all group text-xs ${
                    selectedId === child.id
                      ? 'neu-card bg-accent/20 glow-cyan'
                      : 'hover:bg-accent/5'
                  }`}
                >
                  <span className="w-3 h-3 flex items-center justify-center bg-accent/20 rounded text-center text-[10px] font-bold">
                    {child.type.charAt(0).toUpperCase()}
                  </span>
                  <span className="flex-1 truncate font-medium">{child.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
