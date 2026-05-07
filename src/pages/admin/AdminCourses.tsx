import { useEffect, useState, type FormEvent } from 'react'
import { BookOpen, Trash2, Pencil, Plus, Search, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react'
import { cursosService, type Curso, type CursoPayload } from '../../services/cursosService'
import { carrerasService, type Carrera } from '../../services/carrerasService'
import { profesorCursoService, type AsignarProfesorPayload, type Semestre } from '../../services/profesorCursoService'
import { usuariosService, type Usuario } from '../../services/usuariosService'

const emptyCursoForm: CursoPayload = {
  carreraId: 0, nombre: '', codigo: '', colorHex: '#8B5CF6', creditos: 4,
}

const emptyAsignForm = { profesorId: '', semestre: '' as Semestre, seccion: '' }

const INPUT_CLS = 'w-full rounded-xl border border-card-border bg-foreground/5 px-4 py-3 text-foreground outline-none focus:border-primary/50 text-sm placeholder:text-foreground/30'

const SEMESTRE_RE = /^\d{4}-[12]$/

export default function AdminCourses() {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [carreras, setCarreras] = useState<Carrera[]>([])
  const [profesores, setProfesores] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [modal, setModal] = useState<'create' | 'edit' | 'assign' | null>(null)
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null)
  const [cursoForm, setCursoForm] = useState<CursoPayload>(emptyCursoForm)
  const [asignForm, setAsignForm] = useState(emptyAsignForm)
  const [saving, setSaving] = useState(false)

  const LIMIT = 12

  const loadCursos = async (p = page, q = searchQuery) => {
    try {
      setLoading(true)
      setError(null)
      const res = await cursosService.getCursos({ pagina: p, limite: LIMIT, q: q || undefined })
      setCursos(res.data)
      setTotal(res.meta.total)
    } catch {
      setError('No se pudo cargar los cursos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carrerasService.getCarreras().then(setCarreras).catch(() => {})
  }, [])

  useEffect(() => { loadCursos(page, searchQuery) }, [page, searchQuery])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    setPage(1)
    setSearchQuery(searchInput)
  }

  const openCreate = () => {
    setCursoForm({ ...emptyCursoForm, carreraId: carreras[0]?.id ?? 0 })
    setSelectedCurso(null)
    setModal('create')
  }

  const openEdit = (c: Curso) => {
    setCursoForm({ carreraId: c.carreraId, nombre: c.nombre, codigo: c.codigo, colorHex: c.colorHex, creditos: c.creditos })
    setSelectedCurso(c)
    setModal('edit')
  }

  const openAssign = async (c: Curso) => {
    setSelectedCurso(c)
    setAsignForm(emptyAsignForm)
    setModal('assign')
    try {
      const all = await usuariosService.getUsuarios()
      setProfesores(all.filter((u) => u.rol === 'PROFESOR'))
    } catch {
      setProfesores([])
    }
  }

  const closeModal = () => { setModal(null); setSelectedCurso(null) }

  const handleSaveCurso = async () => {
    if (!cursoForm.nombre || !cursoForm.codigo || !cursoForm.carreraId) {
      setError('Completa todos los campos requeridos.')
      return
    }
    setSaving(true)
    try {
      if (modal === 'create') {
        await cursosService.createCurso(cursoForm)
      } else if (modal === 'edit' && selectedCurso) {
        await cursosService.updateCurso(selectedCurso.id, cursoForm)
      }
      closeModal()
      loadCursos()
    } catch {
      setError('No se pudo guardar el curso.')
    } finally {
      setSaving(false)
    }
  }

  const handleAsignar = async () => {
    if (!asignForm.profesorId || !asignForm.semestre || !asignForm.seccion) {
      setError('Completa todos los campos de la asignación.')
      return
    }
    if (!SEMESTRE_RE.test(asignForm.semestre)) {
      setError('El semestre debe tener el formato YYYY-1 o YYYY-2 (ej. 2025-2).')
      return
    }
    if (!selectedCurso) return
    setSaving(true)
    try {
      const payload: AsignarProfesorPayload = {
        profesorId: asignForm.profesorId,
        cursoId: selectedCurso.id,
        semestre: asignForm.semestre as Semestre,
        seccion: asignForm.seccion,
      }
      await profesorCursoService.asignarProfesor(payload)
      closeModal()
    } catch {
      setError('No se pudo asignar al profesor.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este curso? Esta acción no se puede deshacer.')) return
    try {
      await cursosService.deleteCurso(id)
      loadCursos()
    } catch {
      setError('No se pudo eliminar el curso.')
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / LIMIT))
  const carreraName = (id: number) => carreras.find((c) => c.id === id)?.nombre ?? `Carrera ${id}`

  return (
    <div className="space-y-6 animate-review-enter">
      <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-8 border border-card-border">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Panel Admin</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground font-display">Cursos</h1>
            <p className="mt-2 text-sm text-secondary font-medium">
              Gestiona el catálogo de cursos y asigna profesores.
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Nuevo Curso
          </button>
        </div>
      </header>

      {/* Búsqueda */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar por nombre de curso..."
            className="w-full rounded-xl border border-card-border bg-foreground/5 py-3 pl-11 pr-4 text-sm text-foreground outline-none focus:border-primary/50 placeholder:text-foreground/30"
          />
        </div>
        <button type="submit" className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-hover transition-all">
          Buscar
        </button>
        {searchQuery && (
          <button
            type="button"
            onClick={() => { setSearchInput(''); setSearchQuery(''); setPage(1) }}
            className="rounded-xl border border-card-border bg-foreground/5 px-4 py-3 text-sm text-secondary hover:bg-foreground/10 transition-all"
          >
            Limpiar
          </button>
        )}
      </form>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-card-border overflow-hidden">
                  <div className="h-1.5 w-full bg-foreground/10 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="h-9 w-9 rounded-lg bg-foreground/10 animate-pulse" />
                      <div className="h-4 w-8 rounded bg-foreground/10 animate-pulse" />
                    </div>
                    <div className="h-3 w-20 rounded bg-foreground/10 animate-pulse" />
                    <div className="h-4 w-36 rounded bg-foreground/10 animate-pulse" />
                    <div className="h-3 w-24 rounded bg-foreground/10 animate-pulse" />
                    <div className="border-t border-card-border pt-4 flex gap-1.5">
                      <div className="h-8 flex-1 rounded-lg bg-foreground/10 animate-pulse" />
                      <div className="h-8 flex-1 rounded-lg bg-foreground/10 animate-pulse" />
                      <div className="h-8 w-8 rounded-lg bg-foreground/10 animate-pulse" />
                    </div>
                  </div>
                </div>
              ))
            : cursos.map((c) => (
                <div
                  key={c.id}
                  className="glass-card group flex flex-col justify-between rounded-2xl border border-card-border overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="h-1.5 w-full" style={{ backgroundColor: c.colorHex }} />
                  <div className="flex flex-col flex-1 p-5">
                    <div className="mb-auto">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: `${c.colorHex}20`, color: c.colorHex }}
                        >
                          <BookOpen size={17} />
                        </div>
                        <span className="text-[10px] font-bold text-secondary/50 mt-1">{c.creditos} cr.</span>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/50">{c.codigo}</p>
                      <h2 className="mt-1 text-sm font-bold text-foreground font-display line-clamp-2">{c.nombre}</h2>
                      <p className="mt-1 text-[11px] text-secondary/60 line-clamp-1">{carreraName(c.carreraId)}</p>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 border-t border-card-border pt-4">
                      <button
                        onClick={() => openEdit(c)}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-card-border bg-foreground/5 py-2 text-[11px] font-semibold text-secondary hover:border-primary/30 hover:text-primary transition-all"
                        title="Editar"
                      >
                        <Pencil size={12} /> Editar
                      </button>
                      <button
                        onClick={() => openAssign(c)}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-card-border bg-foreground/5 py-2 text-[11px] font-semibold text-secondary hover:border-primary/30 hover:text-primary transition-all"
                        title="Asignar profesor"
                      >
                        <UserPlus size={12} /> Asignar
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-card-border bg-foreground/5 text-secondary hover:border-red-500/30 hover:text-red-400 transition-all"
                        title="Eliminar"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          {!loading && cursos.length === 0 && (
            <p className="col-span-full py-16 text-center text-secondary">
              {searchQuery ? `Sin resultados para "${searchQuery}".` : 'No hay cursos registrados.'}
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 rounded-lg border border-card-border bg-foreground/5 px-4 py-2 text-sm text-secondary hover:bg-foreground/10 disabled:opacity-40 transition-all"
            >
              <ChevronLeft size={16} /> Anterior
            </button>
            <span className="text-sm text-secondary">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1.5 rounded-lg border border-card-border bg-foreground/5 px-4 py-2 text-sm text-secondary hover:bg-foreground/10 disabled:opacity-40 transition-all"
            >
              Siguiente <ChevronRight size={16} />
            </button>
          </div>
        )}
      </>

      {/* Modal crear/editar curso */}
      {(modal === 'create' || modal === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-card-border bg-background p-6 shadow-2xl">
            <h2 className="mb-6 text-xl font-bold text-foreground">
              {modal === 'create' ? 'Nuevo Curso' : 'Editar Curso'}
            </h2>
            <div className="space-y-3">
              <select
                value={cursoForm.carreraId}
                onChange={(e) => setCursoForm({ ...cursoForm, carreraId: Number(e.target.value) })}
                className={INPUT_CLS}
              >
                <option value={0} disabled className="bg-background">Selecciona una carrera</option>
                {carreras.map((c) => (
                  <option key={c.id} value={c.id} className="bg-background">{c.nombre}</option>
                ))}
              </select>
              <input placeholder="Nombre del curso" value={cursoForm.nombre} onChange={(e) => setCursoForm({ ...cursoForm, nombre: e.target.value })} className={INPUT_CLS} />
              <input placeholder="Código (ej. CG-XX101)" value={cursoForm.codigo} onChange={(e) => setCursoForm({ ...cursoForm, codigo: e.target.value })} className={INPUT_CLS} />
              <div className="flex gap-3">
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-card-border bg-foreground/5 px-4 py-3">
                  <label className="text-sm text-secondary shrink-0">Color</label>
                  <input
                    type="color"
                    value={cursoForm.colorHex}
                    onChange={(e) => setCursoForm({ ...cursoForm, colorHex: e.target.value })}
                    className="h-8 w-8 rounded cursor-pointer border-0 bg-transparent p-0"
                  />
                  <span className="text-xs text-secondary font-mono">{cursoForm.colorHex}</span>
                </div>
                <input
                  type="number"
                  min={1}
                  max={10}
                  placeholder="Créditos"
                  value={cursoForm.creditos}
                  onChange={(e) => setCursoForm({ ...cursoForm, creditos: Number(e.target.value) })}
                  className="w-28 rounded-xl border border-card-border bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/50"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={closeModal} className="flex-1 rounded-xl border border-card-border bg-foreground/5 py-3 text-sm font-semibold text-secondary hover:bg-foreground/10 transition-all">
                Cancelar
              </button>
              <button onClick={handleSaveCurso} disabled={saving} className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-hover disabled:opacity-50 transition-all">
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal asignar profesor */}
      {modal === 'assign' && selectedCurso && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-card-border bg-background p-6 shadow-2xl">
            <h2 className="mb-1 text-xl font-bold text-foreground">Asignar Profesor</h2>
            <p className="mb-6 text-sm text-secondary">
              Curso: <span className="font-semibold text-foreground">{selectedCurso.nombre}</span>
            </p>
            <div className="space-y-3">
              <select
                value={asignForm.profesorId}
                onChange={(e) => setAsignForm({ ...asignForm, profesorId: e.target.value })}
                className={INPUT_CLS}
              >
                <option value="" disabled className="bg-background">Selecciona un profesor</option>
                {profesores.map((p) => (
                  <option key={p.id} value={p.id} className="bg-background">
                    {p.nombre} {p.apellido}
                  </option>
                ))}
                {profesores.length === 0 && (
                  <option disabled className="bg-background">No hay profesores disponibles</option>
                )}
              </select>
              <input
                placeholder="Semestre (ej. 2025-2)"
                value={asignForm.semestre}
                onChange={(e) => setAsignForm({ ...asignForm, semestre: e.target.value as Semestre })}
                className={INPUT_CLS}
              />
              <input
                placeholder="Sección (ej. A)"
                value={asignForm.seccion}
                onChange={(e) => setAsignForm({ ...asignForm, seccion: e.target.value })}
                className={INPUT_CLS}
              />
              <p className="text-[11px] text-secondary/60">Formato de semestre: YYYY-1 o YYYY-2</p>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={closeModal} className="flex-1 rounded-xl border border-card-border bg-foreground/5 py-3 text-sm font-semibold text-secondary hover:bg-foreground/10 transition-all">
                Cancelar
              </button>
              <button onClick={handleAsignar} disabled={saving} className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-hover disabled:opacity-50 transition-all">
                {saving ? 'Asignando...' : 'Asignar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
