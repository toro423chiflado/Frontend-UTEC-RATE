import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '../types/auth'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'
const FAKE_JWT_TOKEN = 'fake-jwt-token'

const wait = (delayMs: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs)
  })

const MOCK_USERS: Record<string, User> = {
  'admin@urate.com': { id: 1, email: 'admin@urate.com', name: 'Administrador', role: 'ADMIN' },
  'student@urate.com': { id: 2, email: 'student@urate.com', name: 'Estudiante', role: 'STUDENT' },
  'professor@urate.com': { id: 3, email: 'professor@urate.com', name: 'Profesor', role: 'PROFESSOR' },
}

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  await wait(400)

  const user = MOCK_USERS[credentials.email]

  if (user && credentials.password === '123456') {
    localStorage.setItem(TOKEN_KEY, FAKE_JWT_TOKEN)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    return { token: FAKE_JWT_TOKEN, user }
  }

  throw new Error('Credenciales incorrectas')
}

const loginWithGoogle = async (): Promise<AuthResponse> => {
  await wait(400)
  const user = MOCK_USERS['student@urate.com']
  localStorage.setItem(TOKEN_KEY, FAKE_JWT_TOKEN)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return { token: FAKE_JWT_TOKEN, user }
}

const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  await wait(500)

  if (!credentials.fullName.trim()) {
    throw new Error('Ingresa tu nombre completo')
  }

  const user: User = { id: Date.now(), email: credentials.email, name: credentials.fullName, role: 'STUDENT' }
  localStorage.setItem(TOKEN_KEY, FAKE_JWT_TOKEN)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return { token: FAKE_JWT_TOKEN, user }
}

const registerWithGoogle = async (): Promise<AuthResponse> => {
  await wait(400)
  const user = MOCK_USERS['student@urate.com']
  localStorage.setItem(TOKEN_KEY, FAKE_JWT_TOKEN)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return { token: FAKE_JWT_TOKEN, user }
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
