import { useAuthStore } from '@/store/auth-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth() {
  const router = useRouter()
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    login, 
    logout, 
    register,
    updateProfile,
    verifyEmail,
    resetPassword
  } = useAuthStore()

  const requireAuth = (redirectTo = '/auth/login') => {
    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push(redirectTo)
      }
    }, [isLoading, isAuthenticated, redirectTo])
  }

  const requireGuest = (redirectTo = '/dashboard') => {
    useEffect(() => {
      if (!isLoading && isAuthenticated) {
        router.push(redirectTo)
      }
    }, [isLoading, isAuthenticated, redirectTo])
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    updateProfile,
    verifyEmail,
    resetPassword,
    requireAuth,
    requireGuest,
  }
}

export function useRequireAuth(redirectTo = '/auth/login') {
  const { isAuthenticated, isLoading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isLoading, isAuthenticated, redirectTo, router])

  return { isAuthenticated, isLoading }
}
