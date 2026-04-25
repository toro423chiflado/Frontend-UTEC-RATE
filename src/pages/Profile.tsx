import { User, Mail, Shield, BookOpen, Clock } from 'lucide-react'

function Profile() {
  return (
    <div className="max-w-4xl space-y-8 animate-review-enter">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 border border-primary/20 mb-3">
          <User className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Área Personal
          </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white font-display">
          Tu Perfil
        </h1>
        <p className="mt-2 text-secondary font-medium">
          Gestiona tu cuenta y revisa tu actividad académica.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <article className="glass-panel p-8 rounded-[2.5rem] border border-white/5 text-center shadow-xl">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 text-3xl font-bold text-white shadow-lg mb-6">
              U
            </div>
            <h2 className="text-xl font-bold text-white font-display">Usuario URATE</h2>
            <p className="text-sm text-secondary font-medium">Estudiante de Ingeniería</p>
            
            <div className="mt-8 space-y-3">
              <button className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white transition hover:bg-primary-hover shadow-lg shadow-primary/20">
                Editar Perfil
              </button>
              <button className="w-full rounded-xl bg-white/5 border border-white/10 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                Seguridad
              </button>
            </div>
          </article>
        </div>

        {/* Info & Activity */}
        <div className="md:col-span-2 space-y-6">
          <section className="glass-panel p-8 rounded-[2.5rem] border border-white/5 shadow-xl">
            <h3 className="text-lg font-bold text-white font-display mb-6">Información General</h3>
            <div className="space-y-6">
              {[
                { icon: <Mail className="h-4 w-4" />, label: 'Correo', value: 'alumno@urate.com' },
                { icon: <Shield className="h-4 w-4" />, label: 'Rol', value: 'Estudiante Verificado' },
                { icon: <BookOpen className="h-4 w-4" />, label: 'Carrera', value: 'Ciencias de la Computación' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-secondary">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-secondary">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel p-8 rounded-[2.5rem] border border-white/5 shadow-xl">
            <h3 className="text-lg font-bold text-white font-display mb-6">Actividad Reciente</h3>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Reseña publicada</p>
                <p className="text-xs text-secondary font-medium">Publicaste una opinión sobre "Cloud Computing" hace 2 días.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Profile
