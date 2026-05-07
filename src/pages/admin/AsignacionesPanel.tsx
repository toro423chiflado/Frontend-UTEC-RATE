import { useEffect, useState } from 'react'
import { Trash2, User } from 'lucide-react'
import { cursosService, type Curso } from '../../services/cursosService'
import { profesorCursoService, type ProfesorDeCurso } from '../../services/profesorCursoService'

export default function AsignacionesPanel() {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [selectedCursoId, setSelectedCursoId] = useState<number | ''>('')
  const [asignaciones, setAsignaciones] = useState<ProfesorDeCurso[]>([])
  const [loadingCursos, setLoadingCursos] = useState(true)
  const [loadingAsig, setLoadingAsig] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    cursosService
      .getCursos({ pagina: 1, limite: 200 })
      .then((res) => setCursos(res.data))
      .catch(() => setError('No se pudieron cargar los cursos.'))
      .finally(() => setLoadingCursos(false))
  }, [])

  const handleSelectCurso = async (id: number) => {
    setSelectedCursoId(id)
    setAsignaciones([])
    setError(null)
    setLoadingAsig(true)
    try {
      setAsignaciones(await profesorCursoService.getProfesoresDeCurso(id))
    } catch {
      setError('No se pudieron cargar las asignaciones.')
    } finally {
      setLoadingAsig(false)
    }
  }

  const handleDesactivar = async (asigId: number) => {
    if (!confirm('¿Desactivar esta asignación?')) return
    try {
      await profesorCursoService.desactivarAsignacion(asigId)
      setAsignaciones((prev) => prev.filter((a) => a.profesorCursoId !== asigId))
    } catch {
      setError('No se pudo desactivar la asignación.')
    }
  }

  const cursoActual = cursos.find((c) => c.id === selectedCursoId)

  return (
    <div className="space-y-6 animate-review-enter">
      <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-8 border border-card-border">
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Panel Admin</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground font-display">Asignaciones</h1>
          <p className="mt-2 text-sm text-secondary font-medium">
            Visualiza y gestiona los profesores asignados a cada curso.
          </p>
        </div>
      </header>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Selector de curso */}
      <div className="flex items-center gap-3">
        <label className="shrink-0 text-sm font-semibold text-secondary">Curso:</label>
        {loadingCursos ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        ) : (
          <select
            value={selectedCursoId}
            onChange={(e) => handleSelectCurso(Number(e.target.value))}
            className="flex-1 max-w-sm rounded-xl border border-card-border bg-foreground/5 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
          >
            <option value="" disabled className="bg-background">Selecciona un curso</option>
            {cursos.map((c) => (
              <option key={c.id} value={c.id} className="bg-background">
                {c.codigo} — {c.nombre}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Tabla de asignaciones */}
      {selectedCursoId !== '' && (
        <div className="overflow-hidden rounded-2xl border border-card-border">
          <div className="flex items-center justify-between border-b border-card-border bg-foreground/5 px-6 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary/60">Profesores asignados</p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">
                {cursoActual?.nombre ?? ''}
                <span className="ml-2 text-secondary font-normal">({asignaciones.length})</span>
              </p>
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border/50 bg-foreground/5">
                {['Profesor', 'Semestre', 'Sección', ''].map((h, i) => (
                  <th
                    key={i}
                    className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-secondary ${i === 3 ? 'text-right' : 'text-left'}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loadingAsig
                ? Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="border-b border-card-border/40">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-foreground/10 animate-pulse" />
                          <div className="h-4 w-32 rounded bg-foreground/10 animate-pulse" />
                        </div>
                      </td>
                      <td className="px-6 py-4"><div className="h-4 w-16 rounded bg-foreground/10 animate-pulse" /></td>
                      <td className="px-6 py-4"><div className="h-4 w-8 rounded bg-foreground/10 animate-pulse" /></td>
                      <td className="px-6 py-4 text-right"><div className="h-8 w-8 rounded-lg bg-foreground/10 animate-pulse ml-auto" /></td>
                    </tr>
                  ))
                : asignaciones.map((a) => (
                    <tr key={a.profesorCursoId} className="border-b border-card-border/40 hover:bg-foreground/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <User size={16} className="text-primary" />
                          </div>
                          <span className="font-semibold text-foreground">
                            {a.nombre} {a.apellido}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-secondary">{a.semestre}</td>
                      <td className="px-6 py-4 text-secondary">{a.seccion}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDesactivar(a.profesorCursoId)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-card-border bg-foreground/5 text-secondary hover:border-red-500/30 hover:text-red-400 transition-all ml-auto"
                          title="Desactivar asignación"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
              {!loadingAsig && asignaciones.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-14 text-center text-secondary">
                    Este curso no tiene profesores asignados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
