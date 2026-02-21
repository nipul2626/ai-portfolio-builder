import { apiClient } from './client'
import type { AuthCredentials, RegisterData, AuthResponse } from '@/types/auth'

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/auth/login', credentials)
      return response.data
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: error.response?.data?.error?.code || 'AUTH_ERROR',
          message: error.response?.data?.error?.message || 'Login failed',
          details: error.response?.data?.error?.details,
        },
      }
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/auth/register', data)
      return response.data
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: error.response?.data?.error?.code || 'REGISTRATION_ERROR',
          message: error.response?.data?.error?.message || 'Registration failed',
          details: error.response?.data?.error?.details,
        },
      }
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
      }
    }
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/auth/refresh', { refreshToken })
      return response.data
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'TOKEN_REFRESH_ERROR',
          message: 'Failed to refresh token',
        },
      }
    }
  },

  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const response = await apiClient.get('/auth/me')
      return response.data
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'USER_FETCH_ERROR',
          message: 'Failed to fetch user data',
        },
      }
    }
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email })
      return response.data
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send reset email',
      }
    }
  },

  async resetPassword(token: string, password: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await apiClient.post('/auth/reset-password', { token, password })
      return response.data
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to reset password',
      }
    }
  },
}
