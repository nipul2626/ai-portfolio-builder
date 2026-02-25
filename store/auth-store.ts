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
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set, get) => ({
          // ======================
          // STATE
          // ======================
          user: null,
          token: null,
          refreshTokenValue: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,

          // ======================
          // ACTIONS
          // ======================

          login: async (credentials: AuthCredentials) => {
            set({ isLoading: true, error: null })

            try {
              const response = await authService.login(credentials)

              if (response.success && response.data) {
                set({
                  user: response.data.user,
                  token: response.data.token,
                  refreshTokenValue: response.data.refreshToken,
                  isAuthenticated: true,
                  isLoading: false,
                  error: null,
                })
              } else {
                throw new Error(response.error?.message || 'Login failed')
              }
            } catch (error) {
              const message =
                  error instanceof Error
                      ? error.message
                      : 'An error occurred during login'

              set({
                isLoading: false,
                error: message,
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
                  refreshTokenValue: response.data.refreshToken,
                  isAuthenticated: true,
                  isLoading: false,
                  error: null,
                })
              } else {
                throw new Error(response.error?.message || 'Registration failed')
              }
            } catch (error) {
              const message =
                  error instanceof Error
                      ? error.message
                      : 'An error occurred during registration'

              set({
                isLoading: false,
                error: message,
              })

              throw error
            }
          },

          logout: () => {
            authService.logout()

            set({
              user: null,
              token: null,
              refreshTokenValue: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            })
          },

          refreshToken: async () => {
            const { refreshTokenValue } = get()

            if (!refreshTokenValue) {
              throw new Error('No refresh token available')
            }

            try {
              const response = await authService.refreshToken(refreshTokenValue)

              if (response.success && response.data) {
                set({
                  token: response.data.token,
                  refreshTokenValue: response.data.refreshToken,
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

          initializeAuth: () => {
            const { token, refreshTokenValue } = get()

            if (token && refreshTokenValue) {
              set({ isAuthenticated: true })
            } else {
              set({
                isAuthenticated: false,
                user: null,
                token: null,
                refreshTokenValue: null,
              })
            }
          },
        }),
        {
          name: 'auth-storage',
          storage: createJSONStorage(() => localStorage),

          partialize: (state) => ({
            user: state.user,
            token: state.token,
            refreshTokenValue: state.refreshTokenValue,
            isAuthenticated: state.isAuthenticated,
          }),
        }
    )
)