import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { profesorCursoService, type CursoAsignado } from '../../services/profesorCursoService'

export default function ProfessorCourses() {
  const { user } = useAuth()
  const [cursos, setCursos] = useState<CursoAsignado[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) return
    const load = async () => {
      try {
        setLoading(true)
        setCursos(await profesorCursoService.getCursosDeProfesor(String(user.id)))
      } catch {
        setError('No se pudieron cargar tus cursos.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user?.id])

  return (
    <div className="space-y-6 animate-review-enter">
      <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-8 border border-card-border">
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Panel Profesor</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground font-display">Mis Cursos</h1>
          <p className="mt-2 text-sm text-secondary font-medium">
            Selecciona un curso para acceder a su repositorio de contenido.
          </p>
        </div>
      </header>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-card-border overflow-hidden">
                <div className="h-1.5 w-full bg-foreground/10 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-foreground/10 animate-pulse" />
                  <div className="h-3 w-16 rounded bg-foreground/10 animate-pulse" />
                  <div className="h-5 w-36 rounded bg-foreground/10 animate-pulse" />
                  <div className="h-3 w-20 rounded bg-foreground/10 animate-pulse" />
                  <div className="border-t border-card-border pt-4 flex items-center justify-between">
                    <div className="h-3 w-28 rounded bg-foreground/10 animate-pulse" />
                    <div className="h-7 w-7 rounded-full bg-foreground/10 animate-pulse" />
                  </div>
                </div>
              </div>
            ))
          : cursos.map((c) => (
              <Link
                key={c.profesorCursoId}
                to={`/courses/${c.cursoId}/repository`}
                className="glass-card group flex flex-col justify-between rounded-2xl border border-card-border overflow-hidden hover:border-primary/30 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="h-1.5 w-full" style={{ backgroundColor: c.colorHex }} />
                <div className="flex flex-col flex-1 p-5">
                  <div className="mb-auto">
                    <div
                      className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: `${c.colorHex}20`, color: c.colorHex }}
                    >
                      <BookOpen size={20} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/50">{c.codigo}</p>
                    <h2 className="mt-1 text-base font-bold text-foreground font-display line-clamp-2">{c.nombre}</h2>
                    <p className="mt-1 text-[11px] text-secondary/60">{c.creditos} créditos</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-card-border pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-secondary/50">
                      {c.semestre} · Sec. {c.seccion}
                    </p>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/5 text-foreground/40 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        {!loading && cursos.length === 0 && (
          <p className="col-span-full py-16 text-center text-secondary">
            No tienes cursos asignados este semestre.
          </p>
        )}
      </div>
    </div>
  )
}
