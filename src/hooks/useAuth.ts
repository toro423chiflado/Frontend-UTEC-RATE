import { useCallback } from 'react'
import { authService } from '../services/authService'
import type { LoginCredentials } from '../types/auth'

export const useAuth = () => {
  const login = useCallback(
    async (credentials: LoginCredentials) => authService.login(credentials),
    [],
  )

  const logout = useCallback(() => {
    authService.logout()
  }, [])

  const token = authService.getToken()

  return {
    isAuthenticated: Boolean(token),
    login,
    logout,
    token,
  }
}
