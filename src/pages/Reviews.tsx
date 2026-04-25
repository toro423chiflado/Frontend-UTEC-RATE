import { MessageSquare, Settings2, Info } from 'lucide-react'

function Reviews() {
  return (
    <div className="space-y-8 animate-review-enter">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 border border-primary/20 mb-3">
          <MessageSquare className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Gestión de Contenido
          </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white font-display">
          Mis Reseñas
        </h1>
        <p className="mt-2 text-secondary font-medium">
          Administra y revisa todas tus contribuciones a la comunidad.
        </p>
      </header>

      <section className="glass-panel p-10 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
          <Settings2 className="h-40 w-40 text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center py-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-6">
            <Info className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display mb-4">Módulo en Desarrollo</h2>
          <p className="text-secondary max-w-md font-medium leading-relaxed">
            Estamos trabajando para que puedas editar, eliminar y ver estadísticas de tus reseñas directamente desde este panel.
          </p>
          <div className="mt-10 flex gap-4">
            <div className="h-1.5 w-12 rounded-full bg-primary" />
            <div className="h-1.5 w-4 rounded-full bg-white/10" />
            <div className="h-1.5 w-4 rounded-full bg-white/10" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reviews
