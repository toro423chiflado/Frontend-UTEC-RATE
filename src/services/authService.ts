import type { AuthResponse, LoginCredentials } from '../types/auth'

const VALID_EMAIL = 'admin@urate.com'
const VALID_PASSWORD = 'admin123'
const TOKEN_KEY = 'token'
const FAKE_JWT_TOKEN = 'fake-jwt-token'

const wait = (delayMs: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs)
  })

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  await wait(400)

  if (
    credentials.email === VALID_EMAIL &&
    credentials.password === VALID_PASSWORD
  ) {
    localStorage.setItem(TOKEN_KEY, FAKE_JWT_TOKEN)
    return { token: FAKE_JWT_TOKEN }
  }

  throw new Error('Credenciales incorrectas')
}

const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
}

const getToken = () => localStorage.getItem(TOKEN_KEY)

const isAuthenticated = () => Boolean(getToken())

export const authService = {
  getToken,
  isAuthenticated,
  login,
  logout,
}
