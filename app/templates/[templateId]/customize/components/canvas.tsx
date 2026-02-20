'use client'

import { Trash2 } from 'lucide-react'

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

interface CanvasProps {
  elements: CanvasElement[]
  selectedId: string | null
  onSelectElement: (id: string) => void
  onDeleteElement: (id: string) => void
  onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void
}

export default function Canvas({
  elements,
  selectedId,
  onSelectElement,
  onDeleteElement,
  onUpdateElement,
}: CanvasProps) {
  return (
    <div className="w-full h-full bg-white relative">
      {elements.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p className="text-center">
            <p className="text-lg font-semibold mb-2">No elements yet</p>
            <p className="text-sm">Add components from the library</p>
          </p>
        </div>
      ) : (
        <div className="space-y-0">
          {elements.map((element) => (
            <div
              key={element.id}
              onClick={() => onSelectElement(element.id)}
              className={`relative group cursor-pointer transition-all ${
                selectedId === element.id ? 'ring-2 ring-cyan-400 z-10' : ''
              } ${element.hidden ? 'opacity-50' : ''}`}
              style={{
                ...element.styles,
              }}
            >
              {/* Selection overlay */}
              {selectedId === element.id && (
                <>
                  <div className="absolute inset-0 border-2 border-dashed border-cyan-400 pointer-events-none" />

                  {/* Resize handles */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white cursor-nwse-resize hidden group-hover:block" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white cursor-nesw-resize hidden group-hover:block" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white cursor-nesw-resize hidden group-hover:block" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white cursor-nwse-resize hidden group-hover:block" />

                  {/* Element label */}
                  <div className="absolute -top-8 left-0 bg-cyan-400 text-black px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                    {element.name}
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteElement(element.id)
                    }}
                    className="absolute -top-8 right-0 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              )}

              {/* Content */}
              <div
                className="w-full text-gray-800 p-4"
                style={
                  element.type === 'section'
                    ? { color: element.styles.color || 'white', textShadow: '0 0 10px rgba(0,0,0,0.3)' }
                    : {}
                }
              >
                {element.type === 'section' && (
                  <h2 className="text-3xl font-bold">{element.content}</h2>
                )}
                {element.type === 'blocks' && <p className="text-base">{element.content}</p>}
                {element.type === 'components' && <div className="text-sm">{element.name}</div>}
                {element.type === 'decorative' && <div className="w-full h-24 bg-gradient-to-r from-cyan-400 to-magenta-400 opacity-20" />}
              </div>

              {/* Hover indication */}
              {selectedId !== element.id && (
                <div className="absolute inset-0 border-2 border-dashed border-cyan-400/20 group-hover:border-cyan-400/50 transition-colors pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
