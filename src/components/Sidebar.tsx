import {
  LogOut,
  ChevronRight
} from 'lucide-react'
import type { ComponentType } from 'react'
import type { IconProps } from '@phosphor-icons/react'
import { 
  SquaresFour, 
  ChatTeardropDots, 
  Lightning, 
  UserCircle 
} from '@phosphor-icons/react'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ThemeToggle from './ThemeToggle'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, isAdmin, isStudent, isProfessor } = useAuth()

  const getMenuItems = () => {
    if (isAdmin) {
      return [
        { icon: SquaresFour, label: 'Carreras', path: '/admin/careers' },
        { icon: SquaresFour, label: 'Cursos', path: '/admin/courses' },
        { icon: UserCircle, label: 'Usuarios', path: '/admin/users' },
        { icon: ChatTeardropDots, label: 'Moderación', path: '/admin/reviews' },
        { icon: UserCircle, label: 'Perfil', path: '/profile' },
      ]
    }
    
    if (isProfessor) {
      return [
        { icon: SquaresFour, label: 'Mis Cursos', path: '/professor/courses' },
        { icon: UserCircle, label: 'Perfil', path: '/profile' },
      ]
    }

    // Default to student
    return [
      { icon: SquaresFour, label: 'Carreras', path: '/careers' },
      { icon: ChatTeardropDots, label: 'Mis Reviews', path: '/reviews' },
      { icon: Lightning, label: 'Insights AI', path: '/insights' },
      { icon: UserCircle, label: 'Perfil', path: '/profile' },
    ]
  }

  const menuItems = getMenuItems()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const isPathActive = (path: string) => {
    if (
      path === '/careers' &&
      (location.pathname.startsWith('/careers/') ||
        location.pathname.startsWith('/courses/') ||
        location.pathname.startsWith('/professors/') ||
        location.pathname === '/dashboard')
    ) {
      return true
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-24 flex-col border-r border-card-border bg-background/80 backdrop-blur-xl transition-all duration-300 md:w-72">
      {/* Sidebar Header */}
      <div className="flex h-24 items-center justify-between border-b border-card-border px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg shadow-primary/20 border border-white/10 overflow-hidden">
            <img
              src="/urate_logo.png"
              alt="URATE"
              className="h-full w-full object-contain scale-[2]"
            />
          </div>
          <div className="hidden md:block">
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground">URATE</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Academic Hub</p>
          </div>
        </div>
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4 pt-8">
        <p className="hidden px-4 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/50 md:block">
          Main Menu
        </p>
        
        {menuItems.map((item) => {
          const active = isPathActive(item.path)
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`group relative flex items-center gap-3 rounded-2xl px-4 py-4 text-sm font-semibold transition-all duration-300 ${
                active
                  ? 'bg-primary/10 text-primary shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]'
                  : 'text-secondary hover:bg-foreground/5 hover:text-foreground'
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
              )}
              
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${
                active ? 'bg-primary text-white scale-110' : 'bg-white/5 group-hover:bg-white/10'
              }`}>
                <Icon size={20} weight={active ? "fill" : "regular"} />
              </div>
              
              <span className="hidden flex-1 md:inline">{item.label}</span>
              
              {active && <ChevronRight className="hidden h-4 w-4 opacity-50 md:block" />}
            </NavLink>
          )
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t border-card-border p-4 space-y-4">
        <div className="hidden md:block p-4 rounded-2xl bg-foreground/5 border border-card-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <HiOutlineSparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xs font-bold text-foreground">AI Insights</span>
          </div>
          <p className="text-[10px] text-secondary leading-relaxed">
            Revisa los nuevos resúmenes generados por nuestra IA.
          </p>
        </div>
        
        <div className="md:hidden flex justify-center py-2">
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white/5 px-4 py-4 text-sm font-bold text-secondary transition-all hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/20 md:justify-start"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 transition-all group-hover:bg-red-500/20">
            <LogOut className="h-5 w-5" />
          </div>
          <span className="hidden md:inline">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
