import { useEffect, useState } from 'react'
import { GraduationCap, Trash2, Pencil, Plus } from 'lucide-react'
import { carrerasService, type Carrera, type CarreraPayload } from '../../services/carrerasService'

const emptyForm: CarreraPayload = { nombre: '', codigo: '', activa: true }

const INPUT_CLS = 'w-full rounded-xl border border-card-border bg-foreground/5 px-4 py-3 text-foreground outline-none focus:border-primary/50 text-sm placeholder:text-foreground/30'

export default function AdminCareers() {
  const [carreras, setCarreras] = useState<Carrera[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modal, setModal] = useState<'create' | 'edit' | null>(null)
  const [selected, setSelected] = useState<Carrera | null>(null)
  const [form, setForm] = useState<CarreraPayload>(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      setCarreras(await carrerasService.getCarreras())
    } catch {
      setError('No se pudo cargar las carreras.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openCreate = () => {
    setForm(emptyForm)
    setSelected(null)
    setModal('create')
  }

  const openEdit = (c: Carrera) => {
    setForm({ nombre: c.nombre, codigo: c.codigo, activa: c.activa })
    setSelected(c)
    setModal('edit')
  }

  const closeModal = () => { setModal(null); setSelected(null) }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (modal === 'create') {
        await carrerasService.createCarrera(form)
      } else if (modal === 'edit' && selected) {
        await carrerasService.updateCarrera(selected.id, form)
      }
      closeModal()
      load()
    } catch {
      setError('No se pudo guardar la carrera.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta carrera? Esta acción no se puede deshacer.')) return
    try {
      await carrerasService.deleteCarrera(id)
      load()
    } catch {
      setError('No se pudo eliminar la carrera.')
    }
  }

  return (
    <div className="space-y-6 animate-review-enter">
      <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-8 border border-card-border">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Panel Admin</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground font-display">Carreras</h1>
            <p className="mt-2 text-sm text-secondary font-medium">Administra las carreras disponibles en la plataforma.</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Nueva Carrera
          </button>
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
              <div key={i} className="rounded-2xl border border-card-border p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 rounded-lg bg-foreground/10 animate-pulse" />
                  <div className="h-5 w-16 rounded-full bg-foreground/10 animate-pulse" />
                </div>
                <div className="h-3 w-16 rounded bg-foreground/10 animate-pulse" />
                <div className="h-5 w-40 rounded bg-foreground/10 animate-pulse" />
                <div className="border-t border-card-border pt-4 flex gap-2">
                  <div className="h-8 flex-1 rounded-lg bg-foreground/10 animate-pulse" />
                  <div className="h-8 w-8 rounded-lg bg-foreground/10 animate-pulse" />
                </div>
              </div>
            ))
          : carreras.map((c) => (
              <div key={c.id} className="glass-card group flex flex-col justify-between rounded-2xl border border-card-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <GraduationCap size={20} />
                    </div>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${c.activa ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                      {c.activa ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/50">{c.codigo}</p>
                  <h2 className="mt-1 text-base font-bold text-foreground font-display line-clamp-2">{c.nombre}</h2>
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-card-border pt-4">
                  <button
                    onClick={() => openEdit(c)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-card-border bg-foreground/5 py-2 text-xs font-semibold text-secondary hover:border-primary/30 hover:text-primary transition-all"
                  >
                    <Pencil size={13} /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-card-border bg-foreground/5 text-secondary hover:border-red-500/30 hover:text-red-400 transition-all"
                    title="Eliminar"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
        {!loading && carreras.length === 0 && (
          <p className="col-span-full py-16 text-center text-secondary">No hay carreras registradas.</p>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-card-border bg-background p-6 shadow-2xl">
            <h2 className="mb-6 text-xl font-bold text-foreground">
              {modal === 'create' ? 'Nueva Carrera' : 'Editar Carrera'}
            </h2>
            <div className="space-y-3">
              <input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={INPUT_CLS} />
              <input placeholder="Código (ej. ISW)" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} className={INPUT_CLS} />
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.activa}
                  onChange={(e) => setForm({ ...form, activa: e.target.checked })}
                  className="h-4 w-4 rounded accent-primary"
                />
                <span className="text-sm text-foreground">Carrera activa</span>
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={closeModal} className="flex-1 rounded-xl border border-card-border bg-foreground/5 py-3 text-sm font-semibold text-secondary hover:bg-foreground/10 transition-all">
                Cancelar
              </button>
              <button onClick={handleSave} disabled={saving} className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-hover disabled:opacity-50 transition-all">
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
