import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Handle errors and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          })

          const { token, refreshToken: newRefreshToken } = response.data.data
          localStorage.setItem('token', token)
          localStorage.setItem('refreshToken', newRefreshToken)

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
