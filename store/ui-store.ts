import { create } from 'zustand'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: Date
}

interface UIState {
  sidebarOpen: boolean
  tutorialActive: boolean
  tutorialStep: number
  tutorialCompleted: boolean
  whatsThisMode: boolean
  toasts: Toast[]
  achievements: Achievement[]
  theme: 'dark' | 'light' | 'system'
}

interface UIActions {
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  startTutorial: () => void
  nextTutorialStep: () => void
  previousTutorialStep: () => void
  skipTutorial: () => void
  completeTutorial: () => void
  setTutorialStep: (step: number) => void
  toggleWhatsThisMode: () => void
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
  unlockAchievement: (achievementId: string) => void
  setTheme: (theme: 'dark' | 'light' | 'system') => void
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first-template',
    name: 'First Template',
    description: 'Created your first template',
    icon: '🎉',
    unlocked: false,
  },
  {
    id: 'color-master',
    name: 'Color Master',
    description: 'Changed 10 colors',
    icon: '🎨',
    unlocked: false,
  },
  {
    id: 'animation-guru',
    name: 'Animation Guru',
    description: 'Added 20 animations',
    icon: '✨',
    unlocked: false,
  },
  {
    id: 'layout-legend',
    name: 'Layout Legend',
    description: 'Created 5 templates',
    icon: '🏗️',
    unlocked: false,
  },
  {
    id: 'community-star',
    name: 'Community Star',
    description: '10 templates liked by others',
    icon: '⭐',
    unlocked: false,
  },
]

export const useUIStore = create<UIState & UIActions>((set, get) => ({
  // State
  sidebarOpen: true,
  tutorialActive: false,
  tutorialStep: 0,
  tutorialCompleted: false,
  whatsThisMode: false,
  toasts: [],
  achievements: defaultAchievements,
  theme: 'dark',

  // Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),

  startTutorial: () => set({ tutorialActive: true, tutorialStep: 0 }),

  nextTutorialStep: () =>
    set((state) => ({ tutorialStep: state.tutorialStep + 1 })),

  previousTutorialStep: () =>
    set((state) => ({ tutorialStep: Math.max(0, state.tutorialStep - 1) })),

  skipTutorial: () =>
    set({ tutorialActive: false, tutorialStep: 0 }),

  completeTutorial: () =>
    set({ tutorialActive: false, tutorialCompleted: true, tutorialStep: 0 }),

  setTutorialStep: (step: number) => set({ tutorialStep: step }),

  toggleWhatsThisMode: () =>
    set((state) => ({ whatsThisMode: !state.whatsThisMode })),

  addToast: (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }))
    
    // Auto remove after duration
    const duration = toast.duration || 3000
    setTimeout(() => {
      get().removeToast(id)
    }, duration)
    
    return id
  },

  removeToast: (id: string) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  unlockAchievement: (achievementId: string) => {
    set((state) => {
      const achievement = state.achievements.find((a) => a.id === achievementId)
      if (!achievement || achievement.unlocked) return state

      // Add celebration toast
      get().addToast({
        type: 'success',
        message: `Achievement Unlocked: ${achievement.name}! ${achievement.icon}`,
        duration: 5000,
      })

      return {
        achievements: state.achievements.map((a) =>
          a.id === achievementId
            ? { ...a, unlocked: true, unlockedAt: new Date() }
            : a
        ),
      }
    })
  },

  setTheme: (theme: 'dark' | 'light' | 'system') => set({ theme }),
}))
