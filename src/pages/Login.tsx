import { FormEvent, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { EnvelopeSimple, LockKey } from '@phosphor-icons/react'
import { HiOutlineShieldCheck } from 'react-icons/hi2'

function Login() {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login({ email, password })
      navigate('/dashboard', { replace: true })
    } catch (loginError) {
      const message =
        loginError instanceof Error
          ? loginError.message
          : 'Credenciales incorrectas'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-10 font-sans">
      <Link
        to="/"
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:border-primary/40 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>

      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[150px] rounded-full" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl">
          <header className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 animate-float items-center justify-center rounded-2xl bg-white border border-white/10 shadow-lg shadow-primary/20 overflow-hidden">
              <img
                src="/urate_logo.png"
                alt="URATE"
                className="h-full w-full object-contain scale-[2]"
              />
            </div>
            
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 border border-white/10 mb-4">
              <HiOutlineShieldCheck className="h-3 w-3 text-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                Secure Academic Portal
              </span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 font-display">
              URATE
            </h1>
            <p className="text-secondary text-sm font-medium">
              Evaluación académica impulsada por IA
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-secondary ml-1">
                Correo Institucional
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-secondary group-focus-within:text-primary transition-colors">
                  <EnvelopeSimple size={20} weight="bold" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-4 text-white placeholder:text-white/20 outline-none transition-all focus:border-primary/50 focus:bg-white/10 focus:ring-4 focus:ring-primary/10"
                  placeholder="admin@urate.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-secondary ml-1">
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-secondary group-focus-within:text-primary transition-colors">
                  <LockKey size={20} weight="bold" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-4 text-white placeholder:text-white/20 outline-none transition-all focus:border-primary/50 focus:bg-white/10 focus:ring-4 focus:ring-primary/10"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 animate-review-enter">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-2xl bg-primary py-4 text-sm font-bold text-white transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 shadow-xl shadow-primary/20"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Autenticando...
                  </>
                ) : (
                  'Ingresar al Dashboard'
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>

            <p className="text-center text-xs font-medium text-secondary/60">
              Usa las credenciales de prueba: <span className="text-primary/80">admin@urate.com / admin123</span>
            </p>
          </form>
        </div>
        
        <p className="mt-8 text-center text-sm text-secondary/40">
          &copy; 2026 URATE. Todos los derechos reservados.
        </p>
      </div>
    </main>
  )
}

export default Login
