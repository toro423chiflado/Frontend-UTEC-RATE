export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  fullName: string
  email: string
  password: string
}

export type Role = 'ADMIN' | 'STUDENT' | 'PROFESSOR'

export interface User {
  id: number
  email: string
  name: string
  role: Role
  photo?: string
}

export interface AuthResponse {
  token: string
  user: User
}
