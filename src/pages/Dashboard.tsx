import CourseCard from '../components/CourseCard'
import { courseService } from '../services/courseService'
import { MagnifyingGlass, Sliders, Sparkle, TrendUp, Users, ChartPieSlice } from '@phosphor-icons/react'
import { HiOutlineSparkles } from 'react-icons/hi2'

function Dashboard() {
  const courses = courseService.getCourses()

  return (
    <div className="space-y-10 animate-review-enter">
      {/* Welcome Section */}
      <header className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-blue-900/10 to-transparent p-10 border border-white/5">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkle size={160} weight="fill" className="text-primary" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 border border-primary/20 mb-6">
            <HiOutlineSparkles className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Plataforma de Inteligencia Académica
            </span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl font-display">
            Explora Cursos <span className="text-primary">&</span> Profesores
          </h1>
          <p className="mt-4 text-lg text-secondary font-medium leading-relaxed">
            Toma mejores decisiones académicas con el poder de la retroalimentación real y resúmenes generados por IA.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex h-12 flex-1 min-w-[280px] items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 transition-all focus-within:border-primary/50 focus-within:bg-white/10">
              <MagnifyingGlass size={20} className="text-secondary" />
              <input 
                type="text" 
                placeholder="Buscar por curso, código o profesor..." 
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-secondary/50"
              />
            </div>
            <button className="flex h-12 items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-6 text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-95">
              <Sliders size={18} />
              <span>Filtros</span>
            </button>
          </div>
        </div>
      </header>

      {/* Course Grid Section */}
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white font-display">Cursos Destacados</h2>
            <p className="text-sm text-secondary font-medium">Materias con más actividad esta semana</p>
          </div>
          <button className="text-sm font-bold text-primary hover:underline">Ver todos</button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Quick Stats / Info */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { label: 'Reviews Totales', value: '1,284', color: 'text-primary', icon: <TrendUp size={24} /> },
          { label: 'Profesores Evaluados', value: '156', color: 'text-blue-400', icon: <Users size={24} /> },
          { label: 'Nivel de Satisfacción', value: '94%', color: 'text-emerald-400', icon: <ChartPieSlice size={24} /> },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-[1.5rem] border border-white/5 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              {stat.icon}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">{stat.label}</p>
            <p className={`text-3xl font-extrabold font-display ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
