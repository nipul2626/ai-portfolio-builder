import { create } from 'zustand'
import type { Section } from '@/types/portfolio'

interface HistoryItem {
  id: string
  sections: Section[]
  timestamp: Date
  description: string
}

interface EditorState {
  sections: Section[]
  selectedSection: string | null
  history: HistoryItem[]
  historyIndex: number
  canUndo: boolean
  canRedo: boolean
  isDirty: boolean
}

interface EditorActions {
  setSections: (sections: Section[]) => void
  addSection: (section: Section) => void
  updateSection: (id: string, data: Partial<Section>) => void
  deleteSection: (id: string) => void
  reorderSections: (order: string[]) => void
  selectSection: (id: string | null) => void
  addHistoryEntry: (description: string) => void
  undo: () => void
  redo: () => void
  saveToHistory: (description: string) => void
  clearHistory: () => void
  markClean: () => void
}

export const useEditorStore = create<EditorState & EditorActions>((set, get) => ({
  // State
  sections: [],
  selectedSection: null,
  history: [],
  historyIndex: -1,
  canUndo: false,
  canRedo: false,
  isDirty: false,

  // Actions
  setSections: (sections: Section[]) => {
    set({ sections, isDirty: false })
  },

  addSection: (section: Section) => {
    set((state) => {
      const newSections = [...state.sections, section]
      return {
        sections: newSections,
        selectedSection: section.id,
        isDirty: true,
      }
    })
    get().saveToHistory('Added section')
  },

  updateSection: (id: string, data: Partial<Section>) => {
    set((state) => ({
      sections: state.sections.map((s) => (s.id === id ? { ...s, ...data } : s)),
      isDirty: true,
    }))
  },

  deleteSection: (id: string) => {
    set((state) => ({
      sections: state.sections.filter((s) => s.id !== id),
      selectedSection: state.selectedSection === id ? null : state.selectedSection,
      isDirty: true,
    }))
    get().saveToHistory('Deleted section')
  },

  reorderSections: (order: string[]) => {
    set((state) => {
      const orderedSections = order
        .map((id) => state.sections.find((s) => s.id === id))
        .filter(Boolean) as Section[]
      return {
        sections: orderedSections.map((s, index) => ({ ...s, orderIndex: index })),
        isDirty: true,
      }
    })
    get().saveToHistory('Reordered sections')
  },

  selectSection: (id: string | null) => {
    set({ selectedSection: id })
  },


  saveToHistory: (description: string) => {
    set((state) => {
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        sections: JSON.parse(JSON.stringify(state.sections)),
        timestamp: new Date(),
        description,
      }

      const newHistory = state.history.slice(0, state.historyIndex + 1)
      newHistory.push(newHistoryItem)

      // Keep only last 50 history items
      const trimmedHistory = newHistory.slice(-50)

      return {
        history: trimmedHistory,
        historyIndex: trimmedHistory.length - 1,
        canUndo: trimmedHistory.length > 0,
        canRedo: false,
      }
    })
  },
  addHistoryEntry: (description: string) => {
    get().saveToHistory(description)
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex <= 0) return state

      const newIndex = state.historyIndex - 1
      const historyItem = state.history[newIndex]

      return {
        sections: JSON.parse(JSON.stringify(historyItem.sections)),
        historyIndex: newIndex,
        canUndo: newIndex > 0,
        canRedo: true,
        isDirty: true,
      }
    })
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state

      const newIndex = state.historyIndex + 1
      const historyItem = state.history[newIndex]

      return {
        sections: JSON.parse(JSON.stringify(historyItem.sections)),
        historyIndex: newIndex,
        canUndo: true,
        canRedo: newIndex < state.history.length - 1,
        isDirty: true,
      }
    })
  },

  clearHistory: () => {
    set({
      history: [],
      historyIndex: -1,
      canUndo: false,
      canRedo: false,
    })
  },

  markClean: () => {
    set({ isDirty: false })
  },
}))
