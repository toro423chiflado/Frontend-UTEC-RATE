import { ArrowRight, BookOpen, BrainCircuit, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const highlights = [
  {
    title: 'Ranking confiable',
    description: 'Consulta calificaciones reales de cursos y profesores.',
    icon: Star,
  },
  {
    title: 'Resenas comunitarias',
    description: 'Lee comentarios de alumnos para elegir mejor tus cursos.',
    icon: BookOpen,
  },
  {
    title: 'Insights simulados',
    description: 'Visualiza analitica academica con resumentes tipo AI.',
    icon: BrainCircuit,
  },
]

function Landing() {
  const { isAuthenticated } = useAuth()
  const primaryCta = isAuthenticated ? '/dashboard' : '/login'
  const primaryLabel = isAuthenticated ? 'Ir al dashboard' : 'Iniciar sesion'
  const secondaryCta = isAuthenticated ? '/courses' : '/login'

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] px-6 py-16 text-slate-100">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-14 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src="/urate_logo.png" alt="URATE" className="h-8 w-auto scale-[1.7]" />
            <p className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-secondary sm:block">
              UTEC Rate Platform
            </p>
          </div>
          <Link
            to={primaryCta}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            {primaryLabel}
          </Link>
        </header>

        <section className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-primary/20 via-slate-900/40 to-transparent p-10 shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Plataforma academica
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Elige cursos y profesores con informacion real de la comunidad UTEC.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-secondary">
            URATE convierte experiencias de alumnos en decisiones academicas mas
            inteligentes, con dashboards claros y feedback accionable.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={primaryCta}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Empezar ahora
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={secondaryCta}
              className="inline-flex items-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver cursos mock
            </Link>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon

            return (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-white">{item.title}</h2>
                <p className="mt-2 text-sm text-secondary">{item.description}</p>
              </article>
            )
          })}
        </section>
      </div>
    </main>
  )
}

export default Landing
