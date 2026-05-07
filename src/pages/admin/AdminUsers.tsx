import { useEffect, useState } from 'react'
import { User, Trash2, Pencil, Plus } from 'lucide-react'
import { usuariosService, type Usuario, type BackendRol, type CreateUsuarioPayload } from '../../services/usuariosService'

const ROL_LABELS: Record<BackendRol, string> = {
  ADMIN: 'Admin',
  PROFESOR: 'Profesor',
  ESTUDIANTE: 'Estudiante',
}

const ROL_COLORS: Record<BackendRol, string> = {
  ADMIN: 'bg-red-500/15 border-red-500/30 text-red-400',
  PROFESOR: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
  ESTUDIANTE: 'bg-green-500/15 border-green-500/30 text-green-400',
}

const ROLES: BackendRol[] = ['ADMIN', 'PROFESOR', 'ESTUDIANTE']

const emptyForm: CreateUsuarioPayload = {
  nombre: '', apellido: '', correo: '', password: '', rol: 'ESTUDIANTE',
}

const INPUT_CLS = 'w-full rounded-xl border border-card-border bg-foreground/5 px-4 py-3 text-foreground outline-none focus:border-primary/50 text-sm placeholder:text-foreground/30'

export default function AdminUsers() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modal, setModal] = useState<'create' | 'edit' | null>(null)
  const [selected, setSelected] = useState<Usuario | null>(null)
  const [form, setForm] = useState<CreateUsuarioPayload>(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      setUsuarios(await usuariosService.getUsuarios())
    } catch {
      setError('No se pudo cargar la lista de usuarios.')
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

  const openEdit = (u: Usuario) => {
    setForm({ nombre: u.nombre, apellido: u.apellido, correo: u.correo, password: '', rol: u.rol })
    setSelected(u)
    setModal('edit')
  }

  const closeModal = () => { setModal(null); setSelected(null) }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (modal === 'create') {
        await usuariosService.createUsuario(form)
      } else if (modal === 'edit' && selected) {
        await usuariosService.updateUsuario(selected.id, form)
      }
      closeModal()
      load()
    } catch {
      setError('No se pudo guardar el usuario.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este usuario? Esta acción no se puede deshacer.')) return
    try {
      await usuariosService.deleteUsuario(id)
      load()
    } catch {
      setError('No se pudo eliminar el usuario.')
    }
  }

  const handleChangeRol = async (u: Usuario, rol: BackendRol) => {
    try {
      await usuariosService.changeRol(u.id, rol)
      load()
    } catch {
      setError('No se pudo cambiar el rol.')
    }
  }

  return (
    <div className="space-y-6 animate-review-enter">
      <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-8 border border-card-border">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Panel Admin</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground font-display">Usuarios</h1>
            <p className="mt-2 text-sm text-secondary font-medium">Gestiona cuentas y roles de la plataforma.</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Nuevo Usuario
          </button>
        </div>
      </header>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-card-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-card-border bg-foreground/5">
              {['Usuario', 'Correo', 'Rol', 'Acciones'].map((h, i) => (
                <th key={h} className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary ${i === 3 ? 'text-right' : 'text-left'}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-card-border/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-foreground/10 animate-pulse" />
                        <div className="h-4 w-32 rounded bg-foreground/10 animate-pulse" />
                      </div>
                    </td>
                    <td className="px-6 py-4"><div className="h-4 w-44 rounded bg-foreground/10 animate-pulse" /></td>
                    <td className="px-6 py-4"><div className="h-6 w-20 rounded-lg bg-foreground/10 animate-pulse" /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-8 w-8 rounded-lg bg-foreground/10 animate-pulse" />
                        <div className="h-8 w-8 rounded-lg bg-foreground/10 animate-pulse" />
                      </div>
                    </td>
                  </tr>
                ))
              : usuarios.map((u) => (
                  <tr key={u.id} className="border-b border-card-border/50 hover:bg-foreground/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <User size={18} className="text-primary" />
                        </div>
                        <span className="font-semibold text-foreground">{u.nombre} {u.apellido}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-secondary">{u.correo}</td>
                    <td className="px-6 py-4">
                      <select
                        value={u.rol}
                        onChange={(e) => handleChangeRol(u, e.target.value as BackendRol)}
                        className={`rounded-lg border px-3 py-1 text-xs font-bold cursor-pointer outline-none ${ROL_COLORS[u.rol]}`}
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r} className="bg-background text-foreground font-normal">
                            {ROL_LABELS[r]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(u)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-card-border bg-foreground/5 text-secondary hover:border-primary/30 hover:text-primary transition-all"
                          title="Editar"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-card-border bg-foreground/5 text-secondary hover:border-red-500/30 hover:text-red-400 transition-all"
                          title="Eliminar"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            {!loading && usuarios.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center text-secondary">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-card-border bg-background p-6 shadow-2xl">
            <h2 className="mb-6 text-xl font-bold text-foreground">
              {modal === 'create' ? 'Nuevo Usuario' : 'Editar Usuario'}
            </h2>
            <div className="space-y-3">
              <input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={INPUT_CLS} />
              <input placeholder="Apellido" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} className={INPUT_CLS} />
              <input type="email" placeholder="Correo" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} className={INPUT_CLS} />
              <input
                type="password"
                placeholder={modal === 'edit' ? 'Nueva contraseña (opcional)' : 'Contraseña'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={INPUT_CLS}
              />
              <select value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value as BackendRol })} className={INPUT_CLS}>
                {ROLES.map((r) => (
                  <option key={r} value={r} className="bg-background">{ROL_LABELS[r]}</option>
                ))}
              </select>
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
