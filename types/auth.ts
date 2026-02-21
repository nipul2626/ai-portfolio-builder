export interface User {
  id: string
  email: string
  name: string
  profilePictureUrl?: string
  oauthProvider?: 'google' | 'github' | 'linkedin' | null
  oauthId?: string
  subscriptionTier: 'free' | 'pro' | 'enterprise'
  createdAt: Date
  updatedAt: Date
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  success: boolean
  data?: {
    user: User
    token: string
    refreshToken: string
  }
  message?: string
  error?: {
    code: string
    message: string
    details?: Array<{ field: string; message: string }>
  }
}

export interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
