import { BrainCircuit, Sparkles, TrendingUp, Users, Cpu, Rocket } from 'lucide-react'

function Insights() {
  const cards = [
    {
      title: 'Tendencias de Elección',
      description: 'Análisis de los cursos más buscados este semestre según el feedback de la comunidad.',
      icon: <TrendingUp className="h-6 w-6 text-emerald-400" />,
      tag: 'Real-time'
    },
    {
      title: 'Satisfacción Global',
      description: 'El índice de satisfacción estudiantil ha subido un 12% tras las últimas evaluaciones.',
      icon: <Users className="h-6 w-6 text-primary" />,
      tag: 'Analytics'
    },
    {
      title: 'Predicciones IA',
      description: 'Nuestros algoritmos sugieren que los cursos de Software Engineering tendrán alta demanda.',
      icon: <Cpu className="h-6 w-6 text-purple-400" />,
      tag: 'Predictive'
    }
  ]

  return (
    <div className="space-y-10 animate-review-enter">
      <header className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent p-10 border border-white/5">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BrainCircuit className="h-40 w-40 text-purple-400" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 border border-purple-500/20 mb-4">
            <Sparkles className="h-3 w-3 text-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
              Powered by AI
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl font-display">
            Inteligencia <span className="text-purple-400">Académica</span>
          </h1>
          <p className="mt-4 text-lg text-secondary font-medium leading-relaxed">
            Descubre patrones y tendencias en las evaluaciones de los profesores para optimizar tu camino universitario.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, i) => (
          <article key={i} className="glass-panel p-8 rounded-[2rem] border border-white/5 shadow-xl group hover:border-purple-500/30 transition-all duration-300">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-white font-display">{card.title}</h3>
              <span className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-white/5 text-secondary/50 border border-white/5">
                {card.tag}
              </span>
            </div>
            <p className="text-secondary text-sm leading-relaxed font-medium">
              {card.description}
            </p>
          </article>
        ))}
      </div>

      <section className="glass-panel rounded-[2.5rem] p-12 border border-white/5 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 border border-white/10 mb-8 animate-float">
            <Rocket className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-white font-display mb-4">Nuevos Insights próximamente</h2>
          <p className="text-secondary max-w-lg mx-auto font-medium">
            Estamos entrenando nuevos modelos de lenguaje para ofrecerte análisis más profundos sobre el sentimiento de las reseñas y la evolución de los cursos.
          </p>
          <div className="mt-8 flex justify-center gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 w-1.5 rounded-full bg-primary ${i === 1 ? 'opacity-100' : 'opacity-20'} animate-pulse`} style={{ animationDelay: `${i * 200}ms` }} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Insights
