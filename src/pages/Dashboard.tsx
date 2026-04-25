import { useMemo, useState } from 'react'
import { ChartPieSlice, Sparkle, TrendUp, Users } from '@phosphor-icons/react'
import { HiOutlineSparkles } from 'react-icons/hi2'
import CourseCard from '../components/CourseCard'
import Pagination from '../components/Pagination'
import { courseService } from '../services/courseService'

const featuredStudents = [
  'Camila Torres',
  'Diego Flores',
  'Andrea Ruiz',
  'Mateo Pineda',
  'Lucia Arias',
  'Joaquin Salas',
  'Valeria Cabanillas',
  'Renata Soria',
  'Ariana Vega',
  'Pablo Contreras',
]

const COURSES_PER_PAGE = 6
const STUDENTS_PER_PAGE = 5

function Dashboard() {
  const courses = courseService.getCourses()
  const [coursePage, setCoursePage] = useState(1)
  const [studentPage, setStudentPage] = useState(1)

  const totalCoursePages = Math.ceil(courses.length / COURSES_PER_PAGE)
  const pagedCourses = useMemo(() => {
    const start = (coursePage - 1) * COURSES_PER_PAGE
    return courses.slice(start, start + COURSES_PER_PAGE)
  }, [coursePage, courses])

  const totalStudentPages = Math.ceil(featuredStudents.length / STUDENTS_PER_PAGE)
  const pagedStudents = useMemo(() => {
    const start = (studentPage - 1) * STUDENTS_PER_PAGE
    return featuredStudents.slice(start, start + STUDENTS_PER_PAGE)
  }, [studentPage])

  return (
    <div className="space-y-10 animate-review-enter">
      <header className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-blue-900/10 to-transparent p-10 border border-white/5">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkle size={160} weight="fill" className="text-primary" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 border border-primary/20 mb-6">
            <HiOutlineSparkles className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Plataforma de Inteligencia Academica
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl font-display">
            Explora Cursos <span className="text-primary">&</span> Profesores
          </h1>
          <p className="mt-4 text-lg text-secondary font-medium leading-relaxed">
            Datos mock activos, resenas reales simuladas y una experiencia que se
            siente como producto final.
          </p>
        </div>
      </header>

      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white font-display">Cursos Destacados</h2>
            <p className="text-sm text-secondary font-medium">
              Materias con mas actividad esta semana
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {pagedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <Pagination
          currentPage={coursePage}
          onPageChange={setCoursePage}
          totalItems={courses.length}
          totalPages={totalCoursePages}
        />
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { label: 'Reviews Totales', value: '1,284', color: 'text-primary', icon: <TrendUp size={24} /> },
          { label: 'Profesores Evaluados', value: '156', color: 'text-blue-400', icon: <Users size={24} /> },
          { label: 'Nivel de Satisfaccion', value: '94%', color: 'text-emerald-400', icon: <ChartPieSlice size={24} /> },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel p-6 rounded-[1.5rem] border border-white/5 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              {stat.icon}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">{stat.label}</p>
            <p className={`text-3xl font-extrabold font-display ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="glass-panel rounded-[2rem] border border-white/5 p-6">
        <h3 className="text-xl font-bold text-white font-display">Alumnos activos</h3>
        <p className="mt-1 text-sm text-secondary">Comunidad que mas resena y aporta insights.</p>

        <div className="mt-5 space-y-3">
          {pagedStudents.map((student, index) => (
            <article
              key={student}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
            >
              <p className="font-semibold text-white">{student}</p>
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                Top {index + 1 + (studentPage - 1) * STUDENTS_PER_PAGE}
              </span>
            </article>
          ))}
        </div>

        <Pagination
          currentPage={studentPage}
          onPageChange={setStudentPage}
          totalItems={featuredStudents.length}
          totalPages={totalStudentPages}
        />
      </section>
    </div>
  )
}

export default Dashboard
