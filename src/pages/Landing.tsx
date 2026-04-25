import { Link } from 'react-router-dom'
import { ArrowRight, Star, BookOpen, Brain, ShieldCheck } from '@phosphor-icons/react'
import { HiOutlineSparkles } from 'react-icons/hi2'

const highlights = [
  {
    title: 'Ranking Confiable',
    description: 'Consulta calificaciones reales y detalladas de cursos y profesores basadas en el histórico.',
    icon: Star,
    color: 'from-yellow-500/20 to-orange-500/5',
    iconColor: 'text-yellow-400',
    delay: '0ms'
  },
  {
    title: 'Reseñas Comunitarias',
    description: 'Lee comentarios auténticos de alumnos para estructurar mejor tu matrícula y elegir sabiamente.',
    icon: BookOpen,
    color: 'from-blue-500/20 to-cyan-500/5',
    iconColor: 'text-blue-400',
    delay: '100ms'
  },
  {
    title: 'Insights Predictivos',
    description: 'Visualiza analítica académica avanzada con resúmenes generados por Inteligencia Artificial.',
    icon: Brain,
    color: 'from-purple-500/20 to-pink-500/5',
    iconColor: 'text-purple-400',
    delay: '200ms'
  },
]

function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] font-sans selection:bg-primary/30 selection:text-white">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] h-[800px] w-[800px] rounded-full bg-primary/10 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[40%] -left-[20%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] right-[10%] h-[700px] w-[700px] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between rounded-full border border-white/5 bg-white/[0.02] px-6 py-4 backdrop-blur-2xl shadow-2xl animate-review-enter">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg shadow-primary/20 border border-white/10 overflow-hidden">
              <img src="/urate_logo.png" alt="URATE" className="h-full w-full object-contain scale-[2]" />
            </div>
            <span className="hidden text-sm font-bold tracking-widest text-white uppercase font-display sm:block">
              URATE
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-bold text-secondary hover:text-white transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/login"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Empezar
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="mt-24 mb-32 flex flex-col items-center text-center">
          <div className="animate-review-enter inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 mb-8 backdrop-blur-md">
            <HiOutlineSparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              La plataforma definitiva para estudiantes
            </span>
          </div>
          
          <h1 className="animate-review-enter relative max-w-5xl text-5xl font-extrabold leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl font-display" style={{ animationDelay: '100ms' }}>
            Decisiones académicas <br className="hidden md:block" />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-purple-500">
              impulsadas por IA.
              <div className="absolute -bottom-2 left-0 h-2 w-full bg-gradient-to-r from-blue-400 via-primary to-purple-500 opacity-30 blur-md"></div>
            </span>
          </h1>
          
          <p className="animate-review-enter mt-8 max-w-2xl text-lg text-secondary font-medium leading-relaxed md:text-xl" style={{ animationDelay: '200ms' }}>
            URATE transforma las experiencias de miles de estudiantes en insights accionables. 
            Descubre los mejores cursos, evalúa profesores y planifica tu ciclo con total confianza.
          </p>

          <div className="animate-review-enter mt-12 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: '300ms' }}>
            <Link
              to="/login"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-base font-bold text-dark transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ingresar a la Plataforma
                <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          <div className="animate-review-enter mt-16 flex items-center gap-6 text-secondary/60" style={{ animationDelay: '400ms' }}>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-[#020617] bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs text-white font-bold shadow-sm">
                  U{i}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start text-sm">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} weight="fill" />)}
              </div>
              <span className="font-semibold text-white">Únete a +5,000 estudiantes</span>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative z-20">
          <div className="text-center mb-16 animate-review-enter">
            <h2 className="text-3xl font-extrabold text-white font-display md:text-4xl">
              ¿Por qué usar URATE?
            </h2>
            <p className="mt-4 text-secondary font-medium">Todo lo que necesitas para sobrevivir el semestre.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="animate-review-enter group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 transition-all hover:-translate-y-2 hover:bg-white/[0.04] hover:border-white/10 shadow-2xl"
                  style={{ animationDelay: item.delay }}
                >
                  <div className={`absolute top-0 right-0 -mr-8 -mt-8 h-40 w-40 rounded-full bg-gradient-to-br ${item.color} blur-[50px] opacity-50 transition-opacity group-hover:opacity-100`} />
                  
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <Icon size={28} weight="duotone" className={item.iconColor} />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-display mb-3">{item.title}</h3>
                    <p className="text-secondary leading-relaxed font-medium">{item.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 border-t border-white/5 pt-8 pb-12 text-center text-sm font-medium text-secondary/40 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} weight="duotone" className="text-primary/50" />
            <span>URATE - UTEC Rate Platform &copy; 2026</span>
          </div>
          <p>Desarrollado para transformar la educación mediante el feedback.</p>
        </footer>
      </div>
    </main>
  )
}

export default Landing
