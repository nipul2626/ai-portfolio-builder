'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, Keyboard } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const shortcuts = [
  { keys: ['⌘', 'S'], description: 'Save changes' },
  { keys: ['⌘', 'Z'], description: 'Undo' },
  { keys: ['⌘', 'Shift', 'Z'], description: 'Redo' },
  { keys: ['⌘', 'D'], description: 'Duplicate element' },
  { keys: ['⌘', 'C'], description: 'Copy' },
  { keys: ['⌘', 'V'], description: 'Paste' },
  { keys: ['⌘', 'X'], description: 'Cut' },
  { keys: ['Delete'], description: 'Delete element' },
  { keys: ['⌘', 'A'], description: 'Select all' },
  { keys: ['⌘', 'P'], description: 'Preview' },
  { keys: ['⌘', 'K'], description: 'Command palette' },
  { keys: ['⌘', '/'], description: 'Toggle keyboard shortcuts' },
  { keys: ['Esc'], description: 'Deselect / Close dialog' },
  { keys: ['Space'], description: 'Pan canvas' },
  { keys: ['⌘', '+'], description: 'Zoom in' },
  { keys: ['⌘', '-'], description: 'Zoom out' },
  { keys: ['⌘', '0'], description: 'Reset zoom' },
  { keys: ['Arrow Keys'], description: 'Move element' },
  { keys: ['Shift', 'Arrow'], description: 'Move element (10px)' },
]

export function KeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const modifier = isMac ? e.metaKey : e.ctrlKey

      // Save
      if (modifier && e.key === 's') {
        e.preventDefault()
        console.log('[v0] Save shortcut triggered')
      }

      // Undo/Redo
      if (modifier && !e.shiftKey && e.key === 'z') {
        e.preventDefault()
        console.log('[v0] Undo shortcut triggered')
      }
      if (modifier && e.shiftKey && e.key === 'z') {
        e.preventDefault()
        console.log('[v0] Redo shortcut triggered')
      }

      // Copy/Paste/Cut
      if (modifier && e.key === 'c') {
        console.log('[v0] Copy shortcut triggered')
      }
      if (modifier && e.key === 'v') {
        console.log('[v0] Paste shortcut triggered')
      }
      if (modifier && e.key === 'x') {
        console.log('[v0] Cut shortcut triggered')
      }

      // Preview
      if (modifier && e.key === 'p') {
        e.preventDefault()
        console.log('[v0] Preview shortcut triggered')
      }

      // Zoom
      if (modifier && e.key === '+') {
        e.preventDefault()
        console.log('[v0] Zoom in shortcut triggered')
      }
      if (modifier && e.key === '-') {
        e.preventDefault()
        console.log('[v0] Zoom out shortcut triggered')
      }
      if (modifier && e.key === '0') {
        e.preventDefault()
        console.log('[v0] Reset zoom shortcut triggered')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Keyboard className="w-4 h-4" />
          <span className="hidden lg:inline">Shortcuts</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-1 overflow-y-auto max-h-[60vh]">
          {shortcuts.map((shortcut, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <span className="text-sm">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <div key={keyIndex} className="flex items-center gap-1">
                    <kbd className="px-2 py-1 text-xs font-semibold bg-accent border border-border rounded shadow-sm">
                      {key}
                    </kbd>
                    {keyIndex < shortcut.keys.length - 1 && (
                      <span className="text-muted-foreground">+</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Press <kbd className="px-1.5 py-0.5 bg-accent border border-border rounded text-xs">
              ⌘ /
            </kbd>{' '}
            anytime to toggle this dialog
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
