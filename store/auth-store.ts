import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, AuthCredentials, RegisterData, AuthState } from '@/types/auth'
import { authService } from '@/services/api/auth'

interface AuthActions {
  login: (credentials: AuthCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
  updateUser: (updates: Partial<User>) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: AuthCredentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.login(credentials)
          
          if (response.success && response.data) {
            set({
              user: response.data.user,
              token: response.data.token,
              refreshToken: response.data.refreshToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } else {
            throw new Error(response.error?.message || 'Login failed')
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'An error occurred during login',
          })
          throw error
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.register(data)
          
          if (response.success && response.data) {
            set({
              user: response.data.user,
              token: response.data.token,
              refreshToken: response.data.refreshToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } else {
            throw new Error(response.error?.message || 'Registration failed')
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'An error occurred during registration',
          })
          throw error
        }
      },

      logout: () => {
        authService.logout()
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
      },

      refreshToken: async () => {
        const { refreshToken } = get()
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        try {
          const response = await authService.refreshToken(refreshToken)
          
          if (response.success && response.data) {
            set({
              token: response.data.token,
              refreshToken: response.data.refreshToken,
            })
          } else {
            throw new Error('Token refresh failed')
          }
        } catch (error) {
          get().logout()
          throw error
        }
      },

      updateUser: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }))
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
