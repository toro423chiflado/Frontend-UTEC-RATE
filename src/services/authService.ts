import api from './api'
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '../types/auth'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    const { token, user } = response.data

    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Credenciales incorrectas')
  }
}

const loginWithGoogle = async (): Promise<AuthResponse> => {
  // Placeholder for Google Login API logic
  throw new Error('No implementado aún en el backend')
}

const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', credentials)
    const { token, user } = response.data

    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al registrar')
  }
}

const registerWithGoogle = async (): Promise<AuthResponse> => {
  // Placeholder for Google Register API logic
  throw new Error('No implementado aún en el backend')
}

const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

const getToken = () => localStorage.getItem(TOKEN_KEY)
const getUser = (): User | null => {
  const userStr = localStorage.getItem(USER_KEY)
  return userStr ? JSON.parse(userStr) : null
}

const isAuthenticated = () => Boolean(getToken())

export const authService = {
  getToken,
  getUser,
  isAuthenticated,
  login,
  loginWithGoogle,
  logout,
  register,
  registerWithGoogle,
}
