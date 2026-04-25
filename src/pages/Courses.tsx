import CourseCard from '../components/CourseCard'
import { courseService } from '../services/courseService'
import { BookOpen, Search, Filter } from 'lucide-react'

function Courses() {
  const courses = courseService.getCourses()

  return (
    <div className="space-y-8 animate-review-enter">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 border border-primary/20 mb-3">
            <BookOpen className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Catálogo Académico
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white font-display">
            Todos los Cursos
          </h1>
          <p className="mt-2 text-secondary font-medium">
            Explora nuestra base de datos completa de profesores y materias.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Filtrar cursos..." 
              className="h-11 w-64 rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 text-sm text-white outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
            />
          </div>
          <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-secondary hover:text-white hover:bg-white/10 transition-all">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      
      {/* Empty State / Load More */}
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-secondary/40 font-medium">Has llegado al final del catálogo</p>
        <div className="mt-4 h-px w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  )
}

export default Courses
